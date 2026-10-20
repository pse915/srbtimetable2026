# 학교 시간표·업무 앱

운영 주소: https://srbtimetable2026.streamlit.app/

저장소에는 React UI와 Streamlit을 연결한 진입점, 기존 Streamlit 실행 파일이 함께 있습니다. 운영 앱의 실제 진입점은 Streamlit Cloud 배포 설정을 기준으로 합니다. 이번 정리에서는 실행 코드·빌드·설정·의존성을 변경하지 않았습니다.

## 실행

Python 3.12 권장:

```bash
pip install -r requirements.txt
streamlit run timetable_app2.py
```

루트 `timetable_app2.py`는 React 전환 후보입니다. 기존 운영 앱을 이 진입점으로 전환하기 전에는 복제한 Google Sheets로 기능과 저장 동작을 확인해야 합니다. 기본 읽기 전용이며 실제 Google Sheets/Cloud 기능 동등성 검증은 완료되지 않았습니다.

## 파일 구성

| 위치 | 용도 |
|---|---|
| `timetable_app2.py` | React UI를 연결하는 Streamlit 진입점 |
| `backend/` | 업무 처리, 권한, 시트 연동, UI 연결 |
| `frontend/src/`, `frontend/dist/` | UI 소스와 Cloud 실행에 필요한 빌드 |
| `legacy/timetable_app2_original.py` | 백엔드가 실행 중 읽는 원본 코드. 삭제 금지 |
| `native-optimization/` | 기존 Streamlit 개선 구현과 해당 의존성·테스트 대상 |
| 나머지 루트 Python 실행 파일 | 별도 실행 구현. Cloud 진입점 확인 전 보존 |
| `tests/`, `tools/` | 회귀 검증, 소스 목록 생성, 릴리스 도구 |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 배포·Secrets·복구 절차 |
| [MAINTENANCE.md](MAINTENANCE.md) | 유지보수 안내 |

과거 보고서, 캡처, 측정 결과, 패치, 중복 백업은 삭제했습니다. 이전 내용은 Git 이력에서 복원할 수 있습니다. 테스트가 생성하는 캡처와 측정 결과는 Git에서 제외합니다.

## 개발·검증

```bash
pip install -r requirements-dev.txt
python -m pytest
python -m pytest tests/dialog_fix -q
```

프론트엔드는 Node 24 환경에서 실행합니다.

```bash
cd frontend
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

`frontend/dist/`는 Cloud 실행에 필요하므로 소스 수정 시 빌드 결과도 함께 커밋합니다. 브라우저 테스트는 `tests/qa_app.py`를 포트 8502에서 실행한 뒤 `frontend`에서 `npm run test:e2e`로 수행합니다. QA는 모의 시트를 사용합니다.

API 키와 서비스 계정은 Streamlit Secrets에만 설정합니다. 구글 시트 값은 저장소 정리 대상이 아닙니다.

## 연구 평가 → 시험감독 배정

로그인 후 수업 운영 → 교무 행정 → 연구 평가 → 관리 순서로 표시됩니다. 연구 평가의 ‘시험감독 배정’에서 원본 화면을 사용합니다. 기존 앱에서 검증한 관리자 권한과 명시적인 계정 매핑이 있어야 시험감독 관리자 로그인을 할 수 있습니다. 아이디 `pse915`를 코드에 특별 취급하지 않습니다.

첨부 엔진과 UI는 `exam/apps_script/`에 보존했습니다. 원본 API action 전부를 `backend/services/exam.py`가 중계합니다. UI는 격리된 iframe 안에서 동작하며 `google.script.run`을 메시지 통신으로 대체합니다. 외부 사이트 iframe을 삽입하지 않습니다. 배정·증분 평가·스냅샷·잠금은 실제 Apps Script에서 실행하므로 별도 Python 이식에 따른 알고리즘 차이가 없습니다. 단독 UI 공개 진입점 `doGet`만 안내문으로 대체했습니다. 원본 `Index.html`은 그대로이고, 원본 렌더 함수는 `standaloneView_`로 이름만 바꿨습니다.

### 외부 연결 준비

이 저장소의 React 진입점 `timetable_app2.py`에 통합했습니다. 운영 Cloud의 브랜치·진입점·Secrets는 이 작업에서 확인하거나 변경하지 않았습니다. 기존 Streamlit 실행 파일을 사용하는 배포에는 새 메뉴가 자동으로 추가되지 않습니다. 먼저 Cloud 설정을 확인하세요.

1. **복제한 시험감독 스프레드시트**에 바인딩된 Apps Script 프로젝트를 사용합니다. 기존 수업·교무 시트 ID를 대신 넣지 마세요. 한 시험감독 문서의 모든 앱 사용자는 같은 Apps Script 프로젝트를 사용해야 원본 ScriptLock과 버전 검사가 함께 적용됩니다.
2. `exam/apps_script/Code.gs`, `Gateway.gs`, `Index.html`을 해당 프로젝트에 설치합니다. V8 런타임을 사용합니다. 원본 ‘배정인원’, ‘학급입력’, ‘관리자ID’의 값과 열은 유지합니다.
3. Apps Script 프로젝트의 스크립트 속성에 `EXAM_BRIDGE_SECRET`(무작위 32자 이상), `EXAM_SPREADSHEET_ID`(복제 문서 ID), `EXAM_ALLOW_WRITES`(`false`)를 설정합니다. 시트 셀에 비밀키를 넣지 않습니다.
4. Apps Script 웹 앱을 소유자 권한으로 실행하도록 배포하고 서버의 POST가 Google 로그인 리다이렉트 없이 도달할 수 있게 접근 범위를 설정합니다. 웹에서 들어오는 요청은 HMAC 서명·시간·문서 ID·요청 ID·서명된 기존 앱 권한을 검사합니다. GET으로는 관리자 화면을 제공하지 않습니다. 배포 `/exec` 주소는 아래 endpoint에 넣습니다. 실제 배포 권한·조직 정책과 통신 가능 여부는 별도 확인이 필요합니다.
5. Streamlit Secrets에 다음을 추가합니다. 실제 이름·이메일은 ‘관리자ID’ A/B열과 일치하도록 관리자가 직접 설정합니다. 이메일을 아이디에서 추측하지 않습니다.

```toml
[exam]
endpoint = "https://script.google.com/macros/s/배포_ID/exec"
spreadsheet_id = "시험감독_복제문서_ID"
shared_secret = "Apps_Script와_동일한_무작위_32자_이상_비밀키"
allow_writes = false

[exam.admin_map.pse915]
name = "관리자ID_A열의_실제_이름"
email = "관리자ID_B열의_실제_이메일"
```

원본의 이름·이메일 일치는 Google 본인 인증이 아닙니다. 통합 경로는 기존 앱이 서버에서 재검증한 관리자 권한, 위 매핑, 원본 관리자 명단과 만료 세션을 함께 검사합니다. 기존 앱의 로그인 보안 수준을 추가로 강화하는 변경은 포함하지 않습니다.

설정 누락 시 기능 연결을 차단하며 시트를 생성하지 않습니다. 새 문서의 시스템 시트 준비는 관리자가 **복제 시트에서** 원본 시트 메뉴의 ‘시스템 시트 준비’를 명시적으로 실행합니다. 앱 조회 요청은 원본의 자동 초기화를 차단합니다. 원본 관리자 세션은 사용자·프로젝트별로 격리되고 브라우저 저장소에 영구 보관하지 않습니다.

### 저장·검증·복구

복제 시트 검증을 마치기 전에는 두 쓰기 설정을 모두 `false`로 유지하세요. 저장을 허용할 때만 Streamlit `exam.allow_writes = true`와 Apps Script `EXAM_ALLOW_WRITES = true`를 함께 설정합니다. 관리자 저장·확정·초기화 버튼의 명시적 실행으로만 시트가 변경됩니다. 기존 수업시간표를 자동으로 읽거나 복사하지 않으며, 원본의 ‘교사시간표’/‘수업시간표’ 입력을 그대로 사용합니다.

서명 요청의 영속 예약은 중복·실행 중·실패 후 미확인 요청의 자동 재실행을 차단합니다. 원본 ScriptLock, revision, 제약 fingerprint, 스냅샷 청크·SHA256 및 이전 확정본 보호를 유지합니다. 타임아웃 뒤에는 최신 자료와 이력을 확인하세요. 읽기에서도 재실행 방지용 스크립트 속성·캐시는 기록하지만 구글 시트 셀에는 쓰지 않습니다.

`node --test tests/exam_engine.test.cjs`는 원본 엔진의 합성 검사, 고정 시드 비교, 버전 무결성, 서명·권한·중복 처리와 메모리 시트의 확정·잠금·복구·초기화를 검증합니다. Python 통합 검사는 원본 파일 무결성·모든 API action 대응·기존 로그인 권한·쓰기 차단을 확인합니다. 브라우저의 시험감독 테스트는 설정 누락 경로와 **모의 응답** 기반 검색·인쇄 호출·CSV·모바일 표시를 검증합니다. 실제 인쇄물 레이아웃, Apps Script 배포·조직 정책·Cloud 제한·실제 동시 사용자·부분 저장 장애는 복제 시트에서 추가 검증해야 합니다. 전체 실서비스 기능 검증 완료를 뜻하지 않습니다.

로컬 Chrome 검증에서는 기존 수업 맞교환 후 수업 팝업을 다시 여는 브라우저 검사 1건이 실패했습니다. 동일 검사를 변경 전 `b4dc029`에서도 실행해 같은 실패를 확인했습니다. 기존 팝업 문제와 실제 Apps Script/Cloud 연동 확인을 마치기 전에는 운영 반영을 완료로 판단하지 않습니다.

운영 반영은 PR 검토와 복제 시트 확인 후 수행합니다. 코드 복구는 해당 PR을 revert하고 Cloud를 재시작합니다. Apps Script는 직전 배포 버전으로 되돌릴 수 있습니다. 두 쓰기 설정을 끄면 변경 요청을 즉시 차단할 수 있습니다. 코드 복구로 구글 시트 값을 덮어쓰지 않습니다.
