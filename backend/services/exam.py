"""Signed, server-only transport to the original bound Apps Script engine.

No Sheets client is created here. The unmodified engine retains its document
locks, revision checks, snapshots, solver and storage representation.
"""
import hashlib
import hmac
import json
import re
import time
from pathlib import Path

import requests

EXAM_TAB = '시험감독 배정'
ROOT = Path(__file__).resolve().parents[2]
PUBLIC = frozenset({'bootstrap', 'getStatus', 'getConfirmed', 'getTeacher'})
READS = PUBLIC | frozenset({
    'diagnose', 'getAdminData', 'getTeachingData', 'availabilityReport',
    'getResetPlan', 'fairness', 'optimizationReport', 'compareGradeBonus',
    'versions', 'getVersionLibrary', 'getVersionPreview', 'history',
    'getAuditData', 'selfTests', 'login', 'logout',
})
ACTIONS = READS | frozenset({
    'saveVisiting', 'saveTeachingRules', 'verifyRoster', 'revokeRoster',
    'saveRoster', 'resetWorkspace', 'saveInstructorFlags', 'saveSchedule',
    'saveSettings', 'saveUnavailable', 'generate', 'improve', 'update', 'swap',
    'roleSwap', 'confirm', 'unlockConfirmed', 'discardUnlocked', 'amend',
    'createVersion', 'restore', 'repair', 'initialize',
})


def embedded_html():
    """Only template expansion and transport change; original DOM/JS stay intact."""
    html = (ROOT / 'exam/apps_script/Index.html').read_text(encoding='utf-8-sig')
    html = html.replace('<?!= JSON.stringify(authStorageKey) ?>', '"exam-integrated-session"')
    bridge = (ROOT / 'exam/bridge.js').read_text(encoding='utf-8')
    return html.replace('<script>', '<script>' + bridge + '\n', 1)


class ExamService:
    def __init__(self, app, settings=None, post=None):
        self.app = app
        self.settings = dict(settings or {})
        self.post = post or requests.post
        self.token = ''
        self.expires_at = 0
        self.owner = None

    def reset(self):
        self.token = ''
        self.expires_at = 0
        self.owner = None

    @property
    def configured(self):
        s = self.settings
        return bool(re.fullmatch(r'https://script\.google\.com/macros/s/[A-Za-z0-9_-]+/exec', str(s.get('endpoint', '')))
                    and len(str(s.get('shared_secret', ''))) >= 32
                    and re.fullmatch(r'[A-Za-z0-9_-]{10,}', str(s.get('spreadsheet_id', ''))))

    def authorize(self, action, payload):
        state = self.app.port.session_state
        if not state.get('logged_in') or state.get('user_role') == '게스트':
            self.reset()
            raise PermissionError('기존 앱 로그인 후 이용하세요.')
        user_id = str(state.get('user_id'))
        mapping = self.settings.get('admin_map', {}).get(user_id, {})
        owner = (self.app._owner(), json.dumps(mapping, sort_keys=True))
        if owner != self.owner:
            self.reset()
            self.owner = owner
        if action not in ACTIONS or not isinstance(payload, dict):
            raise ValueError('지원하지 않는 시험감독 요청입니다.')
        if not self.configured:
            raise ValueError('시험감독 연결 미설정: README의 exam 설정을 완료하세요. 시트는 변경하지 않았습니다.')
        is_admin = bool(self.app.program.call('can_manage_ids'))
        mapped = is_admin and bool(mapping.get('name') and mapping.get('email'))
        if not mapped:self.token=''
        if action not in PUBLIC and not mapped:
            self.reset()
            raise PermissionError('기존 관리자 권한과 exam.admin_map의 명시적인 이름·이메일 연결이 필요합니다.')
        if action not in READS and self.settings.get('allow_writes') is not True:
            raise PermissionError('시험감독 시트 쓰기가 비활성화되어 있습니다.')
        if self.token and time.monotonic() >= self.expires_at:
            self.token=''
            self.expires_at=0
            if action not in PUBLIC | {'login','logout'}:
                raise PermissionError('시험감독 관리자 세션이 만료되었습니다. 다시 로그인하세요.')
        if action not in PUBLIC | {'login','logout'} and not self.token:
            raise PermissionError('시험감독 관리자 로그인이 필요합니다.')
        return state, mapping, mapped

    def call(self, action, payload, request_id):
        state, mapping, mapped = self.authorize(action, payload)
        params = dict(payload)
        # The client never selects the document, identity, write policy or token.
        params.pop('authToken', None)
        if action == 'login':
            if params.get('name') != mapping['name'] or str(params.get('email', '')).strip().lower() != mapping['email'].strip().lower():
                raise PermissionError('현재 계정에 연결된 관리자 이름·이메일과 일치하지 않습니다.')
        elif self.token:
            params['authToken'] = self.token
        body = json.dumps({
            'requestId': request_id, 'timestamp': int(time.time() * 1000),
            'spreadsheetId': self.settings['spreadsheet_id'], 'action': action,
            'principal': {'id': str(state.get('user_id')), 'admin': bool(mapped),
                          'name': mapping.get('name', '') if mapped else '',
                          'email': mapping.get('email', '').strip().lower() if mapped else ''},
            'allowWrites': self.settings.get('allow_writes') is True,
            'payload': params,
        }, ensure_ascii=False, separators=(',', ':'))
        signature = hmac.new(self.settings['shared_secret'].encode(), body.encode(), hashlib.sha256).hexdigest()
        try:
            response = self.post(self.settings['endpoint'], json={'body': body, 'signature': signature}, timeout=(15, 210))
            response.raise_for_status()
            envelope = response.json()
        except (requests.RequestException, ValueError) as exc:
            # Do not expose request bodies/tokens/secret-bearing HTTP diagnostics.
            raise RuntimeError('시험감독 서버 응답을 확인하지 못했습니다. 저장을 반복하지 말고 최신 자료와 이력을 확인하세요.') from exc
        if not isinstance(envelope, dict) or not envelope.get('ok'):
            raise RuntimeError(str(envelope.get('error', '시험감독 서버 응답 오류'))[:500] if isinstance(envelope, dict) else '시험감독 서버 응답 오류')
        result = envelope.get('result')
        if action == 'login' and isinstance(result, dict) and result.get('token'):
            self.token = result['token']
            self.expires_at = time.monotonic() + min(int(result.get('expiresIn', 14400)), 14400)
        if action == 'logout':
            self.reset()
        return result
