(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const P="modulepreload",O=function(h){return"/"+h},C={},w=function(e,n,r){let a=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link");a=Promise.all(n.map(o=>{if(o=O(o),o in C)return;C[o]=!0;const l=o.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(!!r)for(let c=s.length-1;c>=0;c--){const d=s[c];if(d.href===o&&(!l||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${f}`))return;const t=document.createElement("link");if(t.rel=l?"stylesheet":P,l||(t.as="script",t.crossOrigin=""),t.href=o,document.head.appendChild(t),l)return new Promise((c,d)=>{t.addEventListener("load",c),t.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return a.then(()=>e()).catch(s=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s})};var I=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function j(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var q={exports:{}};(function(h,e){(function(n,r){h.exports=r()})(typeof window<"u"?window:I,()=>{const n="2",r=function(){},a=function(t){try{return JSON.stringify(t)}catch(c){throw new l(c,o.USER)}},s=function(t){return c=>{setTimeout(()=>t(c),0)}},o={TIMEOUT:"timeout",DISCONNECT:"disconnect",SERVER:"server",PROTOCOL:"protocol",WS:"ws",USER:"user"},l=function(t,c){typeof t=="string"&&(t=new Error(t)),t.type=c,t.isNes=!0;try{throw t}catch(d){return d}},f={1e3:"Normal closure",1001:"Going away",1002:"Protocol error",1003:"Unsupported data",1004:"Reserved",1005:"No status received",1006:"Abnormal closure",1007:"Invalid frame payload data",1008:"Policy violation",1009:"Message too big",1010:"Mandatory extension",1011:"Internal server error",1015:"TLS handshake"},u=function(t,c){c=c||{},this._isBrowser=typeof WebSocket<"u",this._isBrowser||(c.ws=c.ws||{},c.ws.maxPayload===void 0&&(c.ws.maxPayload=0)),this._url=t,this._settings=c,this._heartbeatTimeout=!1,this._ws=null,this._reconnection=null,this._reconnectionTimer=null,this._ids=0,this._requests={},this._subscriptions={},this._heartbeat=null,this._packets=[],this._disconnectListeners=null,this._disconnectRequested=!1,this.onError=d=>console.error(d),this.onConnect=r,this.onDisconnect=r,this.onHeartbeatTimeout=r,this.onUpdate=r,this.id=null};return u.WebSocket=typeof WebSocket>"u"?null:WebSocket,u.prototype.connect=function(t){return t=t||{},this._reconnection?Promise.reject(new l("Cannot connect while client attempts to reconnect",o.USER)):this._ws?Promise.reject(new l("Already connected",o.USER)):(t.reconnect!==!1?this._reconnection={wait:0,delay:t.delay||1e3,maxDelay:t.maxDelay||5e3,retries:t.retries||1/0,settings:{auth:t.auth,timeout:t.timeout}}:this._reconnection=null,new Promise((c,d)=>{this._connect(t,!0,i=>i?d(i):c())}))},u.prototype._connect=function(t,c,d){const i=this._isBrowser?new u.WebSocket(this._url):new u.WebSocket(this._url,this._settings.ws);this._ws=i,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const m=y=>{i.onopen&&p(new l("Connection terminated while waiting to connect",o.WS));const b=this._disconnectRequested;this._cleanup();const T={code:y.code,explanation:f[y.code]||"Unknown",reason:y.reason,wasClean:y.wasClean,willReconnect:this._willReconnect(),wasRequested:b};this.onDisconnect(T.willReconnect,T),this._reconnect()},p=y=>{if(d){const b=d;return d=null,b(y)}return this.onError(y)},_=()=>{if(this._cleanup(),p(new l("Connection timed out",o.TIMEOUT)),c)return this._reconnect()},g=t.timeout?setTimeout(_,t.timeout):null;i.onopen=()=>{clearTimeout(g),i.onopen=null,this._hello(t.auth).then(()=>{this.onConnect(),p()}).catch(y=>{y.path&&delete this._subscriptions[y.path],this._disconnect(()=>s(p)(y),!0)})},i.onerror=y=>{if(clearTimeout(g),this._willReconnect())return m(y);this._cleanup();const b=new l("Socket error",o.WS);return p(b)},i.onclose=m,i.onmessage=y=>this._onMessage(y)},u.prototype.overrideReconnectionAuth=function(t){return this._reconnection?(this._reconnection.settings.auth=t,!0):!1},u.prototype.reauthenticate=function(t){this.overrideReconnectionAuth(t);const c={type:"reauth",auth:t};return this._send(c,!0)},u.prototype.disconnect=function(){return new Promise(t=>this._disconnect(t,!1))},u.prototype._disconnect=function(t,c){this._reconnection=null,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const d=this._disconnectRequested||!c;if(this._disconnectListeners){this._disconnectRequested=d,this._disconnectListeners.push(t);return}if(!this._ws||this._ws.readyState!==u.WebSocket.OPEN&&this._ws.readyState!==u.WebSocket.CONNECTING)return t();this._disconnectRequested=d,this._disconnectListeners=[t],this._ws.close()},u.prototype._cleanup=function(){if(this._ws){const i=this._ws;this._ws=null,i.readyState!==u.WebSocket.CLOSED&&i.readyState!==u.WebSocket.CLOSING&&i.close(),i.onopen=null,i.onclose=null,i.onerror=r,i.onmessage=null}this._packets=[],this.id=null,clearTimeout(this._heartbeat),this._heartbeat=null;const t=new l("Request failed - server disconnected",o.DISCONNECT),c=this._requests;this._requests={};const d=Object.keys(c);for(let i=0;i<d.length;++i){const m=d[i],p=c[m];clearTimeout(p.timeout),p.reject(t)}if(this._disconnectListeners){const i=this._disconnectListeners;this._disconnectListeners=null,this._disconnectRequested=!1,i.forEach(m=>m())}},u.prototype._reconnect=function(){const t=this._reconnection;if(!t||this._reconnectionTimer)return;if(t.retries<1)return this._disconnect(r,!0);--t.retries,t.wait=t.wait+t.delay;const c=Math.min(t.wait,t.maxDelay);this._reconnectionTimer=setTimeout(()=>{this._connect(t.settings,!1,d=>{if(d)return this.onError(d),this._reconnect()})},c)},u.prototype.request=function(t){typeof t=="string"&&(t={method:"GET",path:t});const c={type:"request",method:t.method||"GET",path:t.path,headers:t.headers,payload:t.payload};return this._send(c,!0)},u.prototype.message=function(t){const c={type:"message",message:t};return this._send(c,!0)},u.prototype._isReady=function(){return this._ws&&this._ws.readyState===u.WebSocket.OPEN},u.prototype._send=function(t,c){if(!this._isReady())return Promise.reject(new l("Failed to send message - server disconnected",o.DISCONNECT));t.id=++this._ids;try{var d=a(t)}catch(p){return Promise.reject(p)}if(!c)try{return this._ws.send(d),Promise.resolve()}catch(p){return Promise.reject(new l(p,o.WS))}const i={resolve:null,reject:null,timeout:null},m=new Promise((p,_)=>{i.resolve=p,i.reject=_});this._settings.timeout&&(i.timeout=setTimeout(()=>(i.timeout=null,i.reject(new l("Request timed out",o.TIMEOUT))),this._settings.timeout)),this._requests[t.id]=i;try{this._ws.send(d)}catch(p){return clearTimeout(this._requests[t.id].timeout),delete this._requests[t.id],Promise.reject(new l(p,o.WS))}return m},u.prototype._hello=function(t){const c={type:"hello",version:n};t&&(c.auth=t);const d=this.subscriptions();return d.length&&(c.subs=d),this._send(c,!0)},u.prototype.subscriptions=function(){return Object.keys(this._subscriptions)},u.prototype.subscribe=function(t,c){if(!t||t[0]!=="/")return Promise.reject(new l("Invalid path",o.USER));const d=this._subscriptions[t];if(d)return d.indexOf(c)===-1&&d.push(c),Promise.resolve();if(this._subscriptions[t]=[c],!this._isReady())return Promise.resolve();const i={type:"sub",path:t},m=this._send(i,!0);return m.catch(p=>{delete this._subscriptions[t]}),m},u.prototype.unsubscribe=function(t,c){if(!t||t[0]!=="/")return Promise.reject(new l("Invalid path",o.USER));const d=this._subscriptions[t];if(!d)return Promise.resolve();let i=!1;if(!c)delete this._subscriptions[t],i=!0;else{const _=d.indexOf(c);if(_===-1)return Promise.resolve();d.splice(_,1),d.length||(delete this._subscriptions[t],i=!0)}if(!i||!this._isReady())return Promise.resolve();const m={type:"unsub",path:t},p=this._send(m,!0);return p.catch(r),p},u.prototype._onMessage=function(t){this._beat();let c=t.data;const d=c[0];if(d!=="{"){if(this._packets.push(c.slice(1)),d!=="!")return;c=this._packets.join(""),this._packets=[]}this._packets.length&&(this._packets=[],this.onError(new l("Received an incomplete message",o.PROTOCOL)));try{var i=JSON.parse(c)}catch(g){return this.onError(new l(g,o.PROTOCOL))}let m=null;if(i.statusCode&&i.statusCode>=400&&(m=new l(i.payload.message||i.payload.error||"Error",o.SERVER),m.statusCode=i.statusCode,m.data=i.payload,m.headers=i.headers,m.path=i.path),i.type==="ping")return this._send({type:"ping"},!1).catch(r);if(i.type==="update")return this.onUpdate(i.message);if(i.type==="pub"||i.type==="revoke"){const g=this._subscriptions[i.path];if(i.type==="revoke"&&delete this._subscriptions[i.path],g&&i.message!==void 0){const y={};i.type==="revoke"&&(y.revoked=!0);for(let b=0;b<g.length;++b)g[b](i.message,y)}return}const p=this._requests[i.id];if(!p)return this.onError(new l("Received response for unknown request",o.PROTOCOL));clearTimeout(p.timeout),delete this._requests[i.id];const _=(g,y)=>g?p.reject(g):p.resolve(y);return i.type==="request"?_(m,{payload:i.payload,statusCode:i.statusCode,headers:i.headers}):i.type==="message"?_(m,{payload:i.message}):i.type==="hello"?(this.id=i.socket,i.heartbeat&&(this._heartbeatTimeout=i.heartbeat.interval+i.heartbeat.timeout,this._beat()),_(m)):i.type==="reauth"?_(m,!0):i.type==="sub"||i.type==="unsub"?_(m):(_(new l("Received invalid response",o.PROTOCOL)),this.onError(new l("Received unknown response type: "+i.type,o.PROTOCOL)))},u.prototype._beat=function(){this._heartbeatTimeout&&(clearTimeout(this._heartbeat),this._heartbeat=setTimeout(()=>{this.onError(new l("Disconnecting due to heartbeat timeout",o.TIMEOUT)),this.onHeartbeatTimeout(this._willReconnect()),this._ws.close()},this._heartbeatTimeout))},u.prototype._willReconnect=function(){return!!(this._reconnection&&this._reconnection.retries>=1)},{Client:u}})})(q);var N=q.exports;const z=j(N);class k{constructor(e){this.kll=e,this.name=""}apply(){this.name&&typeof this.action=="function"?this.kll[this.name]=this.action.bind(this):console.warn(`action is not a function or name is not defined for plugin ${this.constructor.name}`)}action(){console.warn("the plugin action is not defined")}}class S{constructor(e){this.id=e.id,this.routes={},this.routesAsync=e.routes,this.cleanupCollection=[],this.plugins={};const n=e.plugins||[];this.initialize=!1,this.ctrlPath=e.ctrlPath||void 0,this.templatePath=e.templatePath||void 0,this.initsIds=[],n.forEach(r=>{const a=r.prototype instanceof k?new r(this):r();a.name?this.plugins[a.name]=(...s)=>a.action(...s):console.warn(`Plugin ${r.name} as no name.`)}),this._init()}async _init(){const e=document.getElementById(this.id);if(!e){console.warn(`No element found with id ${this.id}`);return}e.routes=this.routes,await this.injectPage(),window.addEventListener("popstate",()=>{this.injectPage()})}parseRoute(e){const n=e||window.location.pathname,r=n.split("/").splice(1),a=Object.keys(this.routesAsync),s={},o=a.reduce((l,f)=>{const u=f.split("/").splice(1);return u.length!==r.length||u.forEach((t,c)=>{t.startsWith(":")?s[t.substring(1)]=r[c]:t===r[c]&&(l=f)}),l},"/");return{params:s,template:o,route:n}}async injectPage(e){this.initsIds=[],this.initialize||this.routesAsync["/"]&&(this.routes["/"]=await this.routesAsync["/"]),this.initialize=!0;const{template:n}=this.parseRoute(e);let r=this.routes[n];r||(r=await this.routesAsync[n],this.routes[n]=r);const a=document.querySelector(`#${this.id}`);if(this.cleanUp(),r)a.innerHTML=r,await this.hydrateNestedComponents(this.sanitizeElement(a));else{const s=Object.keys(this.routes);a.innerHTML=this.routes[s[0]]}}static getState(e){const n=document.querySelector(`[kll-id='${e}']`);return(n==null?void 0:n.state)||{}}async reload(e){const r=[...e.querySelectorAll("[kll-id]")].map(a=>a.getAttribute("kll-id"));this.initsIds=this.initsIds.filter(a=>!r.includes(a)),this.hydrateNestedComponents(e)}async hydrate(e){var o,l;this.sanitizeElement(e),this.cleanUpElement(e);let n=e.getAttribute("kll-id");if(!n){const f=e.getAttribute("kll-t"),u=e.getAttribute("kll-c"),t=e.getAttribute("kll-tc"),c=e.getAttribute("kll-ctrl");f&&c?n=`${f}_${c}`:u?n=u:t?n=t:f?n=f:c&&(n=c)}if(this.initsIds.includes(n))return;if(e.getAttribute("kll-tc")){const f=e.getAttribute("kll-tc");e.setAttribute("kll-t",f),e.setAttribute("kll-ctrl",f),e.removeAttribute("kll-tc")}const r=await this.processAttributes(e),a=document.createElement("div");r!=null&&r.template&&a.appendChild(r.template);const s=r.template?a.firstElementChild:e;for(const f in r.attrs)s.setAttribute(f,r.attrs[f]);if(!this.initsIds.includes(s.kllId)){if(s._listeners={},s.state=this.handleInitState(r.state,s,(o=r.ctrl)==null?void 0:o.render),s.kllId=n,s.setAttribute("kll-id",n),this.handleAttachMethods(s,r.ctrl,s.state),s.getState=f=>S.getState(f),s.querySelector("slot")){const f=s.querySelector("slot"),u=document.createElement("div");u.innerHTML=e.innerHTML,f.innerHTML="",f.replaceWith(u.firstElementChild?u.firstElementChild:u.innerHTML)}r.template&&(e.replaceWith(s),await this.hydrateNestedComponents(this.sanitizeElement(s))),(l=s==null?void 0:s.onInit)==null||l.call(s),this.initsIds.push(s.kllId)}}async hydrateNestedComponents(e){const n=e.querySelectorAll("[kll-t], [kll-ctrl], [kll-tc]");for(const r of n)await this.hydrate(r)}cleanUpElement(e){var n;e!=null&&e._listeners&&(Object.keys(e._listeners).forEach(r=>{e.removeEventListener(r,e._listeners[r])}),e._listeners={},(n=e==null?void 0:e.cleanUp)==null||n.call(e))}cleanUp(){this.initsIds=[],this.cleanupCollection.forEach(e=>{e==null||e()}),this.cleanupCollection=[]}handleInitState(e,n,r){return new Proxy(e,{set:(a,s,o)=>{const l=Reflect.set(a,s,o);return r(n.state,n,{name:n.kllId,key:s,value:o}),this.handleTriggerState(s,o,n.kllId),l}})}async handleTriggerState(e,n,r){var s,o;const a=document.querySelectorAll(`[kll-b*='${r}.${e}']`);for(const l of a){const f={key:e,value:n,name:r};(s=l==null?void 0:l.cleanUp)==null||s.call(l,f),(o=l==null?void 0:l.render)==null||o.call(l,f)}}async processAttributes(e){const n={state:[],ctrl:{},template:void 0,attrs:{},kllId:null};for(const r of e.getAttributeNames()){const a=e.getAttribute(r);r.startsWith("kll-s")&&n.state.push({[r.slice(6)]:a}),r==="kll-ctrl"?n.ctrl=await this.processCtrl(a):r==="kll-t"&&(n.template=await this.processTemplate(a)),(!r.startsWith("kll-")||r==="kll-b")&&(n.attrs[r]=a)}return n.ctrl.state&&(n.state=[...Object.keys(n.ctrl.state).map(r=>({[r]:n.ctrl.state[r]})),...n.state]),n.state=n.state.reduce((r,a)=>({...r,...a}),{}),n}async processTemplate(e){const r=(await this.templatePath)[e];if(!r)return console.warn(`No template found with name ${e}`);const a=document.createElement("div");a.innerHTML=r.default;const s=a.querySelector(`#${e}`).content,o=document.importNode(s,!0),l=document.createElement("div");return l.appendChild(o),this.sanitizeElement(l.firstElementChild)}async processCtrl(e){return(await this.ctrlPath)[e]}handleAttachMethods(e,n,r){const a=Object.keys(n).filter(s=>s.startsWith("on")).filter(s=>!s.match(/state|oninit/i));n.render&&(e.render=s=>n.render(r,e,s)),n.onInit&&(e.onInit=()=>n.onInit(r,e)),n.cleanUp&&(e.cleanUp=this.cleanupCollection.push(()=>n.cleanUp(r,e)),e.cleanUp=s=>n.cleanUp(r,e,s));for(const s of a){const o=s.slice(2).toLocaleLowerCase(),l=f=>{typeof n[s]=="function"?n[s](r,f.target,f):console.warn(`Method ${o} is not defined on the controller.`)};e._listeners[o]=l,e.addEventListener(o,l)}}registerPlugin(e,n){this.plugins[e]=n}sanitizeElement(e){return e.querySelectorAll("script").forEach(a=>a.remove()),e.querySelectorAll("*").forEach(a=>{[...a.attributes].forEach(s=>{const o=/<script|<ifr|<em|<img|javascript:/i.test(s.value);(s.name.startsWith("on")||o)&&(console.warn(`Attribute ${s.name} removed from element ${a.tagName}, possible XSS.`),a.removeAttribute(s.name))})}),e}}class M extends k{constructor(e){super(e),this.name="createComponent"}action(e,n,r,a={}){const s=document.createElement("div");s.setAttribute("kll-t",e),s.setAttribute("kll-ctrl",n),s.setAttribute("kll-id",r);for(const[o,l]of Object.entries(a))s.setAttribute(`kll-s-${o}`,l);return this.kll.hydrate(s),s}}class U extends k{constructor(e,n,r="__kll__lang"){super(e),this.lang="en",this.lsKey=r,this.name="translate",this.translation=n||{}}getLang(){const e=localStorage.getItem(this.lsKey)||"en";return this.lang=e,e}setLang(e){localStorage.setItem(this.lsKey,e),this.lang=e}action(e){const n=this.getLang(),r=e?[e].concat(Array.from(e.querySelectorAll("[data-trans]"))):document.querySelectorAll("[data-trans]"),a=e?[e].concat(Array.from(e.querySelectorAll("[placeholder]"))):document.querySelectorAll("[placeholder]");return r.forEach(s=>{var o,l;if(s.hasAttribute("data-trans")){const f=s.getAttribute("data-trans"),u=s.getAttribute("data-trans-count"),t=u>1?`${f}_multi`:f;let c=((l=(o=this.translation)==null?void 0:o[t])==null?void 0:l[this.lang])||f;u&&(c=c.replace("{{count}}",u)),s.innerText=c}}),a.forEach(s=>{var o,l;if(s.hasAttribute("placeholder")){const f=s.getAttribute("placeholder"),u=((l=(o=this.translation)==null?void 0:o[f])==null?void 0:l[n])||f;s.setAttribute("placeholder",u)}}),e}}const x={kofi:{fr:"Payez-moi un café",en:"Buy me a coffee"},titleHome:{fr:"Gérez et partagez vos conducteurs",en:"Manage and share your drivers"},home:{fr:"Accueil",en:"Home"},subtitleHome:{fr:"Organisez et planifiez vos émissions en un clin d'œil!",en:"Organize and plan your broadcasts in a snap!"},appSummarySchedule:{fr:"Gérez votre calendrier d'émissions, ajoutez des sujets, descriptifs, dates, invitez des participants et suivez l'état de vos projets en toute simplicité.",en:"Manage your broadcast calendar, add topics, descriptions, dates, invite participants and track the status of your projects with ease."},noAccountRequired:{fr:"Commencez tout de suite, aucune création de compte requise!",en:"Start right away, no account creation required!"},appSummary:{fr:"Vous pouvez rédiger des conducteurs et les partager avec vos chroniqueurs, diffuser des médias sur votre live, et bien plus encore.",en:"You can write drivers and share them with your reporters, broadcast media on your live, and much more."},connectWith:{fr:"Connectez-vous avec",en:"Connect with"},twitchButtonDescription:{fr:"Connectez-vous à votre compte Twitch pour commencer à utiliser l'application.",en:"Connect to your Twitch account to start using the application."},loading:{en:"Loading...",fr:"Chargement..."},twitch_wait:{fr:"Vous allez être redirigé",en:"You will be redirected"},Expires:{fr:"Expire"},"admin link":{fr:"lien administrateur"},activated:{fr:"activer"},delete:{fr:"supprimer"},active_channel:{fr:"Chaîne active",en:"Active channel"},title_channel_button:{fr:"Mes chaînes",en:"My channels"},send:{fr:"envoyer"},see_all:{en:"see all",fr:"voir tout"},info_create_channel:{en:"This show will be created for the channel:",fr:"Cette émission sera créée pour la chaîne :"},create_the_show:{en:"create the show",fr:"créer l'emission"},show:{en:"show",fr:"émission"},show_name:{en:"Show name",fr:"Nom de l'émission"},add_desc:{fr:"Ajouter une description",en:"Add description"},no_result:{fr:"Aucun résultat",en:"No result"},name_required:{fr:"Le nom est requis",en:"Name is required"},noMessage:{fr:"Aucun message",en:"No message"},Channel:{fr:"Chaîne",en:"Channel"},cancel:{fr:"Annuler",en:"Cancel"},save:{fr:"Enregistrer",en:"Save"},submit:{fr:"Envoyer",en:"Submit"},AccountType:{fr:"Type de compte",en:"Account type"},title:{fr:"titre",en:"title"},Title:{fr:"Titre",en:"Title"},noMedia:{en:"No media sended",fr:"Aucun média envoyé"},noMediaFound:{en:"No media found",fr:"Aucun média trouvé"},freeProfileDesc:{fr:"Vous êtes limité à 100mo de stockage pour vos medias (n'inclut pas les médias en ligne).",en:"You are limited to 100mo of storage for your media (does not include online media)."},selectChronicle:{fr:"Sélectionnez une chronique",en:"Select a chronicle"},source:{en:"Source",fr:"Source"},editor:{en:"Editor",fr:"Chroniqueur"},about:{fr:"À propos",en:"About"},legalNotice:{fr:"Mentions légales",en:"Legal notice"},contact:{fr:"Contact",en:"Contact"},confirm:{en:"Confirm",fr:"Confirmer"},noText:{en:"No text",fr:"Pas de texte"},noEditor:{en:"No editor",fr:"Aucun chroniqueur"},noBroadcast:{en:"No broadcast selected",fr:"Aucune émission sélectionnée"},editMode:{en:"Edit mode",fr:"Mode édition"},readMode:{en:"Read mode",fr:"Mode lecture"},normalMode:{en:"Normal mode",fr:"Mode normal"},FocusMode:{en:"Focus mode",fr:"Mode focus"},SelectEditor:{en:"Select an editor",fr:"Sélectionnez un chroniqueur"},create:{en:"Create",fr:"Créer"},createBroadcast:{en:"Create a broadcast",fr:"Créer une émission"},createWithHistory:{fr:"Créer un conducteur avec historique",en:"Create a new broadcast with history"},createWithHistoryDesc:{fr:"Validez la création et conservez l'historique des sujets, sources et chroniqueurs des émissions précédentes. Organisez votre prochain épisode avec cohérence et efficacité !",en:"Validate the creation and keep the history of the subjects, sources and editors of the previous broadcasts. Organize your next episode with consistency and efficiency!"},chroniclesHistory:{fr:"Historique des chroniques",en:"Chronicle history"},drivers:{fr:"Conducteurs",en:"broadcasts"},schedule:{fr:"planning",en:"schedule"},subject:{en:"Subject",fr:"Titre"},info:{en:"Info",fr:"Info"},guests:{en:"Guests",fr:"Invités"},editors:{fr:"Chroniqueurs",en:"Editors"},start_at:{fr:"Horaire",en:"Schedule"},status:{en:"Status",fr:"Statut"},close:{en:"Close",fr:"Fermer"},project:{en:"Project",fr:"Projet"},delayed:{fr:"Reporté",en:"Delayed"},progress:{fr:"En cours",en:"In progress"},done:{fr:"Terminé",en:"Done"},noGuests:{fr:"Aucun invité",en:"No guests"},SelectGuests:{fr:"Sélectionnez des invités",en:"Select guests"},broadcast:{fr:"conducteur",en:"broadcast"},about_1:{fr:"Roadcast est une application que j'ai créée pour aider les utilisateurs à gérer et à partager facilement des conducteurs pour leurs émissions en direct. L'application est conçue pour être intuitive et facile à utiliser, même pour les utilisateurs novices.",en:"Roadcast is an application that I created to help users easily manage and share drivers for their live streams. The app is designed to be intuitive and easy to use, even for novice users."},about_2:{fr:"L'une des caractéristiques clés de Roadcast est sa gratuité totale d'utilisation, sans aucun compte utilisateur requis. Roadcast est accessible à tous.",en:"One of the key features of Roadcast is its completely free to use, with no user account required. Roadcast is accessible to everyone."},about_3:{fr:"Le code source de l'application est open source et est disponible sur ",en:"The source code for the app is open source and is available on "},about_4:{fr:"Si vous êtes intéressé par le développement d'applications, je vous encourage à explorer le code et à contribuer à son amélioration en partageant vos commentaires et suggestions.",en:"If you are interested in app development, I encourage you to explore the code and contribute to its improvement by sharing your feedback and suggestions."},about_5:{fr:"Enfin, si vous trouvez l'application Roadcast utile et que vous souhaitez me soutenir dans le développement continu de l'application, vous pouvez faire un don sur ma page <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a>. Votre soutien m'aidera à continuer à fournir des mises à jour et des améliorations pour Roadcast.",en:"Finally, if you find the Roadcast app useful and would like to support me in the continued development of the app, you can make a donation on my <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a> page. Your support will help me continue to provide updates and improvements for Roadcast."},about_6:{fr:"Merci d'avoir choisi Roadcast pour vos besoins de diffusion en direct. J'espère que vous trouverez l'application utile et je suis impatient de voir les émissions que vous créerez avec elle.",en:"Thank you for choosing Roadcast for your live streaming needs. I hope you find the app useful and I look forward to seeing the shows you create with it."},editorTitle:{fr:"Éditeur",en:"Editor"},editor_content:{fr:'Le site Roadcast est édité par Benoist Bouteiller. Vous pouvez me contacter via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.',en:'The Roadcast site is edited by Benoist Bouteiller. You can contact me via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.'},hostingTitle:{fr:"Hébergement",en:"Hosting"},hosting_content:{fr:'Roadcast est hébergé par <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.',en:'Roadcast is hosted by <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.'},error_create_broadcast:{fr:"Une erreur s'est produite lors de la création de l'émission",en:"An error occurred while creating the broadcast"},no_broadcast_history:{fr:"Vous n'avez pas encore créé d'émission",en:"You have not created any broadcasts yet"},slider_link:{fr:"Lien du slider",en:"Slider link"},reader_link:{fr:"Lien du lecteur",en:"Reader link"},add_chronicle:{fr:"Ajouter une chronique",en:"Add a chronicle"},no_chronicle:{fr:"Vous n'avez pas encore créé de chronique",en:"You have not created any chronicles yet"},chronicle_title:{fr:"Titre: ",en:"Title: "},chronicle_source:{fr:"Source: ",en:"Source: "},no_title:{fr:"Pas de titre",en:"No title"},no_source:{fr:"Pas de source",en:"No source"},lock_edit_chronicle:{fr:"Un chroniqueur est en train d'éditer cette chronique",en:"A reporter is editing this chronicle"}},E="rc__theme";function W(){return localStorage.getItem(E)||"dark"}function A(h,e){const n=e.querySelector(`[data-type="${h}"]`);e.querySelector(`[data-type="${h==="dark"?"light":"dark"}"]`).classList.add("hidden"),n.classList.remove("hidden"),h==="dark"?(document.documentElement.classList.remove("light"),document.documentElement.classList.add("dark")):(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light")),localStorage.setItem(E,h)}const $={onInit(h,e){const n=W();A(n,e)},onClick(h,e){const n=e.getAttribute("data-type");A(n==="dark"?"light":"dark",e.parentElement)}},R=new z.Client(`ws://${window.location.host}`,{reconnect:!0,maxDelay:1e3}),L="__rc__lang";localStorage.setItem(L,window.navigator.language.split("-")[0]);const v={id:"app",routes:{"/":w(()=>import("./index-TxLfe16U.js"),__vite__mapDeps([])).then(h=>h.default),"/about":w(()=>import("./about-peDid3aD.js"),__vite__mapDeps([])).then(h=>h.default),"/legal":w(()=>import("./legal-AkeicHcm.js"),__vite__mapDeps([])).then(h=>h.default),"/bc/editor/:editor":w(()=>import("./broadcast-editor-yrdd8pBF.js"),__vite__mapDeps([])).then(h=>h.default)},plugins:[M,h=>new U(h,x,L)]};v.ctrlPath=w(()=>import("./index-_Ip5crJO.js"),__vite__mapDeps([])).then(h=>h),v.templatePath=w(()=>import("./index-6dHwkZGH.js"),__vite__mapDeps([])).then(h=>h);const D=new S(v);addEventListener("DOMContentLoaded",()=>{const h=document.querySelector("#app");h._socket=R,R.connect(),h._socket.onConnect=()=>{console.log("I Listen Update")},D.plugins.translate()});const H=localStorage.getItem(E)||"dark";H==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.add("light");export{D as k,E as l,$ as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}