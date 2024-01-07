(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();const q="modulepreload",O=function(h){return"/"+h},C={},b=function(e,n,r){let l=Promise.resolve();if(n&&n.length>0){const s=document.getElementsByTagName("link");l=Promise.all(n.map(c=>{if(c=O(c),c in C)return;C[c]=!0;const a=c.endsWith(".css"),f=a?'[rel="stylesheet"]':"";if(!!r)for(let i=s.length-1;i>=0;i--){const d=s[i];if(d.href===c&&(!a||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${f}`))return;const t=document.createElement("link");if(t.rel=a?"stylesheet":q,a||(t.as="script",t.crossOrigin=""),t.href=c,document.head.appendChild(t),a)return new Promise((i,d)=>{t.addEventListener("load",i),t.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${c}`)))})}))}return l.then(()=>e()).catch(s=>{const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s})};class k{constructor(e){this.kll=e,this.name=""}apply(){this.name&&typeof this.action=="function"?this.kll[this.name]=this.action.bind(this):console.warn(`action is not a function or name is not defined for plugin ${this.constructor.name}`)}action(){console.warn("the plugin action is not defined")}}class S{constructor(e){this.id=e.id,this.routes={},this.routesAsync=e.routes,this.cleanupCollection=[],this.plugins={};const n=e.plugins||[];this.initialize=!1,this.ctrlPath=e.ctrlPath||void 0,this.templatePath=e.templatePath||void 0,this.initsIds=[],n.forEach(r=>{const l=r.prototype instanceof k?new r(this):r();l.name?this.plugins[l.name]=(...s)=>l.action(...s):console.warn(`Plugin ${r.name} as no name.`)}),this._init()}async _init(){const e=document.getElementById(this.id);if(!e){console.warn(`No element found with id ${this.id}`);return}e.routes=this.routes,await this.injectPage(),window.addEventListener("popstate",()=>{this.injectPage()})}parseRoute(e){const n=e||window.location.pathname,r=n.split("/").splice(1),l=Object.keys(this.routesAsync),s={},c=l.reduce((a,f)=>{const u=f.split("/").splice(1);return u.length!==r.length||u.forEach((t,i)=>{t.startsWith(":")?s[t.substring(1)]=r[i]:t===r[i]&&(a=f)}),a},"/");return{params:s,template:c,route:n}}async injectPage(e){this.initsIds=[],this.initialize||this.routesAsync["/"]&&(this.routes["/"]=await this.routesAsync["/"]),this.initialize=!0;const{template:n}=this.parseRoute(e);let r=this.routes[n];r||(r=await this.routesAsync[n],this.routes[n]=r);const l=document.querySelector(`#${this.id}`);if(this.cleanUp(),r)l.innerHTML=r,await this.hydrateNestedComponents(l);else{const s=Object.keys(this.routes);l.innerHTML=this.routes[s[0]]}}static getState(e){const n=document.querySelector(`[kll-id='${e}']`);return(n==null?void 0:n.state)||{}}async hydrate(e){var c,a;this.cleanUpElement(e);let n=e.getAttribute("kll-id");if(!n){const f=e.getAttribute("kll-t"),u=e.getAttribute("kll-c"),t=e.getAttribute("kll-tc"),i=e.getAttribute("kll-ctrl");f&&i?n=`${f}_${i}`:u?n=u:t?n=t:f?n=f:i&&(n=i)}if(this.initsIds.includes(n))return;if(e.getAttribute("kll-tc")){const f=e.getAttribute("kll-tc");e.setAttribute("kll-t",f),e.setAttribute("kll-ctrl",f),e.removeAttribute("kll-tc")}const r=await this.processAttributes(e),l=document.createElement("div");r!=null&&r.template&&l.appendChild(r.template);const s=r.template?l.firstElementChild:e;for(const f in r.attrs)s.setAttribute(f,r.attrs[f]);if(!this.initsIds.includes(s.kllId)){if(s._listeners={},s.state=this.handleInitState(r.state,s,(c=r.ctrl)==null?void 0:c.render),s.kllId=n,s.setAttribute("kll-id",n),this.handleAttachMethods(s,r.ctrl,s.state),s.getState=f=>S.getState(f),s.querySelector("slot")){const f=s.querySelector("slot"),u=document.createElement("div");u.innerHTML=e.innerHTML,f.innerHTML="",f.replaceWith(u.firstElementChild?u.firstElementChild:u.innerHTML)}r.template&&(e.replaceWith(s),await this.hydrateNestedComponents(s)),(a=s==null?void 0:s.onInit)==null||a.call(s),this.initsIds.push(s.kllId)}}async hydrateNestedComponents(e){const n=e.querySelectorAll("[kll-t], [kll-ctrl], [kll-tc]");for(const r of n)await this.hydrate(r)}cleanUpElement(e){var n;e!=null&&e._listeners&&(Object.keys(e._listeners).forEach(r=>{e.removeEventListener(r,e._listeners[r])}),e._listeners={},(n=e==null?void 0:e.cleanUp)==null||n.call(e))}cleanUp(){this.initsIds=[],this.cleanupCollection.forEach(e=>{e==null||e()}),this.cleanupCollection=[]}handleInitState(e,n,r){return new Proxy(e,{set:(l,s,c)=>{const a=Reflect.set(l,s,c);return r(n.state,n,{name:n.kllId,key:s,value:c}),this.handleTriggerState(s,c,n.kllId),a}})}async handleTriggerState(e,n,r){var s,c;const l=document.querySelectorAll(`[kll-b*='${r}.${e}']`);for(const a of l){const f={key:e,value:n,name:r};(s=a==null?void 0:a.cleanUp)==null||s.call(a,f),(c=a==null?void 0:a.render)==null||c.call(a,f)}}async processAttributes(e){const n={state:[],ctrl:{},template:void 0,attrs:{},kllId:null};for(const r of e.getAttributeNames()){const l=e.getAttribute(r);r.startsWith("kll-s")&&n.state.push({[r.slice(6)]:l}),r==="kll-ctrl"?n.ctrl=await this.processCtrl(l):r==="kll-t"&&(n.template=await this.processTemplate(l)),(!r.startsWith("kll-")||r==="kll-b")&&(n.attrs[r]=l)}return n.ctrl.state&&(n.state=[...Object.keys(n.ctrl.state).map(r=>({[r]:n.ctrl.state[r]})),...n.state]),n.state=n.state.reduce((r,l)=>({...r,...l}),{}),n}async processTemplate(e){const r=(await this.templatePath)[e];if(!r)return console.warn(`No template found with name ${e}`);const l=document.createElement("div");l.innerHTML=r.default;const s=l.querySelector(`#${e}`).content,c=document.importNode(s,!0),a=document.createElement("div");return a.appendChild(c),a.firstElementChild}async processCtrl(e){return(await this.ctrlPath)[e]}handleAttachMethods(e,n,r){const l=Object.keys(n).filter(s=>s.startsWith("on")).filter(s=>!s.match(/state|oninit/i));n.render&&(e.render=s=>n.render(r,e,s)),n.onInit&&(e.onInit=()=>n.onInit(r,e)),n.cleanUp&&(e.cleanUp=this.cleanupCollection.push(()=>n.cleanUp(r,e)),e.cleanUp=s=>n.cleanUp(r,e,s));for(const s of l){const c=s.slice(2).toLocaleLowerCase(),a=f=>{typeof n[s]=="function"?n[s](r,f.target,f):console.warn(`Method ${c} is not defined on the controller.`)};e._listeners[c]=a,e.addEventListener(c,a)}}registerPlugin(e,n){this.plugins[e]=n}}class I extends k{constructor(e){super(e),this.name="createComponent"}action(e,n,r,l={}){const s=document.createElement("div");s.setAttribute("kll-t",e),s.setAttribute("kll-ctrl",n),s.setAttribute("kll-id",r);for(const[c,a]of Object.entries(l))s.setAttribute(`kll-s-${c}`,a);return this.kll.hydrate(s),s}}var j=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function N(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var A={exports:{}};(function(h,e){(function(n,r){h.exports=r()})(typeof window<"u"?window:j,()=>{const n="2",r=function(){},l=function(t){try{return JSON.stringify(t)}catch(i){throw new a(i,c.USER)}},s=function(t){return i=>{setTimeout(()=>t(i),0)}},c={TIMEOUT:"timeout",DISCONNECT:"disconnect",SERVER:"server",PROTOCOL:"protocol",WS:"ws",USER:"user"},a=function(t,i){typeof t=="string"&&(t=new Error(t)),t.type=i,t.isNes=!0;try{throw t}catch(d){return d}},f={1e3:"Normal closure",1001:"Going away",1002:"Protocol error",1003:"Unsupported data",1004:"Reserved",1005:"No status received",1006:"Abnormal closure",1007:"Invalid frame payload data",1008:"Policy violation",1009:"Message too big",1010:"Mandatory extension",1011:"Internal server error",1015:"TLS handshake"},u=function(t,i){i=i||{},this._isBrowser=typeof WebSocket<"u",this._isBrowser||(i.ws=i.ws||{},i.ws.maxPayload===void 0&&(i.ws.maxPayload=0)),this._url=t,this._settings=i,this._heartbeatTimeout=!1,this._ws=null,this._reconnection=null,this._reconnectionTimer=null,this._ids=0,this._requests={},this._subscriptions={},this._heartbeat=null,this._packets=[],this._disconnectListeners=null,this._disconnectRequested=!1,this.onError=d=>console.error(d),this.onConnect=r,this.onDisconnect=r,this.onHeartbeatTimeout=r,this.onUpdate=r,this.id=null};return u.WebSocket=typeof WebSocket>"u"?null:WebSocket,u.prototype.connect=function(t){return t=t||{},this._reconnection?Promise.reject(new a("Cannot connect while client attempts to reconnect",c.USER)):this._ws?Promise.reject(new a("Already connected",c.USER)):(t.reconnect!==!1?this._reconnection={wait:0,delay:t.delay||1e3,maxDelay:t.maxDelay||5e3,retries:t.retries||1/0,settings:{auth:t.auth,timeout:t.timeout}}:this._reconnection=null,new Promise((i,d)=>{this._connect(t,!0,o=>o?d(o):i())}))},u.prototype._connect=function(t,i,d){const o=this._isBrowser?new u.WebSocket(this._url):new u.WebSocket(this._url,this._settings.ws);this._ws=o,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const m=y=>{o.onopen&&p(new a("Connection terminated while waiting to connect",c.WS));const w=this._disconnectRequested;this._cleanup();const T={code:y.code,explanation:f[y.code]||"Unknown",reason:y.reason,wasClean:y.wasClean,willReconnect:this._willReconnect(),wasRequested:w};this.onDisconnect(T.willReconnect,T),this._reconnect()},p=y=>{if(d){const w=d;return d=null,w(y)}return this.onError(y)},_=()=>{if(this._cleanup(),p(new a("Connection timed out",c.TIMEOUT)),i)return this._reconnect()},g=t.timeout?setTimeout(_,t.timeout):null;o.onopen=()=>{clearTimeout(g),o.onopen=null,this._hello(t.auth).then(()=>{this.onConnect(),p()}).catch(y=>{y.path&&delete this._subscriptions[y.path],this._disconnect(()=>s(p)(y),!0)})},o.onerror=y=>{if(clearTimeout(g),this._willReconnect())return m(y);this._cleanup();const w=new a("Socket error",c.WS);return p(w)},o.onclose=m,o.onmessage=y=>this._onMessage(y)},u.prototype.overrideReconnectionAuth=function(t){return this._reconnection?(this._reconnection.settings.auth=t,!0):!1},u.prototype.reauthenticate=function(t){this.overrideReconnectionAuth(t);const i={type:"reauth",auth:t};return this._send(i,!0)},u.prototype.disconnect=function(){return new Promise(t=>this._disconnect(t,!1))},u.prototype._disconnect=function(t,i){this._reconnection=null,clearTimeout(this._reconnectionTimer),this._reconnectionTimer=null;const d=this._disconnectRequested||!i;if(this._disconnectListeners){this._disconnectRequested=d,this._disconnectListeners.push(t);return}if(!this._ws||this._ws.readyState!==u.WebSocket.OPEN&&this._ws.readyState!==u.WebSocket.CONNECTING)return t();this._disconnectRequested=d,this._disconnectListeners=[t],this._ws.close()},u.prototype._cleanup=function(){if(this._ws){const o=this._ws;this._ws=null,o.readyState!==u.WebSocket.CLOSED&&o.readyState!==u.WebSocket.CLOSING&&o.close(),o.onopen=null,o.onclose=null,o.onerror=r,o.onmessage=null}this._packets=[],this.id=null,clearTimeout(this._heartbeat),this._heartbeat=null;const t=new a("Request failed - server disconnected",c.DISCONNECT),i=this._requests;this._requests={};const d=Object.keys(i);for(let o=0;o<d.length;++o){const m=d[o],p=i[m];clearTimeout(p.timeout),p.reject(t)}if(this._disconnectListeners){const o=this._disconnectListeners;this._disconnectListeners=null,this._disconnectRequested=!1,o.forEach(m=>m())}},u.prototype._reconnect=function(){const t=this._reconnection;if(!t||this._reconnectionTimer)return;if(t.retries<1)return this._disconnect(r,!0);--t.retries,t.wait=t.wait+t.delay;const i=Math.min(t.wait,t.maxDelay);this._reconnectionTimer=setTimeout(()=>{this._connect(t.settings,!1,d=>{if(d)return this.onError(d),this._reconnect()})},i)},u.prototype.request=function(t){typeof t=="string"&&(t={method:"GET",path:t});const i={type:"request",method:t.method||"GET",path:t.path,headers:t.headers,payload:t.payload};return this._send(i,!0)},u.prototype.message=function(t){const i={type:"message",message:t};return this._send(i,!0)},u.prototype._isReady=function(){return this._ws&&this._ws.readyState===u.WebSocket.OPEN},u.prototype._send=function(t,i){if(!this._isReady())return Promise.reject(new a("Failed to send message - server disconnected",c.DISCONNECT));t.id=++this._ids;try{var d=l(t)}catch(p){return Promise.reject(p)}if(!i)try{return this._ws.send(d),Promise.resolve()}catch(p){return Promise.reject(new a(p,c.WS))}const o={resolve:null,reject:null,timeout:null},m=new Promise((p,_)=>{o.resolve=p,o.reject=_});this._settings.timeout&&(o.timeout=setTimeout(()=>(o.timeout=null,o.reject(new a("Request timed out",c.TIMEOUT))),this._settings.timeout)),this._requests[t.id]=o;try{this._ws.send(d)}catch(p){return clearTimeout(this._requests[t.id].timeout),delete this._requests[t.id],Promise.reject(new a(p,c.WS))}return m},u.prototype._hello=function(t){const i={type:"hello",version:n};t&&(i.auth=t);const d=this.subscriptions();return d.length&&(i.subs=d),this._send(i,!0)},u.prototype.subscriptions=function(){return Object.keys(this._subscriptions)},u.prototype.subscribe=function(t,i){if(!t||t[0]!=="/")return Promise.reject(new a("Invalid path",c.USER));const d=this._subscriptions[t];if(d)return d.indexOf(i)===-1&&d.push(i),Promise.resolve();if(this._subscriptions[t]=[i],!this._isReady())return Promise.resolve();const o={type:"sub",path:t},m=this._send(o,!0);return m.catch(p=>{delete this._subscriptions[t]}),m},u.prototype.unsubscribe=function(t,i){if(!t||t[0]!=="/")return Promise.reject(new a("Invalid path",c.USER));const d=this._subscriptions[t];if(!d)return Promise.resolve();let o=!1;if(!i)delete this._subscriptions[t],o=!0;else{const _=d.indexOf(i);if(_===-1)return Promise.resolve();d.splice(_,1),d.length||(delete this._subscriptions[t],o=!0)}if(!o||!this._isReady())return Promise.resolve();const m={type:"unsub",path:t},p=this._send(m,!0);return p.catch(r),p},u.prototype._onMessage=function(t){this._beat();let i=t.data;const d=i[0];if(d!=="{"){if(this._packets.push(i.slice(1)),d!=="!")return;i=this._packets.join(""),this._packets=[]}this._packets.length&&(this._packets=[],this.onError(new a("Received an incomplete message",c.PROTOCOL)));try{var o=JSON.parse(i)}catch(g){return this.onError(new a(g,c.PROTOCOL))}let m=null;if(o.statusCode&&o.statusCode>=400&&(m=new a(o.payload.message||o.payload.error||"Error",c.SERVER),m.statusCode=o.statusCode,m.data=o.payload,m.headers=o.headers,m.path=o.path),o.type==="ping")return this._send({type:"ping"},!1).catch(r);if(o.type==="update")return this.onUpdate(o.message);if(o.type==="pub"||o.type==="revoke"){const g=this._subscriptions[o.path];if(o.type==="revoke"&&delete this._subscriptions[o.path],g&&o.message!==void 0){const y={};o.type==="revoke"&&(y.revoked=!0);for(let w=0;w<g.length;++w)g[w](o.message,y)}return}const p=this._requests[o.id];if(!p)return this.onError(new a("Received response for unknown request",c.PROTOCOL));clearTimeout(p.timeout),delete this._requests[o.id];const _=(g,y)=>g?p.reject(g):p.resolve(y);return o.type==="request"?_(m,{payload:o.payload,statusCode:o.statusCode,headers:o.headers}):o.type==="message"?_(m,{payload:o.message}):o.type==="hello"?(this.id=o.socket,o.heartbeat&&(this._heartbeatTimeout=o.heartbeat.interval+o.heartbeat.timeout,this._beat()),_(m)):o.type==="reauth"?_(m,!0):o.type==="sub"||o.type==="unsub"?_(m):(_(new a("Received invalid response",c.PROTOCOL)),this.onError(new a("Received unknown response type: "+o.type,c.PROTOCOL)))},u.prototype._beat=function(){this._heartbeatTimeout&&(clearTimeout(this._heartbeat),this._heartbeat=setTimeout(()=>{this.onError(new a("Disconnecting due to heartbeat timeout",c.TIMEOUT)),this.onHeartbeatTimeout(this._willReconnect()),this._ws.close()},this._heartbeatTimeout))},u.prototype._willReconnect=function(){return!!(this._reconnection&&this._reconnection.retries>=1)},{Client:u}})})(A);var M=A.exports;const z=N(M);class U extends k{constructor(e,n,r="__kll__lang"){super(e),this.lang="en",this.lsKey=r,this.name="translate",this.translation=n||{}}getLang(){const e=localStorage.getItem(this.lsKey)||"en";return this.lang=e,e}setLang(e){localStorage.setItem(this.lsKey,e),this.lang=e}action(e){const n=this.getLang(),r=e?[e].concat(Array.from(e.querySelectorAll("[data-trans]"))):document.querySelectorAll("[data-trans]"),l=e?[e].concat(Array.from(e.querySelectorAll("[placeholder]"))):document.querySelectorAll("[placeholder]");return r.forEach(s=>{var c,a;if(s.hasAttribute("data-trans")){const f=s.getAttribute("data-trans"),u=s.getAttribute("data-trans-count"),t=u>1?`${f}_multi`:f;let i=((a=(c=this.translation)==null?void 0:c[t])==null?void 0:a[this.lang])||f;u&&(i=i.replace("{{count}}",u)),s.innerHTML=i}}),l.forEach(s=>{var c,a;if(s.hasAttribute("placeholder")){const f=s.getAttribute("placeholder"),u=((a=(c=this.translation)==null?void 0:c[f])==null?void 0:a[n])||f;s.setAttribute("placeholder",u)}}),e}}const W={kofi:{fr:"Payez-moi un café",en:"Buy me a coffee"},titleHome:{fr:"Gérez et partagez vos conducteurs",en:"Manage and share your drivers"},home:{fr:"Accueil",en:"Home"},subtitleHome:{fr:"Organisez et planifiez vos émissions en un clin d'œil!",en:"Organize and plan your broadcasts in a snap!"},appSummarySchedule:{fr:"Gérez votre calendrier d'émissions, ajoutez des sujets, descriptifs, dates, invitez des participants et suivez l'état de vos projets en toute simplicité.",en:"Manage your broadcast calendar, add topics, descriptions, dates, invite participants and track the status of your projects with ease."},noAccountRequired:{fr:"Commencez tout de suite, aucune création de compte requise!",en:"Start right away, no account creation required!"},appSummary:{fr:"Vous pouvez rédiger des conducteurs et les partager avec vos chroniqueurs, diffuser des médias sur votre live, et bien plus encore.",en:"You can write drivers and share them with your reporters, broadcast media on your live, and much more."},connectWith:{fr:"Connectez-vous avec",en:"Connect with"},twitchButtonDescription:{fr:"Connectez-vous à votre compte Twitch pour commencer à utiliser l'application.",en:"Connect to your Twitch account to start using the application."},loading:{en:"Loading...",fr:"Chargement..."},twitch_wait:{fr:"Vous allez être redirigé",en:"You will be redirected"},Expires:{fr:"Expire"},"admin link":{fr:"lien administrateur"},activated:{fr:"activer"},delete:{fr:"supprimer"},active_channel:{fr:"Chaîne active",en:"Active channel"},title_channel_button:{fr:"Mes chaînes",en:"My channels"},send:{fr:"envoyer"},see_all:{en:"see all",fr:"voir tout"},info_create_channel:{en:"This show will be created for the channel:",fr:"Cette émission sera créée pour la chaîne :"},create_the_show:{en:"create the show",fr:"créer l'emission"},show:{en:"show",fr:"émission"},show_name:{en:"Show name",fr:"Nom de l'émission"},add_desc:{fr:"Ajouter une description",en:"Add description"},no_result:{fr:"Aucun résultat",en:"No result"},name_required:{fr:"Le nom est requis",en:"Name is required"},noMessage:{fr:"Aucun message",en:"No message"},Channel:{fr:"Chaîne",en:"Channel"},cancel:{fr:"Annuler",en:"Cancel"},save:{fr:"Enregistrer",en:"Save"},submit:{fr:"Envoyer",en:"Submit"},AccountType:{fr:"Type de compte",en:"Account type"},title:{fr:"titre",en:"title"},Title:{fr:"Titre",en:"Title"},noMedia:{en:"No media sended",fr:"Aucun média envoyé"},noMediaFound:{en:"No media found",fr:"Aucun média trouvé"},freeProfileDesc:{fr:"Vous êtes limité à 100mo de stockage pour vos medias (n'inclut pas les médias en ligne).",en:"You are limited to 100mo of storage for your media (does not include online media)."},selectChronicle:{fr:"Sélectionnez une chronique",en:"Select a chronicle"},source:{en:"Source",fr:"Source"},editor:{en:"Editor",fr:"Chroniqueur"},about:{fr:"À propos",en:"About"},legalNotice:{fr:"Mentions légales",en:"Legal notice"},contact:{fr:"Contact",en:"Contact"},confirm:{en:"Confirm",fr:"Confirmer"},noText:{en:"No text",fr:"Pas de texte"},noEditor:{en:"No editor",fr:"Aucun chroniqueur"},noBroadcast:{en:"No broadcast selected",fr:"Aucune émission sélectionnée"},editMode:{en:"Edit mode",fr:"Mode édition"},readMode:{en:"Read mode",fr:"Mode lecture"},normalMode:{en:"Normal mode",fr:"Mode normal"},FocusMode:{en:"Focus mode",fr:"Mode focus"},SelectEditor:{en:"Select an editor",fr:"Sélectionnez un chroniqueur"},create:{en:"Create",fr:"Créer"},createBroadcast:{en:"Create a broadcast",fr:"Créer une émission"},createWithHistory:{fr:"Créer un conducteur avec historique",en:"Create a new broadcast with history"},createWithHistoryDesc:{fr:"Validez la création et conservez l'historique des sujets, sources et chroniqueurs des émissions précédentes. Organisez votre prochain épisode avec cohérence et efficacité !",en:"Validate the creation and keep the history of the subjects, sources and editors of the previous broadcasts. Organize your next episode with consistency and efficiency!"},chroniclesHistory:{fr:"Historique des chroniques",en:"Chronicle history"},drivers:{fr:"Conducteurs",en:"broadcasts"},schedule:{fr:"planning",en:"schedule"},subject:{en:"Subject",fr:"Titre"},info:{en:"Info",fr:"Info"},guests:{en:"Guests",fr:"Invités"},editors:{fr:"Chroniqueurs",en:"Editors"},start_at:{fr:"Horaire",en:"Schedule"},status:{en:"Status",fr:"Statut"},close:{en:"Close",fr:"Fermer"},project:{en:"Project",fr:"Projet"},delayed:{fr:"Reporté",en:"Delayed"},progress:{fr:"En cours",en:"In progress"},done:{fr:"Terminé",en:"Done"},noGuests:{fr:"Aucun invité",en:"No guests"},SelectGuests:{fr:"Sélectionnez des invités",en:"Select guests"},broadcast:{fr:"conducteur",en:"broadcast"},about_1:{fr:"Roadcast est une application que j'ai créée pour aider les utilisateurs à gérer et à partager facilement des conducteurs pour leurs émissions en direct. L'application est conçue pour être intuitive et facile à utiliser, même pour les utilisateurs novices.",en:"Roadcast is an application that I created to help users easily manage and share drivers for their live streams. The app is designed to be intuitive and easy to use, even for novice users."},about_2:{fr:"L'une des caractéristiques clés de Roadcast est sa gratuité totale d'utilisation, sans aucun compte utilisateur requis. Roadcast est accessible à tous.",en:"One of the key features of Roadcast is its completely free to use, with no user account required. Roadcast is accessible to everyone."},about_3:{fr:"Le code source de l'application est open source et est disponible sur ",en:"The source code for the app is open source and is available on "},about_4:{fr:"Si vous êtes intéressé par le développement d'applications, je vous encourage à explorer le code et à contribuer à son amélioration en partageant vos commentaires et suggestions.",en:"If you are interested in app development, I encourage you to explore the code and contribute to its improvement by sharing your feedback and suggestions."},about_5:{fr:"Enfin, si vous trouvez l'application Roadcast utile et que vous souhaitez me soutenir dans le développement continu de l'application, vous pouvez faire un don sur ma page <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a>. Votre soutien m'aidera à continuer à fournir des mises à jour et des améliorations pour Roadcast.",en:"Finally, if you find the Roadcast app useful and would like to support me in the continued development of the app, you can make a donation on my <a href='https://ko-fi.com/kazerlelutin' target='_blank' rel='noopener noreferrer'>Ko-Fi</a> page. Your support will help me continue to provide updates and improvements for Roadcast."},about_6:{fr:"Merci d'avoir choisi Roadcast pour vos besoins de diffusion en direct. J'espère que vous trouverez l'application utile et je suis impatient de voir les émissions que vous créerez avec elle.",en:"Thank you for choosing Roadcast for your live streaming needs. I hope you find the app useful and I look forward to seeing the shows you create with it."},editorTitle:{fr:"Éditeur",en:"Editor"},editor_content:{fr:'Le site Roadcast est édité par Benoist Bouteiller. Vous pouvez me contacter via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.',en:'The Roadcast site is edited by Benoist Bouteiller. You can contact me via <a href="https://bouteiller.contact"  target="_blank" rel="noopener noreferrer">bouteiller.contact</a>.'},hostingTitle:{fr:"Hébergement",en:"Hosting"},hosting_content:{fr:'Roadcast est hébergé par <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.',en:'Roadcast is hosted by <a href="https://www.o2switch.fr/"  target="_blank" rel="noopener noreferrer">02switch</a>.'},error_create_broadcast:{fr:"Une erreur s'est produite lors de la création de l'émission",en:"An error occurred while creating the broadcast"}},E="rc__theme";function x(){return localStorage.getItem(E)||"dark"}function R(h,e){const n=e.querySelector(`[data-type="${h}"]`);e.querySelector(`[data-type="${h==="dark"?"light":"dark"}"]`).classList.add("hidden"),n.classList.remove("hidden"),h==="dark"?(document.documentElement.classList.remove("light"),document.documentElement.classList.add("dark")):(document.documentElement.classList.remove("dark"),document.documentElement.classList.add("light")),localStorage.setItem(E,h)}const $={onInit(h,e){const n=x();R(n,e)},onClick(h,e){const n=e.getAttribute("data-type");R(n==="dark"?"light":"dark",e.parentElement)}},H=new z.Client(`ws://${window.location.host}`,{reconnect:!0}),L="__rc__lang";localStorage.setItem(L,window.navigator.language.split("-")[0]);const v={id:"app",routes:{"/":b(()=>import("./index-TxLfe16U.js"),__vite__mapDeps([])).then(h=>h.default),"/about":b(()=>import("./about-peDid3aD.js"),__vite__mapDeps([])).then(h=>h.default),"/legal":b(()=>import("./legal-AkeicHcm.js"),__vite__mapDeps([])).then(h=>h.default),"/bc/editor/:editor":b(()=>import("./broadcast-editor-HcMIfL0Y.js"),__vite__mapDeps([])).then(h=>h.default)},plugins:[I,h=>new U(h,W,L)]};v.ctrlPath=b(()=>import("./index-M0ElqLeL.js"),__vite__mapDeps([])).then(h=>h),v.templatePath=b(()=>import("./index-qwiSPsAv.js"),__vite__mapDeps([])).then(h=>h);const P=new S(v);addEventListener("DOMContentLoaded",async()=>{const h=document.querySelector("#app");h._socket=H,await h._socket.connect(),h._socket.onConnect=()=>{console.log("I Listen Update")},P.plugins.translate()});addEventListener("popstate",()=>{P.injectPage(window.location.pathname)});const D=localStorage.getItem(E)||"dark";D==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.add("light");export{P as k,E as l,$ as r};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}