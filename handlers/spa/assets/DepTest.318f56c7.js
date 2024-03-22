import{q as p}from"./vue3-apexcharts.a0ca9abf.js";import{aR as i,O as c,P as d,Y as h,U as m}from"./index.e517b201.js";function o(e,t=document.body){if(typeof e!="string")throw new TypeError("Expected a string as propName");if(!(t instanceof Element))throw new TypeError("Expected a DOM element");return getComputedStyle(t).getPropertyValue(`--q-${e}`).trim()||null}var l=(e,t)=>{const r=e.__vccOpts||e;for(const[n,a]of t)r[n]=a;return r};const u=i({name:"ApexBar",components:{apexchart:p},data(){return{options:{chart:{id:"apex-bar"},colors:[o("primary"),o("secondary"),o("negative")],xaxis:{categories:[1991,1992,1993,1994,1995,1996,1997,1998]},plotOptions:{bar:{horizontal:!0,columnWidth:"55%",endingShape:"rounded"}}},series:[{name:"series-1",data:[30,40,45,50,49,60,70,91]}]}},mounted(){this.renderChart()},methods:{renderChart(){new ApexCharts(this.$refs.chart,this.options).render()}}});function f(e,t,r,n,a,x){const s=c("apexchart");return d(),h("div",null,[m(s,{ref:"chart",height:"300",type:"bar",options:e.options,series:e.series},null,8,["options","series"])])}var _=l(u,[["render",f]]);export{_ as default};
