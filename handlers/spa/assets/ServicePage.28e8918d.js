import{Q as R,b as T}from"./QPage.f444a092.js";import{c as $,r as x,C as A,D as j,E as z,f as U,h as O,d as K,l as L,b6 as M,s as F,y as W,aI as X,b7 as G,P as g,S as H,T as u,U as n,V as J,$ as S,aW as _,aX as N,ah as B,a1 as P,a2 as V}from"./index.2087af4f.js";import{Q as Y,a as Z,b as h}from"./QTable.d1bc2d30.js";import{api as w}from"./axios.bb6a5d9e.js";import{u as ee}from"./use-quasar.5a74fe4b.js";import"./rtl.b51694b1.js";var te=$({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(p,{slots:v,emit:f}){const k=L(),i=x(null);let c=0;const d=[];function C(l){const a=typeof l=="boolean"?l:p.noErrorFocus!==!0,t=++c,o=(r,s)=>{f("validation"+(r===!0?"Success":"Error"),s)},Q=r=>{const s=r.validate();return typeof s.then=="function"?s.then(m=>({valid:m,comp:r}),m=>({valid:!1,comp:r,err:m})):Promise.resolve({valid:s,comp:r})};return(p.greedy===!0?Promise.all(d.map(Q)).then(r=>r.filter(s=>s.valid!==!0)):d.reduce((r,s)=>r.then(()=>Q(s).then(m=>{if(m.valid===!1)return Promise.reject(m)})),Promise.resolve()).catch(r=>[r])).then(r=>{if(r===void 0||r.length===0)return t===c&&o(!0),!0;if(t===c){const{comp:s,err:m}=r[0];if(m!==void 0&&console.error(m),o(!1,s),a===!0){const D=r.find(({comp:E})=>typeof E.focus=="function"&&M(E.$)===!1);D!==void 0&&D.comp.focus()}}return!1})}function e(){c++,d.forEach(l=>{typeof l.resetValidation=="function"&&l.resetValidation()})}function q(l){l!==void 0&&F(l);const a=c+1;C().then(t=>{a===c&&t===!0&&(p.onSubmit!==void 0?f("submit",l):l!==void 0&&l.target!==void 0&&typeof l.target.submit=="function"&&l.target.submit())})}function y(l){l!==void 0&&F(l),f("reset"),W(()=>{e(),p.autofocus===!0&&p.noResetFocus!==!0&&b()})}function b(){X(()=>{if(i.value===null)return;const l=i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"),a=>a.tabIndex!==-1);l!=null&&l.focus({preventScroll:!0})})}A(G,{bindComponent(l){d.push(l)},unbindComponent(l){const a=d.indexOf(l);a!==-1&&d.splice(a,1)}});let I=!1;return j(()=>{I=!0}),z(()=>{I===!0&&p.autofocus===!0&&b()}),U(()=>{p.autofocus===!0&&b()}),Object.assign(k.proxy,{validate:C,resetValidation:e,submit:q,reset:y,focus:b,getValidationComponents:()=>d}),()=>O("form",{class:"q-form",ref:i,onSubmit:q,onReset:y},K(v.default))}});const oe={class:"row q-gutter-md"},ae={key:0},le={key:0,class:"row q-gutter-md"},ne={key:1,class:"row q-gutter-md"},re={key:2,class:"row q-gutter-md"},se={key:3},fe={__name:"ServicePage",setup(p){const v=ee(),f=x([]),k=x([]),i=x([]),c=x([]),d=["TCP","UDP"],C=["NodePort","LoadBalancer","ClusterIP"],e=x({name:null,namespace:null,labels:{app:null},containerPort:null,servicePort:null,protocol:"TCP",selector:{app:null},type:null});function q(){w.get("/api/v1/get-namespaces").then(a=>{k.value=a.data.data})}function y(){w.get(`/api/v1/deploy/${e.value.namespace}`).then(a=>{f.value=a.data.data.map(t=>t.name),i.value=a.data.data}).catch(a=>{v.notify({color:"error",position:"top-right",message:a.message,icon:"report_problem"})}),w.get(`/api/v1/svc/${e.value.namespace}`).then(a=>{c.value=a.data.data}).catch(a=>{v.notify({color:"error",position:"top-right",message:a.message,icon:"report_problem"})})}function b(a){console.log("Delete clicked for row:",a),w.delete(`/api/v1/svc/${e.value.namespace}/${a.name}`).then(t=>{v.notify({color:"success",position:"top-right",message:"Service Deleted: "+a.name,icon:"done"}),setTimeout(()=>{y()},3e3)}).catch(t=>{v.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})})}function I(){e.value={}}function l(){const a=i.value.find(t=>t.name===e.value.name);e.value.labels=a.labels,e.value.selector=a.labels,e.value.containerPort=parseInt(e.value.containerPort,10),e.value.servicePort=parseInt(e.value.servicePort,10),w.post("/api/v1/svc/",e.value).then(t=>{v.notify({color:t.data.status,position:"top-right",message:t.data.msg+": "+t.data.data.metadata.name,icon:"done"}),setTimeout(()=>{y()},3e3)}).catch(t=>{v.notify({color:"error",position:"top-right",message:t.message,icon:"report_problem"})})}return U(q),(a,t)=>(g(),H(R,{class:"flex flex-center"},{default:u(()=>[n(te,{modelValue:e.value,"onUpdate:modelValue":t[6]||(t[6]=o=>e.value=o),onSubmit:l,onReset:I,class:"q-gutter-md"},{default:u(()=>[J("div",oe,[n(T,{modelValue:e.value.namespace,"onUpdate:modelValue":[t[0]||(t[0]=o=>e.value.namespace=o),y],options:k.value,label:"Select Namespace",filled:"",style:{width:"180px"}},null,8,["modelValue","options"]),e.value.namespace?(g(),S("div",ae,[n(T,{modelValue:e.value.name,"onUpdate:modelValue":t[1]||(t[1]=o=>e.value.name=o),options:f.value,label:"Select Deployment",filled:"",style:{width:"180px"}},null,8,["modelValue","options"])])):_("",!0)]),e.value.name?(g(),S("div",le,[n(N,{filled:"",type:"number",modelValue:e.value.containerPort,"onUpdate:modelValue":t[2]||(t[2]=o=>e.value.containerPort=o),label:"Container Port *","lazy-rules":"",style:{width:"180px"}},null,8,["modelValue"]),n(N,{filled:"",type:"number",modelValue:e.value.servicePort,"onUpdate:modelValue":t[3]||(t[3]=o=>e.value.servicePort=o),label:"Service Port *","lazy-rules":"",style:{width:"180px"}},null,8,["modelValue"])])):_("",!0),e.value.containerPort&&e.value.servicePort?(g(),S("div",ne,[n(T,{options:d,modelValue:e.value.protocol,"onUpdate:modelValue":t[4]||(t[4]=o=>e.value.protocol=o),label:"Service Protocol",filled:"",style:{width:"180px"}},null,8,["modelValue"]),n(T,{options:C,modelValue:e.value.type,"onUpdate:modelValue":t[5]||(t[5]=o=>e.value.type=o),label:"Service Type",filled:"",style:{width:"180px"}},null,8,["modelValue"])])):_("",!0),e.value.protocol&&e.value.type?(g(),S("div",re,[n(B,{label:"Submit",type:"submit",color:"primary",class:"q-pr-md"}),n(B,{label:"Reset",type:"reset",color:"primary",flat:"",class:"q-ml-sm"})])):_("",!0),e.value.namespace?(g(),S("div",se,[n(Y,{title:"Services",rows:c.value,"row-key":"name",flat:"",bordered:""},{body:u(o=>[n(Z,{props:o},{default:u(()=>[n(h,{key:"name",props:o},{default:u(()=>[P(V(o.row.name),1)]),_:2},1032,["props"]),n(h,{key:"type",props:o},{default:u(()=>[P(V(o.row.type),1)]),_:2},1032,["props"]),n(h,{key:"clusterIp",props:o},{default:u(()=>[P(V(o.row.clusterIp),1)]),_:2},1032,["props"]),n(h,{key:"externalIp",props:o},{default:u(()=>[P(V(o.row.externalIp),1)]),_:2},1032,["props"]),n(h,{key:"ports",props:o},{default:u(()=>[P(V(o.row.ports),1)]),_:2},1032,["props"]),n(h,{key:"createdAt",props:o},{default:u(()=>[P(V(o.row.createdAt)+" ",1),n(B,{icon:"delete",onClick:Q=>b(o.row),color:"red-12",class:"q-ml-lg"},null,8,["onClick"])]),_:2},1032,["props"])]),_:2},1032,["props"])]),_:1},8,["rows"])])):_("",!0)]),_:1},8,["modelValue"])]),_:1}))}};export{fe as default};
