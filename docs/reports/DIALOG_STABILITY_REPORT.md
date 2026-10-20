# Timetable 팝업 안정화 — 코드 수정 및 검증 보고서

**수정본 작성:** 2026-10-14  
**기준:** 첨부 `Timetable-Dialog-Fix-Full-Project.zip`의 `native-optimization/timetable_app2.py` (기존 Streamlit 개선본)  
**실제 운영 서비스:** https://srbtimetable2026.streamlit.app/ — 인증 리다이렉트로 로그인 이후 재현 불가. 연결 GitHub 브랜치·커밋 검증 불가.

## 1. 검증된 코드 위험 지점과 수정

- 기존 수정본은 **`do_swap` 성공 직후 `st.rerun(scope="fragment")`** 또는 `_weekly_fragment_rerun()`을 강제로 호출했다. 저장으로 원본 수업 선택이 낡아진 상황에서 dialog의 실행 범위가 강제로 재실행되는 구조였다. 흰 화면의 **확정 원인은 아니다.**
- 수업 교환(일반/테스트, 날짜 지정), 연계 순환, 결강 등록, 보강 배정의 성공 처리 5개 경로를 `_weekly_dialog_finish()`로 통합했다. 성공 상태를 즉시 표시하고 버튼·바깥 클릭/ESC로 닫을 때에만 전체 화면을 다시 그리도록 한다.
- 작업 메뉴 버튼은 `on_click` 콜백으로, 검색일수 슬라이더는 `on_change` 콜백으로 처리해 dialog 내부 강제 fragment rerun을 제거했다. 날짜·교시 검색 버튼은 현재 dialog rerun에서 바로 계산하도록 유지했다.
- `_clear_weekly_selection()`에서 결과 문자열·날짜 지정 후보 캐시·기존 선택 행·검색 플래그를 정리한다. 로그인·권한 키는 변경하지 않는다.
- 기존 수업 다이얼로그의 바깥/X/ESC 닫기 콜백을 유지했다. `도구` 다이얼로그에 `_dismiss_tools_dialog`을 추가해 다운로드 출력 양식 임시 상태만 정리하도록 했다. 폰트/테마는 유지된다.
- 실 저장 함수 `do_swap`/Google Sheets 인증 및 스프레드시트 스키마는 **변경하지 않았다**. 기존 기능·UI·성능 최적화 코드는 그대로 둔다.
- React 소스는 이전 수정본의 상태를 유지했다. **이번 새 수정이 적용된 것은 기존 Streamlit 버전이다.** 두 실행 방식을 자동 전환하지 않는다.

## 2. 실행한 검사

| 검사 | 결과 | 근거 |
|---|---|---|
| 팝업 콜백 및 회귀 테스트 | PASS | `python -m pytest tests/dialog_fix tests/parity/test_source.py -q` → **18 passed** |
| 테스트/실제 맞교환 버튼 성공 분기 (모의 Streamlit) | PASS | `test_swap_button_success_renders_without_manual_rerun` 테스트 2종 |
| 성공 후 다시 dialog 함수 진입할 때 중복 적용 방지 | PASS | 같은 테스트 내 2차 호출 검증 |
| 테스트 맞교환이 시트 저장 함수를 호출하지 않음 | PASS | 메모리 기반 `do_swap` 독립 테스트 |
| 실제 맞교환 1회 저장 / 저장 실패 시 메모리 롤백 | PASS | 메모리 기반 `do_swap` 독립 테스트 |
| 두 native `@st.dialog` 확인 | PASS(정적) | AST 팝업 인벤토리 및 결과 정리 검사 |
| 수정 Python 문법 | PASS | `python -m py_compile native-optimization/timetable_app2.py` |
| 기존 Python 전체 단위·통합 | BLOCKED | `gspread` 미설치. 외부 패키지 설치 시 DNS 실패 |
| React 타입 검사 및 정식 빌드 | BLOCKED | `vite/client`, `vitest/globals`가 누락된 불완전한 node_modules; 네트워크 설치 불가 |
| React Playwright E2E | NOT RUN | Streamlit / frontend 의존성 미설치, 실행 서버 없음 |
| 운영 Streamlit 접속·로그인·실제 브라우저 흰 화면 재현 | NOT RUN | 인증 및 운영 환경 접근 불가 |
| 실제 Google Sheets 쓰기 / 두 사용자 동시 작업 | NOT RUN | 서비스 계정 및 복제된 테스트 시트 없음 |
| 모든 기능 100% 동등성 | NOT VERIFIED | 원본 시스템의 전체 기능·운영 검증 환경 부재 |

## 3. 팝업 인벤토리

기존 Streamlit 버전에서 확인한 `@st.dialog` 2개:
- `수업 작업` (`_weekly_action_dialog`): 기본 1:1, 날짜/교시 지정 1:1, 연계 순환, 결강, 보강, 상세. 성공 경로의 강제 재실행 제거.
- `도구` (`render_tools_dialog`): 화면 테마/글꼴, Undo/Redo, 출력 메뉴. 바깥/X/ESC 시 임시 출력 모드 정리.

React 마이그레이션 후보에는 `NodeRenderer.tsx` 공통 dialog, `App.tsx`의 맞교환 확인·화면 설정 modal 2개가 확인됨. 이 버전의 회귀 시나리오 2개를 Playwright 테스트에 추가했지만 **미실행**. 운영 버전 여부 검증 불가.

## 4. 배포 절차

1. 기존 앱의 GitHub 저장소·브랜치·Entrypoint를 **Streamlit Community Cloud 설정에서 먼저 확인**한다.
2. 운영 원본 Python과 Sheets를 백업하고 별도 테스트 브랜치 생성.
3. 기존 Streamlit 배포가 맞다면, 이 ZIP의 `timetable_app2.py`를 기존 진입점과 diff하여 적용. React 루트 스크립트를 덮어쓰지 말 것.
4. 기존 `.streamlit/secrets.toml` 또는 Cloud Secrets를 바꾸지 않는다. 동일 키를 복제 시트 전용 테스트 앱에서 사용.
5. `pip install -r requirements.txt && streamlit run timetable_app2.py`로 테스트 앱을 실행한다.
6. **맞교환 테스트 → 성공 팝업 → 바깥 클릭/ESC**, **실제 맞교환 → 저장 1회 검증 → 닫기**를 복제 시트에서 확인한다.
7. 각 작업 뒤 교사별·학급별 시간표가 갱신되는지, 로그인/권한·다른 팝업이 정상인지 확인한다. 30회 열기·닫기와 동시 작업도 검증한다.
8. PASS일 때에만 운영 브랜치에 적용. 실패하면 이전 Git 커밋 복원. 소스 롤백은 Sheets의 변경 내역을 되돌리지 않는다.

## 5. 원본 대비 변경 사항 추적

- 이전 수정본 SHA-256: `b403cd663cf173cae6b054950c57c682f38207e3521bd48926d685595943f17f`
- 이번 수정본 SHA-256: `c0125023da24b8da97abb02fde7ad36b394acbb5cdb9860c0fc85db4739e5fcf`
- 별도 `Timetable-Popup-Stability-Fix.patch` 파일 참조.

**중요:** 이 수정본은 실행 가능한 코드 및 소스 수준 테스트를 포함하지만 운영에서 완전히 검증된 버전이 아니다. 실제 흰 화면 오류의 근본 원인을 확정하려면 브라우저 콘솔·Streamlit 서버 로그·배포된 커밋 확인이 추가로 필요하다.
