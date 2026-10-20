// Replaces google.script.run only inside the isolated integrated document.
// All business UI and its callbacks remain the supplied Index.html.
(() => {
  const channel = 'exam-' + crypto.randomUUID();
  const pending = new Map();
  let ready = false;
  const hello = setInterval(() => {if (!ready) parent.postMessage({type: 'exam-hello', channel}, '*');}, 500);
  let counter = 0;
  const queue = [];
  function submit(message) {
    if (ready) parent.postMessage(message, '*');
    else queue.push(message);
  }
  addEventListener('message', event => {
    if (event.source !== parent || event.data?.channel !== channel) return;
    if (event.data.type === 'exam-ready') {
      ready = true;
      clearInterval(hello);
      for (const message of queue.splice(0)) parent.postMessage(message, '*');
      return;
    }
    if (event.data.type !== 'exam-result') return;
    const job = pending.get(event.data.id);
    if (!job) return;
    pending.delete(event.data.id);
    clearTimeout(job.timer);
    if (event.data.error) job.fail({message: event.data.error});
    else job.ok(event.data.result);
  });
  function runner(ok = () => {}, fail = () => {}) {
    const invoke = (action, payload = {}) => {
      const id = String(++counter);
      const timer = setTimeout(() => {
        pending.delete(id);
        fail({message: '응답 확인 시간이 지났습니다. 재실행 전 최신 자료와 이력을 확인하세요.'});
      }, 240000);
      pending.set(id, {ok, fail, timer});
      submit({type: 'exam-request', channel, id, action, payload});
    };
    return {
      withSuccessHandler: callback => runner(callback, fail),
      withFailureHandler: callback => runner(ok, callback),
      apiBootstrap: authToken => invoke('bootstrap', {authToken}),
      loginAdmin: payload => invoke('login', payload),
      logoutAdminSession: authToken => invoke('logout', {authToken}),
      api: (action, payload) => invoke(action, payload),
    };
  }
  window.google = {script: {run: runner()}};
  // No browser-persisted administrator token survives a document/account switch.
  const memory = new Map();
  Object.defineProperty(window, 'sessionStorage', {value: {
    getItem: key => memory.get(key) || null,
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: key => memory.delete(key),
  }});
  parent.postMessage({type: 'exam-hello', channel}, '*');
})();
