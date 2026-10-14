# 원본 기능 목록

기준: GitHub main c00647f2f49c09ff03469b83f8f4c0e6baf08d0d, 7,069줄.
첨부본은 동일 코드이며 CRLF/LF 줄바꿈만 다르다. 두 파일을 별도 보존했다. `tools/analyze_source.py`로 다시 생성 가능하다.
이 목록은 모든 AST UI 호출 지점과 함수 정의를 추적한다. 반복문으로 생기는 버튼은 호출 지점 하나에 여러 인스턴스가 있다.
조건과 의존성은 정적 분석 결과이며 실행 검증을 의미하지 않는다. 메뉴 공통 함수는 여러 화면에서 호출된다.
React 대응: `NodeRenderer` + `DataGrid`; Python 대응: `LegacyProgram`에서 원본 함수를 그대로 실행.
각 항목의 역할/시트는 아래 조건 및 JSON의 transitive dependencies를 대조해야 한다. 자동 목록만으로 100% 동등성을 선언하지 않는다.

## 호출 지점

| ID | 메뉴 | 원본 함수/줄 | 사용자 동작 | 백엔드 처리/권한 조건 | 영향받는 시트 | React 대응 | 재현 테스트 | 상태 |
|---|---|---|---|---|---|---|---|---|
| UI-L1142 | 공통 | calendar_picker:1142 | button '◀' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1146 | 공통 | calendar_picker:1146 | button '▶' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1149 | 공통 | calendar_picker:1149 | button '오늘' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1179 | 공통 | calendar_picker:1179 | button ' ' | d.month != first.month | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1182 | 공통 | calendar_picker:1182 | button f'✓ {d.day:02d}' if active else f'{d.day:02d}' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1241 | 공통 | week_picker:1241 | button '◀' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1250 | 공통 | week_picker:1250 | button '▶' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1274 | 공통 | week_picker:1274 | button label_text | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1301 | 공통 | calendar_range_picker:1301 | warning '시작일이 종료일보다 늦습니다. 종료일 달력에서 시작일 이후 날짜를 선택하세요.' | start_date > end_date | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1329 | 공통 | period_matrix_picker:1329 | button f"{('✓ ' if active else '')}{p}교시" | st.button(f"{('✓ ' if active else '')}{p}교시", key=f'{key}_{p}', width='stretch', type='primary' if active else 'secondary') | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1341 | 공통 | period_matrix_picker:1341 | button f"{('✓ ' if all_active else '')}하루 전체" | st.button(f"{('✓ ' if all_active else '')}하루 전체", key=f'{key}_all', width='stretch', type='primary' if all_active else 'secondary'); allow_all | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1419 | 공통 | daily_schedule_picker:1419 | info '선택한 날짜의 시간표가 없습니다.' | matrix.empty | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1424 | 공통 | daily_schedule_picker:1424 | dataframe _daily_styled_matrix(matrix) | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1443 | 공통 | daily_schedule_picker:1443 | success '선택: ' + ' · '.join((f"{x['교사명']} {x['교시']}교시" for x in selections[:8])) | selections | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1790 | 공통 | update_budget:1790 | warning f'예산 업데이트 실패: {e}' | 호출 화면의 서버 권한 사용 | 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1953 | 공통 | save_work_data_to_gsheet:1953 | warning '저장 권한이 없습니다.' | not can_full_data() and (not is_teacher()) | 결강, 맞교환, 보강, 복무, 시간강사 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L1974 | 공통 | save_work_data_to_gsheet:1974 | error f'저장 실패: {e}' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L2690 | 공통 | add_substitute:2690 | warning msg | not ok | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L2769 | 공통 | cancel_substitute:2769 | warning '본인이 입력한 데이터만 취소할 수 있습니다.' | not m.empty and m.iloc[0].get('입력자') != current_user(); not can_full_data() | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L2797 | 공통 | do_swap:2797 | error '1:1 맞교환 테스트는 동일 학급 수업끼리만 가능합니다.' | is_test; class_a and class_b and (class_a != class_b) | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L2799 | 공통 | do_swap:2799 | warning '1:1 맞교환은 동일 학급 수업끼리만 가능합니다.' | is_test; class_a and class_b and (class_a != class_b) | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L2803 | 공통 | do_swap:2803 | warning msg | not is_test; not ok | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3367 | 공통 | _register_absence_from_weekly:3367 | warning '이미 등록된 결강입니다.' | not dup.empty; not existing.empty | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3567 | 공통 | _weekly_action_dialog:3567 | dialog '🎯 수업 작업' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dialog | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3571 | 공통 | _weekly_action_dialog:3571 | info '선택한 수업이 없습니다.' | not lesson | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3581 | 공통 | _weekly_action_dialog:3581 | info f"**{lesson['일자']} ({lesson['요일']}) · {lesson['교사명']} · {lesson['교시']}교시 · {lesson['학급']} · {lesson['과목']}**\n\n현재 상태: **{status}**" | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3587 | 공통 | _weekly_action_dialog:3587 | success st.session_state.weekly_dialog_result | st.session_state.get('weekly_dialog_result') | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3589 | 공통 | _weekly_action_dialog:3589 | button '✖ 닫기' | st.button('✖ 닫기', key='dlg_result_close', width='stretch'); st.session_state.get('weekly_dialog_result') | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3612 | 공통 | _weekly_action_dialog:3612 | button label | st.button(label, type='primary' if mode == action_mode else 'secondary', key=f'dlg_action_{mode}', width='stretch'); action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3623 | 공통 | _weekly_action_dialog:3623 | button label | st.button(label, type='secondary', key=f'dlg_alt_{mode}', width='stretch'); action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3635 | 공통 | _weekly_action_dialog:3635 | slider '미래 추가 검색 일수' | action_mode in ('swap', 'cycle') | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/slider | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3670 | 공통 | _weekly_action_dialog:3670 | info '현재 같은 학급 조건에서 가능한 1:1 맞교환 위치가 없습니다.' | df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3692 | 공통 | _weekly_action_dialog:3692 | dataframe table_view | df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3716 | 공통 | _weekly_action_dialog:3716 | info '교환하려는 수업을 위 표에서 클릭해 주세요.' | picked is None; df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3718 | 공통 | _weekly_action_dialog:3718 | success f"선택됨: **{picked['상대교사']} · {picked['이동희망일']} · {safe_int(picked.get('이동희망교시', picked['원본교시']))}교시 · {picked['상대학급']} · {picked['상대과목']}**" | picked is None; df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3729 | 공통 | _weekly_action_dialog:3729 | button button_label | st.button(button_label, type='primary', key='dlg_direct_swap', width='stretch', disabled=picked is None); df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3734 | 공통 | _weekly_action_dialog:3734 | error f'맞교환 처리 중 오류가 발생했습니다: {exc}' | st.button(button_label, type='primary', key='dlg_direct_swap', width='stretch', disabled=picked is None); df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3737 | 공통 | _weekly_action_dialog:3737 | success '테스트 맞교환이 적용되었습니다.' if use_test else '1:1 맞교환이 반영되었습니다.' | ok; st.button(button_label, type='primary', key='dlg_direct_swap', width='stretch', disabled=picked is None); df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3746 | 공통 | _weekly_action_dialog:3746 | error '현재 상태에서는 이 1:1 맞교환을 적용할 수 없습니다. 최신 시간표 상태를 다시 확인해 주세요.' | ok; st.button(button_label, type='primary', key='dlg_direct_swap', width='stretch', disabled=picked is None); df_swap.empty; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3795 | 공통 | _weekly_action_dialog:3795 | warning '선택한 교사가 이 날짜에는 모든 교시에 수업이 있어 교환 가능한 공강 교시가 없습니다.' | not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3797 | 공통 | _weekly_action_dialog:3797 | info '교환 희망 교시를 선택해 주세요.' | target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3803 | 공통 | _weekly_action_dialog:3803 | warning '원본 수업과 같은 날짜·교시는 선택할 수 없습니다.' | target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3826 | 공통 | _weekly_action_dialog:3826 | button search_button_label | st.button(search_button_label, type='primary', key='dlg_target_search', width='stretch'); target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3860 | 공통 | _weekly_action_dialog:3860 | success f'지정한 시간에 1:1 교환 가능 수업이 {len(df_target)}개 있습니다.' | not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3873 | 공통 | _weekly_action_dialog:3873 | dataframe table_view | not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3894 | 공통 | _weekly_action_dialog:3894 | success f"선택됨: **{picked['상대교사']} · {picked['이동희망일']} · {safe_int(picked['이동희망교시'])}교시 · {picked['상대학급']} · {picked['상대과목']}**" | picked is not None; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3903 | 공통 | _weekly_action_dialog:3903 | button target_button_label | st.button(target_button_label, type='primary', key='dlg_target_direct_swap', width='stretch'); picked is not None; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3908 | 공통 | _weekly_action_dialog:3908 | error f'맞교환 처리 중 오류가 발생했습니다: {exc}' | st.button(target_button_label, type='primary', key='dlg_target_direct_swap', width='stretch'); picked is not None; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3914 | 공통 | _weekly_action_dialog:3914 | info '교환하려는 수업을 위 표에서 클릭해 주세요.' | picked is not None; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3916 | 공통 | _weekly_action_dialog:3916 | warning '지정한 날짜·교시에 가능한 1:1 교환이 없습니다. 같은 시간대를 대상으로 연계 순환을 탐색합니다.' | not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3935 | 공통 | _weekly_action_dialog:3935 | info '지정한 날짜·교시에서 가능한 연계 순환 경로도 없습니다.' | not cycles; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3946 | 공통 | _weekly_action_dialog:3946 | button cycle_button | st.button(cycle_button, key=f'dlg_target_cycle_{idx}', type='primary', width='stretch'); not cycles; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3951 | 공통 | _weekly_action_dialog:3951 | error f'연계 순환 처리 중 오류가 발생했습니다: {exc}' | st.button(cycle_button, key=f'dlg_target_cycle_{idx}', type='primary', width='stretch'); not cycles; not df_target.empty; target_date_str == source_date_str and target_period == source_period; target_period <= 0; not target_free_periods; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3966 | 공통 | _weekly_action_dialog:3966 | selectbox '사유' | action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3968 | 공통 | _weekly_action_dialog:3968 | text_input '상세사유' | action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3969 | 공통 | _weekly_action_dialog:3969 | button '📌 결강 등록' | st.button('📌 결강 등록', type='primary', key='dlg_abs_submit', width='stretch'); action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3974 | 공통 | _weekly_action_dialog:3974 | error f'결강 등록 중 오류가 발생했습니다: {exc}' | st.button('📌 결강 등록', type='primary', key='dlg_abs_submit', width='stretch'); action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3977 | 공통 | _weekly_action_dialog:3977 | success '결강이 등록되었습니다.' | ok; st.button('📌 결강 등록', type='primary', key='dlg_abs_submit', width='stretch'); action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3987 | 공통 | _weekly_action_dialog:3987 | warning '현재 조건에서 추천 가능한 보강 교사가 없습니다.' | cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L3989 | 공통 | _weekly_action_dialog:3989 | dataframe cand | cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4000 | 공통 | _weekly_action_dialog:4000 | selectbox '보강 교사' | not abs_match.empty; cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4002 | 공통 | _weekly_action_dialog:4002 | button '🟢 선택 교사로 보강 배정' | st.button('🟢 선택 교사로 보강 배정', type='primary', key='dlg_sub_submit', width='stretch'); not abs_match.empty; cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4011 | 공통 | _weekly_action_dialog:4011 | error f'보강 배정 중 오류가 발생했습니다: {exc}' | st.button('🟢 선택 교사로 보강 배정', type='primary', key='dlg_sub_submit', width='stretch'); not abs_match.empty; cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4014 | 공통 | _weekly_action_dialog:4014 | success '보강이 배정되었습니다.' | ok; st.button('🟢 선택 교사로 보강 배정', type='primary', key='dlg_sub_submit', width='stretch'); not abs_match.empty; cand.empty; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4028 | 공통 | _weekly_action_dialog:4028 | dataframe pd.DataFrame(detail_rows, columns=['항목', '내용']) | action_mode == 'detail'; action_mode == 'substitute'; action_mode == 'absence'; action_mode == 'target'; action_mode == 'swap' | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4029 | 공통 | _weekly_action_dialog:4029 | button '✖ 닫기' | st.button('✖ 닫기', key='dlg_close', width='stretch') | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4099 | 공통 | render_weekly_matrix:4099 | info '표시할 주간 시간표가 없습니다.' | matrix is None or matrix.empty | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4146 | 공통 | render_weekly_matrix:4146 | dataframe display | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4169 | 공통 | render_weekly_matrix:4169 | dataframe display | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L4177 | 공통 | render_weekly_matrix:4177 | warning '현재 Streamlit 버전에서는 주간표 셀 클릭 기능을 지원하지 않습니다. Streamlit을 최신 버전으로 업데이트하면 셀 클릭 팝업을 사용할 수 있습니다.' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 시간강사, 예산 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5419 | 공통 | render_salary_tab:5419 | file_uploader '분석 파일' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/file_uploader | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5429 | 공통 | render_salary_tab:5429 | button '⚡ AI 자동 입력 실행' | st.button('⚡ AI 자동 입력 실행', type='primary', width='stretch', key='salary_ai_run') | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5431 | 공통 | render_salary_tab:5431 | error '분석할 PDF 또는 이미지 파일을 선택해 주세요.' | ai_file is None; st.button('⚡ AI 자동 입력 실행', type='primary', width='stretch', key='salary_ai_run') | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5437 | 공통 | render_salary_tab:5437 | success 'AI 분석이 완료되어 입력 항목에 자동 반영되었습니다.' | ai_file is None; st.button('⚡ AI 자동 입력 실행', type='primary', width='stretch', key='salary_ai_run') | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5440 | 공통 | render_salary_tab:5440 | error f'AI 분석 실패: {exc}' | ai_file is None; st.button('⚡ AI 자동 입력 실행', type='primary', width='stretch', key='salary_ai_run') | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5442 | 공통 | render_salary_tab:5442 | info st.session_state.salary_ai_message | st.session_state.get('salary_ai_message') | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5447 | 공통 | render_salary_tab:5447 | text_input '성명' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5449 | 공통 | render_salary_tab:5449 | date_input '임용(호봉획정)일' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/date_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5455 | 공통 | render_salary_tab:5455 | text_input '소속 기관' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5457 | 공통 | render_salary_tab:5457 | text_input '직위/직급' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5460 | 공통 | render_salary_tab:5460 | text_input '작성자 성명' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5462 | 공통 | render_salary_tab:5462 | text_input '작성자 직급' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5467 | 공통 | render_salary_tab:5467 | radio '기산호봉' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/radio | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5475 | 공통 | render_salary_tab:5475 | radio '최초 학력' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/radio | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5484 | 공통 | render_salary_tab:5484 | button '+ 추가 학위 등록' | st.button('+ 추가 학위 등록', key='salary_add_degree', width='stretch') | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5490 | 공통 | render_salary_tab:5490 | data_editor degrees | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/data_editor | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5516 | 공통 | render_salary_tab:5516 | checkbox '사범계학교(대학에 설치된 교육학과 포함) 졸업자' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5523 | 공통 | render_salary_tab:5523 | success '💡 사범계 가산연수 적용: +1년' | st.session_state.salary_is_sabom | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5525 | 공통 | render_salary_tab:5525 | info '💡 가산연수 미적용: +0년' | st.session_state.salary_is_sabom | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5531 | 공통 | render_salary_tab:5531 | button '+ 경력 추가' | st.button('+ 경력 추가', key='salary_add_career', width='stretch') | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5540 | 공통 | render_salary_tab:5540 | data_editor careers | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/data_editor | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5572 | 공통 | render_salary_tab:5572 | button '📊 호봉 계산 및 조서 생성' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5591 | 공통 | render_salary_tab:5591 | error f'호봉 계산 중 오류가 발생했습니다: {exc}' | do_calculate | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5614 | 공통 | render_salary_tab:5614 | dataframe pd.DataFrame(detail_rows) | detail_rows | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5616 | 공통 | render_salary_tab:5616 | info '학위 및 경력 사항이 없습니다.' | detail_rows | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5618 | 공통 | render_salary_tab:5618 | dataframe pd.DataFrame([{'기산호봉': f"{result['base_salary']}호봉", '학령가감': f"{('+' if result['academic_value'] >= 0 else '')}{result['academic_value']}년", '가산연수': f"+{result['add_years']}년", '환산경력 (학위+경력)': f"{result['total_y']}년 {result['total_m']}월 {re | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5640 | 공통 | render_salary_tab:5640 | download_button '📄 A4 인쇄용 HTML / PDF 저장' | 호출 화면의 서버 권한 사용 | 호출부/JSON 대조 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5736 | 공통 | show_login_page:5736 | error f'🚫 로그인 시도가 {MAX_LOGIN_ATTEMPTS}회를 초과하여 차단되었습니다.' | st.session_state.login_locked | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5738 | 공통 | show_login_page:5738 | text_input '아이디' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5742 | 공통 | show_login_page:5742 | button '로그인' | st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5745 | 공통 | show_login_page:5745 | error '아이디를 입력해주세요.' | not uid; st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5747 | 공통 | show_login_page:5747 | error '로그인 시도가 잠시 제한되었습니다. 1분 후 다시 시도해주세요.' | _login_is_rate_limited(uid); not uid; st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5752 | 공통 | show_login_page:5752 | error '아이디 정보를 불러오지 못했습니다. Google Sheets 연결/권한을 확인해주세요.' | ids.empty; _login_is_rate_limited(uid); not uid; st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5776 | 공통 | show_login_page:5776 | error f'🚫 로그인 실패 {MAX_LOGIN_ATTEMPTS}회 초과로 차단되었습니다.' | st.session_state.login_attempts >= MAX_LOGIN_ATTEMPTS; not ids.empty and (not match.empty); _login_is_rate_limited(uid); not uid; st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5779 | 공통 | show_login_page:5779 | error f'등록되지 않은 아이디입니다. (남은 시도: {remaining}회)' | st.session_state.login_attempts >= MAX_LOGIN_ATTEMPTS; not ids.empty and (not match.empty); _login_is_rate_limited(uid); not uid; st.button('로그인', type='primary', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5781 | 공통 | show_login_page:5781 | button '게스트로 입장' | st.button('게스트로 입장', width='stretch') | 아이디저장함, 아이디추가요청 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5790 | 공통 | show_login_page:5790 | warning f'현재 로그인 실패 횟수: {st.session_state.login_attempts} / {MAX_LOGIN_ATTEMPTS}' | st.session_state.login_attempts > 0 | 아이디저장함, 아이디추가요청 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5793 | 공통 | show_login_page:5793 | form 'id_request_form' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/form | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5794 | 공통 | show_login_page:5794 | text_input '이름 *' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5795 | 공통 | show_login_page:5795 | text_input '이메일 *' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5796 | 공통 | show_login_page:5796 | text_input '추가하고 싶은 아이디 *' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5797 | 공통 | show_login_page:5797 | text_area '메모 (요청 사유 등)' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/text_area | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5798 | 공통 | show_login_page:5798 | form_submit_button '요청 제출' | 호출 화면의 서버 권한 사용 | 아이디저장함, 아이디추가요청 | NodeRenderer/form_submit_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5801 | 공통 | show_login_page:5801 | error '이름, 이메일, 아이디는 필수입니다.' | not (name and email and desired); submitted | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5805 | 공통 | show_login_page:5805 | success '요청이 정상적으로 접수되었습니다.' | not (name and email and desired); submitted | 아이디저장함, 아이디추가요청 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5807 | 공통 | show_login_page:5807 | error '아이디 추가 요청을 저장하지 못했습니다. Google Sheets 연결/권한을 확인해주세요.' | not (name and email and desired); submitted | 아이디저장함, 아이디추가요청 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5827 | 공통 | module:5827 | error '세션의 계정 권한이 변경되었거나 계정이 삭제되었습니다. 다시 로그인해주세요.' | not _revalidate_authenticated_user() | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5845 | 공통 | module:5845 | error '⚠️ 시간표 초기화에 실패했습니다.' | st.session_state.get('active_tab') in ALL_TABS and (not init_state()) | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5846 | 공통 | module:5846 | warning st.session_state.get('_load_error', '시간표 데이터를 불러오지 못했습니다.') | st.session_state.get('active_tab') in ALL_TABS and (not init_state()) | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5848 | 공통 | module:5848 | button '🔄 시간표 다시 연결' | st.button('🔄 시간표 다시 연결', type='primary', key='fatal_reload_timetable'); st.session_state.get('active_tab') in ALL_TABS and (not init_state()) | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5911 | 공통 | render_tools_dialog:5911 | dialog '도구' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/dialog | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5917 | 공통 | render_tools_dialog:5917 | selectbox '디자인' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5925 | 공통 | render_tools_dialog:5925 | selectbox '글꼴' | 호출 화면의 서버 권한 사용 | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5958 | 공통 | render_tools_dialog:5958 | button '↩ Undo' | a.button('↩ Undo', width='stretch', key='top_undo'); can_full_data() or is_teacher() | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5964 | 공통 | render_tools_dialog:5964 | error 'Undo 저장에 실패하여 이전 상태로 복구했습니다.' | save_work_data_to_gsheet(); undo(); a.button('↩ Undo', width='stretch', key='top_undo'); can_full_data() or is_teacher() | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5965 | 공통 | render_tools_dialog:5965 | button '↪ Redo' | b.button('↪ Redo', width='stretch', key='top_redo'); can_full_data() or is_teacher() | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5971 | 공통 | render_tools_dialog:5971 | error 'Redo 저장에 실패하여 이전 상태로 복구했습니다.' | save_work_data_to_gsheet(); redo(); b.button('↪ Redo', width='stretch', key='top_redo'); can_full_data() or is_teacher() | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5974 | 공통 | render_tools_dialog:5974 | button '결보강 계획서' | st.button('결보강 계획서', width='stretch', key='top_personal_plan_open') | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5976 | 공통 | render_tools_dialog:5976 | button '전체 일일 내역서' | is_edu_or_master() and st.button('전체 일일 내역서', width='stretch', key='top_daily_report_open') | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5980 | 공통 | render_tools_dialog:5980 | date_input '기준일' | output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/date_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5981 | 공통 | render_tools_dialog:5981 | button '파일 만들기' | st.button('파일 만들기', type='primary', width='stretch', key='top_personal_generate'); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5983 | 공통 | render_tools_dialog:5983 | download_button 'HTML 다운로드' | st.button('파일 만들기', type='primary', width='stretch', key='top_personal_generate'); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5985 | 공통 | render_tools_dialog:5985 | date_input '기준일' | output_mode == 'daily_report' and is_edu_or_master(); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/date_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5986 | 공통 | render_tools_dialog:5986 | button '파일 만들기' | st.button('파일 만들기', type='primary', width='stretch', key='top_daily_generate'); output_mode == 'daily_report' and is_edu_or_master(); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5994 | 공통 | render_tools_dialog:5994 | download_button 'HTML 다운로드' | st.button('파일 만들기', type='primary', width='stretch', key='top_daily_generate'); output_mode == 'daily_report' and is_edu_or_master(); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L5995 | 공통 | render_tools_dialog:5995 | download_button '엑셀 다운로드' | st.button('파일 만들기', type='primary', width='stretch', key='top_daily_generate'); output_mode == 'daily_report' and is_edu_or_master(); output_mode == 'personal_plan' | 결강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 예산 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6034 | 공통 | render_top_toolbar:6034 | button category | st.button(category, key=f'app_category_btn_{category}', width='stretch', type='primary' if is_active else 'secondary', help='현재 선택된 업무 영역' if is_active else f'{category} 업무로 이동') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6053 | 공통 | render_top_toolbar:6053 | button '① 새로고침' | st.button('① 새로고침', width='stretch', key='top_quick_refresh', help='앱 화면과 캐시를 새로고침합니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6056 | 공통 | render_top_toolbar:6056 | toast '화면을 새로고침했습니다.' | st.button('① 새로고침', width='stretch', key='top_quick_refresh', help='앱 화면과 캐시를 새로고침합니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/toast | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6059 | 공통 | render_top_toolbar:6059 | button '② 불러오기' | st.button('② 불러오기', width='stretch', key='top_quick_load', help='Google Sheets의 최신 시간표와 업무 데이터를 불러옵니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6063 | 공통 | render_top_toolbar:6063 | toast '최신 데이터를 불러왔습니다.' | st.button('② 불러오기', width='stretch', key='top_quick_load', help='Google Sheets의 최신 시간표와 업무 데이터를 불러옵니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/toast | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6066 | 공통 | render_top_toolbar:6066 | error f'데이터를 불러오지 못했습니다: {exc}' | st.button('② 불러오기', width='stretch', key='top_quick_load', help='Google Sheets의 최신 시간표와 업무 데이터를 불러옵니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6068 | 공통 | render_top_toolbar:6068 | button '③ 작업 저장' | st.button('③ 작업 저장', width='stretch', type='primary', key='top_quick_save', help='현재 작업을 Google Sheets에 저장합니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6072 | 공통 | render_top_toolbar:6072 | toast '현재 작업을 저장했습니다.' | ok is not False; st.button('③ 작업 저장', width='stretch', type='primary', key='top_quick_save', help='현재 작업을 Google Sheets에 저장합니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/toast | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6074 | 공통 | render_top_toolbar:6074 | error f'현재 작업 저장 중 오류가 발생했습니다: {exc}' | st.button('③ 작업 저장', width='stretch', type='primary', key='top_quick_save', help='현재 작업을 Google Sheets에 저장합니다.') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6076 | 공통 | render_top_toolbar:6076 | button '···' | st.button('···', width='stretch', key='top_tools_open', help='화면·출력·기타 도구') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6079 | 공통 | render_top_toolbar:6079 | button '↪' | st.button('↪', width='stretch', key='top_logout', help='로그아웃') | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6091 | 공통 | render_top_toolbar:6091 | radio '세부 업무' | 호출 화면의 서버 권한 사용 | 결강, 교사정보, 누적보강, 맞교환, 보강, 복무, 수업교체신청, 시간강사, 시간표, 예산 | NodeRenderer/radio | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6109 | 공통 | module:6109 | info '현재 게스트로 접속 중입니다. 아이디 추가 요청만 가능합니다.' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6110 | 공통 | module:6110 | form 'guest_request' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/form | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6111 | 공통 | module:6111 | text_input '이름 *' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6112 | 공통 | module:6112 | text_input '이메일 *' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6113 | 공통 | module:6113 | text_input '추가하고 싶은 아이디 *' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6114 | 공통 | module:6114 | text_area '메모' | current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/text_area | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6115 | 공통 | module:6115 | form_submit_button '요청 제출' | st.form_submit_button('요청 제출', type='primary'); current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/form_submit_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6118 | 공통 | module:6118 | success '요청이 접수되었습니다.' | name and email and desired; st.form_submit_button('요청 제출', type='primary'); current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6120 | 공통 | module:6120 | error '필수 항목을 입력해주세요.' | name and email and desired; st.form_submit_button('요청 제출', type='primary'); current_role() == ROLE_GUEST | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6131 | 공통 | module:6131 | warning '접근 가능한 탭이 없습니다.' | not visible_tabs | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6180 | 공통 | module:6180 | warning 'NEIS 학사일정 연결 오류가 있습니다. 주간 시간표는 NEIS 확인 후 표시됩니다.' | _neis_err; _neis_configured_key | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6192 | 시간표 조회 | module:6192 | radio '보기 방식' | '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/radio | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6206 | 시간표 조회 | module:6206 | dataframe pd.DataFrame(details) | selections; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6212 | 시간표 조회 | module:6212 | error f'NEIS 학사일정을 불러오지 못했습니다. 시간표를 표시하지 않습니다.\n\n{exc}' | view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6217 | 시간표 조회 | module:6217 | download_button '📥 이 주간표 Excel 다운로드' | view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6223 | 시간표 조회 | module:6223 | error f'NEIS 학사일정을 불러오지 못했습니다. 시간표를 표시하지 않습니다.\n\n{exc}' | view == '학급별 주간'; view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6228 | 시간표 조회 | module:6228 | download_button '📥 이 주간표 Excel 다운로드' | view == '학급별 주간'; view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6231 | 시간표 조회 | module:6231 | selectbox '교사 선택' | view == '학급별 주간'; view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6236 | 시간표 조회 | module:6236 | error f'NEIS 학사일정을 불러오지 못했습니다. 시간표를 표시하지 않습니다.\n\n{exc}' | view == '학급별 주간'; view == '교사별 주간'; view == '선택 날짜'; '시간표 조회' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6245 | 시간강사 관리 | module:6245 | info '기본 입력은 달력과 가능 시간 매트릭스를 사용합니다. 아래 표는 기존 자료를 일괄 수정할 때 사용하는 고급 편집 영역입니다.' | '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6250 | 시간강사 관리 | module:6250 | text_input '시간강사명' | can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6252 | 시간강사 관리 | module:6252 | selectbox '담당과목' | can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6254 | 시간강사 관리 | module:6254 | selectbox '대체교사' | can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6264 | 시간강사 관리 | module:6264 | checkbox f'{pp}' | can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6265 | 시간강사 관리 | module:6265 | button '달력·매트릭스로 시간강사 추가' | st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6267 | 시간강사 관리 | module:6267 | error '시간강사명·대체교사·기간을 확인하세요.' | not pt_name.strip() or not pt_orig.strip() or qstart > qend; st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6269 | 시간강사 관리 | module:6269 | error '가능한 요일·교시를 하나 이상 선택하세요.' | not any(avail.values()); not pt_name.strip() or not pt_orig.strip() or qstart > qend; st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6277 | 시간강사 관리 | module:6277 | error msg | not ok; not any(avail.values()); not pt_name.strip() or not pt_orig.strip() or qstart > qend; st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6282 | 시간강사 관리 | module:6282 | success '추가 완료' | save_work_data_to_gsheet(['시간강사']); not ok; not any(avail.values()); not pt_name.strip() or not pt_orig.strip() or qstart > qend; st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6285 | 시간강사 관리 | module:6285 | error '저장에 실패하여 이전 상태로 복구했습니다.' | not ok; not any(avail.values()); not pt_name.strip() or not pt_orig.strip() or qstart > qend; st.button('달력·매트릭스로 시간강사 추가', key='quick_pt_add', type='primary'); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6288 | 시간강사 관리 | module:6288 | data_editor st.session_state.part_time | can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/data_editor | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6301 | 시간강사 관리 | module:6301 | button '시간강사 정보 저장' | st.button('시간강사 정보 저장', type='primary'); can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6305 | 시간강사 관리 | module:6305 | error msg | not ok; st.button('시간강사 정보 저장', type='primary'); can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6311 | 시간강사 관리 | module:6311 | success '저장 완료' | save_work_data_to_gsheet(['시간강사']); not ok; st.button('시간강사 정보 저장', type='primary'); can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6315 | 시간강사 관리 | module:6315 | error '저장에 실패하여 이전 상태로 복구했습니다.' | not ok; st.button('시간강사 정보 저장', type='primary'); can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6317 | 시간강사 관리 | module:6317 | dataframe filter_by_owner(st.session_state.part_time) | can_full_data(); can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6319 | 시간강사 관리 | module:6319 | dataframe st.session_state.part_time | can_full_data() or is_teacher(); '시간강사 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6329 | 결강·보강 | module:6329 | selectbox '사유' | '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6330 | 결강·보강 | module:6330 | text_input '상세 사유' | '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6338 | 결강·보강 | module:6338 | button '결강 등록' | st.button('결강 등록', type='primary', key='btn_abs'); '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6340 | 결강·보강 | module:6340 | error '시간표 매트릭스에서 결강 수업을 하나 이상 선택하세요.' | not selected_abs; st.button('결강 등록', type='primary', key='btn_abs'); '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6357 | 결강·보강 | module:6357 | success f'{len(new_rows)}건 결강 등록 완료' | save_work_data_to_gsheet(['결강']); new_rows; not selected_abs; st.button('결강 등록', type='primary', key='btn_abs'); '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6360 | 결강·보강 | module:6360 | error '결강 저장에 실패하여 작업을 원복했습니다.' | new_rows; not selected_abs; st.button('결강 등록', type='primary', key='btn_abs'); '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6362 | 결강·보강 | module:6362 | dataframe show_abs[show_abs['일자'] == on_date] if not show_abs.empty else pd.DataFrame() | '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6367 | 결강·보강 | module:6367 | info '먼저 결강을 등록하세요.' if can_full_data() else '본인이 등록한 결강이 없습니다.' | ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6374 | 결강·보강 | module:6374 | info '선택한 날짜에 등록된 결강이 없습니다. 달력에서 다른 날짜를 선택하세요.' | day_abs.empty; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6387 | 결강·보강 | module:6387 | dataframe sub_matrix | day_abs.empty; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6398 | 결강·보강 | module:6398 | success f"선택: **{head['일자']} · {head['교사명']} · {len(rows)}시간**" | head is not None; day_abs.empty; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6400 | 결강·보강 | module:6400 | checkbox '시간강사 포함' | head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6401 | 결강·보강 | module:6401 | checkbox '전체 공강 교사 보기 (최대 20명)' | head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6402 | 결강·보강 | module:6402 | button '전 교시 자동 배정' | st.button('전 교시 자동 배정', type='primary', key='auto_all'); head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6409 | 결강·보강 | module:6409 | success f'자동 보강 {accepted}건 처리 완료' | st.button('전 교시 자동 배정', type='primary', key='auto_all'); head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6410 | 결강·보강 | module:6410 | warning ' / '.join(errors[:5]) | errors; st.button('전 교시 자동 배정', type='primary', key='auto_all'); head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6422 | 결강·보강 | module:6422 | success f'현재 배정: **{assigned}**' | assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6423 | 결강·보강 | module:6423 | button '배정 취소' | st.button('배정 취소', key=f'cancel_{cid}_{p}'); assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6433 | 결강·보강 | module:6433 | warning '해당 시간대에 비어있는 교사가 없습니다.' | cand.empty; assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6435 | 결강·보강 | module:6435 | dataframe cand | cand.empty; assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6436 | 결강·보강 | module:6436 | selectbox '보강 교사 선택' | cand.empty; assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6437 | 결강·보강 | module:6437 | button '배정' | st.button('배정', key=f'btn_{cid}_{p}'); cand.empty; assigned; head is not None; ab.empty; '결강·보강' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6460 | 시간표 맞교환 & 변경 추천 | module:6460 | info '등록된 실제 맞교환 이력이 없습니다.' | show_swaps.empty; '시간표 맞교환 & 변경 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6462 | 시간표 맞교환 & 변경 추천 | module:6462 | dataframe show_swaps | show_swaps.empty; '시간표 맞교환 & 변경 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6466 | 통계 | module:6466 | selectbox '빠른 기간' | '통계' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6479 | 통계 | module:6479 | dataframe df | '통계' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6481 | 통계 | module:6481 | bar_chart df.set_index('교사명')['누적보강'] | not df.empty; '통계' in tab_map | 호출부/JSON 대조 | NodeRenderer/bar_chart | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6486 | 시간표 변경 테스트용 | module:6486 | button '🔄 테스트 상태 초기화' | st.button('🔄 테스트 상태 초기화', type='secondary'); '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6492 | 시간표 변경 테스트용 | module:6492 | success '테스트 상태가 초기화되었습니다.' | st.button('🔄 테스트 상태 초기화', type='secondary'); '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6501 | 시간표 변경 테스트용 | module:6501 | error f'NEIS 학사일정을 불러오지 못했습니다. 테스트 주간표를 표시하지 않습니다.\n\n{exc}' | '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6511 | 시간표 변경 테스트용 | module:6511 | dataframe st.session_state.test_swaps | not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6515 | 시간표 변경 테스트용 | module:6515 | warning '연계 순환 교환은 교육과정부로 문의 바랍니다' | st.session_state.get('test_has_cycle', False); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6517 | 시간표 변경 테스트용 | module:6517 | button '현재 테스트 중인 맞교환 목록 결보강 계획서 출력하기' | st.button('현재 테스트 중인 맞교환 목록 결보강 계획서 출력하기', type='primary', key='test_report_btn'); st.session_state.get('test_has_cycle', False); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6519 | 시간표 변경 테스트용 | module:6519 | download_button 'HTML 다운로드 (테스트 결보강 계획서)' | st.button('현재 테스트 중인 맞교환 목록 결보강 계획서 출력하기', type='primary', key='test_report_btn'); st.session_state.get('test_has_cycle', False); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/download_button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6526 | 시간표 변경 테스트용 | module:6526 | info '이 HTML을 브라우저에서 열고 Ctrl+P → PDF로 저장하시면 양식과 거의 동일한 PDF가 생성됩니다.' | st.button('현재 테스트 중인 맞교환 목록 결보강 계획서 출력하기', type='primary', key='test_report_btn'); st.session_state.get('test_has_cycle', False); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6528 | 시간표 변경 테스트용 | module:6528 | button '현재 테스트 중인 맞교환 목록 전체 삭제하기' | st.button('현재 테스트 중인 맞교환 목록 전체 삭제하기', key='test_clear_btn'); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6534 | 시간표 변경 테스트용 | module:6534 | success '테스트 중인 맞교환 목록이 전체 삭제되었습니다.' | st.button('현재 테스트 중인 맞교환 목록 전체 삭제하기', key='test_clear_btn'); not st.session_state.get('test_swaps', pd.DataFrame()).empty; '시간표 변경 테스트용' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6557 | 변경된 교사 주간표 | module:6557 | info '교사 목록이 없습니다. 시간표/교사 시트의 교사명 데이터를 확인해 주세요.' | not all_teachers; '변경된 교사 주간표' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6636 | 📋 복무 관리 & 판단 | module:6636 | warning '등록된 이름이 교사 목록에 없습니다. 관리자에게 문의하세요.' | my_name and my_name in st.session_state.teachers['교사명'].tolist(); can_full_data(); '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6637 | 📋 복무 관리 & 판단 | module:6637 | selectbox '교사' | '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6640 | 📋 복무 관리 & 판단 | module:6640 | selectbox '사유' | '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6641 | 📋 복무 관리 & 판단 | module:6641 | text_input '상세' | '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/text_input | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6642 | 📋 복무 관리 & 판단 | module:6642 | checkbox '하루 전체' | '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6648 | 📋 복무 관리 & 판단 | module:6648 | info '선택된 교시: ' + ', '.join((f'{p}교시' for p in periods)) | periods; all_day; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6652 | 📋 복무 관리 & 판단 | module:6652 | button '복무 등록' | st.button('복무 등록', type='primary', key='duty_reg'); '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6672 | 📋 복무 관리 & 판단 | module:6672 | success '등록 완료' | save_work_data_to_gsheet(['복무']); all_day or periods; st.button('복무 등록', type='primary', key='duty_reg'); '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6676 | 📋 복무 관리 & 판단 | module:6676 | error '저장에 실패하여 이전 상태로 복구했습니다.' | all_day or periods; st.button('복무 등록', type='primary', key='duty_reg'); '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6684 | 📋 복무 관리 & 판단 | module:6684 | dataframe show_df | not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6686 | 📋 복무 관리 & 판단 | module:6686 | selectbox '복무 선택 (이름·일자 기준)' | not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6687 | 📋 복무 관리 & 판단 | module:6687 | button '이 복무 선택' | st.button('이 복무 선택', key='duty_sel'); not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6696 | 📋 복무 관리 & 판단 | module:6696 | button '선택 행 삭제' | st.button('선택 행 삭제', key='duty_del'); not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6705 | 📋 복무 관리 & 판단 | module:6705 | success '삭제 완료' | save_work_data_to_gsheet(['복무']); st.button('선택 행 삭제', key='duty_del'); not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6709 | 📋 복무 관리 & 판단 | module:6709 | error '삭제 저장에 실패하여 이전 상태로 복구했습니다.' | st.button('선택 행 삭제', key='duty_del'); not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6711 | 📋 복무 관리 & 판단 | module:6711 | info '등록된 복무 없음' | not show_duties.empty; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6716 | 📋 복무 관리 & 판단 | module:6716 | info '왼쪽에서 복무를 선택하세요.' | not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6722 | 📋 복무 관리 & 판단 | module:6722 | slider '미래 검색 일수' | not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/slider | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6723 | 📋 복무 관리 & 판단 | module:6723 | button '🔍 동일 학급 최우선 1:1 / 연계 검색 실행' | st.button('🔍 동일 학급 최우선 1:1 / 연계 검색 실행', type='primary', key='run_smart_search'); not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6788 | 📋 복무 관리 & 판단 | module:6788 | success '검색 완료!' | st.button('🔍 동일 학급 최우선 1:1 / 연계 검색 실행', type='primary', key='run_smart_search'); not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6795 | 📋 복무 관리 & 판단 | module:6795 | info '조건에 맞는 1:1 대상 없음' | not data['one_to_one']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6800 | 📋 복무 관리 & 판단 | module:6800 | button '이 수업과 1:1 맞교환 실행' | st.button('이 수업과 1:1 맞교환 실행', key=f'o2o_{p}_{i}'); not data['one_to_one']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6806 | 📋 복무 관리 & 판단 | module:6806 | success '1:1 맞교환 등록 완료!' | do_swap(a_info, b_info, d_str, c['date']); st.button('이 수업과 1:1 맞교환 실행', key=f'o2o_{p}_{i}'); not data['one_to_one']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6811 | 📋 복무 관리 & 판단 | module:6811 | info '연계 교환 대상 없음' | not data['linked']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6815 | 📋 복무 관리 & 판단 | module:6815 | button '연계 교환 실행' | st.button('연계 교환 실행', key=f'lnk_{p}_{i}'); not data['linked']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6819 | 📋 복무 관리 & 판단 | module:6819 | success '연계 교환 등록 완료!' | st.button('연계 교환 실행', key=f'lnk_{p}_{i}'); not data['linked']; cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6823 | 📋 복무 관리 & 판단 | module:6823 | info '위에서 **검색 실행** 버튼을 눌러주세요.' | cache; not sel; '📋 복무 관리 & 판단' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6827 | 🛠️ 다중 출장·전체 조정 추천 | module:6827 | info '여러 교사가 동시에 출장·복무일 때 사용합니다. **시작일(교시) ~ 종료일(교시)** 범위를 지정할 수 있습니다.' | '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6829 | 🛠️ 다중 출장·전체 조정 추천 | module:6829 | metric '현재 보강비 잔액' | '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/metric | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6842 | 🛠️ 다중 출장·전체 조정 추천 | module:6842 | dataframe budget_df.tail(20) | '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6846 | 🛠️ 다중 출장·전체 조정 추천 | module:6846 | selectbox '교사' | '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6854 | 🛠️ 다중 출장·전체 조정 추천 | module:6854 | button '기간 추가 (시작일~종료일)' | st.button('기간 추가 (시작일~종료일)', type='primary'); '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6856 | 🛠️ 다중 출장·전체 조정 추천 | module:6856 | error '시작일이 종료일보다 늦을 수 없습니다.' | start_date > end_date; st.button('기간 추가 (시작일~종료일)', type='primary'); '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6875 | 🛠️ 다중 출장·전체 조정 추천 | module:6875 | success f'{added_count}건이 추가되었습니다.' | start_date > end_date; st.button('기간 추가 (시작일~종료일)', type='primary'); '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6879 | 🛠️ 다중 출장·전체 조정 추천 | module:6879 | dataframe pd.DataFrame(st.session_state.multi_absent) | st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6880 | 🛠️ 다중 출장·전체 조정 추천 | module:6880 | button '목록 초기화' | st.button('목록 초기화'); st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6883 | 🛠️ 다중 출장·전체 조정 추천 | module:6883 | button '🔍 전체 조정 추천 실행' | st.button('🔍 전체 조정 추천 실행', type='primary'); st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6928 | 🛠️ 다중 출장·전체 조정 추천 | module:6928 | success f'총 {len(rec_df)}건의 추천이 생성되었습니다.' | all_recs; st.button('🔍 전체 조정 추천 실행', type='primary'); st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6930 | 🛠️ 다중 출장·전체 조정 추천 | module:6930 | warning '조건에 맞는 추천이 없습니다.' | all_recs; st.button('🔍 전체 조정 추천 실행', type='primary'); st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6934 | 🛠️ 다중 출장·전체 조정 추천 | module:6934 | dataframe st.session_state['_multi_recs'] | '_multi_recs' in st.session_state and (not st.session_state['_multi_recs'].empty); st.session_state.multi_absent; '🛠️ 다중 출장·전체 조정 추천' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6942 | 🔑 아이디·권한 관리 | module:6942 | data_editor ids_df | '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/data_editor | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6960 | 🔑 아이디·권한 관리 | module:6960 | button '아이디 목록 저장' | st.button('아이디 목록 저장', type='primary'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6963 | 🔑 아이디·권한 관리 | module:6963 | error '마스터 권한 아이디가 최소 1명은 있어야 합니다.' | len(masters) == 0; st.button('아이디 목록 저장', type='primary'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6967 | 🔑 아이디·권한 관리 | module:6967 | success '저장 완료' | len(masters) == 0; st.button('아이디 목록 저장', type='primary'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6971 | 🔑 아이디·권한 관리 | module:6971 | error f'저장할 수 없습니다: {exc}' | len(masters) == 0; st.button('아이디 목록 저장', type='primary'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/error | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6974 | 🔑 아이디·권한 관리 | module:6974 | info "마스터 양도: 원하는 아이디의 권한을 '마스터'로 변경 후 저장" | is_master(); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/info | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6976 | 🔑 아이디·권한 관리 | module:6976 | button '아이디 추가 요청 목록 보기' | st.button('아이디 추가 요청 목록 보기'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6979 | 🔑 아이디·권한 관리 | module:6979 | dataframe req_df | st.button('아이디 추가 요청 목록 보기'); '🔑 아이디·권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/dataframe | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6997 | 📑 회원별 탭 권한 관리 | module:6997 | warning '등록된 아이디가 없습니다.' | ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/warning | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L6999 | 📑 회원별 탭 권한 관리 | module:6999 | selectbox '회원 선택' | ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/selectbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7020 | 📑 회원별 탭 권한 관리 | module:7020 | checkbox tab_name | ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/checkbox | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7028 | 📑 회원별 탭 권한 관리 | module:7028 | button '이 회원의 탭 권한 저장' | st.button('이 회원의 탭 권한 저장', type='primary'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7031 | 📑 회원별 탭 권한 관리 | module:7031 | success f'{selected_user} 님의 탭 권한이 저장되었습니다.' | st.button('이 회원의 탭 권한 저장', type='primary'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7039 | 📑 회원별 탭 권한 관리 | module:7039 | button '기본 탭으로 초기화' | st.button('기본 탭으로 초기화'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7044 | 📑 회원별 탭 권한 관리 | module:7044 | success '기본값으로 초기화됨' | st.button('기본 탭으로 초기화'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7047 | 📑 회원별 탭 권한 관리 | module:7047 | button '모든 탭 허용' | st.button('모든 탭 허용'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7050 | 📑 회원별 탭 권한 관리 | module:7050 | success '모든 탭 허용됨' | st.button('모든 탭 허용'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7053 | 📑 회원별 탭 권한 관리 | module:7053 | button '모든 탭 차단' | st.button('모든 탭 차단'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/button | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |
| UI-L7056 | 📑 회원별 탭 권한 관리 | module:7056 | success '모든 탭 차단됨' | st.button('모든 탭 차단'); ids_df.empty; '📑 회원별 탭 권한 관리' in tab_map | 호출부/JSON 대조 | NodeRenderer/success | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |

## 모든 함수 정의

| 원본 함수 | 시작 | 끝 | 상태 |
|---|---|---|---|
| render_font_runtime_css | 63 | 175 | 보존 / 개별 동등성 미검증 |
| render_theme_runtime_css | 177 | 517 | 보존 / 개별 동등성 미검증 |
| _neis_secret_key | 559 | 564 | 보존 / 개별 동등성 미검증 |
| _neis_api_get | 566 | 577 | 보존 / 개별 동등성 미검증 |
| _neis_rows | 579 | 588 | 보존 / 개별 동등성 미검증 |
| _normalize_school_name_for_neis | 590 | 591 | 보존 / 개별 동등성 미검증 |
| neis_find_school | 594 | 640 | 보존 / 개별 동등성 미검증 |
| _neis_schedule_row_is_non_instructional | 642 | 654 | 보존 / 개별 동등성 미검증 |
| _neis_event_label | 656 | 662 | 보존 / 개별 동등성 미검증 |
| _neis_schedule_empty_df | 664 | 665 | 보존 / 개별 동등성 미검증 |
| _neis_schedule_rows_to_df | 668 | 690 | 보존 / 개별 동등성 미검증 |
| _neis_is_info_200 | 693 | 695 | 보존 / 개별 동등성 미검증 |
| _neis_schedule_request | 698 | 716 | 보존 / 개별 동등성 미검증 |
| neis_fetch_schedule | 720 | 767 | 보존 / 개별 동등성 미검증 |
| get_neis_api_key | 769 | 770 | 보존 / 개별 동등성 미검증 |
| get_neis_cache_token | 772 | 775 | 보존 / 개별 동등성 미검증 |
| get_neis_schedule_for_range | 777 | 785 | 보존 / 개별 동등성 미검증 |
| ensure_neis_week_loaded | 787 | 821 | 보존 / 개별 동등성 미검증 |
| require_neis_week | 823 | 825 | 보존 / 개별 동등성 미검증 |
| get_neis_non_instructional_days | 827 | 851 | 보존 / 개별 동등성 미검증 |
| is_neis_non_instructional_date | 853 | 858 | 보존 / 개별 동등성 미검증 |
| neis_holiday_label | 860 | 866 | 보존 / 개별 동등성 미검증 |
| apply_neis_non_instructional_display | 868 | 890 | 보존 / 개별 동등성 미검증 |
| _today_kst | 892 | 893 | 보존 / 개별 동등성 미검증 |
| _is_current_week | 894 | 896 | 보존 / 개별 동등성 미검증 |
| _hide_past_week_slots | 897 | 911 | 보존 / 개별 동등성 미검증 |
| _clean_user_text | 943 | 947 | 보존 / 개별 동등성 미검증 |
| _safe_sheet_text | 948 | 956 | 보존 / 개별 동등성 미검증 |
| _validated_role | 957 | 959 | 보존 / 개별 동등성 미검증 |
| _now_text | 960 | 961 | 보존 / 개별 동등성 미검증 |
| safe_int | 1005 | 1011 | 보존 / 개별 동등성 미검증 |
| normalize_date_str | 1012 | 1032 | 보존 / 개별 동등성 미검증 |
| subject_group | 1034 | 1038 | 보존 / 개별 동등성 미검증 |
| grade_of | 1040 | 1043 | 보존 / 개별 동등성 미검증 |
| normalized_grade | 1045 | 1052 | 보존 / 개별 동등성 미검증 |
| is_grade12_thursday_7_forbidden | 1054 | 1055 | 보존 / 개별 동등성 미검증 |
| slot_allowed_for_class | 1057 | 1058 | 보존 / 개별 동등성 미검증 |
| format_periods | 1059 | 1077 | 보존 / 개별 동등성 미검증 |
| _month_calendar_df | 1078 | 1107 | 보존 / 개별 동등성 미검증 |
| _calendar_set_day | 1108 | 1109 | 보존 / 개별 동등성 미검증 |
| _calendar_prev_month | 1111 | 1113 | 보존 / 개별 동등성 미검증 |
| _calendar_next_month | 1115 | 1117 | 보존 / 개별 동등성 미검증 |
| _calendar_today | 1119 | 1124 | 보존 / 개별 동등성 미검증 |
| calendar_picker | 1126 | 1193 | 보존 / 개별 동등성 미검증 |
| week_picker | 1194 | 1290 | 보존 / 개별 동등성 미검증 |
| calendar_range_picker | 1292 | 1306 | 보존 / 개별 동등성 미검증 |
| period_matrix_picker | 1307 | 1356 | 보존 / 개별 동등성 미검증 |
| _teacher_empty_periods_on_date | 1358 | 1376 | 보존 / 개별 동등성 미검증 |
| _daily_schedule_matrix | 1377 | 1410 | 보존 / 개별 동등성 미검증 |
| daily_schedule_picker | 1411 | 1445 | 보존 / 개별 동등성 미검증 |
| range_calendar_matrix_picker | 1446 | 1458 | 보존 / 개별 동등성 미검증 |
| get_all_teacher_names | 1459 | 1467 | 보존 / 개별 동등성 미검증 |
| current_user | 1468 | 1469 | 보존 / 개별 동등성 미검증 |
| current_name | 1470 | 1471 | 보존 / 개별 동등성 미검증 |
| current_role | 1472 | 1473 | 보존 / 개별 동등성 미검증 |
| is_master | 1474 | 1475 | 보존 / 개별 동등성 미검증 |
| is_edu_or_master | 1476 | 1477 | 보존 / 개별 동등성 미검증 |
| is_teacher | 1478 | 1479 | 보존 / 개별 동등성 미검증 |
| can_manage_ids | 1480 | 1481 | 보존 / 개별 동등성 미검증 |
| can_full_data | 1482 | 1483 | 보존 / 개별 동등성 미검증 |
| get_user_allowed_tabs | 1484 | 1492 | 보존 / 개별 동등성 미검증 |
| get_teacher_subject | 1493 | 1514 | 보존 / 개별 동등성 미검증 |
| get_gspread_client | 1516 | 1521 | 보존 / 개별 동등성 미검증 |
| _clear_gsheet_runtime_cache | 1522 | 1529 | 보존 / 개별 동등성 미검증 |
| _run_network_with_timeout | 1530 | 1553 | 보존 / 개별 동등성 미검증 |
| get_worksheet | 1554 | 1593 | 보존 / 개별 동등성 미검증 |
| df_from_worksheet | 1594 | 1609 | 보존 / 개별 동등성 미검증 |
| df_to_worksheet | 1610 | 1632 | 보존 / 개별 동등성 미검증 |
| _empty_id_df | 1633 | 1634 | 보존 / 개별 동등성 미검증 |
| _seed_master_id_df | 1635 | 1641 | 보존 / 개별 동등성 미검증 |
| load_id_sheet | 1642 | 1671 | 보존 / 개별 동등성 미검증 |
| _validate_id_admin_edit | 1672 | 1695 | 보존 / 개별 동등성 미검증 |
| save_id_sheet | 1696 | 1706 | 보존 / 개별 동등성 미검증 |
| save_id_request | 1707 | 1729 | 보존 / 개별 동등성 미검증 |
| load_budget_df | 1730 | 1759 | 보존 / 개별 동등성 미검증 |
| get_current_budget | 1760 | 1770 | 보존 / 개별 동등성 미검증 |
| update_budget | 1771 | 1791 | 보존 / 개별 동등성 미검증 |
| load_swap_requests | 1796 | 1804 | 보존 / 개별 동등성 미검증 |
| save_swap_request | 1805 | 1810 | 보존 / 개별 동등성 미검증 |
| push_history | 1811 | 1834 | 보존 / 개별 동등성 미검증 |
| _restore_history_snapshot | 1835 | 1843 | 보존 / 개별 동등성 미검증 |
| undo | 1844 | 1849 | 보존 / 개별 동등성 미검증 |
| redo | 1850 | 1855 | 보존 / 개별 동등성 미검증 |
| _invalidate_all_caches | 1856 | 1871 | 보존 / 개별 동등성 미검증 |
| ensure_duty_columns | 1874 | 1882 | 보존 / 개별 동등성 미검증 |
| ensure_part_time_columns | 1883 | 1894 | 보존 / 개별 동등성 미검증 |
| ensure_input_user | 1895 | 1901 | 보존 / 개별 동등성 미검증 |
| load_timetable_from_gsheet | 1902 | 1923 | 보존 / 개별 동등성 미검증 |
| load_work_data_from_gsheet | 1924 | 1950 | 보존 / 개별 동등성 미검증 |
| save_work_data_to_gsheet | 1951 | 1975 | 보존 / 개별 동등성 미검증 |
| init_state | 1976 | 2016 | 보존 / 개별 동등성 미검증 |
| _new_change_id | 2018 | 2019 | 보존 / 개별 동등성 미검증 |
| _lesson_record | 2020 | 2031 | 보존 / 개별 동등성 미검증 |
| _truthy_availability | 2032 | 2036 | 보존 / 개별 동등성 미검증 |
| _part_time_available | 2037 | 2039 | 보존 / 개별 동등성 미검증 |
| _normalize_teacher_col | 2048 | 2049 | 보존 / 개별 동등성 미검증 |
| _parse_period_tokens | 2051 | 2059 | 보존 / 개별 동등성 미검증 |
| _parse_teacher_availability_text | 2061 | 2080 | 보존 / 개별 동등성 미검증 |
| get_teacher_availability_index | 2083 | 2138 | 보존 / 개별 동등성 미검증 |
| teacher_slot_is_available | 2140 | 2148 | 보존 / 개별 동등성 미검증 |
| validate_part_time_table | 2149 | 2163 | 보존 / 개별 동등성 미검증 |
| _effective_index | 2164 | 2170 | 보존 / 개별 동등성 미검증 |
| _class_slot_teachers | 2171 | 2175 | 보존 / 개별 동등성 미검증 |
| validate_swap | 2176 | 2229 | 보존 / 개별 동등성 미검증 |
| validate_substitute | 2230 | 2261 | 보존 / 개별 동등성 미검증 |
| _apply_sub_to_effective | 2262 | 2273 | 보존 / 개별 동등성 미검증 |
| _is_direct_swap_type | 2274 | 2275 | 보존 / 개별 동등성 미검증 |
| get_test_affected_slots | 2277 | 2302 | 보존 / 개별 동등성 미검증 |
| _test_slot_is_affected | 2303 | 2305 | 보존 / 개별 동등성 미검증 |
| get_actual_direct_swap_affected_slots | 2307 | 2327 | 보존 / 개별 동등성 미검증 |
| _actual_direct_slot_is_affected | 2328 | 2330 | 보존 / 개별 동등성 미검증 |
| _effective_swap_origin_info | 2331 | 2362 | 보존 / 개별 동등성 미검증 |
| _effective_sub_origin_info | 2363 | 2396 | 보존 / 개별 동등성 미검증 |
| _build_effective_timetable_for_date | 2397 | 2501 | 보존 / 개별 동등성 미검증 |
| _get_effective_timetable_cached | 2502 | 2520 | 보존 / 개별 동등성 미검증 |
| get_effective_timetable_for_date | 2522 | 2529 | 보존 / 개별 동등성 미검증 |
| _clear_effective_timetable_cache | 2532 | 2534 | 보존 / 개별 동등성 미검증 |
| get_effective_week | 2537 | 2555 | 보존 / 개별 동등성 미검증 |
| get_swap_origin_info | 2557 | 2573 | 보존 / 개별 동등성 미검증 |
| _duty_slot_index | 2575 | 2589 | 보존 / 개별 동등성 미검증 |
| has_duty | 2590 | 2598 | 보존 / 개별 동등성 미검증 |
| is_free | 2599 | 2610 | 보존 / 개별 동등성 미검증 |
| cumulative_sub_count | 2612 | 2623 | 보존 / 개별 동등성 미검증 |
| weekly_load | 2625 | 2627 | 보존 / 개별 동등성 미검증 |
| recommend_substitutes | 2628 | 2678 | 보존 / 개별 동등성 미검증 |
| get_cached_substitute_recommendations | 2680 | 2684 | 보존 / 개별 동등성 미검증 |
| add_substitute | 2685 | 2719 | 보존 / 개별 동등성 미검증 |
| add_substitutes_batch | 2720 | 2763 | 보존 / 개별 동등성 미검증 |
| cancel_substitute | 2764 | 2791 | 보존 / 개별 동등성 미검증 |
| do_swap | 2792 | 2833 | 보존 / 개별 동등성 미검증 |
| do_linked_swap | 2834 | 2874 | 보존 / 개별 동등성 미검증 |
| apply_cycle_swaps | 2875 | 2920 | 보존 / 개별 동등성 미검증 |
| find_cycle_linked_swaps | 2922 | 2998 | 보존 / 개별 동등성 미검증 |
| get_target_time_recommendations | 3000 | 3035 | 보존 / 개별 동등성 미검증 |
| get_weekly_1to1_swap_table | 3037 | 3126 | 보존 / 개별 동등성 미검증 |
| get_single_lesson_1to1_candidates | 3128 | 3185 | 보존 / 개별 동등성 미검증 |
| get_single_lesson_linked_cycles | 3187 | 3225 | 보존 / 개별 동등성 미검증 |
| teacher_matrix | 3227 | 3238 | 보존 / 개별 동등성 미검증 |
| effective_teacher_matrix | 3239 | 3272 | 보존 / 개별 동등성 미검증 |
| class_matrix | 3274 | 3305 | 보존 / 개별 동등성 미검증 |
| _weekly_cell_parts | 3307 | 3331 | 보존 / 개별 동등성 미검증 |
| _resolve_weekly_selection | 3332 | 3358 | 보존 / 개별 동등성 미검증 |
| _register_absence_from_weekly | 3359 | 3383 | 보존 / 개별 동등성 미검증 |
| _weekly_display_matrix | 3384 | 3405 | 보존 / 개별 동등성 미검증 |
| _is_changed_lesson_cell | 3408 | 3410 | 보존 / 개별 동등성 미검증 |
| _daily_styled_matrix | 3412 | 3421 | 보존 / 개별 동등성 미검증 |
| _weekly_styled_matrix | 3423 | 3471 | 보존 / 개별 동등성 미검증 |
| _clear_weekly_selection | 3472 | 3483 | 보존 / 개별 동등성 미검증 |
| _validate_current_weekly_selection | 3484 | 3505 | 보존 / 개별 동등성 미검증 |
| _filter_current_swap_candidates | 3506 | 3557 | 보존 / 개별 동등성 미검증 |
| _weekly_fragment_rerun | 3558 | 3562 | 보존 / 개별 동등성 미검증 |
| _weekly_dialog_loading | 3564 | 3566 | 보존 / 개별 동등성 미검증 |
| _weekly_action_dialog | 3568 | 4032 | 보존 / 개별 동등성 미검증 |
| _resolve_matrix_cell_selection | 4033 | 4077 | 보존 / 개별 동등성 미검증 |
| render_weekly_selection_panel | 4078 | 4085 | 보존 / 개별 동등성 미검증 |
| render_standard_weekly_matrix | 4086 | 4090 | 보존 / 개별 동등성 미검증 |
| _weekly_selection_signature | 4091 | 4095 | 보존 / 개별 동등성 미검증 |
| render_weekly_matrix | 4096 | 4196 | 보존 / 개별 동등성 미검증 |
| get_teacher_week_view | 4197 | 4214 | 보존 / 개별 동등성 미검증 |
| get_changed_teachers_for_week | 4215 | 4244 | 보존 / 개별 동등성 미검증 |
| filter_by_owner | 4245 | 4248 | 보존 / 개별 동등성 미검증 |
| build_personal_plan_html | 4249 | 4460 | 보존 / 개별 동등성 미검증 |
| build_test_swaps_report_html | 4461 | 4678 | 보존 / 개별 동등성 미검증 |
| build_report_html | 4679 | 4737 | 보존 / 개별 동등성 미검증 |
| build_weekly_schedule_excel_bytes | 4738 | 4808 | 보존 / 개별 동등성 미검증 |
| build_weekly_class_schedule_excel_bytes | 4809 | 4858 | 보존 / 개별 동등성 미검증 |
| _workbook_bytes | 4859 | 4860 | 보존 / 개별 동등성 미검증 |
| to_excel_bytes | 4861 | 4866 | 보존 / 개별 동등성 미검증 |
| _salary_default_degree_df | 4961 | 4962 | 보존 / 개별 동등성 미검증 |
| _salary_default_career_df | 4963 | 4964 | 보존 / 개별 동등성 미검증 |
| _salary_default_rate_for_career_type | 4965 | 4966 | 보존 / 개별 동등성 미검증 |
| _salary_default_rate_for_degree_type | 4967 | 4968 | 보존 / 개별 동등성 미검증 |
| _salary_sync_rate_defaults | 4969 | 4996 | 보존 / 개별 동등성 미검증 |
| _salary_rate_snapshot | 4997 | 5003 | 보존 / 개별 동등성 미검증 |
| _salary_init_state | 5004 | 5042 | 보존 / 개별 동등성 미검증 |
| _salary_safe_date | 5043 | 5058 | 보존 / 개별 동등성 미검증 |
| _salary_duration_days | 5059 | 5077 | 보존 / 개별 동등성 미검증 |
| _salary_ymd_from_360 | 5078 | 5080 | 보존 / 개별 동등성 미검증 |
| _salary_duration_text | 5081 | 5083 | 보존 / 개별 동등성 미검증 |
| _salary_normalize_table | 5084 | 5091 | 보존 / 개별 동등성 미검증 |
| _salary_add_degree_row | 5092 | 5106 | 보존 / 개별 동등성 미검증 |
| _salary_add_career_row | 5107 | 5122 | 보존 / 개별 동등성 미검증 |
| _salary_clean_ai_json | 5123 | 5128 | 보존 / 개별 동등성 미검증 |
| _salary_gemini_config | 5129 | 5139 | 보존 / 개별 동등성 미검증 |
| _salary_analyze_uploaded_file | 5140 | 5187 | 보존 / 개별 동등성 미검증 |
| _salary_apply_ai_result | 5188 | 5250 | 보존 / 개별 동등성 미검증 |
| _salary_calculate | 5251 | 5326 | 보존 / 개별 동등성 미검증 |
| _salary_report_html | 5327 | 5406 | 보존 / 개별 동등성 미검증 |
| render_salary_tab | 5407 | 5648 | 보존 / 개별 동등성 미검증 |
| _login_failure_store | 5650 | 5651 | 보존 / 개별 동등성 미검증 |
| _login_client_key | 5652 | 5660 | 보존 / 개별 동등성 미검증 |
| _login_is_rate_limited | 5661 | 5674 | 보존 / 개별 동등성 미검증 |
| _record_login_failure | 5675 | 5683 | 보존 / 개별 동등성 미검증 |
| _clear_login_failures | 5684 | 5688 | 보존 / 개별 동등성 미검증 |
| _revalidate_authenticated_user | 5689 | 5716 | 보존 / 개별 동등성 미검증 |
| show_login_page | 5717 | 5808 | 보존 / 개별 동등성 미검증 |
| _week_anchor | 5809 | 5816 | 보존 / 개별 동등성 미검증 |
| _apply_ui_theme_from_dialog | 5858 | 5868 | 보존 / 개별 동등성 미검증 |
| _apply_ui_font_from_dialog | 5871 | 5881 | 보존 / 개별 동등성 미검증 |
| _apply_ui_font_from_dialog | 5884 | 5892 | 보존 / 개별 동등성 미검증 |
| _apply_ui_font_from_dialog | 5895 | 5908 | 보존 / 개별 동등성 미검증 |
| render_tools_dialog | 5912 | 5995 | 보존 / 개별 동등성 미검증 |
| _load_all_runtime_data_from_gsheet | 5996 | 6008 | 보존 / 개별 동등성 미검증 |
| render_top_toolbar | 6009 | 6106 | 보존 / 개별 동등성 미검증 |
