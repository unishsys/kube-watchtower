import{c as j,r as g,a as T,ae as A,y as I,m as H,h as w,l as L,af as V,aT as z,aU as F,aV as W,g as Y,f as Z,P as q,$ as P,U as r,T as u,aQ as X,a1 as G,aW as J,aX as $,V as E,_ as m,Y as B,Z as k,aY as ee,w as te,aZ as ae,a_ as oe,a$ as D,b0 as N,Q as U}from"./index.699d1513.js";import{d as le,Q as ne,b as se}from"./QPage.0dea40c7.js";import{b as re,Q as ie,a as _}from"./QTable.e4e7b61b.js";import{api as x}from"./axios.dc810ece.js";import{u as ue}from"./use-quasar.b3b38840.js";import"./rtl.b51694b1.js";function C(e,o=new WeakMap){if(Object(e)!==e)return e;if(o.has(e))return o.get(e);const a=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const d=new e.constructor(l);return o.set(e,d),d}}return o.set(e,a),e instanceof Set?e.forEach(l=>{a.add(C(l,o))}):e instanceof Map&&e.forEach((l,d)=>{a.set(d,C(l,o))}),Object.assign(a,...Object.keys(e).map(l=>({[l]:C(e[l],o)})))}var ce=j({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:o,emit:a}){const{proxy:l}=L(),{$q:d}=l,f=g(null),p=g(""),c=g("");let b=!1;const M=T(()=>A({initialValue:p.value,validate:e.validate,set:h,cancel:y,updatePosition:Q},"value",()=>c.value,v=>{c.value=v}));function h(){e.validate(c.value)!==!1&&(i()===!0&&(a("save",c.value,p.value),a("update:modelValue",c.value)),n())}function y(){i()===!0&&a("cancel",c.value,p.value),n()}function Q(){I(()=>{f.value.updatePosition()})}function i(){return H(c.value,p.value)===!1}function n(){b=!0,f.value.hide()}function t(){b=!1,p.value=C(e.modelValue),c.value=C(e.modelValue),a("beforeShow")}function s(){a("show")}function S(){b===!1&&i()===!0&&(e.autoSave===!0&&e.validate(c.value)===!0?(a("save",c.value,p.value),a("update:modelValue",c.value)):a("cancel",c.value,p.value)),a("beforeHide")}function O(){a("hide")}function R(){const v=o.default!==void 0?[].concat(o.default(M.value)):[];return e.title&&v.unshift(w("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&v.push(w("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[w(V,{flat:!0,color:e.color,label:e.labelCancel||d.lang.label.cancel,onClick:y}),w(V,{flat:!0,color:e.color,label:e.labelSet||d.lang.label.set,onClick:h})])),v}return Object.assign(l,{set:h,cancel:y,show(v){f.value!==null&&f.value.show(v)},hide(v){f.value!==null&&f.value.hide(v)},updatePosition:Q}),()=>{if(e.disable!==!0)return w(le,{ref:f,class:"q-popup-edit",cover:e.cover,onBeforeShow:t,onShow:s,onBeforeHide:S,onHide:O,onEscapeKey:y},R)}}});function K(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const o=parseInt(e,10);return isNaN(o)?0:o}var de=z({name:"close-popup",beforeMount(e,{value:o}){const a={depth:K(o),handler(l){a.depth!==0&&setTimeout(()=>{const d=F(e);d!==void 0&&W(d,l,a.depth)})},handlerKey(l){Y(l,13)===!0&&a.handler(l)}};e.__qclosepopup=a,e.addEventListener("click",a.handler),e.addEventListener("keyup",a.handlerKey)},updated(e,{value:o,oldValue:a}){o!==a&&(e.__qclosepopup.depth=K(o))},beforeUnmount(e){const o=e.__qclosepopup;e.removeEventListener("click",o.handler),e.removeEventListener("keyup",o.handlerKey),delete e.__qclosepopup}});const fe={class:"text-h6"},pe={class:"col"},ve={class:"neubutton"},me={key:0},ge={key:1},Ve={__name:"DeploymentsPage",setup(e){const o=ue(),a=g([]),l=g(null),d=g([]),f=g(!1);let p="",c="";function b(){x.get("/api/v1/get-namespaces").then(i=>{d.value=i.data.data})}function M(){l.value&&x.get(`/api/v1/deploy/${l.value}`).then(i=>{let n=i.data.data;n.forEach(t=>{delete t.labels}),console.log(n),a.value=n}).catch(i=>{o.notify({color:"error",position:"top-right",message:i.message,icon:"report_problem"})})}function h(i){const n=parseInt(i.replicas,10);x.post("/api/v1/deploy/",{namespace:l.value,name:i.name,replicas:n}).then(t=>{let s=t.data;o.notify({color:s.status,position:"top-right",message:s.msg+" -> "+i.replicas,icon:"done"})}).catch(t=>{o.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})})}function y(i){x.get(`/api/v1/deploy/${l.value}/${i.name}`).then(n=>{const t=n.data;p=Q(t)}).catch(n=>{o.notify({color:"error",position:"top-right",message:n.message,icon:"report_problem"})}).finally(()=>{f.value=!0})}function Q(i){let n="";for(const t of i.data){c=t.name;for(const s of t.status)s.ready||(n+=`${s.name} container state is not ready because of ${s.state.waiting.reason}: ${s.state.waiting.message}.`)}return n===""&&(n="All containers are in a ready state."),n.trim()}return Z(b),(i,n)=>(q(),P(G,null,[r(X,{modelValue:f.value,"onUpdate:modelValue":n[0]||(n[0]=t=>f.value=t)},{default:u(()=>[r(J,null,{default:u(()=>[r($,null,{default:u(()=>[E("div",fe,"Pod: "+m(B(c)),1)]),_:1}),r($,{class:"q-pt-none"},{default:u(()=>[k(m(B(p)),1)]),_:1}),r(ee,{align:"right"},{default:u(()=>[te(r(V,{flat:"",label:"OK",color:"primary"},null,512),[[de]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(ne,{class:"flex flex-center"},{default:u(()=>[E("div",null,[E("div",pe,[r(se,{modelValue:l.value,"onUpdate:modelValue":[n[1]||(n[1]=t=>l.value=t),M],options:d.value,label:"Select Namespace"},null,8,["modelValue","options"])]),r(re,{flat:"",bordered:"",title:"Deploy",rows:a.value,"row-key":"name","binary-state-sort":""},{body:u(t=>[r(ie,{props:t},{default:u(()=>[r(_,{key:"name",props:t},{default:u(()=>[k(m(t.row.name),1)]),_:2},1032,["props"]),r(_,{key:"replicas",props:t},{default:u(()=>[E("div",ve,m(t.row.replicas),1),r(ce,{modelValue:t.row.replicas,"onUpdate:modelValue":s=>t.row.replicas=s,title:"Update Replica"},{default:u(s=>[r(ae,{modelValue:s.value,"onUpdate:modelValue":S=>s.value=S,dense:"",autofocus:"",onKeyup:oe(s.set,["enter"]),hint:"Replica Count"},{after:u(()=>[r(V,{flat:"",dense:"",color:"negative",icon:"cancel",onClick:D(s.cancel,["stop","prevent"])},null,8,["onClick"]),r(V,{flat:"",dense:"",color:"positive",icon:"check_circle",onClick:[D(s.set,["stop","prevent"]),S=>h(t.row)],disable:s.validate(s.value)===!1||s.initialValue===s.value},null,8,["onClick","disable"])]),_:2},1032,["modelValue","onUpdate:modelValue","onKeyup"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["props"]),r(_,{key:"availableReplicas",props:t},{default:u(()=>[k(m(t.row.availableReplicas),1)]),_:2},1032,["props"]),r(_,{key:"readyReplicas",props:t},{default:u(()=>[k(m(t.row.readyReplicas),1)]),_:2},1032,["props"]),r(_,{key:"status",props:t,class:N(t.row.status),style:{"align-content":"center"}},{default:u(()=>[t.row.status==="success"?(q(),P("div",me,[r(U,{name:"check_circle",size:"2rem",color:"green-7"})])):(q(),P("div",ge,[r(U,{name:"error",size:"2rem",color:"red-7",clickable:"",onClick:s=>y(t.row)},null,8,["onClick"])]))]),_:2},1032,["props","class"]),r(_,{key:"createdAt",props:t,class:N(t.row.createdAt)},{default:u(()=>[k(m(t.row.createdAt),1)]),_:2},1032,["props","class"])]),_:2},1032,["props"])]),_:1},8,["rows"])])]),_:1})],64))}};export{Ve as default};
