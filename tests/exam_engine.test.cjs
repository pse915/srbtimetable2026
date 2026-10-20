const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const source=fs.readFileSync('exam/apps_script/Code.gs','utf8');
const gateway=fs.readFileSync('exam/apps_script/Gateway.gs','utf8');

function engine(baseline=false){
  const props=new Map([['EXAM_BRIDGE_SECRET','x'.repeat(40)],['EXAM_SPREADSHEET_ID','replica_test_document']]);
  const cache=new Map();let sheetWrites=0;let openCount=0;let failWriteTo='';
  const properties={getProperty:k=>props.get(k)||null,setProperty:(k,v)=>props.set(k,v),deleteProperty:k=>props.delete(k),getProperties:()=>Object.fromEntries(props)};
  const rows={관리자ID:[['이름','이메일'],['테스트가','teacher@example.test']]};
  const document={getId:()=>props.get('EXAM_SPREADSHEET_ID'),getName:()=> '모의 시험감독',getUrl:()=> 'https://docs.google.com/spreadsheets/d/replica_test_document/edit',getSheetByName:name=>{
    if(!rows[name])return null;
    const last=()=>{let n=rows[name].length;while(n&&!rows[name][n-1].some(x=>x!==''))n--;return n;};
    const tab={getLastRow:last,getLastColumn:()=>Math.max(0,...rows[name].map(r=>r.length)),getMaxRows:()=>1000,getMaxColumns:()=>30,
      insertRowsAfter:()=>{sheetWrites++;},insertColumnsAfter:()=>{sheetWrites++;},setFrozenRows:()=>{},setColumnWidth:()=>{},setColumnWidths:()=>{},
      getRange:(r,c,n=1,w=1)=>{
        const range={getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:w},(_,j)=>rows[name][r-1+i]?.[c-1+j]??'')),
          getDisplayValues:()=>range.getValues().map(row=>row.map(String)),getDisplayValue:()=>String(range.getValues()[0][0]),
          getFormulas:()=>Array.from({length:n},()=>Array(w).fill('')),
          setValues:values=>{if(failWriteTo===name){failWriteTo='';throw Error('Injected replica storage failure');}sheetWrites++;values.forEach((row,i)=>row.forEach((v,j)=>{(rows[name][r-1+i]??=[])[c-1+j]=v;}));return range;},
          setValue:value=>range.setValues([[value]]),clearContent:()=>range.setValues(Array.from({length:n},()=>Array(w).fill('')))};
        for(const method of ['setNumberFormat','setBackground','setFontWeight','setWrap','setVerticalAlignment'])range[method]=()=>range;
        return range;
      }};
    return tab;
  },insertSheet:name=>{sheetWrites++;rows[name]=[];return document.getSheetByName(name);}};
  const formatDate=(d,tz,format)=>{
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(d).map(x=>[x.type,x.value]));
    return format==='M-d'?`${Number(p.month)}-${Number(p.day)}`:format==='HH:mm'?`${p.hour}:${p.minute}`:format==='yyyy-MM-dd'?`${p.year}-${p.month}-${p.day}`:`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;
  };
  const context=vm.createContext({console,Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},
    computeDigest:(_a,s)=>[...crypto.createHash('sha256').update(String(s)).digest()],
    computeHmacSha256Signature:(s,k)=>[...crypto.createHmac('sha256',k).update(s).digest()],formatDate,getUuid:()=>crypto.randomUUID()},
    PropertiesService:{getScriptProperties:()=>properties},CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v),remove:k=>cache.delete(k)})},
    LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
    ScriptApp:{getScriptId:()=> 'replica_script'},Session:{getActiveUser:()=>({getEmail:()=>''}),getTemporaryActiveUserKey:()=> 'test'},
    SpreadsheetApp:{openById:()=>{openCount++;return document;},getActiveSpreadsheet:()=>null},
  });
  vm.runInContext(baseline?source.replace('function standaloneView_() {','function doGet() {'):source,context);
  if(!baseline)vm.runInContext(gateway,context);
  return {context,props,cache,rows,get writes(){return sheetWrites;},get opens(){return openCount;},set failWriteTo(name){failWriteTo=name;}};
}
function signed(action='bootstrap',changes={}){
  const body=JSON.stringify({requestId:crypto.randomUUID(),timestamp:Date.now(),spreadsheetId:'replica_test_document',action,principal:{id:'tester',admin:true,name:'테스트가',email:'teacher@example.test'},allowWrites:false,payload:{},...changes});
  return {body,signature:crypto.createHmac('sha256','x'.repeat(40)).update(body).digest('hex')};
}
function call(e,request){e.context.envelope=request;return vm.runInContext('bridgeRequest_(envelope)',e.context);}

test('all supplied synthetic solver tests pass with Seoul date semantics',()=>{
  const e=engine(),result=vm.runInContext('runSelfTests_()',e.context);
  assert.equal(result.failed,0,JSON.stringify(result.tests.filter(x=>x.status!=='통과')));
  assert.equal(result.passed,63);
  assert.equal(e.writes,0);assert.equal(e.opens,0);
});

test('original fixed-seed matching and objective are unchanged through gateway loading',()=>{
  const baseline=engine(true),integrated=engine();
  // Reverse the sole entry-point rename to run the supplied original source.
  const fixture=`(()=>{
    const teachers=Array.from({length:6},(_,i)=>({id:String(i),name:'교사'+i,subjects:['역사'],homeroom:''}));
    const schedule=[1,2,3].map(period=>({day:1,date:'2026-11-23',period,grade:1,classNo:1,classId:'1-1',type:'EXAM',subject:'국어'}));
    const ctx={teachers,schedule,settings:{studyCount:1,aliases:{},maxPerTeacher:0,optimization:defaultOptimization_()},unavailable:[]};
    const jobs=makeJobs_(schedule,ctx.settings),candidates=new Map(jobs.map(j=>[j.key,teachers.filter(t=>!eligible_(t,j,ctx,[]).length)]));
    const attempt=makeAttempt_(jobs,ctx,913,candidates);assert_(attempt.ok,"fixture assignment failed");const assignments=attempt.assignments;
    return JSON.stringify({assignments,objective:objectiveVector_(assignments,ctx),valid:fullValidate_(assignments,ctx).valid});
  })()`;
  assert.equal(vm.runInContext(fixture,baseline.context),vm.runInContext(fixture,integrated.context));
});

test('snapshot chunk order, missing chunks and tampering are validated',()=>{
  const e=engine();
  vm.runInContext(`var snapshot={assignments:[],padding:'가'.repeat(61000)};var chunks=snapshotRows_('v1.0','CONFIRMED',snapshot,'test');`,e.context);
  assert.equal(vm.runInContext(`parseVersionSnapshotRows_('v1.0',chunks.slice().reverse()).padding.length`,e.context),61000);
  assert.throws(()=>vm.runInContext(`parseVersionSnapshotRows_('v1.0',chunks.slice(1))`,e.context),/누락/);
  assert.throws(()=>vm.runInContext(`chunks[0][7]+='x';parseVersionSnapshotRows_('v1.0',chunks)`,e.context),/무결성/);
});

test('signed bootstrap and confirmed reads cannot initialize or write Sheets',()=>{
  const e=engine();const before=e.props.size;
  assert.equal(call(e,signed()).ready,false);
  assert.equal(call(e,signed('getConfirmed')).status,'DRAFT');
  assert.equal(e.writes,0);
  assert.equal([...e.props.keys()].some(k=>k.startsWith('EXAM_CONTAINER')),false);
  assert.ok(e.props.size>before); // replay ledger properties only, never sheet values
});

test('missing settings on administrator reads fails without initialization',()=>{
  const e=engine();
  const logged=call(e,signed('login',{payload:{name:'테스트가',email:'teacher@example.test'}}));
  assert.throws(()=>call(e,signed('getAdminData',{payload:{authToken:logged.token}})),/시트 준비/);
  assert.equal(e.writes,0);
});

test('bad signature, expired request, wrong target and nonadmin never open Sheets',()=>{
  const e=engine();
  assert.throws(()=>call(e,{...signed(),signature:'wrong'}),/서명/);
  assert.throws(()=>call(e,signed('bootstrap',{timestamp:Date.now()-200000})),/유효시간/);
  assert.throws(()=>call(e,signed('bootstrap',{spreadsheetId:'another_document'})),/불일치/);
  assert.throws(()=>call(e,signed('getAdminData',{principal:{id:'teacher',admin:false}})),/관리자/);
  assert.equal(e.opens,0);assert.equal(e.writes,0);
});

test('both write gates and original session checks are required',()=>{
  const e=engine();
  assert.throws(()=>call(e,signed('confirm')),/쓰기/);
  assert.throws(()=>call(e,signed('confirm',{allowWrites:true})),/쓰기/);
  e.props.set('EXAM_ALLOW_WRITES','true');
  assert.throws(()=>call(e,signed('confirm',{allowWrites:true})),/로그인|세션/);
  assert.equal(e.writes,0);
});

test('same request replay returns cache; eviction and in-flight states never reexecute',()=>{
  const e=engine(),request=signed();
  call(e,request);const opens=e.opens;
  assert.equal(call(e,request).ready,false);assert.equal(e.opens,opens);
  e.cache.clear();assert.throws(()=>call(e,request),/미확인/);assert.equal(e.opens,opens);
  const pending=signed();const r=JSON.parse(pending.body);
  e.props.set('EXAM_REQUEST_'+r.requestId,JSON.stringify({state:'running',at:Date.now(),fingerprint:crypto.createHash('sha256').update(pending.body).digest('hex')}));
  assert.throws(()=>call(e,pending),/미확인/);
});

test('session is bound to mapped user and logout revokes it',()=>{
  const e=engine(),params={name:'테스트가',email:'teacher@example.test'};
  const login=call(e,signed('login',{payload:params}));
  assert.equal(call(e,signed('bootstrap',{payload:{authToken:login.token}})).admin,true);
  assert.equal(call(e,signed('bootstrap',{principal:{id:'other',admin:true,name:params.name,email:params.email},payload:{authToken:login.token}})).admin,false);
  call(e,signed('logout',{payload:{authToken:login.token}}));
  assert.equal(call(e,signed('bootstrap',{payload:{authToken:login.token}})).admin,false);
});

test('replica-only draft, confirm, lock, new version, restore and reset lifecycle',()=>{
  const e=engine();
  e.props.set('EXAM_ALLOW_WRITES','true');
  e.rows['배정인원']=[['번호','이름','과목','담임학급','상치교과','정감독','부감독','자습감독'],
    ...Array.from({length:4},(_,i)=>[String(i+1),'교사'+i,'역사','','','O','O','O'])];
  e.rows['학급입력']=[['학년','반'],[1,1]];
  const auth=call(e,signed('login',{payload:{name:'테스트가',email:'teacher@example.test'}}));
  const invoke=(action,payload={})=>call(e,signed(action,{allowWrites:true,payload:{...payload,authToken:auth.token}}));
  invoke('initialize');
  const admin=()=>invoke('getAdminData');
  const run=(action,payload={})=>invoke(action,{revision:admin().revision,...payload});
  e.rows['교사시간표'].push(...Array.from({length:4},(_,i)=>['교사'+i,'수업없음','','','','']));
  run('saveSchedule',{rows:[{day:1,date:'2026-11-23',period:1,classId:'1-1',type:'EXAM',subject:'국어',start:'09:00',end:'09:50'}]});
  run('verifyRoster',{confirmed:true});
  const generated=run('generate',{seed:913});assert.equal(generated.ok,true);
  const stale=admin().revision-1;
  assert.throws(()=>invoke('confirm',{revision:stale}),/수정|변경|최신/);
  const first=run('confirm',{reason:'최초 확정'});assert.equal(first.version,'v1.0');
  const immutable=JSON.stringify(e.rows['배정버전']);
  assert.throws(()=>run('update',{key:generated.assignments[0].key,teacherId:'3'}),/잠금|확정/);
  run('unlockConfirmed',{reason:'편집 검증'});
  run('discardUnlocked',{reason:'편집 취소'});
  assert.equal(invoke('getConfirmed').version,'v1.0');
  run('createVersion',{baseVersion:'v1.0',reason:'새 버전 검증'});
  assert.equal(invoke('getConfirmed').version,'v1.1');
  assert.equal(JSON.stringify(e.rows['배정버전'].slice(0,JSON.parse(immutable).length)),immutable);
  run('restore',{version:'v1.0',reason:'이전 버전 복구'});
  assert.equal(invoke('getConfirmed').version,'v1.2');
  e.failWriteTo='배정결과';
  assert.throws(()=>run('createVersion',{baseVersion:'v1.0',reason:'부분 저장 장애 검증'}),/완료되지|실패/);
  assert.equal(invoke('getConfirmed').version,'v1.2');
  run('repair');
  const plan=run('getResetPlan',{groups:['assignments']});assert.equal(plan.unpublish,true);
  run('resetWorkspace',{groups:['assignments'],activeVersion:'v1.2',confirmText:'선택 초기화',reason:'배정 초기화 검증'});
  assert.equal(invoke('getConfirmed').version,'');
  assert.ok(e.rows['배정버전'].length>1);assert.ok(e.rows['배정수정이력'].length>1);
});
