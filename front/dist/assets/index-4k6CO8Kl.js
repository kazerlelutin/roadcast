import{k as c}from"./index-TOitqrGH.js";import{l as B,r as N}from"./index-TOitqrGH.js";const A={onInit(t,e){e.render()},onclick(t,e){e.classList.contains("border-green-700")?(e.classList.remove("border-green-700"),e.classList.add("border-red-700")):(e.classList.remove("border-red-700"),e.classList.add("border-green-700"))},render(t,e){}},T={onClick(t,e,n){n.preventDefault();const r=e.getAttribute("href");window.history.pushState({},"",r),c.injectPage(r)}},C={onInit(t,e){e.render()},render(t,e){c.plugins.translate(e)}},U={onInit(t,e){e.render()},render(t,e){c.plugins.translate(e)}};let i;const k=new Uint8Array(16);function _(){if(!i&&(i=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!i))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(k)}const s=[];for(let t=0;t<256;++t)s.push((t+256).toString(16).slice(1));function h(t,e=0){return s[t[e+0]]+s[t[e+1]]+s[t[e+2]]+s[t[e+3]]+"-"+s[t[e+4]]+s[t[e+5]]+"-"+s[t[e+6]]+s[t[e+7]]+"-"+s[t[e+8]]+s[t[e+9]]+"-"+s[t[e+10]]+s[t[e+11]]+s[t[e+12]]+s[t[e+13]]+s[t[e+14]]+s[t[e+15]]}const f=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),g={randomUUID:f};function w(t,e,n){if(g.randomUUID&&!e&&!t)return g.randomUUID();t=t||{};const r=t.random||(t.rng||_)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,e){n=n||0;for(let o=0;o<16;++o)e[n+o]=r[o];return e}return h(r)}const p="rc__userId";function I(){const t=localStorage.getItem(p);if(t)return t;const e=w();return localStorage.setItem(p,e),e}function v(){const{params:t}=c.parseRoute(),e={"x-user-id":I()};return t.editor&&(e["x-editor-id"]=t.editor),t.reader&&(e["x-reader-id"]=t.reader),{headers:e}}async function d(t,e,n,r){const o=v();return await fetch(n,{method:t,signal:e,body:r?JSON.stringify(r):void 0,...o})}const u={async get(t,e){return await d("GET",e,t)},async post(t,e,n){return await d("POST",e,t,n)},async put(t,e,n){return await d("PUT",e,t,n)},async delete(t,e){return await d("DELETE",e,t)}},D={state:{isInit:!1,controller:new AbortController,broadcast:[]},async onInit(t){if(t.isInit)return;const e=t.controller.signal;try{const r=await(await u.get("/api/broadcasts/last",e)).json();t.broadcast=r}catch(n){console.log(n)}finally{t.isInit=!0}},onClean(t){t.controller.abort()},render(t,e){t.isInit&&(t.broadcast.length?(e.innerHTML="",document.createElement("ul").classList.add("list-disc","list-inside"),t.broadcast.forEach(r=>{const o=document.createElement("li"),a=document.createElement("a");a.innerText=r.name,a.setAttribute("kll-ctrl","link"),a.setAttribute("kll-id",r.editor),a.setAttribute("href",`/bc/editor/${r.editor}`),a.setAttribute("alt",r.name),o.classList.add("text-xs"),c.hydrate(a),o.appendChild(a),e.appendChild(o)})):(e.setAttribute("data-trans","no_broadcast_history"),e.classList.add("italic","text-xs"),c.plugins.translate(e)))}},$={state:{error:"",controller:new AbortController},onInit(t,e){c.plugins.translate(e),e.render()},async onSubmit(t,e,n){n.preventDefault();const r=new FormData(e),o=Object.fromEntries(r.entries());try{const a=await u.post("/api/broadcast",t.controller.signal,o);if(a.status!==201){t.error="error_create_broadcast";return}const{editor:l}=await a.json(),m=`/bc/editor/${l}`;window.history.pushState(null,null,m),c.injectPage(m)}catch(a){console.log("broadcast creation: ",a),t.error="error_create_broadcast"}},onClean(t){t.controller.abort()},render(){}},j={render(t,e,n){if(!n.key)return;const{value:r}=n;e.innerText!==r&&e.setAttribute("data-trans",r),c.plugins.translate(e)}},q={state:{value:"",error:""},onInput(t,e,n){t.value=n.target.value,t.error=""},render(){}},R={state:{broadcast:null,editors:[],loading:!0,error:null,controller:new AbortController},async onInit(t){const e=t.controller.signal;t.loading=!0;try{const n=await u.get("/api/broadcast",e),{broadcast:r,editors:o}=await n.json();t.broadcast=r,t.editors=o}catch(n){console.log(n)}finally{t.isInit=!0,t.loading=!1}},onClean(){this.state.controller.abort()},render(){}};function E(t,e){if(!(t!=null&&t.id))return;e.querySelector("[kll-id='broadcast_info_loader']").classList.add("hidden");const r=e.querySelector("[kll-id='broadcast_info']"),o=r.querySelector("[kll-id='broadcast_info_title']");o.value=t.name,r.classList.remove("hidden");const a=e.querySelector("[kll-id='broadcast_info_slider']");a.value=`${window.location.origin}/slider/${t.reader}`;const l=e.querySelector("[kll-id='broadcast_info_reader']");l.value=`${window.location.origin}/rc/reader/${t.reader}`,c.plugins.translate(e)}async function L(t,e){var o,a;if(!t)return;const n=document.querySelector("[kll-id='broadcast']"),r=(a=(o=n==null?void 0:n.state)==null?void 0:o.broadcast)==null?void 0:a.name;if(r&&r!==t)try{if((await u.put("/api/broadcast",e,{name:t})).status!==200)throw new Error("Error while updating broadcast name");window.document.title=`${t} | ROADCAST`,n.state.broadcast.name=t}catch(l){console.log(l)}}const H={state:{controller:new AbortController},onClean(t){t.controller.abort()},render(t,e,n){n.key==="broadcast"&&E(n.value,e),n.name==="broadcast_info_title"&&L(n.value,t.controller.signal)}},b="rc___lock";function S(){return localStorage.getItem(b)||"unlock"}function y(t,e){const n=e.querySelector(`[data-type="${t}"]`);e.querySelector(`[data-type="${t==="lock"?"unlock":"lock"}"]`).classList.add("hidden"),n.classList.remove("hidden"),t==="lock"?(document.documentElement.classList.remove("unlock"),document.documentElement.classList.add("lock")):(document.documentElement.classList.remove("lock"),document.documentElement.classList.add("unlock")),localStorage.setItem(b,t)}const K={state:{lock:void 0},onInit(t,e){const n=S();t.lock=n==="lock",y(n,e)},onClick(t,e){const n=e.getAttribute("data-type");y(n==="lock"?"unlock":"lock",e.parentElement),t.lock=!t.lock},render(){}},O={state:{value:"",delay:800,timeout:null},async onInput(t,e){clearTimeout(t.timeout),t.timeout=setTimeout(()=>{t.value=e.value},t.delay)},onClean(t){clearTimeout(t.timeout)},render(t,e,n){n&&n.key==="lock"&&(e.disabled=n.value)}};export{R as broadcast,H as broadcastInfo,A as button,$ as createBroadcastForm,j as errorMsg,S as getLsLock,U as header,q as input,O as invisibleInput,D as lastBroadcast,T as link,K as lock,B as lsKEY,N as rupteur,C as translate};