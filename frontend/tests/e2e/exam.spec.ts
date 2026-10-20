import {test,expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test('research navigation, isolated UI and missing configuration fail safely',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await page.getByLabel('아이디',{exact:true}).fill('tester');
  await page.getByRole('button',{name:'로그인',exact:true}).click();
  await expect(page.locator('.nav-group > p')).toHaveText(['수업 운영','교무 행정','연구 평가','관리']);
  await page.getByRole('navigation').getByRole('button',{name:'시험감독 배정',exact:true}).click();
  await expect(page.getByText('시험감독 연결 설정이 필요합니다.',{exact:false})).toBeVisible();
  const frame=page.frameLocator('iframe[title="시험감독 배정"]');
  await expect(frame.getByRole('heading',{name:'연결 오류',exact:true})).toBeVisible();
  await expect(page.getByRole('main')).toHaveAttribute('aria-busy','false');
  await page.getByRole('navigation').getByRole('button',{name:'시간표 조회',exact:true}).click();
  await expect(page.getByRole('heading',{name:'시간표 조회',exact:true}).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('original HTML over message bridge supports search, CSV, print and mobile',async({page})=>{
  const source=fs.readFileSync(path.resolve('../exam/apps_script/Index.html'),'utf8');
  const bridge=fs.readFileSync(path.resolve('../exam/bridge.js'),'utf8');
  const html=source.replace('<?!= JSON.stringify(authStorageKey) ?>','"test-session"').replace('<script>','<script>'+bridge+'\n');
  await page.route('**/exam-ui-fixture',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><body></body>'}));
  await page.goto('/exam-ui-fixture');
  await page.evaluate(documentHtml=>{
    const confirmed={status:'CONFIRMED',version:'v1.0',modifiedAt:'2026-11-20',
      teachers:[{id:'1',name:'가상교사'}],stats:[{id:'1',name:'가상교사',main:1,assist:0,study:0,total:1,delta:0,days:{'2026-11-23':1}}],
      schedule:[{day:1,date:'2026-11-23',period:1,grade:1,classNo:1,classId:'1-1',type:'EXAM',subject:'국어'}],
      assignments:[{day:1,date:'2026-11-23',period:1,classId:'1-1',type:'EXAM',subject:'국어',role:'MAIN',teacherId:'1'}]};
    const frame=document.createElement('iframe');frame.title='시험감독 mock';frame.style.width='100%';frame.style.height='1000px';
    frame.setAttribute('sandbox','allow-scripts allow-modals allow-downloads');
    window.addEventListener('message',event=>{
      if(event.source!==frame.contentWindow)return;
      const m=event.data;
      if(m.type==='exam-hello')frame.contentWindow?.postMessage({type:'exam-ready',channel:m.channel},'*');
      if(m.type==='exam-request')frame.contentWindow?.postMessage({type:'exam-result',channel:m.channel,id:m.id,
        result:{ready:true,admin:false,state:'CONFIRMED',version:'v1.0',confirmed,auth:{code:'LOGIN_REQUIRED'},
          connection:{name:'모의 시트',spreadsheetId:'mock',url:'https://docs.google.com/spreadsheets/d/mock/edit'}}},'*');
    });
    frame.srcdoc=documentHtml;document.body.append(frame);
  },html);
  const frame=page.frameLocator('iframe');
  await expect(frame.getByRole('heading',{name:'교사별 감독 조회',exact:true})).toBeVisible();
  await frame.getByLabel('교사 이름 검색',{exact:true}).fill('가상');
  await frame.getByRole('button',{name:'가상교사',exact:false}).click();
  await expect(frame.getByRole('heading',{name:'가상교사 선생님'})).toBeVisible();
  const download=page.waitForEvent('download');
  await frame.getByRole('button',{name:'CSV 저장',exact:true}).click();
  expect((await download).suggestedFilename()).toBe('개인감독표_가상교사.csv');
  const actualFrame=page.frames()[1];
  await actualFrame.evaluate(()=>{window.print=()=>{document.body.dataset.printed='true';};});
  await frame.getByRole('button',{name:'개인 감독표 인쇄',exact:false}).click();
  await expect(frame.locator('body')).toHaveAttribute('data-printed','true');
  await frame.getByRole('button',{name:'전체 감독 시간표',exact:true}).click();
  await expect(frame.getByRole('heading',{name:'최종 감독 시간표',exact:true})).toBeVisible();
  await page.setViewportSize({width:390,height:844});
  await expect(frame.getByRole('heading',{name:'최종 감독 시간표',exact:true})).toBeVisible();
  await expect(frame.locator('#nav [data-admin]').first()).toBeHidden();
});
