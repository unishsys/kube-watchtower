import{Q as h,i as d}from"./QPage.40c8b34e.js";import{r as n,f as y,P as V,S as _,T as C,V as l,U as r,a0 as b,a5 as S,a6 as x}from"./index.2eff8765.js";import{u as N}from"./use-quasar.0bfb1d46.js";import{api as m}from"./axios.21e760e9.js";import{V as $}from"./theme-tomorrow_night.f6765b8e.js";const q={class:"q-pa-md"},B={class:"q-pa-md q-pb-xl"},Q={class:"q-pa-md q-gutter-sm"},T={__name:"ConfigmapsPage",setup(U){const i=n(""),u=n([]),c=n([]),a=n([]),p=n([]),s=N();function v(){m.get(`/api/v1/cm/${a.value}`).then(e=>{u.value=e.data.data}).catch(e=>{s.notify({color:"negative",position:"top-right",message:e.message,icon:"report_problem"})})}function g(){m.get(`/api/v1/cm/${a.value}/${p.value}`).then(e=>{i.value=e.data.data}).catch(e=>{s.notify({color:"positive",position:"top-right",message:e.message,icon:"report_problem"})})}function f(){m.post(`/api/v1/cm/${a.value}/${p.value}`,i.value,{headers:{"Content-Type":"text/plain"}}).then(e=>{s.notify({color:e.data.status,position:"top-right",message:e.data.msg,icon:"done"})}).catch(e=>{s.notify({color:"error",position:"top-right",message:e.message,icon:"report_problem"})})}return y(async()=>{m.get("/api/v1/get-namespaces").then(e=>{c.value=e.data.data}).catch(e=>{s.notify({color:"negative",position:"top-right",message:e.message,icon:"report_problem"})})}),(e,o)=>(V(),_(h,{class:""},{default:C(()=>[l("div",null,[l("div",q,[r(d,{modelValue:a.value,"onUpdate:modelValue":[o[0]||(o[0]=t=>a.value=t),v],options:c.value,label:"Select Namespace"},null,8,["modelValue","options"])]),l("div",B,[r(d,{modelValue:p.value,"onUpdate:modelValue":[o[1]||(o[1]=t=>p.value=t),g],options:u.value,label:"Select ConfigMap"},null,8,["modelValue","options"])])]),l("div",null,[r(b($),{value:i.value,"onUpdate:value":o[2]||(o[2]=t=>i.value=t),lang:"yaml",theme:"tomorrow_night",options:{autoScrollEditorIntoView:!0,copyWithEmptySelection:!0,fontSize:15,minLines:40,maxLines:80}},null,8,["value"])]),l("div",Q,[r(S,{color:"secondary",label:"Update ConfigMap",clickable:"",onClick:o[3]||(o[3]=t=>f())})]),x(" F ")]),_:1}))}};export{T as default};