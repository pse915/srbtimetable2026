"""Reproducible AST inventory. Does not execute or contact the original app."""
import ast
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'legacy/timetable_app2_original.py').read_text(encoding='utf-8-sig')
tree = ast.parse(source)
parents = {child: parent for parent in ast.walk(tree) for child in ast.iter_child_nodes(parent)}
functions = {n.name: n for n in tree.body if isinstance(n, ast.FunctionDef)}

def context(node):
    fn, menu, conditions = 'module', '공통', []
    while node in parents:
        node = parents[node]
        if isinstance(node, ast.FunctionDef) and fn == 'module':
            fn = node.name
        if isinstance(node, ast.If):
            condition = ast.unparse(node.test)
            conditions.append(condition)
            if 'tab_map' in condition:
                menu = next((x.value for x in ast.walk(node.test) if isinstance(x, ast.Constant) and isinstance(x.value, str)), menu)
    return fn, menu, conditions

def display(node):
    return ast.unparse(node).replace('|', '\\|').replace('\n', ' ')[:240]

records = []
ui = {'button','form_submit_button','text_input','text_area','selectbox','radio','checkbox','slider','date_input','dataframe','data_editor','download_button','file_uploader','bar_chart','dialog','form','metric','toast','warning','error','success','info'}
for node in ast.walk(tree):
    if not isinstance(node, ast.Call):
        continue
    name = ast.unparse(node.func)
    if name.split('.')[-1] not in ui or (not name.startswith('st.') and name.split('.')[-1] != 'button'):
        continue
    fn, menu, conditions = context(node)
    # Transitive static dependencies; these are candidates, not runtime evidence.
    dependencies, todo = set(), [fn]
    while todo:
        target = todo.pop()
        if target not in functions or target in dependencies:
            continue
        dependencies.add(target)
        todo += [n.func.id for n in ast.walk(functions[target]) if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id in functions]
    sheets = set()
    for dep in dependencies:
        for call in ast.walk(functions[dep]):
            if isinstance(call, ast.Call) and isinstance(call.func, ast.Name) and call.func.id == 'get_worksheet' and len(call.args)>1 and isinstance(call.args[1], ast.Constant):
                sheets.add(str(call.args[1].value))
    records.append(dict(id=f'UI-L{node.lineno}',line=node.lineno,menu=menu,function=fn,kind=name.split('.')[-1],label=display(node.args[0]) if node.args else '',conditions=conditions,dependencies=sorted(dependencies),sheets=sorted(sheets),status='미검증'))
records.sort(key=lambda x:x['line'])
metadata = dict(commit='c00647f2f49c09ff03469b83f8f4c0e6baf08d0d',sha256=hashlib.sha256((ROOT/'legacy/timetable_app2_original.py').read_bytes()).hexdigest(),lines=len(source.splitlines()),functions=[dict(name=n.name,line=n.lineno,end=n.end_lineno,body_hash=hashlib.sha256(ast.dump(n,include_attributes=False).encode()).hexdigest()) for n in tree.body if isinstance(n,ast.FunctionDef)],ui=records)
(ROOT/'backend/schemas/source_inventory.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2),encoding='utf-8')
head = '''# 원본 기능 목록

기준: GitHub main c00647f2f49c09ff03469b83f8f4c0e6baf08d0d, 7,069줄.
첨부본은 동일 코드이며 CRLF/LF 줄바꿈만 다르다. 두 파일을 별도 보존했다. `tools/analyze_source.py`로 다시 생성 가능하다.
이 목록은 모든 AST UI 호출 지점과 함수 정의를 추적한다. 반복문으로 생기는 버튼은 호출 지점 하나에 여러 인스턴스가 있다.
조건과 의존성은 정적 분석 결과이며 실행 검증을 의미하지 않는다. 메뉴 공통 함수는 여러 화면에서 호출된다.
React 대응: `NodeRenderer` + `DataGrid`; Python 대응: `LegacyProgram`에서 원본 함수를 그대로 실행.
각 항목의 역할/시트는 아래 조건 및 JSON의 transitive dependencies를 대조해야 한다. 자동 목록만으로 100% 동등성을 선언하지 않는다.

## 호출 지점

| ID | 메뉴 | 원본 함수/줄 | 사용자 동작 | 백엔드 처리/권한 조건 | 영향받는 시트 | React 대응 | 재현 테스트 | 상태 |
|---|---|---|---|---|---|---|---|---|
'''
rows = []
for rec in records:
    conditions = '; '.join(rec['conditions']) or '호출 화면의 서버 권한 사용'
    rows.append(f"| {rec['id']} | {rec['menu']} | {rec['function']}:{rec['line']} | {rec['kind']} {rec['label']} | {conditions.replace('|','/')[:420]} | {', '.join(rec['sheets']) or '호출부/JSON 대조'} | NodeRenderer/{rec['kind']} | 해당 역할로 조건을 만족시켜 원본과 같은 입력·저장값 비교; 아직 전체 실행 안 함 | 미검증 |")
head += '\n'.join(rows) + '\n\n## 모든 함수 정의\n\n| 원본 함수 | 시작 | 끝 | 상태 |\n|---|---|---|---|\n'
head += '\n'.join(f"| {r['name']} | {r['line']} | {r['end']} | 보존 / 개별 동등성 미검증 |" for r in metadata['functions'])
(ROOT/'docs/reports/FEATURE_INVENTORY.md').write_text(head+'\n',encoding='utf-8')
print(json.dumps({'functions':len(metadata['functions']),'ui_sites':len(records),'sha256':metadata['sha256']}))
