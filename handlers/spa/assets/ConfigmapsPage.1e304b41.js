import{Q as h,b as d}from"./QPage.3ff2a54e.js";import{r as n,f as y,P as V,S as _,T as C,V as l,U as r,a0 as b,ah as S}from"./index.0ca5e8aa.js";import{u as $}from"./use-quasar.83fc6110.js";import{api as m}from"./axios.e13427cd.js";import{V as q}from"./theme-tomorrow_night.9fc648d6.js";import"./rtl.b51694b1.js";const x={class:"q-pa-md"},B={class:"q-pa-md q-pb-xl"},N={class:"q-pa-md q-gutter-sm"},L={__name:"ConfigmapsPage",setup(Q){const i=n(""),u=n([]),c=n([]),a=n([]),p=n([]),s=$();function v(){m.get(`/api/v1/cm/${a.value}`).then(e=>{u.value=e.data.data}).catch(e=>{s.notify({color:"negative",position:"top-right",message:e.message,icon:"report_problem"})})}function g(){m.get(`/api/v1/cm/${a.value}/${p.value}`).then(e=>{i.value=e.data.data}).catch(e=>{s.notify({color:"positive",position:"top-right",message:e.message,icon:"report_problem"})})}function f(){m.post(`/api/v1/cm/${a.value}/${p.value}`,i.value,{headers:{"Content-Type":"text/plain"}}).then(e=>{s.notify({color:e.data.status,position:"top-right",message:e.data.msg,icon:"done"})}).catch(e=>{s.notify({color:"error",position:"top-right",message:e.message,icon:"report_problem"})})}return y(async()=>{m.get("/api/v1/get-namespaces").then(e=>{c.value=e.data.data}).catch(e=>{s.notify({color:"negative",position:"top-right",message:e.message,icon:"report_problem"})})}),(e,o)=>(V(),_(h,{class:""},{default:C(()=>[l("div",null,[l("div",x,[r(d,{modelValue:a.value,"onUpdate:modelValue":[o[0]||(o[0]=t=>a.value=t),v],options:c.value,label:"Select Namespace"},null,8,["modelValue","options"])]),l("div",B,[r(d,{modelValue:p.value,"onUpdate:modelValue":[o[1]||(o[1]=t=>p.value=t),g],options:u.value,label:"Select ConfigMap"},null,8,["modelValue","options"])])]),l("div",null,[r(b(q),{value:i.value,"onUpdate:value":o[2]||(o[2]=t=>i.value=t),lang:"yaml",theme:"tomorrow_night",options:{autoScrollEditorIntoView:!0,copyWithEmptySelection:!0,fontSize:15,minLines:40,maxLines:80}},null,8,["value"])]),l("div",N,[r(S,{color:"secondary",label:"Update ConfigMap",clickable:"",onClick:o[3]||(o[3]=t=>f())})])]),_:1}))}};export{L as default};
