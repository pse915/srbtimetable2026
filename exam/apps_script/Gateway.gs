/** Signed server bridge. Install beside the supplied, unmodified Code.gs/Index.
 * Properties: EXAM_BRIDGE_SECRET (32+ chars), EXAM_SPREADSHEET_ID,
 * EXAM_ALLOW_WRITES ('true' only after replica verification).
 * No initialization, container registration or Sheets writes on reads.
 */
const BRIDGE_READS_ = new Set(['bootstrap','getStatus','getConfirmed','getTeacher',
  'diagnose','getAdminData','getTeachingData','availabilityReport','getResetPlan',
  'fairness','optimizationReport','compareGradeBonus','versions','getVersionLibrary',
  'getVersionPreview','history','getAuditData','selfTests','login','logout']);
const BRIDGE_PUBLIC_ = new Set(['bootstrap','getStatus','getConfirmed','getTeacher']);
const BRIDGE_ACTIONS_ = new Set([...BRIDGE_READS_, 'saveVisiting','saveTeachingRules',
  'verifyRoster','revokeRoster','saveRoster','resetWorkspace','saveInstructorFlags',
  'saveSchedule','saveSettings','saveUnavailable','generate','improve','update','swap',
  'roleSwap','confirm','unlockConfirmed','discardUnlocked','amend','createVersion',
  'restore','repair','initialize']);

function bridgeHex_(bytes){return bytes.map(x=>('0'+((x+256)%256).toString(16)).slice(-2)).join('');}
function bridgeEqual_(a,b){let n=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)n|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return n===0;}
function bridgeEnvelope_(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
function doGet(){return ContentService.createTextOutput('시험감독 기능은 학교 업무 앱에 로그인한 뒤 이용하세요.');}

function doPost(e){
  try{return bridgeEnvelope_({ok:true,result:bridgeRequest_(JSON.parse(e.postData.contents))});}
  catch(error){return bridgeEnvelope_({ok:false,error:String(error.message||error).slice(0,500)});}
}

function bridgeRequest_(envelope){
  const props=PropertiesService.getScriptProperties();
  const secret=props.getProperty('EXAM_BRIDGE_SECRET')||'';
  assert_(secret.length>=32,'시험감독 bridge secret 미설정');
  assert_(envelope&&typeof envelope.body==='string'&&envelope.body.length<2000000,'요청 형식 오류');
  const signature=bridgeHex_(Utilities.computeHmacSha256Signature(envelope.body,secret,Utilities.Charset.UTF_8));
  assert_(bridgeEqual_(signature,String(envelope.signature||'')),'요청 서명 오류');
  const r=JSON.parse(envelope.body);
  assert_(Number.isFinite(r.timestamp)&&Math.abs(Date.now()-r.timestamp)<180000,'요청 유효시간 만료');
  assert_(/^[a-f0-9-]{36}$/i.test(r.requestId||''),'요청 ID 오류');
  assert_(BRIDGE_ACTIONS_.has(r.action),'지원하지 않는 요청');
  const sheetId=props.getProperty('EXAM_SPREADSHEET_ID')||'';
  assert_(/^[A-Za-z0-9_-]{10,}$/.test(sheetId)&&r.spreadsheetId===sheetId,'시험감독 대상 시트 불일치');
  const p=r.principal;
  assert_(p&&typeof p.id==='string'&&p.id.length>0,'서버 사용자 세션 필요');
  if(!BRIDGE_PUBLIC_.has(r.action))assert_(p.admin===true&&p.name&&p.email,'연결된 관리자 권한 필요');
  if(!BRIDGE_READS_.has(r.action))assert_(r.allowWrites===true&&props.getProperty('EXAM_ALLOW_WRITES')==='true','시험감독 쓰기 비활성화');
  const params=r.payload||{};
  if(!p.admin)delete params.authToken;
  if(r.action==='login')assert_(params.name===p.name&&normalizeAdminEmail_(params.email)===p.email,'관리자 매핑 불일치');

  // Durable reservation prevents duplicate mutation after timeout, cache eviction
  // or a second Cloud process. Never automatically rerun an uncertain request.
  const key='EXAM_REQUEST_'+r.requestId;
  const fingerprint=hexDigest_(envelope.body);
  const lock=LockService.getScriptLock();
  assert_(lock.tryLock(25000),'다른 요청 처리 중');
  try{
    const previous=parseJSON_(props.getProperty(key),null);
    if(previous){
      assert_(previous.fingerprint===fingerprint,'요청 ID 재사용 오류');
      const cached=CacheService.getScriptCache().get(key);
      assert_(previous.state==='done'&&cached,'이전 요청의 결과가 미확인 상태입니다. 최신 자료와 이력을 확인하세요.');
      return JSON.parse(cached).result;
    }
    // Retain reservations longer than the signed request replay window.
    const all=props.getProperties();
    Object.keys(all).filter(k=>k.startsWith('EXAM_REQUEST_')).forEach(k=>{
      const item=parseJSON_(all[k],{});if(Date.now()-item.at>600000)props.deleteProperty(k);
    });
    props.setProperty(key,JSON.stringify({state:'running',fingerprint,at:Date.now()}));
  }finally{lock.releaseLock();}

  const originalSheet=spreadsheet_,originalInit=ensureInitialized_;
  const originalEmail=getGoogleEmail_,originalUser=temporaryUserKey_;
  try{
    const document=SpreadsheetApp.openById(sheetId);
    // Explicit server binding; skip original automatic property registration.
    spreadsheet_=()=>document;
    ensureInitialized_=()=>assert_(!!document.getSheetByName(SH.settings),'시험감독 시트 준비가 필요합니다. 관리자가 복제 시트에서 명시적으로 준비하세요.');
    // Proxy identity was checked by the existing app and signed on its server.
    // Owner-executed Apps Script identity must not impersonate the requesting user.
    getGoogleEmail_=()=>'';
    temporaryUserKey_=()=>hexDigest_('bridge|'+ScriptApp.getScriptId()+'|'+p.id);
    beginRequest_();
    if(params.authToken){
      const auth=authDiagnostic_(params.authToken);
      if(auth.admin)assert_(auth.email===p.email&&auth.name===p.name,'현재 관리자 매핑과 이전 세션이 다릅니다. 다시 로그인하세요.');
    }
    let result;
    if(r.action==='login')result=loginAdmin(params);
    else if(r.action==='logout')result=logoutAdminSession(params.authToken);
    else if(r.action==='bootstrap')result=apiBootstrap(params.authToken);
    else if(r.action==='initialize'){
      requireAdmin_(params.authToken);
      result=ssLock_(()=>{init_();return {ok:true};});
    }else result=api(r.action,params);
    const serialized=JSON.stringify({result});
    if(serialized.length<90000)CacheService.getScriptCache().put(key,serialized,600);
    props.setProperty(key,JSON.stringify({state:'done',fingerprint,at:Date.now()}));
    return result;
  }finally{
    spreadsheet_=originalSheet;ensureInitialized_=originalInit;
    getGoogleEmail_=originalEmail;temporaryUserKey_=originalUser;
    VERIFIED_ADMIN_EMAIL_='';beginRequest_();
  }
}
