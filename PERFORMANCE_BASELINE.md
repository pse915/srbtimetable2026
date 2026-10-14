# 최적화 기준선

2026-10-14 GitHub main을 읽기 전용 fetch로 확인했다. 커밋은 `c00647f2f49c09ff03469b83f8f4c0e6baf08d0d`이며 보존된 원본과 변경 사항이 없다. 공개 저장소는 기본 Streamlit 소스 구조다. 앱 URL만으로 실제 배포 설정·커밋·설치 버전·운영 CPU 사용량은 확인할 수 없었다. 따라서 아래는 운영 서버 측정값이 아니다.

## 두 기준선

1. 원본 업무 함수: 원본 `recommend_substitutes`와 불필요한 dmask 계산을 제거한 동일 함수. 5,000행의 가상 복무 자료, 교사 4명. 내부 함수를 캐시 없이 직접 실행. 9회 표본, 표본마다 20회 호출한 평균 비용의 중앙값. 운영 규모를 추정한 자료가 아니다.
2. React 전환 후보: 로컬 커밋 `1bb6a60c5b9da4306b0eafc838847ccaaa4e3995`와 수정한 브리지. 가상 자료로 로그인 후 12개 메뉴를 순서대로 조회. 각 버전 7회. 라이브러리 import를 양쪽 모두 예열하고 tracemalloc을 활성화. 반환된 화면 모델 전체를 비교한다.

측정: process_time, perf_counter, 업무 화면 렌더 함수 횟수, 모의 시트 get_all_values 횟수, JSON 화면 모델 바이트, tracemalloc peak. 렌더 횟수는 Streamlit 전체 rerun 횟수와 다른 지표다. tracemalloc은 프로세스 RSS가 아니다.

원본에는 날짜 캐시 최대 20개, 주간 캐시, 추천 캐시와 점유 인덱스가 이미 있다. 이번 작업에서 TTL 연장·전역 개인 데이터 캐시 추가·추천 알고리즘 변경은 하지 않았다.

## 재현

프로젝트 루트에서 개발 의존성을 설치한 Python으로:

```sh
python -m tests.native_performance
python -m tests.performance_benchmark
pytest tests/unit tests/integration tests/parity -q
```

React 후보 벤치마크는 비교 커밋을 가진 Git checkout이 필요하다. ZIP만으로는 과거 커밋을 읽을 수 없으므로 해당 벤치마크를 실행하려면 저장소 Git 이력이 필요하다. 원본 함수 비교는 ZIP에서도 가능하다.

## 미측정

실제 Cloud CPU·동시 사용자·최초 콜드 스타트·운영 네트워크·실제 추천 규모·대규모 순환 교환·실제 Gemini·운영 메모리 RSS·실제 시트 전송량은 미측정이다. idle 상태 부하와 요청별 Streamlit rerun 수 또한 서버 계측으로 확인하지 않았다. 경고의 주원인은 아직 확정할 수 없다.
