import{Q as w,a as k,b as o}from"./QTable.38c09e30.js";import{r as c,f as N,P as l,Y as i,U as t,T as a,V as p,Z as v,_ as s,$ as r,Q as y,a0 as T,a1 as I}from"./index.c4201437.js";import{Q as C}from"./QPage.b571d28d.js";import{api as b}from"./axios.5a8bb3c7.js";import{q as U}from"./vue3-apexcharts.dc4356d4.js";import"./rtl.b51694b1.js";const q={style:{"margin-right":"15%","margin-left":"15%"}},O=p("p",{class:"text-h5 q-pt-xl text-weight-light"},"Node Details",-1),P={class:"row no-wrap justify-around"},z={class:"q-pt-xl"},M=p("p",{class:"text-h5 q-pt-md text-weight-light"},"Pods Info",-1),V={key:0},B={key:1},S={class:"q-pt-xl"},D=p("p",{class:"text-h5 q-pt-xl text-weight-light"},"Nodes Info",-1),F={key:0},R={key:1},j=p("br",null,null,-1),G={__name:"HomePage",setup(E){const _=c([]),h=c([]),f=U;c([]);const u=c({series:[],chartOptions:{labels:["demo-control-plane","demo-worker","demo-worker2"],theme:{palette:"palette4"},tooltip:{enabled:!0,theme:"dark"},chart:{width:380,type:"pie"}}}),m=c({fill:{type:"gradient",gradient:{shade:"dark",type:"vertical",shadeIntensity:.5,gradientToColors:void 0,inverseColors:!1,opacityFrom:1,opacityTo:.7,stops:[0,90,100],colorStops:[]}},dropShadow:{enabled:!0,top:0,left:0,blur:3,opacity:.5},theme:{palette:"palette4"},tooltip:{enabled:!0,theme:"dark"},chart:{type:"bar"},plotOptions:{bar:{horizontal:!1,borderRadius:4}},series:[{name:"Total Containers",data:[]},{name:"Total CPU Usage",data:[]},{name:"Total Memory Usage",data:[]}]});function x(){b.get("/api/v1/nodes/").then(d=>{_.value=d.data.data,m.value.series[0].data=d.data.data.map(n=>({x:n.nodeName,y:n.containerCount})),m.value.series[1].data=d.data.data.map(n=>({x:n.nodeName,y:parseInt(n.cpuUsage/(1024*1024))})),u.value.series=d.data.data.map(n=>n.memoryUsage/(1024*1024)),u.value.chartOptions.labels=d.data.data.map(n=>n.nodeName)})}function Q(){b.get("/api/v1/pods/").then(d=>{h.value=d.data.data})}return N(()=>{x(),Q()}),(d,n)=>(l(),i("div",q,[t(C,{flex:"","flex-center":"",class:"q-ma-lg"},{default:a(()=>[O,p("div",P,[t(v(f),{ref:"chart",height:"300",type:"bar",options:m.value,series:m.value.series,class:"col-grow"},null,8,["options","series"]),t(v(f),{type:"pie",width:"380",options:u.value.chartOptions,series:u.value.series,class:"overflow-auto"},null,8,["options","series"])]),p("div",z,[M,t(w,{rows:h.value,flat:"",bordered:"","row-key":"name"},{body:a(e=>[t(k,{props:e},{default:a(()=>[t(o,{key:"namespace",props:e},{default:a(()=>[s(r(e.row.namespace),1)]),_:2},1032,["props"]),t(o,{key:"name",props:e},{default:a(()=>[s(r(e.row.name),1)]),_:2},1032,["props"]),t(o,{key:"restarts",props:e},{default:a(()=>[s(r(e.row.restarts),1)]),_:2},1032,["props"]),t(o,{key:"cpu",props:e},{default:a(()=>[s(r(parseInt(e.row.cpu/1024)),1)]),_:2},1032,["props"]),t(o,{key:"memory",props:e},{default:a(()=>[s(r(parseInt(e.row.memory/(1024*1024)))+" Mi ",1)]),_:2},1032,["props"]),t(o,{key:"status",props:e},{default:a(()=>[e.row.staus==d.Running?(l(),i("div",V,[t(y,{name:"check_circle",size:"2em",color:"green-12"})])):(l(),i("div",B,[t(y,{name:"error",size:"2em",color:"red-12"})]))]),_:2},1032,["props"])]),_:2},1032,["props"])]),_:1},8,["rows"])]),p("div",S,[D,t(w,{flat:"",bordered:"",title:"",rows:_.value,"row-key":"nodeName","binary-state-sort":""},{body:a(e=>[t(k,{props:e},{default:a(()=>[t(o,{key:"nodeName",props:e},{default:a(()=>[s(r(e.row.nodeName),1)]),_:2},1032,["props"]),t(o,{key:"cpuQuantity",props:e},{default:a(()=>[s(r(e.row.cpuQuantity),1)]),_:2},1032,["props"]),t(o,{key:"memoryQuantity",props:e},{default:a(()=>[s(r(e.row.memoryQuantity),1)]),_:2},1032,["props"]),t(o,{key:"cpuUsage",props:e},{default:a(()=>[s(r(parseInt(e.row.cpuUsage/1024)),1)]),_:2},1032,["props"]),t(o,{key:"memoryUsage",props:e},{default:a(()=>[s(r(parseInt(e.row.memoryUsage/(1024*1024)))+" Mi ",1)]),_:2},1032,["props"]),t(o,{key:"podQuantity",props:e},{default:a(()=>[s(r(e.row.podQuantity),1)]),_:2},1032,["props"]),t(o,{key:"containerCount",props:e},{default:a(()=>[s(r(e.row.containerCount),1)]),_:2},1032,["props"]),t(o,{key:"ready",props:e},{default:a(()=>[e.row.ready?(l(),i("div",F,[t(y,{name:"check_circle",size:"2em",color:"green-12"})])):(l(),i("div",R,[t(y,{name:"error",size:"2em",color:"red-12"})]))]),_:2},1032,["props"]),t(o,{key:"conditions",props:e},{default:a(()=>[(l(!0),i(T,null,I(e.row.conditions,g=>(l(),i("span",{key:g.type},[s(r(g.message)+" ",1),j]))),128))]),_:2},1032,["props"])]),_:2},1032,["props"])]),_:1},8,["rows"])])]),_:1})]))}};export{G as default};