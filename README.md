> **2026-10-14 팝업 긴급 수정 후보:** 기존 Streamlit/React 양쪽 종료 흐름의 수정 내역 및 검증 제한은 [DIALOG_FIX_REPORT.md](DIALOG_FIX_REPORT.md)를 참고하세요. 이 루트는 React 전환 **평가용** 진입점입니다. 기존 운영 Streamlit 앱에 React 버전을 그대로 덮어쓰지 마세요.

# Timetable React 전환 검증 후보

**운영 교체 승인 전 단계입니다. 100% 기능 동등성 및 실제 Google Sheets/Community Cloud 연동 검증은 완료되지 않았습니다.**

GitHub `main` 커밋 `c00647f2f49c09ff03469b83f8f4c0e6baf08d0d`를 기준으로 새 UI를 구현했습니다. 원본 7,069줄과 첨부본은 `legacy/`에 각각 보존했습니다. 실행 진입점은 기존과 같은 `timetable_app2.py`입니다. 별도 웹 서버나 Node 개발 서버가 필요하지 않습니다.

## 실행

Python 3.12 권장(3.11은 CI 미검증). 원본 Google 인증 Secrets 키 이름을 유지합니다.

```bash
pip install -r requirements.txt
streamlit run timetable_app2.py
```

`frontend/dist/timetable.js`, `frontend/dist/style.css`는 저장소에 포함되어 있습니다. 실제 앱에는 테스트 교사나 예시 시간표가 들어가지 않습니다. Secrets가 없는 환경에서는 로그인 화면을 표시하지만 시트 조회·저장을 수행할 수 없습니다.

새 앱은 기본 읽기 전용입니다. 테스트 시트를 연결하고 저장 검증을 수행하는 절차는 [DEPLOYMENT.md](DEPLOYMENT.md)를 따르세요. 기존 운영 앱의 Secrets, 데이터를 이 작업에서 변경하지 않았습니다.

## 프론트엔드 수정

Node 24 환경에서:

```bash
cd frontend
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

빌드 결과를 함께 커밋합니다. `npm run dev`는 변경 시 번들을 다시 만드는 watch 작업입니다. 화면은 Streamlit 테스트 앱에서 확인합니다. Streamlit Cloud에서는 watch 작업을 실행하지 않습니다.

## 검증

```bash
pip install -r requirements-dev.txt
python -m pytest
streamlit run tests/qa_app.py --server.port 8502
# 다른 터미널
cd frontend
npx playwright install chromium
npm run test:e2e
```

QA 앱은 테스트 전용 가상 자료와 모의 워크시트를 사용합니다. 실제 Google Sheets와 NEIS/Gemini로 요청하지 않습니다. 캡처에도 가상 테스트 자료가 표시됩니다.

## 구성과 문서

| 위치 | 역할 |
|---|---|
| `legacy/timetable_app2_original.py` | GitHub 기준 원본, 바이트 단위 보존 |
| `legacy/timetable_app2_attached.py` | 첨부본, 코드 동일·줄바꿈만 LF |
| `backend/domain/program.py` | 원본 함수·상수 AST 로드, 명시적인 세션별 상태 포트 주입 |
| `backend/bridge/port.py` | 입력 검증 및 React 화면 모델 생성 |
| `backend/services/application.py` | 요청 분배·권한·중복 방지·청크 업로드 |
| `backend/services/history.py` | 원본 DataFrame.tolist 오류 수정 |
| `backend/services/calendar.py` | React 날짜 입력, 원본 평일·월요일 기준 유지 |
| `backend/services/swaps.py` | 드래그 입력을 기존 검증/실행 함수에 연결 |
| `backend/repositories/sheets.py` | 기존 저장 형식, 충돌 감지·쓰기 차단 |
| `frontend/src/App.tsx` | 메뉴·레이아웃·테마·확인 화면 |
| `frontend/src/components/` | 입력, 달력, TanStack 표, 모달, 파일 UI |
| `FEATURE_INVENTORY.md` | 원본의 204개 함수 정의, 282개 UI 호출 위치 |
| `PARITY_REPORT.md` | 검증된 범위와 미검증 범위 |
| `SOURCE_ANALYSIS.md` | 실제 시트·계산·권한 규칙 분석 |
| `SECURITY_REPORT.md` | 보존한 취약점과 추가 보호 조치 |
| `MAINTENANCE.md` | 유지보수와 회귀 테스트 방법 |
| `screenshots/` | 로컬 가상 자료를 사용하는 실제 브라우저 캡처 |

각 페이지는 서버가 원본의 실제 조건문을 실행하여 생성하는 선언적 모델을 React로 렌더링합니다. 업무 알고리즘을 별도 구현으로 재작성하지 않았습니다. 장기적으로 메뉴별 서비스를 명시적인 데이터 모델로 더 분리할 수 있습니다. 이 호환 계층이 모든 경로에서 동일하다는 것은 아직 검증되지 않았습니다.
