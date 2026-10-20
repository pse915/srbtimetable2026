import {useEffect,useRef} from 'react';
import type {Send} from '../types';

export function ExamWorkspace({html,send,owner}:{html:string;send:Send;owner:string}) {
  const frame=useRef<HTMLIFrameElement>(null);
  const latest=useRef(send);
  useEffect(()=>{latest.current=send;},[send]);
  useEffect(()=>{
    let channel='';
    let active=true;
    let busy=false;
    const receive=async(event:MessageEvent)=>{
      if(event.source!==frame.current?.contentWindow || !event.data || typeof event.data.channel!=='string')return;
      const message=event.data;
      if(message.type==='exam-hello'){
        channel=message.channel;
        frame.current?.contentWindow?.postMessage({type:'exam-ready',channel},'*');
        return;
      }
      if(message.type!=='exam-request'||message.channel!==channel||typeof message.id!=='string'||typeof message.action!=='string')return;
      const reply=(result:unknown,error?:string)=>{
        if(active)frame.current?.contentWindow?.postMessage({type:'exam-result',channel,id:message.id,result,error},'*');
      };
      if(busy){reply(null,'이전 시험감독 요청이 처리 중입니다.');return;}
      busy=true;
      try{
        const response=await latest.current('exam_rpc',{action:message.action,params:message.payload??{}});
        reply(response.result,response.success?undefined:response.error?.message??'요청 실패');
      }catch(error){reply(null,error instanceof Error?error.message:String(error));}
      finally{busy=false;}
    };
    window.addEventListener('message',receive);
    return()=>{active=false;window.removeEventListener('message',receive);};
  },[owner]);
  return <iframe key={owner} ref={frame} title="시험감독 배정" srcDoc={html}
    sandbox="allow-scripts allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
    style={{width:'100%',height:'max(850px, 85vh)',border:0,borderRadius:12,background:'#f3f6fb'}}/>;
}
