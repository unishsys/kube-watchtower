import{r,f as pe,P as u,$ as U,U as a,T as o,a1 as B,aa as ve,a2 as L,a8 as h,V as n,a9 as g,a0 as I,a6 as c,a$ as fe,w as z,a5 as d,S as y,a7 as V,a3 as X,a4 as _,b0 as ge,b1 as Z,Q as R,b2 as ye,b3 as _e}from"./index.2eff8765.js";import{Q as ee,a as te,b as k,C as q}from"./ClosePopup.bf58d94f.js";import{Q as be,i as he}from"./QPage.40c8b34e.js";import{Q as ke,a as we,b as w}from"./QTable.f86776b3.js";import{_ as Ce,Q as xe}from"./plugin-vue_export-helper.78d05373.js";import{api as C}from"./axios.21e760e9.js";import{u as $e}from"./use-quasar.0bfb1d46.js";import{V as Ve}from"./theme-tomorrow_night.f6765b8e.js";const ae=T=>(ye("data-v-7ba23838"),T=T(),_e(),T),Te={class:"text-h6"},De=ae(()=>n("div",{class:"text-h6"},"Response",-1)),Qe={id:"airesp"},Se=["innerHTML"],Ee=ae(()=>n("div",{class:"text-h6"},"Logs Streaming",-1)),Ie={id:"logdata"},ze=["innerHTML"],qe={style:{"margin-left":"4%","margin-right":"4%","margin-top":"2%"}},Me={class:"full-width row wrap justify-start items-start content-stretch"},Ae={class:"col-6"},Ne={class:"q-mb-md q-pr-xl q-pt-xl"},Pe={class:"neubutton"},Ue={class:"neubutton"},Be={key:0},Le={key:1},Re={class:"row"},Oe={class:"text-center"},He={class:"q-ma-xl col-6 absolute-right"},Ke={class:"row text-h5 text-weight-light q-mb-md",style:{"margin-left":"15%"}},je={class:"q-ml-md text-weight-bold"},Je={class:"row q-pa-md q-gutter-sm"},We={__name:"DeploymentsPage",setup(T){const v=$e(),O=r([]),m=r(null),D=r(null),H=r([]),M=r(!1),f=r(""),b=r(null),x=r(!1),Q=r(!1),S=r(""),i=r(!1),$=r(null);let A="",K="";function oe(){C.get("/api/v1/get-namespaces").then(l=>{H.value=l.data.data})}function N(){m.value&&C.get(`/api/v1/deploy/${m.value}`).then(l=>{let t=l.data.data;t.forEach(e=>{delete e.labels}),O.value=t}).catch(l=>{v.notify({color:"error",position:"top-right",message:l.message,icon:"report_problem"})})}function le(l){const t=parseInt(l.replicas,10);C.post("/api/v1/deploy/",{namespace:m.value,name:l.name,replicas:t}).then(e=>{let s=e.data;v.notify({color:s.status,position:"top-right",message:s.msg+" -> "+l.replicas,icon:"done"}),setTimeout(()=>{N()},3e3)}).catch(e=>{v.notify({color:"error",position:"top-right",message:e.message,icon:"report_problem"})})}function se(l){C.get(`/api/v1/deploy/${m.value}/${l.name}/yaml`).then(t=>{f.value=t.data.data,D.value=l.name}).catch(t=>{v.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})})}function ne(){console.log(f.value),C.post(`/api/v1/deploy/${m.value}/${D.value}/yaml`,{data:f.value},{headers:{"Content-Type":"application/json"}}).then(l=>{f.value=l.data.data,v.notify({progress:!0,color:l.data.status,position:"top-right",message:l.data.msg,icon:"done"}),setTimeout(()=>{N()},3e3)}).catch(l=>{v.notify({color:"error",position:"top-right",message:l.message,icon:"report_problem"})})}function j(l){C.get(`/api/v1/deploy/${m.value}/${l.name}`).then(t=>{const e=t.data;A=ie(e)}).catch(t=>{v.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})}).finally(()=>{M.value=!0})}function ie(l){let t="";for(const e of l.data){K=e.name;for(const s of e.status)s.ready||(t+=`${s.name} container state is not ready because of ${s.state.waiting.reason}: ${s.state.waiting.message}.`)}return t===""&&(t="All containers are in a ready state."),t.trim()}async function re(){let l=`you are an kubernetes and devops expert. for a given kubernetes deployment manifest in YAML format, you will provide only the missing best practices in htlm format use for code use pre tag and for text use p tag :
---
${f.value}`;b.value="",x.value=!0;const t=await fetch("http://192.168.1.101:11434/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"mistral",prompt:l})});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=t.body.getReader(),s=async()=>{const{done:p,value:P}=await e.read();if(p){console.log("stream done");return}const Y=new TextDecoder("utf-8").decode(P),E=JSON.parse(Y);console.log(E.response),b.value+=E.response,s(),setTimeout(()=>{var G=document.getElementById("airesp").lastElementChild;G.scrollIntoView({behavior:"smooth",block:"end"})},300)};s()}function de(){b.value=null,x.value=!1}async function ue(l){let t=`you are an kubernetes and devops expert. for a given kubernetes error message, you will provide most possible debugging points try to keep them as concise as possible in htlm format use <pre></pre> tag for all your respose, do not use title or heading:
---
${l}`;b.value="",x.value=!0;const e=await fetch("http://192.168.1.101:11434/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"mistral",prompt:t})});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const s=e.body.getReader(),p=async()=>{const{done:P,value:W}=await s.read();if(P){console.log("stream done");return}const E=new TextDecoder("utf-8").decode(W),F=JSON.parse(E);b.value+=F.response,p(),setTimeout(()=>{var me=document.getElementById("airesp").lastElementChild;me.scrollIntoView({behavior:"smooth",block:"end"})},300)};p()}function J(){Q.value=!1,S.value="",$.value.close()}function ce(l){let t=`ws://${window.location.host}/api/v1/logs/deploy/${m.value}/${l.name}`;$.value=new WebSocket(t),Q.value=!0,S.value="",$.value.onmessage=e=>{S.value+=`<p class="text text-body1">${e.data}</p></br>`,setTimeout(()=>{var p=document.getElementById("logdata").lastElementChild;p.scrollIntoView({behavior:"smooth",block:"end"})},300)},$.value.onerror=e=>{$.value.close(),v.notify({color:"error",position:"top-right",message:e.message,icon:"report_problem"})}}return pe(oe),(l,t)=>(u(),U(ve,null,[a(B,{modelValue:M.value,"onUpdate:modelValue":t[1]||(t[1]=e=>M.value=e)},{default:o(()=>[a(L,null,{default:o(()=>[a(h,null,{default:o(()=>[n("div",Te,"Pod: "+g(I(K)),1)]),_:1}),a(h,{class:"q-pt-none"},{default:o(()=>[c(g(I(A)),1)]),_:1}),a(fe,{align:"right"},{default:o(()=>[z(a(d,{flat:"",label:"OK",color:"primary"},null,512),[[q]]),z(a(d,{flat:"",label:"Ask AI?",color:"secondary",onClick:t[0]||(t[0]=e=>ue(I(A)))},null,512),[[q]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(B,{modelValue:x.value,"onUpdate:modelValue":t[4]||(t[4]=e=>x.value=e),persistent:"",maximized:i.value,"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[a(L,{class:"bg-primary--dark"},{default:o(()=>[a(ee,null,{default:o(()=>[a(te),a(d,{dense:"",flat:"",icon:"minimize",onClick:t[2]||(t[2]=e=>i.value=!1),disable:!i.value},{default:o(()=>[i.value?V("",!0):(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Maximize")]),_:1}))]),_:1},8,["disable"]),a(d,{dense:"",flat:"",icon:"crop_square",onClick:t[3]||(t[3]=e=>i.value=!0),disable:i.value},{default:o(()=>[i.value?(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Minimize")]),_:1})):V("",!0)]),_:1},8,["disable"]),z((u(),y(d,{dense:"",flat:"",icon:"close",onClick:de},{default:o(()=>[a(k,{class:"bg-white text-primary"},{default:o(()=>[c("Close")]),_:1})]),_:1})),[[q]])]),_:1}),a(h,null,{default:o(()=>[De]),_:1}),a(h,{class:"q-pt-none"},{default:o(()=>[n("div",Qe,[n("div",{innerHTML:b.value},null,8,Se)])]),_:1})]),_:1})]),_:1},8,["modelValue","maximized"]),a(B,{modelValue:Q.value,"onUpdate:modelValue":t[7]||(t[7]=e=>Q.value=e),persistent:"",maximized:i.value,"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[a(L,{class:"bg-primary--dark",onKeyup:X(_(J,["prevent"]),["esc"]),tabindex:"0"},{default:o(()=>[a(ee,null,{default:o(()=>[a(te),a(d,{dense:"",flat:"",icon:"minimize",onClick:t[5]||(t[5]=e=>i.value=!1),disable:!i.value},{default:o(()=>[i.value?V("",!0):(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Maximize")]),_:1}))]),_:1},8,["disable"]),a(d,{dense:"",flat:"",icon:"crop_square",onClick:t[6]||(t[6]=e=>i.value=!0),disable:i.value},{default:o(()=>[i.value?(u(),y(k,{key:0,class:"bg-white text-primary"},{default:o(()=>[c("Minimize")]),_:1})):V("",!0)]),_:1},8,["disable"]),z((u(),y(d,{dense:"",flat:"",icon:"close",onClick:J},{default:o(()=>[a(k,{class:"bg-white text-primary"},{default:o(()=>[c("Close")]),_:1})]),_:1})),[[q]])]),_:1}),a(h,null,{default:o(()=>[Ee]),_:1}),a(h,{class:"q-pt-none"},{default:o(()=>[n("div",Ie,[n("div",{innerHTML:S.value},null,8,ze)])]),_:1})]),_:1},8,["onKeyup"])]),_:1},8,["modelValue","maximized"]),a(be,null,{default:o(()=>[n("div",qe,[n("div",Me,[n("div",Ae,[n("div",Ne,[a(he,{modelValue:m.value,"onUpdate:modelValue":[t[8]||(t[8]=e=>m.value=e),N],options:H.value,label:"Select Namespace"},null,8,["modelValue","options"])]),a(ke,{flat:"",bordered:"",title:"Deploy",rows:O.value,"row-key":"name"},{body:o(e=>[a(we,{props:e},{default:o(()=>[a(w,{key:"name",props:e,onClick:_(s=>ce(e.row),["stop"])},{default:o(()=>[n("div",Pe,g(e.row.name),1)]),_:2},1032,["props","onClick"]),a(w,{key:"replicas",props:e},{default:o(()=>[n("div",Ue,g(e.row.replicas),1),a(xe,{modelValue:e.row.replicas,"onUpdate:modelValue":s=>e.row.replicas=s,title:"Update Replica"},{default:o(s=>[a(ge,{modelValue:s.value,"onUpdate:modelValue":p=>s.value=p,dense:"",autofocus:"",onKeyup:X(s.set,["enter"]),hint:"Replica Count"},{after:o(()=>[a(d,{flat:"",dense:"",color:"negative",icon:"cancel",onClick:_(s.cancel,["stop","prevent"])},null,8,["onClick"]),a(d,{flat:"",dense:"",color:"positive",icon:"check_circle",onClick:[_(s.set,["stop","prevent"]),p=>le(e.row)],disable:s.validate(s.value)===!1||s.initialValue===s.value},null,8,["onClick","disable"])]),_:2},1032,["modelValue","onUpdate:modelValue","onKeyup"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["props"]),a(w,{key:"availableReplicas",props:e},{default:o(()=>[c(g(e.row.availableReplicas),1)]),_:2},1032,["props"]),a(w,{key:"readyReplicas",props:e},{default:o(()=>[c(g(e.row.readyReplicas),1)]),_:2},1032,["props"]),a(w,{key:"status",props:e,class:Z(e.row.status),style:{"align-content":"center"}},{default:o(()=>[e.row.status==="success"?(u(),U("div",Be,[a(R,{name:"check_circle",size:"2em",color:"green-12",onClick:_(s=>j(e.row),["stop"])},null,8,["onClick"])])):(u(),U("div",Le,[a(R,{name:"error",size:"2em",color:"red-12",clickable:"",onClick:_(s=>j(e.row),["stop"])},null,8,["onClick"])]))]),_:2},1032,["props","class"]),a(w,{key:"createdAt",props:e,class:Z(e.row.createdAt)},{default:o(()=>[n("div",Re,[n("div",Oe,g(e.row.createdAt.split("T")[0]),1),a(R,{name:"edit_square",size:"2em",color:"yellow-2",onClick:_(s=>se(e.row),["stop"])},null,8,["onClick"])])]),_:2},1032,["props","class"])]),_:2},1032,["props"])]),_:1},8,["rows"])]),n("div",He,[n("div",null,[n("div",Ke,[c(" Editing "),n("span",je,g(D.value),1)]),a(I(Ve),{style:{"margin-left":"15%"},value:f.value,"onUpdate:value":t[9]||(t[9]=e=>f.value=e),lang:"yaml",theme:"tomorrow_night",options:{autoScrollEditorIntoView:!0,copyWithEmptySelection:!0,fontSize:15,minLines:30,maxLines:50}},null,8,["value"])]),n("div",Je,[a(d,{style:{"margin-left":"15%"},color:"secondary",label:"Update Deployment",clickable:"",onClick:t[10]||(t[10]=e=>ne())}),f.value&&D.value?(u(),y(d,{key:0,style:{"margin-left":"15%"},color:"blue-14",label:"Ask AI?",clickable:"",onClick:t[11]||(t[11]=e=>re())})):V("",!0)])])])])]),_:1})],64))}};var ot=Ce(We,[["__scopeId","data-v-7ba23838"]]);export{ot as default};
