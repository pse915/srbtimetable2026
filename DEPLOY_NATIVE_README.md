# 기존 Streamlit 시간표 앱 — 팝업 안정화 패치

이 배포 ZIP의 진입점은 `timetable_app2.py`입니다. `streamlit run timetable_app2.py`로 실행합니다.

**중요:** 이 폴더의 `timetable_app2.py`는 원본 프로젝트의 `native-optimization/timetable_app2.py`를 수정한 버전입니다. 이전 전체 프로젝트 ZIP의 루트 `timetable_app2.py`는 **React 전환 후보**이고 서로 다른 프로그램입니다. 실제 Cloud 앱의 Entrypoint를 확인하기 전에 덮어쓰지 마세요.

기존 Google Sheets 주소·서비스계정/Secrets·데이터 형식은 변경하지 않습니다. Streamlit 1.56.0이 요구됩니다. 패치와 테스트는 `tests/dialog_fix/` 및 보고서에 포함돼 있습니다.

이 ZIP에는 기존 저장소의 추가 자료, 과거 기록, 폰트 바이너리를 포함하지 않습니다. 원본 GitHub 저장소의 해당 파일을 유지하거나 기존 파일과 함께 배포하세요. Google Sheets 저장 및 운영 로그인은 별도 테스트 앱에서 검증해야 합니다.
