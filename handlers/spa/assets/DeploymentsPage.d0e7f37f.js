import{r as d,f as ue,P as u,$ as U,U as a,T as o,aS as P,a3 as ce,aT as L,aU as b,V as n,a2 as g,a0 as q,a1 as c,aV as pe,w as E,ah as r,S as y,aW as V,aX as F,aY as _,aZ as me,a_ as X,Q as R,a$ as ve,b0 as fe}from"./index.6cd1255e.js";import{_ as ge,Q as Z,a as G,b as k,c as ye,C as I}from"./plugin-vue_export-helper.d0e0bcec.js";import{Q as _e,b as he}from"./QPage.94bcfb30.js";import{Q as be,a as ke,b as w}from"./QTable.b0a94b70.js";import{api as x}from"./axios.619f6cf7.js";import{u as we}from"./use-quasar.13a4ebfa.js";import{V as xe}from"./theme-tomorrow_night.04d41718.js";import"./rtl.b51694b1.js";const ee=T=>(ve("data-v-8dafaf0c"),T=T(),fe(),T),Ce={class:"text-h6"},$e=ee(()=>n("div",{class:"text-h6"},"Response",-1)),Ve=["innerHTML"],Te=ee(()=>n("div",{class:"text-h6"},"Logs Streaming",-1)),Se={id:"logdata"},Qe=["innerHTML"],De={style:{"margin-left":"4%","margin-right":"4%","margin-top":"2%"}},ze={class:"full-width row wrap justify-start items-start content-stretch"},qe={class:"col-6"},Ee={class:"q-mb-md q-pr-xl q-pt-xl"},Ie={class:"neubutton"},Me={class:"neubutton"},Ae={key:0},Ne={key:1},Ue={class:"row"},Pe={class:"text-center"},Le={class:"q-ma-xl col-6 absolute-right"},Re={class:"row text-h5 text-weight-light q-mb-md",style:{"margin-left":"15%"}},Be={class:"q-ml-md text-weight-bold"},Oe={class:"row q-pa-md q-gutter-sm"},He={__name:"DeploymentsPage",setup(T){const m=we(),B=d([]),p=d(null),S=d(null),O=d([]),M=d(!1),v=d(""),h=d(null),C=d(!1),Q=d(!1),D=d(""),i=d(!1);let A="",H="";function te(){x.get("/api/v1/get-namespaces").then(s=>{O.value=s.data.data})}function N(){p.value&&x.get(`/api/v1/deploy/${p.value}`).then(s=>{let t=s.data.data;t.forEach(e=>{delete e.labels}),B.value=t}).catch(s=>{m.notify({color:"error",position:"top-right",message:s.message,icon:"report_problem"})})}function ae(s){const t=parseInt(s.replicas,10);x.post("/api/v1/deploy/",{namespace:p.value,name:s.name,replicas:t}).then(e=>{let l=e.data;m.notify({color:l.status,position:"top-right",message:l.msg+" -> "+s.replicas,icon:"done"}),setTimeout(()=>{N()},3e3)}).catch(e=>{m.notify({color:"error",position:"top-right",message:e.message,icon:"report_problem"})})}function oe(s){x.get(`/api/v1/deploy/${p.value}/${s.name}/yaml`).then(t=>{v.value=t.data.data,S.value=s.name}).catch(t=>{m.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})})}function le(){console.log(v.value),x.post(`/api/v1/deploy/${p.value}/${S.value}/yaml`,{data:v.value},{headers:{"Content-Type":"application/json"}}).then(s=>{v.value=s.data.data,m.notify({progress:!0,color:s.data.status,position:"top-right",message:s.data.msg,icon:"done"}),setTimeout(()=>{N()},3e3)}).catch(s=>{m.notify({color:"error",position:"top-right",message:s.message,icon:"report_problem"})})}function K(s){x.get(`/api/v1/deploy/${p.value}/${s.name}`).then(t=>{const e=t.data;A=se(e)}).catch(t=>{m.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})}).finally(()=>{M.value=!0})}function se(s){let t="";for(const e of s.data){H=e.name;for(const l of e.status)l.ready||(t+=`${l.name} container state is not ready because of ${l.state.waiting.reason}: ${l.state.waiting.message}.`)}return t===""&&(t="All containers are in a ready state."),t.trim()}async function ne(){let s=`you are an kubernetes and devops expert. for a given kubernetes deployment manifest in YAML format, you will provide only the missing best practices in htlm format use for code use pre tag and for text use p tag :
---
${v.value}`;const t=await fetch("http://localhost:11434/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"mistral",prompt:s})});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);h.value="",C.value=!0;const e=t.body.getReader(),l=async()=>{const{done:f,value:$}=await e.read();if(f){console.log("stream done");return}const W=new TextDecoder("utf-8").decode($),z=JSON.parse(W);console.log(z.response),h.value+=z.response,l()};l()}function ie(){h.value=null,C.value=!1}async function re(s){let t=`you are an kubernetes and devops expert. for a given kubernetes error message, you will provide most possible debugging points try to keep them as concise as possible in htlm format use <pre></pre> tag for all your respose, do not use title or heading:
---
${s}`;const e=await fetch("http://localhost:11434/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"mistral",prompt:t})});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);h.value="",C.value=!0;const l=e.body.getReader(),f=async()=>{const{done:$,value:J}=await l.read();if($){console.log("stream done");return}const z=new TextDecoder("utf-8").decode(J),Y=JSON.parse(z);console.log(Y.response),h.value+=Y.response,f()};f()}function j(){Q.value=!1,D.value=""}function de(s){let t=`ws://localhost:8081/api/v1/logs/${p.value}/${s.name}`;const e=new WebSocket(t);Q.value=!0,D.value="",e.onmessage=l=>{D.value+=`<p class="text text-body1">${l.data}</p></br>`,setTimeout(()=>{var $=document.getElementById("logdata").lastElementChild;$.scrollIntoView({behavior:"smooth",block:"end"})},300)},e.onerror=l=>{e.close(),m.notify({color:"error",position:"top-right",message:l.message,icon:"report_problem"})}}return ue(te),(s,t)=>(u(),U(ce,null,[a(P,{modelValue:M.value,"onUpdate:modelValue":t[1]||(t[1]=e=>M.value=e)},{default:o(()=>[a(L,null,{default:o(()=>[a(b,null,{default:o(()=>[n("div",Ce,"Pod: "+g(q(H)),1)]),_:1}),a(b,{class:"q-pt-none"},{default:o(()=>[c(g(q(A)),1)]),_:1}),a(pe,{align:"right"},{default:o(()=>[E(a(r,{flat:"",label:"OK",color:"primary"},null,512),[[I]]),E(a(r,{flat:"",label:"Ask AI?",color:"secondary",onClick:t[0]||(t[0]=e=>re(q(A)))},null,512),[[I]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(P,{modelValue:C.value,"onUpdate:modelValue":t[4]||(t[4]=e=>C.value=e),persistent:"",maximized:i.value,"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[a(L,{class:"bg-primary--dark"},{default:o(()=>[a(Z,null,{default:o(()=>[a(G),a(r,{dense:"",flat:"",icon:"minimize",onClick:t[2]||(t[2]=e=>i.value=!1),disable:!i.value},{default:o(()=>[i.value?V("",!0):(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Maximize")]),_:1}))]),_:1},8,["disable"]),a(r,{dense:"",flat:"",icon:"crop_square",onClick:t[3]||(t[3]=e=>i.value=!0),disable:i.value},{default:o(()=>[i.value?(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Minimize")]),_:1})):V("",!0)]),_:1},8,["disable"]),E((u(),y(r,{dense:"",flat:"",icon:"close",onClick:ie},{default:o(()=>[a(k,{class:"bg-white text-primary"},{default:o(()=>[c("Close")]),_:1})]),_:1})),[[I]])]),_:1}),a(b,null,{default:o(()=>[$e]),_:1}),a(b,{class:"q-pt-none"},{default:o(()=>[n("div",{innerHTML:h.value},null,8,Ve)]),_:1})]),_:1})]),_:1},8,["modelValue","maximized"]),a(P,{modelValue:Q.value,"onUpdate:modelValue":t[7]||(t[7]=e=>Q.value=e),persistent:"",maximized:i.value,"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[a(L,{class:"bg-primary--dark",onKeyup:F(_(j,["prevent"]),["esc"]),tabindex:"0"},{default:o(()=>[a(Z,null,{default:o(()=>[a(G),a(r,{dense:"",flat:"",icon:"minimize",onClick:t[5]||(t[5]=e=>i.value=!1),disable:!i.value},{default:o(()=>[i.value?V("",!0):(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Maximize")]),_:1}))]),_:1},8,["disable"]),a(r,{dense:"",flat:"",icon:"crop_square",onClick:t[6]||(t[6]=e=>i.value=!0),disable:i.value},{default:o(()=>[i.value?(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Minimize")]),_:1})):V("",!0)]),_:1},8,["disable"]),E((u(),y(r,{dense:"",flat:"",icon:"close",onClick:j},{default:o(()=>[a(k,{class:"bg-white text-primary"},{default:o(()=>[c("Close")]),_:1})]),_:1})),[[I]])]),_:1}),a(b,null,{default:o(()=>[Te]),_:1}),a(b,{class:"q-pt-none"},{default:o(()=>[n("div",Se,[n("div",{innerHTML:D.value},null,8,Qe)])]),_:1})]),_:1},8,["onKeyup"])]),_:1},8,["modelValue","maximized"]),a(_e,null,{default:o(()=>[n("div",De,[n("div",ze,[n("div",qe,[n("div",Ee,[a(he,{modelValue:p.value,"onUpdate:modelValue":[t[8]||(t[8]=e=>p.value=e),N],options:O.value,label:"Select Namespace"},null,8,["modelValue","options"])]),a(be,{flat:"",bordered:"",title:"Deploy",rows:B.value,"row-key":"name"},{body:o(e=>[a(ke,{props:e},{default:o(()=>[a(w,{key:"name",props:e,onClick:_(l=>de(e.row),["stop"])},{default:o(()=>[n("div",Ie,g(e.row.name),1)]),_:2},1032,["props","onClick"]),a(w,{key:"replicas",props:e},{default:o(()=>[n("div",Me,g(e.row.replicas),1),a(ye,{modelValue:e.row.replicas,"onUpdate:modelValue":l=>e.row.replicas=l,title:"Update Replica"},{default:o(l=>[a(me,{modelValue:l.value,"onUpdate:modelValue":f=>l.value=f,dense:"",autofocus:"",onKeyup:F(l.set,["enter"]),hint:"Replica Count"},{after:o(()=>[a(r,{flat:"",dense:"",color:"negative",icon:"cancel",onClick:_(l.cancel,["stop","prevent"])},null,8,["onClick"]),a(r,{flat:"",dense:"",color:"positive",icon:"check_circle",onClick:[_(l.set,["stop","prevent"]),f=>ae(e.row)],disable:l.validate(l.value)===!1||l.initialValue===l.value},null,8,["onClick","disable"])]),_:2},1032,["modelValue","onUpdate:modelValue","onKeyup"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["props"]),a(w,{key:"availableReplicas",props:e},{default:o(()=>[c(g(e.row.availableReplicas),1)]),_:2},1032,["props"]),a(w,{key:"readyReplicas",props:e},{default:o(()=>[c(g(e.row.readyReplicas),1)]),_:2},1032,["props"]),a(w,{key:"status",props:e,class:X(e.row.status),style:{"align-content":"center"}},{default:o(()=>[e.row.status==="success"?(u(),U("div",Ae,[a(R,{name:"check_circle",size:"2em",color:"green-12",onClick:_(l=>K(e.row),["stop"])},null,8,["onClick"])])):(u(),U("div",Ne,[a(R,{name:"error",size:"2em",color:"red-12",clickable:"",onClick:_(l=>K(e.row),["stop"])},null,8,["onClick"])]))]),_:2},1032,["props","class"]),a(w,{key:"createdAt",props:e,class:X(e.row.createdAt)},{default:o(()=>[n("div",Ue,[n("div",Pe,g(e.row.createdAt.split("T")[0]),1),a(R,{name:"edit_square",size:"2em",color:"yellow-2",onClick:_(l=>oe(e.row),["stop"])},null,8,["onClick"])])]),_:2},1032,["props","class"])]),_:2},1032,["props"])]),_:1},8,["rows"])]),n("div",Le,[n("div",null,[n("div",Re,[c("Editing "),n("span",Be,g(S.value),1)]),a(q(xe),{style:{"margin-left":"15%"},value:v.value,"onUpdate:value":t[9]||(t[9]=e=>v.value=e),lang:"yaml",theme:"tomorrow_night",options:{autoScrollEditorIntoView:!0,copyWithEmptySelection:!0,fontSize:15,minLines:30,maxLines:50}},null,8,["value"])]),n("div",Oe,[a(r,{style:{"margin-left":"15%"},color:"secondary",label:"Update Deployment",clickable:"",onClick:t[10]||(t[10]=e=>le())}),v.value&&S.value?(u(),y(r,{key:0,style:{"margin-left":"15%"},color:"blue-14",label:"Ask AI?",clickable:"",onClick:t[11]||(t[11]=e=>ne())})):V("",!0)])])])])]),_:1})],64))}};var Ge=ge(He,[["__scopeId","data-v-8dafaf0c"]]);export{Ge as default};
