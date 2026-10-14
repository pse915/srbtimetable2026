# 기존 Streamlit 운영 앱 전용 수업 교체 팝업 수정

## 수정 파일

- `timetable_app2.py`: 기존 Streamlit 소스에서 수정한 전체 코드 (React 전환 아님)
- `dialog-dismiss.patch`: ZIP의 원본 소스 대비 변경 부분; 기존 성능 최적화 한 줄도 함께 포함합니다.
- `timetable_app2_original.py`: 입력 ZIP의 복구용 원본 코드
- `requirements.txt`: 기존 Streamlit 의존성 목록

## 운영 배포 전에

실제 URL이 어느 GitHub 브랜치·커밋의 `timetable_app2.py`를 사용하는지 Streamlit 앱 설정에서 먼저 확인하세요. 다르면 파일 전체를 덮어쓰지 말고 patch와 원본을 대조하여 팝업 함수 관련 변경만 적용하세요.

검증용 Streamlit 앱은 **복제한 Google Sheets**를 사용해야 합니다. 기존 Secrets 설정을 소스에 직접 넣지 마세요.

테스트: `python -m pytest tests/dialog_fix -q` (전체 프로젝트 ZIP에 테스트 포함). 실제 운영 시트 쓰기 검증은 진행되지 않았습니다.
