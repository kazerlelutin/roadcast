(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const n of c)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(c){const n={};return c.integrity&&(n.integrity=c.integrity),c.referrerPolicy&&(n.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?n.credentials="include":c.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(c){if(c.ep)return;c.ep=!0;const n=r(c);fetch(c.href,n)}})();const I="modulepreload",O=function(f){return"/"+f},T={},b=function(e,r,s){let c=Promise.resolve();if(r&&r.length>0){const n=document.getElementsByTagName("link");c=Promise.all(r.map(a=>{if(a=O(a),a in T)return;T[a]=!0;const u=a.endsWith(".css"),l=u?'[rel="stylesheet"]':"";if(!!s)for(let i=n.length-1;i>=0;i--){const h=n[i];if(h.href===a&&(!u||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${l}`))return;const t=document.createElement("link");if(t.rel=u?"stylesheet":I,u||(t.as="script",t.crossOrigin=""),t.href=a,document.head.appendChild(t),u)return new Promise((i,h)=>{t.addEventListener("load",i),t.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${a}`)))})}))}return c.then(()=>e()).catch(n=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n})};var j=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function N(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}var P={exports:{}};(function(f,e){(function(r,s){f.exports=s()})(typeof window<"u"?window:j,()=>{const r="2",s=function(){},c=function(t){try{return JSON.stringify(t)}catch(i){throw new u(i,a.USER)}},n=function(t){return i=>{setTimeout(()=>t(i),0)}},a={TIMEOUT:"timeout",DISCONNECT:"disconnect",SERVER:"server",PROTOCOL:"protocol",WS:"ws",USER:"user"},u=function(t,i){typeof t=="string"&&(t=new Error(t)),t.type=i,t.isNes=!0;try{throw t}catch(h){return h}},l={1e3:"Normal closure",1001:"Going away",1002:"Protocol error",1003:"Unsupported data",1004:"Reserved",1005:"No status received",1006:"Abnormal closure",1007:"Invalid frame payload data",1008:"Policy violation",1009:"Message too big",1010:"Mandatory extension",1011:"Internal server error",1015:"TLS handshake"},d=function(t,i){i=i||{},this._isBrowser=typeof WebSocket<"u",this._isBrowser||(i.ws=i.ws||{},i.ws.maxPayload===void 0&&(i.ws.maxPayload=0)),this._url=t,this._settings=i,this._heartbeatTimeout=!1,this._ws=null,this._reconnection=null,this._reconnectionTimer=null,this._ids=0,this._requests={},this._subscriptions={},this._heartbeat=null,this._packets=[],this._disconnectListeners=null,this._disconnectRequested=!1,this.onError=h=>console.error(h),this.onConnect=s,this.onDisconnect=s,this.onHeartbeatTimeout=s,this.onUpdate=s,this.id=null};return d.WebSocket=typeof WebSocket>"u"?null:WebSocket,d.prototype.connect=function(t){return t=t||{},this._reconnection?Promise.reject(new u("Cannot connect while client attempts to reconnect",a.USER)):this._ws?Promise.reject(new u("Already connected",a.USER)):(t.reconnect!==!1?this._reconnection={wait:0,delay:t.delay||1e3,maxDelay:t.maxDelay||5e3,retries:t.retries||1/0,settings:{auth:t.auth,timeout:t.timeout}}:this._reconnection=null,new Promise((i,h)=>{this._connect(t,!0,o=>o?h(o):i())}))},d.prototype._connect=function(t,i,h){const o=this._isBrowser?new d.WebSocket(this._url):new d.WebSocket(this._url,this._settings.ws);this._ws=o,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const m=_=>{o.onopen&&p(new u("Connection terminated while waiting to connect",a.WS));const g=this._disconnectRequested;this._cleanup();const E={code:_.code,explanation:l[_.code]||"Unknown",reason:_.reason,wasClean:_.wasClean,willReconnect:this._willReconnect(),wasRequested:g};this.onDisconnect(E.willReconnect,E),this._reconnect()},p=_=>{if(h){const g=h;return h=null,g(_)}return this.onError(_)},y=()=>{if(this._cleanup(),p(new u("Connection timed out",a.TIMEOUT)),i)return this._reconnect()},k=t.timeout?setTimeout(y,t.timeout):null;o.onopen=()=>{clearTimeout(k),o.onopen=null,this._hello(t.auth).then(()=>{this.onConnect(),p()}).catch(_=>{_.path&&delete this._subscriptions[_.path],this._disconnect(()=>n(p)(_),!0)})},o.onerror=_=>{if(clearTimeout(k),this._willReconnect())return m(_);this._cleanup();const g=new u("Socket error",a.WS);return p(g)},o.onclose=m,o.onmessage=_=>this._onMessage(_)},d.prototype.overrideReconnectionAuth=function(t){return this._reconnection?(this._reconnection.settings.auth=t,!0):!1},d.prototype.reauthenticate=function(t){this.overrideReconnectionAuth(t);const i={type:"reauth",auth:t};return this._send(i,!0)},d.prototype.disconnect=function(){return new Promise(t=>this._disconnect(t,!1))},d.prototype._disconnect=function(t,i){this._reconnection=null,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const h=this._disconnectRequested||!i;if(this._disconnectListeners){this._disconnectRequested=h,this._disconnectListeners.push(t);return}if(!this._ws||this._ws.readyState!==d.WebSocket.OPEN&&this._ws.readyState!==d.WebSocket.CONNECTING)return t();this._disconnectRequested=h,this._disconnectListeners=[t],this._ws.close()},d.prototype._cleanup=function(){if(this._ws){const o=this._ws;this._ws=null,o.readyState!==d.WebSocket.CLOSED&&o.readyState!==d.WebSocket.CLOSING&&o.close(),o.onopen=null,o.onclose=null,o.onerror=s,o.onmessage=null}this._packets=[],this.id=null,clearTimeout(this._heartbeat),this._heartbeat=null;const t=new u("Request failed - server disconnected",a.DISCONNECT),i=this._requests;this._requests={};const h=Object.keys(i);for(let o=0;o<h.length;++o){const m=h[o],p=i[m];clearTimeout(p.timeout),p.reject(t)}if(this._disconnectListeners){const o=this._disconnectListeners;this._disconnectListeners=null,this._disconnectRequested=!1,o.forEach(m=>m())}},d.prototype._reconnect=function(){const t=this._reconnection;if(!t||this._reconnectionTimer)return;if(t.retries<1)return this._disconnect(s,!0);--t.retries,t.wait=t.wait+t.delay;const i=Math.min(t.wait,t.maxDelay);this._reconnectionTimer=setTimeout(()=>{this._connect(t.settings,!1,h=>{if(h)return this.onError(h),this._reconnect()})},i)},d.prototype.request=function(t){typeof t=="string"&&(t={method:"GET",path:t});const i={type:"request",method:t.method||"GET",path:t.path,headers:t.headers,payload:t.payload};return this._send(i,!0)},d.prototype.message=function(t){const i={type:"message",message:t};return this._send(i,!0)},d.prototype._isReady=function(){return this._ws&&this._ws.readyState===d.WebSocket.OPEN},d.prototype._send=function(t,i){if(!this._isReady())return Promise.reject(new u("Failed to send message - server disconnected",a.DISCONNECT));t.id=++this._ids;try{var h=c(t)}catch(p){return Promise.reject(p)}if(!i)try{return this._ws.send(h),Promise.resolve()}catch(p){return Promise.reject(new u(p,a.WS))}const o={resolve:null,reject:null,timeout:null},m=new Promise((p,y)=>{o.resolve=p,o.reject=y});this._settings.timeout&&(o.timeout=setTimeout(()=>(o.timeout=null,o.reject(new u("Request timed out",a.TIMEOUT))),this._settings.timeout)),this._requests[t.id]=o;try{this._ws.send(h)}catch(p){return clearTimeout(this._requests[t.id].timeout),delete this._requests[t.id],Promise.reject(new u(p,a.WS))}return m},d.prototype._hello=function(t){const i={type:"hello",version:r};t&&(i.auth=t);const h=this.subscriptions();return h.length&&(i.subs=h),this._send(i,!0)},d.prototype.subscriptions=function(){return Object.keys(this._subscriptions)},d.prototype.subscribe=function(t,i){if(!t||t[0]!=="/")return Promise.reject(new u("Invalid path",a.USER));const h=this._subscriptions[t];if(h)return h.indexOf(i)===-1&&h.push(i),Promise.resolve();if(this._subscriptions[t]=[i],!this._isReady())return Promise.resolve();const o={type:"sub",path:t},m=this._send(o,!0);return m.catch(p=>{delete this._subscriptions[t]}),m},d.prototype.unsubscribe=function(t,i){if(!t||t[0]!=="/")return Promise.reject(new u("Invalid path",a.USER));const h=this._subscriptions[t];if(!h)return Promise.resolve();let o=!1;if(!i)delete this._subscriptions[t],o=!0;else{const y=h.indexOf(i);if(y===-1)return Promise.resolve();h.splice(y,1),h.length||(delete this._subscriptions[t],o=!0)}if(!o||!this._isReady())return Promise.resolve();const m={type:"unsub",path:t},p=this._send(m,!0);return p.catch(s),p},d.prototype._onMessage=function(t){this._beat();let i=t.data;const h=i[0];if(h!=="{"){if(this._packets.push(i.slice(1)),h!=="!")return;i=this._packets.join(""),this._packets=[]}this._packets.length&&(this._packets=[],this.onError(new u("Received an incomplete message",a.PROTOCOL)));try{var o=JSON.parse(i)}catch(k){return this.onError(new u(k,a.PROTOCOL))}let m=null;if(o.statusCode&&o.statusCode>=400&&(m=new u(o.payload.message||o.payload.error||"Error",a.SERVER),m.statusCode=o.statusCode,m.data=o.payload,m.headers=o.headers,m.path=o.path),o.type==="ping")return this._send({type:"ping"},!1).catch(s);if(o.type==="update")return this.onUpdate(o.message);if(o.type==="pub"||o.type==="revoke"){const k=this._subscriptions[o.path];if(o.type==="revoke"&&delete this._subscriptions[o.path],k&&o.message!==void 0){const _={};o.type==="revoke"&&(_.revoked=!0);for(let g=0;g<k.length;++g)k[g](o.message,_)}return}const p=this._requests[o.id];if(!p)return this.onError(new u("Received response for unknown request",a.PROTOCOL));clearTimeout(p.timeout),delete this._requests[o.id];const y=(k,_)=>k?p.reject(k):p.resolve(_);return o.type==="request"?y(m,{payload:o.payload,statusCode:o.statusCode,headers:o.headers}):o.type==="message"?y(m,{payload:o.message}):o.type==="hello"?(this.id=o.socket,o.heartbeat&&(this._heartbeatTimeout=o.heartbeat.interval+o.heartbeat.timeout,this._beat()),y(m)):o.type==="reauth"?y(m,!0):o.type==="sub"||o.type==="unsub"?y(m):(y(new u("Received invalid response",a.PROTOCOL)),this.onError(new u("Received unknown response type: "+o.type,a.PROTOCOL)))},d.prototype._beat=function(){this._heartbeatTimeout&&(clearTimeout(this._heartbeat),this._heartbeat=setTimeout(()=>{this.onError(new u("Disconnecting due to heartbeat timeout",a.TIMEOUT)),this.onHeartbeatTimeout(this._willReconnect()),this._ws.close()},this._heartbeatTimeout))},d.prototype._willReconnect=function(){return!!(this._reconnection&&this._reconnection.retries>=1)},{Client:d}})})(P);var z=P.exports;const M=N(z);class v{constructor(e){this.kll=e,this.name=""}apply(){this.name&&typeof this.action=="function"?this.kll[this.name]=this.action.bind(this):console.warn(`action is not a function or name is not defined for plugin ${this.constructor.name}`)}action(){console.warn("the plugin action is not defined")}}class S{constructor(e){this.id=e.id,this.routes={},this.routesAsync=e.routes,this.cleanupCollection=[],this.plugins={};const r=e.plugins||[];this.initialize=!1,this.ctrlPath=e.ctrlPath||void 0,this.templatePath=e.templatePath||void 0,this.initsIds=[],r.forEach(s=>{const c=s.prototype instanceof v?new s(this):s();c.name?this.plugins[c.name]=(...n)=>c.action(...n):console.warn(`Plugin ${s.name} as no name.`)}),this._init()}async _init(){const e=document.getElementById(this.id);if(!e){console.warn(`No element found with id ${this.id}`);return}e.routes=this.routes,await this.injectPage(),window.addEventListener("popstate",()=>{this.injectPage()})}parseRoute(e){const r=e||window.location.pathname,s=r.split("/").splice(1),c=Object.keys(this.routesAsync),n={},a=c.reduce((u,l)=>{const d=l.split("/").splice(1);return d.length!==s.length||d.forEach((t,i)=>{t.startsWith(":")?n[t.substring(1)]=s[i]:t===s[i]&&(u=l)}),u},"/");return{params:n,template:a,route:r}}async injectPage(e){this.initsIds=[],this.initialize||this.routesAsync["/"]&&(this.routes["/"]=await this.routesAsync["/"]),this.initialize=!0;const{template:r}=this.parseRoute(e);let s=this.routes[r];s||(s=await this.routesAsync[r],this.routes[r]=s);const c=document.querySelector(`#${this.id}`);if(this.cleanUp(),s)c.innerHTML=s,await this.hydrateNestedComponents(this.sanitizeElement(c));else{const n=Object.keys(this.routes);c.innerHTML=this.routes[n[0]]}}static getState(e){const r=document.querySelector(`[kll-id='${e}']`);return(r==null?void 0:r.state)||{}}async reload(e){const s=[...e.querySelectorAll("[kll-id]")].map(c=>c.getAttribute("kll-id"));this.initsIds=this.initsIds.filter(c=>!s.includes(c)),this.hydrateNestedComponents(e)}async hydrate(e){var a,u;this.sanitizeElement(e),this.cleanUpElement(e);let r=e.getAttribute("kll-id");if(!r){const l=e.getAttribute("kll-t"),d=e.getAttribute("kll-c"),t=e.getAttribute("kll-tc"),i=e.getAttribute("kll-ctrl"),h=e.getAttribute("kll-m"),o=e.getAttribute("kll-tm");l&&i?r=`${l}_${i}`:l&&h&&i?r=`${l}_${h}_${i}`:l&&h&&d?r=`${l}_${h}_${d}`:o&&i?r=`${o}_${i}`:o&&d?r=`${o}_${d}`:d?r=d:t?r=t:l?r=l:i&&(r=i)}if(this.initsIds.includes(r))return;if(e.getAttribute("kll-c")){const l=e.getAttribute("kll-c");e.setAttribute("kll-ctrl",l),e.removeAttribute("kll-c")}if(e.getAttribute("kll-tc")){const l=e.getAttribute("kll-tc");e.setAttribute("kll-t",l),e.setAttribute("kll-ctrl",l),e.removeAttribute("kll-tc")}if(e.getAttribute("kll-tm")){const l=e.getAttribute("kll-tm");e.setAttribute("kll-t",l),e.setAttribute("kll-m",l),e.removeAttribute("kll-tm")}const s=await this.processAttributes(e),c=document.createElement("div");s!=null&&s.template&&c.appendChild(s.template);const n=s.template?c.firstElementChild:e;for(const l in s.attrs)n.setAttribute(l,s.attrs[l]);if(!this.initsIds.includes(n.kllId)){if(n._listeners={},n.state=this.handleInitState(s.state,n,(a=s.ctrl)==null?void 0:a.render),n.kllId=r,n.setAttribute("kll-id",r),this.handleAttachMethods(n,s.middlewares,s.ctrl,n.state),n.getState=l=>S.getState(l),n.querySelector("slot")){const l=n.querySelector("slot"),d=document.createElement("div");d.innerHTML=e.innerHTML,l.innerHTML="",l.replaceWith(d.firstElementChild?d.firstElementChild:d.innerHTML)}s.template&&(e.replaceWith(n),await this.hydrateNestedComponents(this.sanitizeElement(n))),(u=n==null?void 0:n.onInit)==null||u.call(n),this.initsIds.push(n.kllId)}}async hydrateNestedComponents(e){const r=e.querySelectorAll("[kll-t], [kll-ctrl], [kll-tc], [kll-tm], [kll-m]");for(const s of r)await this.hydrate(s)}cleanUpElement(e){var r;e!=null&&e._listeners&&(Object.keys(e._listeners).forEach(s=>{e.removeEventListener(s,e._listeners[s])}),e._listeners={},(r=e==null?void 0:e.cleanUp)==null||r.call(e))}cleanUp(){this.initsIds=[],this.cleanupCollection.forEach(e=>{e==null||e()}),this.cleanupCollection=[]}handleInitState(e,r,s){return new Proxy(e,{set:(c,n,a)=>{const u=Reflect.set(c,n,a);return s==null||s(r.state,r,{name:r.kllId,key:n,value:a}),this.handleTriggerState(n,a,r.kllId),u}})}async handleTriggerState(e,r,s){var n,a;const c=document.querySelectorAll(`[kll-b*='${s}.${e}']`);for(const u of c){const l={key:e,value:r,name:s};(n=u==null?void 0:u.cleanUp)==null||n.call(u,l),(a=u==null?void 0:u.render)==null||a.call(u,l)}}async processAttributes(e){const r={state:[],ctrl:{},template:void 0,middlewares:{state:{}},attrs:{},kllId:null};for(const s of e.getAttributeNames()){const c=e.getAttribute(s);s.startsWith("kll-s")&&r.state.push({[s.slice(6)]:c}),s==="kll-m"&&(r.middlewares=await this.processCtrl(c)),s==="kll-ctrl"?r.ctrl=await this.processCtrl(c):s==="kll-t"&&(r.template=await this.processTemplate(c)),(!s.startsWith("kll-")||s==="kll-b")&&(r.attrs[s]=c)}return r.ctrl.state&&(r.state=[...Object.keys(r.middlewares.state).map(s=>({[s]:r.ctrl.state[s]})),...Object.keys(r.ctrl.state).map(s=>({[s]:r.ctrl.state[s]})),...r.state]),r.state=r.state.reduce((s,c)=>({...s,...c}),{}),r}async processTemplate(e){const s=(await this.templatePath)[e];if(!s)return console.warn(`No template found with name ${e}`);const c=document.createElement("div");c.innerHTML=s.default;const n=c.querySelector(`#${e}`).content,a=document.importNode(n,!0),u=document.createElement("div");return u.appendChild(a),this.sanitizeElement(u.firstElementChild)}async processCtrl(e){return(await this.ctrlPath)[e]}handleAttachMethods(e,r,s,c){const n=Object.keys(r).filter(l=>l.startsWith("on")).filter(l=>!l.match(/state|oninit|cleanup/i)),a=Object.keys(s).filter(l=>l.startsWith("on")).filter(l=>!l.match(/state|oninit|cleanup/i));(r.render||s.render)&&(e.render=async l=>{const d=l||{name:void 0,key:void 0,value:void 0},t=r.render?await r.render(c,e,d):void 0;s.render&&s.render(c,e,d,t)}),(r.onInit||s.onInit)&&(e.onInit=async()=>{const l=r.onInit?await r.onInit(c,e):void 0;s.onInit&&s.onInit(c,e,l)}),(r.cleanUp||s.cleanUp)&&(e.cleanUp=()=>{const l=r.cleanUp?r.cleanUp(c,e):void 0;s.cleanUp&&s.cleanUp(c,e,l),this.cleanupCollection.push(e.cleanUp)}),[...n,...a].forEach(l=>{const d=l.slice(2).toLocaleLowerCase(),t=async i=>{const h=r[l]?await r[l](c,i.target,i):void 0;s[l]&&s[l](c,i.target,i,h)};e._listeners[d]=t,e.addEventListener(d,t)})}registerPlugin(e,r){this.plugins[e]=r}sanitizeElement(e){return e.querySelectorAll("script").forEach(c=>c.remove()),e.querySelectorAll("*").forEach(c=>{[...c.attributes].forEach(n=>{const a=/<script|<ifr|<em|<img|javascript:/i.test(n.value);(n.name.startsWith("on")||a)&&(console.warn(`Attribute ${n.name} removed from element ${c.tagName}, possible XSS.`),c.removeAttribute(n.name))})}),e}}class U extends v{constructor(e){super(e),this.name="createComponent"}action(e,r,s,c={}){const n=document.createElement("div");n.setAttribute("kll-t",e),n.setAttribute("kll-ctrl",r),n.setAttribute("kll-id",s);for(const[a,u]of Object.entries(c))n.setAttribute(`kll-s-${a}`,u);return this.kll.hydrate(n),n}}class $ extends v{constructor(e,r,s="__kll__lang"){super(e),this.lang="en",this.lsKey=s,this.name="translate",this.translation=r||{}}getLang(){const e=localStorage.getItem(this.lsKey)||"en";return this.lang=e,e}setLang(e){localStorage.setItem(this.lsKey,e),this.lang=e}action(e){const r=this.getLang(),s=e?[e].concat(Array.from(e.querySelectorAll("[data-trans]"))):document.querySelectorAll("[data-trans]"),c=e?[e].concat(Array.from(e.querySelectorAll("[placeholder]"))):document.querySelectorAll("[placeholder]");return s.forEach(n=>{var a,u;if(n.hasAttribute("data-trans")){const l=n.getAttribute("data-trans"),d=n.getAttribute("data-trans-count"),t=d>1?`${l}_multi`:l;let i=((u=(a=this.translation)==null?void 0:a[t])==null?void 0:u[this.lang])||l;d&&(i=i.replace("{{count}}",d)),n.innerText=i}}),c.forEach(n=>{var a,u;if(n.hasAttribute("placeholder")){const l=n.getAttribute("placeholder"),d=((u=(a=this.translation)==null?void 0:a[l])==null?void 0:u[r])||l;n.setAttribute("placeholder",d)}}),e}}const x={kofi:{fr:"Payez-moi un café",en:"Buy me a coffee",ko:"커피 한잔 사주세요"},titleHome:{fr:"Gérez et partagez vos conducteurs",en:"Manage and share your drivers",ko:"드라이버를 관리하고 공유하세요"},home:{fr:"Accueil",en:"Home",ko:"홈"},subtitleHome:{fr:"Organisez et planifiez vos émissions en un clin d'œil!",en:"Organize and plan your broadcasts in a snap!",ko:"방송을 쉽게 계획하세요"},appSummarySchedule:{fr:"Gérez votre calendrier d'émissions, ajoutez des sujets, descriptifs, dates, invitez des participants et suivez l'état de vos projets en toute simplicité.",en:"Manage your broadcast calendar, add topics, descriptions, dates, invite participants and track the status of your projects with ease.",ko:"방송 일정을 관리하고, 주제와 설명을 추가하고, 날짜를 정하고, 참여자를 초대하세요"},noAccountRequired:{fr:"Commencez tout de suite, aucune création de compte requise!",en:"Start right away, no account creation required!",ko:"계정을 만들 필요 없이 바로 시작하세요"},appSummary:{fr:"Vous pouvez rédiger des conducteurs et les partager avec vos chroniqueurs, diffuser des médias sur votre live, et bien plus encore.",en:"You can write drivers and share them with your reporters, broadcast media on your live, and much more.",ko:"드라이버를 작성하고, 리포터와 공유하고, 라이브 방송에 미디어를 전송하세요"},connectWith:{fr:"Connectez-vous avec",en:"Connect with",ko:"로그인"},twitchButtonDescription:{fr:"Connectez-vous à votre compte Twitch pour commencer à utiliser l'application.",en:"Connect to your Twitch account to start using the application.",ko:"Twitch 계정으로 로그인하세요"},loading:{en:"Loading...",fr:"Chargement...",ko:"로딩중..."},twitch_wait:{fr:"Vous allez être redirigé",en:"You will be redirected",ko:"잠시후 리다이렉트 됩니다"},Expires:{fr:"Expire",en:"Expires",ko:"만료"},"admin link":{fr:"lien administrateur",en:"admin link",ko:"관리자 링크"},activated:{fr:"activer",en:"activated",ko:"활성화"},delete:{fr:"supprimer",en:"delete",ko:"삭제"},active_channel:{fr:"Chaîne active",en:"Active channel",ko:"활성화된 채널"},title_channel_button:{fr:"Mes chaînes",en:"My channels",ko:"내 채널"},send:{fr:"envoyer",en:"send",ko:"전송"},see_all:{en:"see all",fr:"voir tout",ko:"모두 보기"},info_create_channel:{en:"This show will be created for the channel:",fr:"Cette émission sera créée pour la chaîne :",ko:"이 방송은 다음 채널에 생성됩니다"},create_the_show:{en:"create the show",fr:"créer l'emission",ko:"방송 생성"},show:{en:"show",fr:"émission",ko:"방송"},show_name:{en:"Show name",fr:"Nom de l'émission",ko:"방송명"},add_desc:{fr:"Ajouter une description",en:"Add description",ko:"설명 추가"},no_result:{fr:"Aucun résultat",en:"No result",ko:"결과 없음"},name_required:{fr:"Le nom est requis",en:"Name is required",ko:"이름을 입력하세요"},noMessage:{fr:"Aucun message",en:"No message",ko:"메시지 없음"},Channel:{fr:"Chaîne",en:"Channel",ko:"채널"},cancel:{fr:"Annuler",en:"Cancel",ko:"취소"},save:{fr:"Enregistrer",en:"Save",ko:"저장"},submit:{fr:"Envoyer",en:"Submit",ko:"전송"},AccountType:{fr:"Type de compte",en:"Account type",ko:"계정 타입"},title:{fr:"titre",en:"title",ko:"제목"},Title:{fr:"Titre",en:"Title",ko:"제목"},noMedia:{en:"No media sended",fr:"Aucun média envoyé",ko:"미디어 없음"},noMediaFound:{en:"No media found",fr:"Aucun média trouvé",ko:"미디어 없음"},freeProfileDesc:{fr:"Vous êtes limité à 100mo de stockage pour vos medias (n'inclut pas les médias en ligne).",en:"You are limited to 100mo of storage for your media (does not include online media).",ko:"100mb의 스토리지를 사용할 수 있습니다"},selectChronicle:{fr:"Sélectionnez une chronique",en:"Select a chronicle",ko:"크로니클 선택"},source:{en:"Source",fr:"Source",ko:"소스"},editor:{en:"Editor",fr:"Chroniqueur",ko:"크로니클러"},about:{fr:"À propos",en:"About",ko:"소개"},legalNotice:{fr:"Mentions légales",en:"Legal notice",ko:"법적 고지"},contact:{fr:"Contact",en:"Contact",ko:"연락처"},confirm:{en:"Confirm",fr:"Confirmer",ko:"확인"},noText:{en:"No text",fr:"Pas de texte",ko:"텍스트 없음"},noEditor:{en:"No editor",fr:"Aucun chroniqueur",ko:"크로니클러 없음"},noBroadcast:{en:"No broadcast selected",fr:"Aucune émission sélectionnée",ko:"방송 선택 안됨"},editMode:{en:"Edit mode",fr:"Mode édition",ko:"편집 모드"},readMode:{en:"Read mode",fr:"Mode lecture",ko:"읽기 모드"},normalMode:{en:"Normal mode",fr:"Mode normal",ko:"일반 모드"},FocusMode:{en:"Focus mode",fr:"Mode focus",ko:"포커스 모드"},SelectEditor:{en:"Select an editor",fr:"Sélectionnez un chroniqueur",ko:"크로니클러 선택"},create:{en:"Create",fr:"Créer",ko:"생성"},createBroadcast:{en:"Create a broadcast",fr:"Créer une émission",ko:"방송 생성"},createWithHistory:{fr:"Créer un conducteur avec historique",en:"Create a new broadcast with history",ko:"새로운 방송 생성"},createWithHistoryDesc:{fr:"Validez la création et conservez l'historique des sujets, sources et chroniqueurs des émissions précédentes. Organisez votre prochain épisode avec cohérence et efficacité !",en:"Validate the creation and keep the history of the subjects, sources and editors of the previous broadcasts. Organize your next episode with consistency and efficiency!",ko:"생성을 확인하고, 이전 방송의 주제, 소스, 크로니클러를 유지하세요"},chroniclesHistory:{fr:"Historique des chroniques",en:"Chronicle history",ko:"크로니클 히스토리"},drivers:{fr:"Conducteurs",en:"broadcasts",ko:"방송"},schedule:{fr:"planning",en:"schedule",ko:"일정"},subject:{en:"Subject",fr:"Titre",ko:"주제"},info:{en:"Info",fr:"Info",ko:"정보"},guests:{en:"Guests",fr:"Invités",ko:"게스트"},editors:{fr:"Chroniqueurs",en:"Editors",ko:"크로니클러"},start_at:{fr:"Horaire",en:"Schedule",ko:"시간"},status:{en:"Status",fr:"Statut",ko:"상태"},close:{en:"Close",fr:"Fermer",ko:"닫기"},project:{en:"Project",fr:"Projet",ko:"프로젝트"},delayed:{fr:"Reporté",en:"Delayed",ko:"연기"},progress:{fr:"En cours",en:"In progress",ko:"진행중"},done:{fr:"Terminé",en:"Done",ko:"완료"},noGuests:{fr:"Aucun invité",en:"No guests",ko:"게스트 없음"},SelectGuests:{fr:"Sélectionnez des invités",en:"Select guests",ko:"게스트 선택"},broadcast:{fr:"conducteur",en:"broadcast",ko:"방송"},about_1:{fr:"Roadcast est une application que j'ai créée pour aider les utilisateurs à gérer et à partager facilement des conducteurs pour leurs émissions en direct. L'application est conçue pour être intuitive et facile à utiliser, même pour les utilisateurs novices.",en:"Roadcast is an application that I created to help users easily manage and share drivers for their live streams. The app is designed to be intuitive and easy to use, even for novice users.",ko:"Roadcast는 라이브 방송을 위한 방송 스크립트를 쉽게 관리하고 공유할 수 있도록 도와주는 앱입니다. 이 앱은 직관적이고 쉽게 사용할 수 있도록 설계되었습니다."},about_2:{fr:"L'une des caractéristiques clés de Roadcast est sa gratuité totale d'utilisation, sans aucun compte utilisateur requis. Roadcast est accessible à tous.",en:"One of the key features of Roadcast is its completely free to use, with no user account required. Roadcast is accessible to everyone.",ko:"Roadcast의 주요 기능 중 하나는 사용자 계정이 필요 없는 완전히 무료라는 것입니다. Roadcast는 누구나 사용할 수 있습니다."},about_3:{fr:"Le code source de l'application est open source et est disponible sur ",en:"The source code for the app is open source and is available on ",ko:"이 앱의 소스 코드는 오픈 소스이며 다음에서 확인할 수 있습니다"},about_4:{fr:"Si vous êtes intéressé par le développement d'applications, je vous encourage à explorer le code et à contribuer à son amélioration en partageant vos commentaires et suggestions.",en:"If you are interested in app development, I encourage you to explore the code and contribute to its improvement by sharing your feedback and suggestions.",ko:"앱 개발에 관심이 있다면 코드를 살펴보고 피드백과 제안을 공유하여 개선에 기여하길 바랍니다."},about_5:{fr:"Enfin, si vous trouvez l'application Roadcast utile et que vous souhaitez me soutenir dans le développement continu de l'application, vous pouvez faire un don sur ma page <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a>. Votre soutien m'aidera à continuer à fournir des mises à jour et des améliorations pour Roadcast.",en:"Finally, if you find the Roadcast app useful and would like to support me in the continued development of the app, you can make a donation on my <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a> page. Your support will help me continue to provide updates and improvements for Roadcast.",ko:'마지막으로, Roadcast 앱이 유용하다고 생각되고 앱을 계속 개발하고 싶다면 <a href="https://ko-fi.com/kazerlelutin" target="_blank" rel="noopener noreferrer">Ko-Fi</a> 페이지에서 기부할 수 있습니다. 여러분의 지원은 Roadcast의 업데이트와 개선을 계속할 수 있도록 도와줍니다.'},about_6:{fr:"Merci d'avoir choisi Roadcast pour vos besoins de diffusion en direct. J'espère que vous trouverez l'application utile et je suis impatient de voir les émissions que vous créerez avec elle.",en:"Thank you for choosing Roadcast for your live streaming needs. I hope you find the app useful and I look forward to seeing the shows you create with it.",ko:"라이브 방송을 위해 Roadcast를 선택해 주셔서 감사합니다. 이 앱이 유용하다고 생각되고 여러분이 만드는 방송을 기대합니다."},editorTitle:{fr:"Éditeur",en:"Editor",ko:"크로니클러"},editor_content:{fr:'Le site Roadcast est édité par Benoist Bouteiller. Vous pouvez me contacter via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.',en:'The Roadcast site is edited by Benoist Bouteiller. You can contact me via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.',ko:'Roadcast 사이트는 Benoist Bouteiller가 편집합니다. <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>를 통해 연락할 수 있습니다.'},hostingTitle:{fr:"Hébergement",en:"Hosting",ko:"호스팅"},hosting_content:{fr:'Roadcast est hébergé par <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.',en:'Roadcast is hosted by <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.',ko:'Roadcast는 <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>에서 호스팅합니다.'},error_create_broadcast:{fr:"Une erreur s'est produite lors de la création de l'émission",en:"An error occurred while creating the broadcast",ko:"방송 생성 중 오류가 발생했습니다"},no_broadcast_history:{fr:"Vous n'avez pas encore créé d'émission",en:"You have not created any broadcasts yet",ko:"방송을 생성하지 않았습니다"},slider_link:{fr:"Lien du slider",en:"Slider link",ko:"슬라이더 링크"},reader_link:{fr:"Lien du lecteur",en:"Reader link",ko:"리더 링크"},add_chronicle:{fr:"Ajouter une chronique",en:"Add a chronicle",ko:"크로니클 추가"},no_chronicle:{fr:"Vous n'avez pas encore créé de chronique",en:"You have not created any chronicles yet",ko:"크로니클을 생성하지 않았습니다"},chronicle_title:{fr:"Titre: ",en:"Title: ",ko:"제목: "},chronicle_source:{fr:"Source: ",en:"Source: ",ko:"소스: "},no_title:{fr:"Pas de titre",en:"No title",ko:"제목 없음"},no_source:{fr:"Pas de source",en:"No source",ko:"소스 없음"},lock_edit_chronicle:{fr:"Un chroniqueur est en train d'éditer cette chronique",en:"A reporter is editing this chronicle",ko:"크로니클러가 크로니클을 편집 중입니다"},confirm_delete_chronicle:{fr:"Confirmer la suppression de la chronique",en:"Confirm chronicle deletion",ko:"크로니클 삭제 확인"},format_not_supported:{fr:"Format non supporté",en:"Format not supported",ko:"지원되지 않는 포맷"}};function C(f,e,r){f.classList.add(e),f.classList.remove(r)}const A="rc__theme";function W(){return localStorage.getItem(A)||"dark"}function R(f,e){const r=e.querySelector(`[data-type="${f}"]`);e.querySelector(`[data-type="${f==="dark"?"light":"dark"}"]`).classList.add("hidden"),r.classList.remove("hidden"),f==="dark"?C(document.documentElement,"dark","light"):C(document.documentElement,"light","dark"),localStorage.setItem(A,f)}const V={onInit(f,e){const r=W();R(r,e)},onClick(f,e){const r=e.getAttribute("data-type");R(r==="dark"?"light":"dark",e.parentElement)}},q=new M.Client(`ws://${window.location.host}`,{reconnect:!0,maxDelay:1e3}),L="__rc__lang";localStorage.setItem(L,window.navigator.language.split("-")[0]);const w={id:"app",routes:{"/":b(()=>import("./index-NlpvFgI7.js"),__vite__mapDeps([])).then(f=>f.default),"/about":b(()=>import("./about-peDid3aD.js"),__vite__mapDeps([])).then(f=>f.default),"/legal":b(()=>import("./legal-AkeicHcm.js"),__vite__mapDeps([])).then(f=>f.default),"/bc/editor/:editor":b(()=>import("./broadcast-editor-UwFxDsam.js"),__vite__mapDeps([])).then(f=>f.default),"/slider/:reader":b(()=>import("./slider-pR2js5Ci.js"),__vite__mapDeps([])).then(f=>f.default)},plugins:[U,f=>new $(f,x,L)]};w.ctrlPath=b(()=>import("./index-rifMvYQc.js"),__vite__mapDeps([])).then(f=>f),w.templatePath=b(()=>import("./index-hVhCHLHZ.js"),__vite__mapDeps([])).then(f=>f);const D=new S(w);addEventListener("DOMContentLoaded",()=>{const f=document.querySelector("#app");f._socket=q,q.connect(),f._socket.onConnect=()=>{console.log("I Listen Update")},D.plugins.translate()});const H=localStorage.getItem(A)||"dark";H==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.add("light");export{D as k,A as l,V as r,C as s};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
