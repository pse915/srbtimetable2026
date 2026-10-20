# 최적화 변경 내역

로컬 작업 브랜치: performance-optimization. 공개 저장소로 push하지 않았다.

| ID | 적용 위치 | 변경 | 동등성 근거 | 미검증 |
|---|---|---|---|---|
| PERF-01 | native-optimization/timetable_app2.py recommend_substitutes | 미사용 복무 필터 계산 제거 | 원본 함수 출력 전체 비교, 나머지 소스 보존 | 실제 운영 추천·Cloud CPU |
| PERF-02 | backend/services/application.py dispatch | 권한 범위가 같은 요청의 사전 렌더 생략 | 12개 메뉴 모델 동일, 권한 회수/교사명 변경 테스트 | 전체 숨겨진 경로 |
| PERF-03 | backend/services/application.py download ledger | 불변 파일 참조로 중복 응답 보존 | 이전 파일 응답 재생·권한 테스트, 브라우저 다운로드 | 운영 메모리 RSS |

추천 점수·후보·순서·호봉·학사일정·시트 구조·저장·예산 알고리즘은 수정하지 않았다. 기존 캐시 무효화와 서버 인증 주기를 유지했다. original 파일과 legacy 원본은 변경하지 않았다.

## 적용과 복구

현재 기본 Streamlit 앱에는 native-optimization/performance.patch만 별도 브랜치에서 적용한다. React 후보 전체를 원본 운영 앱에 덮어씌우지 않는다. native-optimization/README.md 참조.

React 후보를 테스트 중이라면 backend/services/application.py 변경과 추가 테스트를 적용한다. npm ci 후 typecheck/lint/test/build, pytest, 별도 테스트 Streamlit에서 E2E를 수행한다. 이번 프론트엔드 번들은 수정 전과 동일하다.

최종 운영 반영 전에 해당 서버의 기존 파일·커밋을 보존한다. 실패 시 원본 파일 또는 이전 Git 커밋으로 복구한다. Secrets·시트·열·계정 데이터는 바꾸지 않는다. 데이터 복구를 위해 시트를 덮어쓰는 동작은 하지 않는다.

공식 참고: https://docs.streamlit.io/develop/concepts/architecture/caching
