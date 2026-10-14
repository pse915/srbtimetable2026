# 원본 Streamlit 팝업 긴급 수정 + 기존 성능 최적화

이 디렉터리의 `timetable_app2.py`는 기존 Streamlit UI 소스이며 **React로 전환한 파일이 아닙니다.**

이번에 추가한 버그 수정:
- `@st.dialog("🎯 수업 작업")`에 바깥쪽 클릭/ESC/X 종료 콜백을 추가
- 교체 성공 완료 메시지를 원본 수업 유효성 검사보다 먼저 표시
- 명시적인 닫기 버튼에서도 동일한 상태 정리와 전체 화면 rerun 실시
- 기존 최적화(미사용 `dmask` 계산 제거)도 유지

- `timetable_app2_original.py`: 입력 ZIP의 복구용 원본
- `timetable_app2.py`: 수정본
- `dialog-dismiss.patch`: 원본 대비 코드 변경
- `requirements.txt`: 기존 Streamlit 의존성 목록, 변경하지 않음

운영 배포 시 URL이 연결된 브랜치/커밋과 코드를 먼저 비교하고, **다른 커밋이라면 파일 전체를 덮어쓰지 말고 patch의 팝업 부분만 병합하세요.** 복제 Google Sheets를 연결한 별도 테스트 앱에서 먼저 확인해야 합니다. 이 환경에서는 실제 운영 사이트 인증·시트 쓰기·Playwright 실행을 검증하지 못했습니다.

상세한 검증 상태는 루트 `DIALOG_FIX_REPORT.md`를 확인하세요.
