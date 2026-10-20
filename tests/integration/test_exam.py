import hashlib
import hmac
import json
import re
import uuid

import pytest

from backend.services.exam import ACTIONS, EXAM_TAB, ROOT, embedded_html
from tests.fixtures import make_application, login, command, click


def configured(role='마스터'):
    app, sheets = make_application(role=role)
    login(app)
    app.exam.settings = {
        'endpoint': 'https://script.google.com/macros/s/replica_test/exec',
        'spreadsheet_id': 'replica_test_document', 'shared_secret': 'x' * 40,
        'allow_writes': False,
        'admin_map': {'tester': {'name': '테스트가', 'email': 'teacher@example.test'}},
    }
    calls = []
    class Response:
        def raise_for_status(self):pass
        def json(self):return {'ok': True, 'result': {'ok': True, 'token': 't' * 96}}
    def post(url, **kw):
        calls.append((url, kw))
        return Response()
    app.exam.post = post
    return app, sheets, calls


def test_original_ui_and_engine_are_preserved():
    source = (ROOT / 'exam/apps_script/Code.gs').read_bytes()
    # Sole source change: disable standalone public UI entry; all business
    # functions and original algorithms remain exactly the attachment bytes.
    original = source.replace(b'function standaloneView_() {', b'function doGet() {', 1)
    assert hashlib.sha256(original).hexdigest() == '84f00cb16ce3ebfe9b7824a465105637a2babbeb40bc5cc5164d06a8e18afd2c'
    assert hashlib.sha256((ROOT / 'exam/apps_script/Index.html').read_bytes()).hexdigest() == '080ccefa6a4528ebb6bcedff7a865ef4f937f5a1b9c96283217b07898ce417d7'
    source = original.decode('utf-8-sig')
    actions = set(re.findall(r"case '([^']+)':", source.split('function api(action, payload)', 1)[1].split('// NOTE:', 1)[0]))
    assert actions | {'getStatus', 'getConfirmed', 'getTeacher'} == ACTIONS - {'bootstrap', 'login', 'logout', 'initialize'}
    gateway = (ROOT / 'exam/apps_script/Gateway.gs').read_text(encoding='utf-8')
    for action in ACTIONS:assert "'" + action + "'" in gateway
    html = embedded_html()
    assert '<?!=' not in html
    for name in re.findall(r'(?:async )?function (\w+)\(', (ROOT / 'exam/apps_script/Index.html').read_text(encoding='utf-8')):
        assert 'function ' + name + '(' in html


def test_exam_navigation_and_reads_make_no_sheet_writes():
    app, sheets, calls = configured()
    result = command(app, 'navigate', {'tab': EXAM_TAB})
    assert result['activeTab'] == EXAM_TAB
    assert 'window.google' in result['examHtml']
    request_id = str(uuid.uuid4())
    body = {'operation': 'exam_rpc', 'payload': {'action': 'bootstrap', 'params': {}}, 'requestId': request_id, 'dataVersion': str(app.version)}
    assert app.dispatch(body)['response']['success']
    assert app.dispatch(body)['response']['success']
    assert len(calls) == 1
    assert sum(sheet.writes for sheet in sheets.values()) == 0
    _, kwargs = calls[0]
    signed = kwargs['json']
    assert hmac.compare_digest(signed['signature'], hmac.new(b'x' * 40, signed['body'].encode(), hashlib.sha256).hexdigest())
    assert json.loads(signed['body'])['spreadsheetId'] == 'replica_test_document'


@pytest.mark.parametrize('action', ['saveRoster', 'generate', 'confirm', 'restore', 'repair', 'resetWorkspace', 'initialize'])
def test_writes_fail_closed(action):
    app, sheets, calls = configured()
    with pytest.raises(PermissionError, match='비활성화'):
        app.exam.call(action, {}, str(uuid.uuid4()))
    assert not calls
    assert sum(sheet.writes for sheet in sheets.values()) == 0


def test_admin_session_mapping_and_token_are_server_controlled():
    app, _, calls = configured()
    with pytest.raises(PermissionError):
        app.exam.call('login', {'name': '다른이름', 'email': 'teacher@example.test'}, str(uuid.uuid4()))
    app.exam.call('login', {'name': '테스트가', 'email': 'teacher@example.test'}, str(uuid.uuid4()))
    app.exam.call('getAdminData', {'authToken': 'forged'}, str(uuid.uuid4()))
    assert json.loads(calls[-1][1]['json']['body'])['payload']['authToken'] == 't' * 96
    app.exam.settings['admin_map'] = {}
    app.exam.call('bootstrap', {'authToken': 'forged'}, str(uuid.uuid4()))
    assert 'authToken' not in json.loads(calls[-1][1]['json']['body'])['payload']
    with pytest.raises(PermissionError):app.exam.call('getAdminData', {}, str(uuid.uuid4()))
    app.port.session_state.clear()
    with pytest.raises(PermissionError):app.exam.call('bootstrap', {}, str(uuid.uuid4()))
    assert app.exam.token == ''


def test_nonadmin_and_unconfigured_connections_never_make_requests():
    app, _, calls = configured(role='교사')
    with pytest.raises(PermissionError):app.exam.call('login', {}, str(uuid.uuid4()))
    assert not calls
    app.exam.settings = {}
    with pytest.raises(ValueError, match='미설정'):app.exam.call('bootstrap', {}, str(uuid.uuid4()))
    assert not calls


def test_cached_admin_results_recheck_mapping_and_expiration():
    app, _, calls = configured()
    command(app,'navigate',{'tab':EXAM_TAB})
    app.exam.call('login',{'name':'테스트가','email':'teacher@example.test'},str(uuid.uuid4()))
    body={'operation':'exam_rpc','payload':{'action':'getAdminData','params':{}},'requestId':str(uuid.uuid4()),'dataVersion':str(app.version)}
    assert app.dispatch(body)['response']['success']
    app.exam.expires_at=0
    assert not app.dispatch(body)['response']['success']
    app.exam.settings['admin_map']={}
    assert not app.dispatch(body)['response']['success']
    assert len(calls)==2


def test_exam_logout_clears_session_and_does_not_expose_work_save():
    app,sheets,_=configured()
    command(app,'navigate',{'tab':EXAM_TAB})
    labels=[c['node'].get('label') for c in app.port.controls.values()]
    assert '작업 저장' not in labels
    app.exam.token='private'
    assert not click(app,'로그아웃')['loggedIn']
    assert app.exam.token==''
    assert sum(s.writes for s in sheets.values())==0
