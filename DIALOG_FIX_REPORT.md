# 수업 교체 팝업 종료 후 흰 화면 — 긴급 수정 보고서

작성일: 2026-10-14 (KST)

## 1. 대상 및 확인 범위

- 입력: `Timetable-performance-optimization.zip`
- 운영 URL: https://srbtimetable2026.streamlit.app/ — 웹 접근 시 Streamlit 인증 리다이렉트가 발생하여 로그인·실제 교체 재현은 불가능했습니다.
- 공개 참고 저장소: https://github.com/pse915/Timetable — `main`에는 `timetable_app2.py`가 있고 기존 Streamlit 앱 구조입니다. 그러나 URL과 이 저장소/브랜치/커밋의 실제 연결은 운영 관리자 확인이 필요합니다.
- 입력 ZIP의 루트 `timetable_app2.py`는 React v2 **마이그레이션 후보**이며, `native-optimization/timetable_app2.py`는 기존 Streamlit 개선본입니다. 이 둘을 자동으로 합치거나 운영 앱을 React 버전으로 전환하지 않았습니다.

## 2. 소스에서 확인한 결함 및 수정

### 기존 Streamlit (`native-optimization/timetable_app2.py`)

1. `@st.dialog("🎯 수업 작업", width="large")`는 바깥 클릭/ESC/X 종료 뒤에 `weekly_selected_lesson`, `weekly_dialog_open` 등을 정리하지 않았습니다. 닫기 버튼만 상태를 정리했습니다. 이제 `on_dismiss=_dismiss_weekly_action_dialog` 콜백이 닫기 버튼과 동일한 상태 정리를 수행합니다.
2. 수업 교체 성공 이후 원본 수업이 최신 시간표에 존재하지 않는 것은 정상입니다. 이전에는 `_validate_current_weekly_selection`을 결과 메시지보다 먼저 검사했습니다. 성공 결과가 있는 경우 이를 먼저 표시하여 완료 직후 불필요한 재실행을 피하도록 변경했습니다.
3. 명시적 닫기 버튼과 유효하지 않은 선택으로 닫는 경로에 공통 정리 + 전체 `st.rerun()`을 사용합니다. 교체 결과 반영과 주간표 선택 위젯 epoch 초기화를 같은 전체 실행 경계에서 수행합니다.

### React 전환 후보

1. `frontend/src/component.tsx`: Streamlit Components v2가 데이터를 갱신할 때마다 `createRoot`를 호출하던 코드를 인스턴스별 WeakMap Root 재사용으로 변경했습니다. 요청 대기 Map 역시 인스턴스별로 분리하고 언마운트 시 타이머를 정리합니다.
2. `frontend/src/App.tsx`: 요청 중 팝업의 바깥 클릭·ESC로 중복 종료가 발생하지 않게 했고, 비동기 요청 거절을 사용자에게 표시되는 실패 응답으로 처리합니다. 연속 클릭 시 ref로 동시 요청을 차단합니다.
3. `frontend/src/components/NodeRenderer.tsx`: 작업 중 바깥 클릭·ESC가 서버 변경과 충돌하지 않도록 하며 성공/실패 후 다시 닫을 수 있게 했습니다.
4. `backend/services/application.py`: `close_dialog` 시 이전 `weekly_dialog_result`도 함께 제거하여 다음 팝업에 완료 메시지가 남지 않게 했습니다.
5. `frontend/src/components/AppErrorBoundary.tsx`: 렌더 오류 발생 시 완전한 흰 화면 대신 복구 안내를 표시합니다.
6. 기존 `frontend/dist/timetable.js`에도 위 주요 동작을 **직접 적용한 임시 패치 번들**을 포함했습니다. npm 패키지 저장소 DNS를 사용할 수 없어서 `npm run build`에서 새 번들을 생성한 것은 아닙니다. 정식 배포 전 Node 24 환경에서 `npm ci && npm run build` 후 Git diff·테스트 확인이 반드시 필요합니다.

## 3. 수행한 검증

| 항목 | 결과 | 근거/한계 |
|---|---|---|
| 팝업 바깥 종료 후 임시 상태 초기화 | PASS | `tests/dialog_fix/test_native_dialog.py`의 Python 격리 테스트 |
| 명시적 닫기 시 동일한 초기화·full rerun | PASS | 동일 테스트 |
| 완료 메시지가 이미 교체된 원본 수업 검증보다 우선 | PASS | 동일 테스트 |
| React 백엔드 종료 시 성공 메시지 제거 | PASS(정적 검증) | AST/소스 검사 |
| 기존 동결된 원본 소스·인벤토리 검증 | PASS | `tests/parity/test_source.py` |
| Python 코드 컴파일 | PASS | `python -m compileall` |
| 배포 JS 문법 검사 | PASS | `node --check frontend/dist/timetable.js` |
| 기존 전체 통합 테스트 | BLOCKED | `gspread` 미설치로 23개 케이스가 테스트 실행 초기에 중단; 애플리케이션 동작 결함이라고 단정할 수 없음 |
| 프런트엔드 `npm ci`, TypeScript typecheck, unit, build | BLOCKED | npm 레지스트리 DNS 연결 실패 (`zustand` 등 설치 불가) |
| Playwright UI 재현/20회 반복 | NOT RUN | npm·Streamlit·테스트 브라우저 실행에 필요한 종속성 없음. E2E 테스트 2개 추가 |
| 실제 운영 로그인·Google Sheets 쓰기 | NOT RUN | 운영 인증/Secrets/복제 시트 없음. 원본 데이터 쓰기 수행하지 않음 |
| 실제 배포 GitHub 커밋·브랜치 식별 | UNVERIFIED | URL 인증 리다이렉트; 코드 기준 GitHub 원격과 정확한 연결은 검증 불가 |
| 전체 기능 100% 동등성 | UNVERIFIED | 기존 `PARITY_REPORT.md`에도 이전 미검증 사항 기재 |

실행 로그 요약: `python -m pytest tests/dialog_fix tests/parity/test_source.py -q` => **8 passed**. 별도로 실행한 `tests/integration/test_application.py`, `tests/integration/test_more_workflows.py` => **23 failed at dependency import (`ModuleNotFoundError: gspread`)**. 원인 로직을 테스트하기 전에 중단됐습니다.

## 4. 운영 전 적용 절차

### 운영이 기존 Streamlit UI인 경우 (권장 최소 변경)

- `native-optimization/timetable_app2.py`만 별도 테스트 브랜치의 **동일한 내용의** 기존 진입점에 검토 적용합니다. 공개 GitHub main과 파일이 다르다면 **파일 전체를 덮어쓰지 말고** `native-optimization/dialog-dismiss.patch`의 관련 부분을 실제 배포 코드에 병합합니다.
- `native-optimization/requirements.txt`는 원본 의존성 목록입니다. 기존 운영 의존성과 Secrets를 보존합니다.
- 복제한 Google Sheets를 연결한 Streamlit 테스트 앱에서 성공 교체 후 X / ESC / 오버레이 클릭, 닫기 버튼, 다음 수업 재진입, 저장 1회 보장을 검증합니다.
- 운영 브랜치에 반영 전 커밋·시트 백업을 하고, 통과하면 병합합니다. Rollback은 해당 커밋 되돌리기이며 시트 데이터까지 되돌리는 작업은 아닙니다.

### React v2 후보를 테스트하는 경우

- `requirements.txt`, 루트 `timetable_app2.py`, `backend/`, `frontend/`를 포함한 전체 ZIP을 **별도 평가 브랜치**에 배포합니다.
- Node.js 24 이상 사용 권장. `cd frontend && npm ci && npm run typecheck && npm run lint && npm run test && npm run build` 및 `npm run test:e2e`를 실행합니다.
- 컴파일된 `frontend/dist/timetable.js`를 정식 빌드 산출물로 덮어쓴 후 함께 커밋합니다. 해당 CI는 `git diff --exit-code -- frontend/dist`로 정상 빌드 일치성을 확인합니다.
- 기존 `DEPLOYMENT.md`의 `[migration] allow_writes=false`를 유지하여 복제 자료에서 테스트합니다. 현재 후보는 기존 기능 100% 동등성 검증이 끝나지 않았으므로 운영 교체를 권장하지 않습니다.

## 5. 참고

- Streamlit 1.56.0 `st.dialog` 문서: https://docs.streamlit.io/1.56.0/develop/api-reference/execution-flow/st.dialog (`on_dismiss` 기본값 `ignore`)
- Components v2 React 공식 Root 수명 관리 예제: https://docs.streamlit.io/develop/tutorials/custom-components/template-react

이 패치는 소스에서 확인한 버그 위험을 제거한 수정 후보이며, **실제 운영에서 흰 화면 문제가 100% 해결되었다는 증거는 아직 없습니다**. 위 브라우저·복제 시트 테스트로 확인한 뒤 배포하세요.
