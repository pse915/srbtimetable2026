"""Streamlit engine; all application UI is rendered by one React v2 component."""
from pathlib import Path
import streamlit as st
from backend.services.application import Application

st.set_page_config(page_title='시간표 · 학교 업무', page_icon='📘', layout='wide', initial_sidebar_state='collapsed')
ROOT=Path(__file__).parent
DIST=ROOT/'frontend/dist'

@st.cache_resource
def component():
    return st.components.v2.component(
        'timetable_react', html='<div id="timetable-root"></div>',
        css=(DIST/'style.css').read_text(encoding='utf-8'),
        js=(DIST/'timetable.js').read_text(encoding='utf-8'), isolate_styles=True,
    )

def receive():
    request=st.session_state.get('_timetable_component',{}).get('request')
    if request:
        runtime=st.session_state['_timetable_runtime']
        try:
            runtime.dispatch(request)
        except Exception as exc:
            runtime.response={'requestId':request.get('requestId'),'success':False,'error':{'code':type(exc).__name__,'message':str(exc)}}

if '_timetable_runtime' not in st.session_state:
    try: settings=dict(st.secrets.get('migration',{}))
    except Exception: settings={}
    st.session_state['_timetable_runtime']=Application(st.secrets,st.context,settings)
    st.session_state['_timetable_runtime'].initialize()

component()(key='_timetable_component', data=st.session_state['_timetable_runtime'].snapshot(),
            on_request_change=receive, default={'request':None}, width='stretch')
