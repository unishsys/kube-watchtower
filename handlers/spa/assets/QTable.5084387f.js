import{c as M,a as c,h as r,d as j,l as E,F as bt,Q as Ve,a2 as le,a3 as ae,r as p,q as D,a4 as Me,f as je,E as mt,D as St,o as Ee,I as yt,z as Be,k as Qe,a5 as ht,a6 as _t,a7 as qt,a8 as Oe,a9 as Se,aa as Fe,ab as wt,y as Ae,ac as Ct,ad as me,ae as H,af as ee,ag as Pt}from"./index.e517b201.js";import{u as kt,a as Rt,c as Ne,b as xt}from"./QPage.866f92c2.js";var rl=M({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:l}){const n=E(),d=c(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return r("td",{class:d.value},j(l.default));const o=n.vnode.key,f=(e.props.colsMap!==void 0?e.props.colsMap[o]:null)||e.props.col;if(f===void 0)return;const{row:s}=e.props;return r("td",{class:d.value+f.__tdClass(s),style:f.__tdStyle(s)},j(l.default))}}}),ol=M({name:"QTr",props:{props:Object,noHover:Boolean},setup(e,{slots:l}){const n=c(()=>"q-tr"+(e.props===void 0||e.props.header===!0?"":" "+e.props.__trClass)+(e.noHover===!0?" q-tr--no-hover":""));return()=>r("tr",{class:n.value},j(l.default))}}),Tt=M({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:l,emit:n}){const d=E(),{proxy:{$q:o}}=d,f=s=>{n("click",s)};return()=>{if(e.props===void 0)return r("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:f},j(l.default));let s,u;const v=d.vnode.key;if(v){if(s=e.props.colsMap[v],s===void 0)return}else s=e.props.col;if(s.sortable===!0){const a=s.align==="right"?"unshift":"push";u=bt(l.default,[]),u[a](r(Ve,{class:s.__iconClass,name:o.iconSet.table.arrowUp}))}else u=j(l.default);const S={class:s.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:s.headerStyle,onClick:a=>{s.sortable===!0&&e.props.sort(s),f(a)}};return r("th",S,u)}}}),Bt=M({name:"QList",props:{...le,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:l}){const n=E(),d=ae(e,n.proxy.$q),o=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(d.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>r(e.tag,{class:o.value},j(l.default))}});const Ot=["horizontal","vertical","cell","none"];var Ft=M({name:"QMarkupTable",props:{...le,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Ot.includes(e)}},setup(e,{slots:l}){const n=E(),d=ae(e,n.proxy.$q),o=c(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(d.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>r("div",{class:o.value},[r("table",{class:"q-table"},j(l.default))])}});function pe(e,l){return r("div",e,[r("table",{class:"q-table"},l)])}const $t={list:Bt,table:Ft},Lt=["list","table","__qtable"];var Dt=M({name:"QVirtualScroll",props:{...kt,type:{type:String,default:"list",validator:e=>Lt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:{default:void 0}},setup(e,{slots:l,attrs:n}){let d;const o=p(null),f=c(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:s,localResetVirtualScroll:u,padVirtualScroll:v,onVirtualScrollEvt:S}=Rt({virtualScrollLength:f,getVirtualScrollTarget:C,getVirtualScrollEl:w}),a=c(()=>{if(f.value===0)return[];const O=(F,R)=>({index:s.value.from+R,item:F});return e.itemsFn===void 0?e.items.slice(s.value.from,s.value.to).map(O):e.itemsFn(s.value.from,s.value.to-s.value.from).map(O)}),b=c(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),q=c(()=>e.scrollTarget!==void 0?{}:{tabindex:0});D(f,()=>{u()}),D(()=>e.scrollTarget,()=>{y(),_()});function w(){return o.value.$el||o.value}function C(){return d}function _(){d=yt(w(),e.scrollTarget),d.addEventListener("scroll",S,Be.passive)}function y(){d!==void 0&&(d.removeEventListener("scroll",S,Be.passive),d=void 0)}function B(){let O=v(e.type==="list"?"div":"tbody",a.value.map(l.default));return l.before!==void 0&&(O=l.before().concat(O)),Qe(l.after,O)}return Me(()=>{u()}),je(()=>{_()}),mt(()=>{_()}),St(()=>{y()}),Ee(()=>{y()}),()=>{if(l.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?pe({ref:o,class:"q-table__middle "+b.value},B()):r($t[e.type],{...n,ref:o,class:[n.class,b.value],...q.value},B)}}});const Vt={xs:2,sm:4,md:6,lg:10,xl:14};function $e(e,l,n){return{transform:l===!0?`translateX(${n.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Mt=M({name:"QLinearProgress",props:{...le,...ht,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:l}){const{proxy:n}=E(),d=ae(e,n.$q),o=_t(e,Vt),f=c(()=>e.indeterminate===!0||e.query===!0),s=c(()=>e.reverse!==e.query),u=c(()=>({...o.value!==null?o.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),v=c(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),S=c(()=>$e(e.buffer!==void 0?e.buffer:1,s.value,n.$q)),a=c(()=>`with${e.instantFeedback===!0?"out":""}-transition`),b=c(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${a.value} q-linear-progress__track--${d.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),q=c(()=>$e(f.value===!0?1:e.value,s.value,n.$q)),w=c(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${a.value} q-linear-progress__model--${f.value===!0?"in":""}determinate`),C=c(()=>({width:`${e.value*100}%`})),_=c(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${a.value}`);return()=>{const y=[r("div",{class:b.value,style:S.value}),r("div",{class:w.value,style:q.value})];return e.stripe===!0&&f.value===!1&&y.push(r("div",{class:_.value,style:C.value})),r("div",{class:v.value,style:u.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Qe(l.default,y))}}});let z=0;const jt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},Et=["update:fullscreen","fullscreen"];function Qt(){const e=E(),{props:l,emit:n,proxy:d}=e;let o,f,s;const u=p(!1);qt(e)===!0&&D(()=>d.$route.fullPath,()=>{l.noRouteFullscreenExit!==!0&&a()}),D(()=>l.fullscreen,b=>{u.value!==b&&v()}),D(u,b=>{n("update:fullscreen",b),n("fullscreen",b)});function v(){u.value===!0?a():S()}function S(){u.value!==!0&&(u.value=!0,s=d.$el.parentNode,s.replaceChild(f,d.$el),document.body.appendChild(d.$el),z++,z===1&&document.body.classList.add("q-body--fullscreen-mixin"),o={handler:a},Oe.add(o))}function a(){u.value===!0&&(o!==void 0&&(Oe.remove(o),o=void 0),s.replaceChild(d.$el,f),u.value=!1,z=Math.max(0,z-1),z===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),d.$el.scrollIntoView!==void 0&&setTimeout(()=>{d.$el.scrollIntoView()})))}return Me(()=>{f=document.createElement("span")}),je(()=>{l.fullscreen===!0&&S()}),Ee(a),Object.assign(d,{toggleFullscreen:v,setFullscreen:S,exitFullscreen:a}),{inFullscreen:u,toggleFullscreen:v}}function At(e,l){return new Date(e)-new Date(l)}const Nt={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function pt(e,l,n,d){const o=c(()=>{const{sortBy:u}=l.value;return u&&n.value.find(v=>v.name===u)||null}),f=c(()=>e.sortMethod!==void 0?e.sortMethod:(u,v,S)=>{const a=n.value.find(w=>w.name===v);if(a===void 0||a.field===void 0)return u;const b=S===!0?-1:1,q=typeof a.field=="function"?w=>a.field(w):w=>w[a.field];return u.sort((w,C)=>{let _=q(w),y=q(C);return a.rawSort!==void 0?a.rawSort(_,y,w,C)*b:_==null?-1*b:y==null?1*b:a.sort!==void 0?a.sort(_,y,w,C)*b:Se(_)===!0&&Se(y)===!0?(_-y)*b:Fe(_)===!0&&Fe(y)===!0?At(_,y)*b:typeof _=="boolean"&&typeof y=="boolean"?(_-y)*b:([_,y]=[_,y].map(B=>(B+"").toLocaleString().toLowerCase()),_<y?-1*b:_===y?0:b)})});function s(u){let v=e.columnSortOrder;if(wt(u)===!0)u.sortOrder&&(v=u.sortOrder),u=u.name;else{const b=n.value.find(q=>q.name===u);b!==void 0&&b.sortOrder&&(v=b.sortOrder)}let{sortBy:S,descending:a}=l.value;S!==u?(S=u,a=v==="da"):e.binaryStateSort===!0?a=!a:a===!0?v==="ad"?S=null:a=!1:v==="ad"?a=!0:S=null,d({sortBy:S,descending:a,page:1})}return{columnToSort:o,computedSortMethod:f,sort:s}}const Ht={filter:[String,Object],filterMethod:Function};function zt(e,l){const n=c(()=>e.filterMethod!==void 0?e.filterMethod:(d,o,f,s)=>{const u=o?o.toLowerCase():"";return d.filter(v=>f.some(S=>{const a=s(S,v)+"";return(a==="undefined"||a==="null"?"":a.toLowerCase()).indexOf(u)!==-1}))});return D(()=>e.filter,()=>{Ae(()=>{l({page:1},!0)})},{deep:!0}),{computedFilterMethod:n}}function Ut(e,l){for(const n in l)if(l[n]!==e[n])return!1;return!0}function Le(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const It={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function Wt(e,l){const{props:n,emit:d}=e,o=p(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:n.rowsPerPageOptions.length!==0?n.rowsPerPageOptions[0]:5},n.pagination)),f=c(()=>{const a=n["onUpdate:pagination"]!==void 0?{...o.value,...n.pagination}:o.value;return Le(a)}),s=c(()=>f.value.rowsNumber!==void 0);function u(a){v({pagination:a,filter:n.filter})}function v(a={}){Ae(()=>{d("request",{pagination:a.pagination||f.value,filter:a.filter||n.filter,getCellValue:l})})}function S(a,b){const q=Le({...f.value,...a});if(Ut(f.value,q)===!0){s.value===!0&&b===!0&&u(q);return}if(s.value===!0){u(q);return}n.pagination!==void 0&&n["onUpdate:pagination"]!==void 0?d("update:pagination",q):o.value=q}return{innerPagination:o,computedPagination:f,isServerSide:s,requestServerInteraction:v,setPagination:S}}function Kt(e,l,n,d,o,f){const{props:s,emit:u,proxy:{$q:v}}=e,S=c(()=>d.value===!0?n.value.rowsNumber||0:f.value),a=c(()=>{const{page:R,rowsPerPage:x}=n.value;return(R-1)*x}),b=c(()=>{const{page:R,rowsPerPage:x}=n.value;return R*x}),q=c(()=>n.value.page===1),w=c(()=>n.value.rowsPerPage===0?1:Math.max(1,Math.ceil(S.value/n.value.rowsPerPage))),C=c(()=>b.value===0?!0:n.value.page>=w.value),_=c(()=>(s.rowsPerPageOptions.includes(l.value.rowsPerPage)?s.rowsPerPageOptions:[l.value.rowsPerPage].concat(s.rowsPerPageOptions)).map(x=>({label:x===0?v.lang.table.allRows:""+x,value:x})));D(w,(R,x)=>{if(R===x)return;const U=n.value.page;R&&!U?o({page:1}):R<U&&o({page:R})});function y(){o({page:1})}function B(){const{page:R}=n.value;R>1&&o({page:R-1})}function O(){const{page:R,rowsPerPage:x}=n.value;b.value>0&&R*x<S.value&&o({page:R+1})}function F(){o({page:w.value})}return s["onUpdate:pagination"]!==void 0&&u("update:pagination",{...n.value}),{firstRowIndex:a,lastRowIndex:b,isFirstPage:q,isLastPage:C,pagesNumber:w,computedRowsPerPageOptions:_,computedRowsNumber:S,firstPage:y,prevPage:B,nextPage:O,lastPage:F}}const Gt={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},Xt=["update:selected","selection"];function Jt(e,l,n,d){const o=c(()=>{const C={};return e.selected.map(d.value).forEach(_=>{C[_]=!0}),C}),f=c(()=>e.selection!=="none"),s=c(()=>e.selection==="single"),u=c(()=>e.selection==="multiple"),v=c(()=>n.value.length!==0&&n.value.every(C=>o.value[d.value(C)]===!0)),S=c(()=>v.value!==!0&&n.value.some(C=>o.value[d.value(C)]===!0)),a=c(()=>e.selected.length);function b(C){return o.value[C]===!0}function q(){l("update:selected",[])}function w(C,_,y,B){l("selection",{rows:_,added:y,keys:C,evt:B});const O=s.value===!0?y===!0?_:[]:y===!0?e.selected.concat(_):e.selected.filter(F=>C.includes(d.value(F))===!1);l("update:selected",O)}return{hasSelectionMode:f,singleSelection:s,multipleSelection:u,allRowsSelected:v,someRowsSelected:S,rowsSelectedNumber:a,isRowSelected:b,clearSelection:q,updateSelection:w}}function De(e){return Array.isArray(e)?e.slice():[]}const Yt={expanded:Array},Zt=["update:expanded"];function el(e,l){const n=p(De(e.expanded));D(()=>e.expanded,s=>{n.value=De(s)});function d(s){return n.value.includes(s)}function o(s){e.expanded!==void 0?l("update:expanded",s):n.value=s}function f(s,u){const v=n.value.slice(),S=v.indexOf(s);u===!0?S===-1&&(v.push(s),o(v)):S!==-1&&(v.splice(S,1),o(v))}return{isRowExpanded:d,setExpanded:o,updateExpanded:f}}const tl={visibleColumns:Array};function ll(e,l,n){const d=c(()=>{if(e.columns!==void 0)return e.columns;const u=e.rows[0];return u!==void 0?Object.keys(u).map(v=>({name:v,label:v.toUpperCase(),field:v,align:Se(u[v])?"right":"left",sortable:!0})):[]}),o=c(()=>{const{sortBy:u,descending:v}=l.value;return(e.visibleColumns!==void 0?d.value.filter(a=>a.required===!0||e.visibleColumns.includes(a.name)===!0):d.value).map(a=>{const b=a.align||"right",q=`text-${b}`;return{...a,align:b,__iconClass:`q-table__sort-icon q-table__sort-icon--${b}`,__thClass:q+(a.headerClasses!==void 0?" "+a.headerClasses:"")+(a.sortable===!0?" sortable":"")+(a.name===u?` sorted ${v===!0?"sort-desc":""}`:""),__tdStyle:a.style!==void 0?typeof a.style!="function"?()=>a.style:a.style:()=>null,__tdClass:a.classes!==void 0?typeof a.classes!="function"?()=>q+" "+a.classes:w=>q+" "+a.classes(w):()=>q}})}),f=c(()=>{const u={};return o.value.forEach(v=>{u[v.name]=v}),u}),s=c(()=>e.tableColspan!==void 0?e.tableColspan:o.value.length+(n.value===!0?1:0));return{colList:d,computedCols:o,computedColsMap:f,computedColspan:s}}const te="q-table__bottom row items-center",He={};Ne.forEach(e=>{He[e]={}});var il=M({name:"QTable",props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{default:void 0},...He,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...le,...jt,...tl,...Ht,...It,...Yt,...Gt,...Nt},emits:["request","virtualScroll",...Et,...Zt,...Xt],setup(e,{slots:l,emit:n}){const d=E(),{proxy:{$q:o}}=d,f=ae(e,o),{inFullscreen:s,toggleFullscreen:u}=Qt(),v=c(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),S=p(null),a=p(null),b=c(()=>e.grid!==!0&&e.virtualScroll===!0),q=c(()=>" q-table__card"+(f.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),w=c(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":q.value)+(f.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(s.value===!0?" fullscreen scroll":"")),C=c(()=>w.value+(e.loading===!0?" q-table--loading":""));D(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+w.value,()=>{b.value===!0&&a.value!==null&&a.value.reset()});const{innerPagination:_,computedPagination:y,isServerSide:B,requestServerInteraction:O,setPagination:F}=Wt(d,A),{computedFilterMethod:R}=zt(e,F),{isRowExpanded:x,setExpanded:U,updateExpanded:ze}=el(e,n),ne=c(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:i,descending:g}=y.value;return e.filter&&(t=R.value(t,e.filter,$.value,A)),Ge.value!==null&&(t=Xe.value(e.rows===t?t.slice():t,i,g)),t}),ye=c(()=>ne.value.length),V=c(()=>{let t=ne.value;if(B.value===!0)return t;const{rowsPerPage:i}=y.value;return i!==0&&(W.value===0&&e.rows!==t?t.length>K.value&&(t=t.slice(0,K.value)):t=t.slice(W.value,K.value)),t}),{hasSelectionMode:Q,singleSelection:Ue,multipleSelection:he,allRowsSelected:Ie,someRowsSelected:_e,rowsSelectedNumber:re,isRowSelected:oe,clearSelection:We,updateSelection:I}=Jt(e,n,V,v),{colList:Ke,computedCols:$,computedColsMap:qe,computedColspan:we}=ll(e,y,Q),{columnToSort:Ge,computedSortMethod:Xe,sort:ie}=pt(e,y,Ke,F),{firstRowIndex:W,lastRowIndex:K,isFirstPage:se,isLastPage:ue,pagesNumber:G,computedRowsPerPageOptions:Je,computedRowsNumber:X,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe}=Kt(d,_,y,B,F,ye),Ye=c(()=>V.value.length===0),Ze=c(()=>{const t={};return Ne.forEach(i=>{t[i]=e[i]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function et(){b.value===!0&&a.value.reset()}function tt(){if(e.grid===!0)return ft();const t=e.hideHeader!==!0?xe:null;if(b.value===!0){const g=l["top-row"],m=l["bottom-row"],h={default:k=>Pe(k.item,l.body,k.index)};if(g!==void 0){const k=r("tbody",g({cols:$.value}));h.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(h.before=t);return m!==void 0&&(h.after=()=>r("tbody",m({cols:$.value}))),r(Dt,{ref:a,class:e.tableClass,style:e.tableStyle,...Ze.value,scrollTarget:e.virtualScrollTarget,items:V.value,type:"__qtable",tableColspan:we.value,onVirtualScroll:at},h)}const i=[nt()];return t!==null&&i.unshift(t()),pe({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},i)}function lt(t,i){if(a.value!==null){a.value.scrollTo(t,i);return}t=parseInt(t,10);const g=S.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(g!==null){const m=S.value.querySelector(".q-table__middle.scroll"),h=g.offsetTop-e.virtualScrollStickySizeStart,k=h<m.scrollTop?"decrease":"increase";m.scrollTop=h,n("virtualScroll",{index:t,from:0,to:_.value.rowsPerPage-1,direction:k})}}function at(t){n("virtualScroll",t)}function Ce(){return[r(Mt,{class:"q-table__linear-progress",color:e.color,dark:f.value,indeterminate:!0,trackColor:"transparent"})]}function Pe(t,i,g){const m=v.value(t),h=oe(m);if(i!==void 0)return i(ke({key:m,row:t,pageIndex:g,__trClass:h?"selected":""}));const k=l["body-cell"],P=$.value.map(T=>{const Y=l[`body-cell-${T.name}`],Z=Y!==void 0?Y:k;return Z!==void 0?Z(rt({key:m,row:t,pageIndex:g,col:T})):r("td",{class:T.__tdClass(t),style:T.__tdStyle(t)},A(T,t))});if(Q.value===!0){const T=l["body-selection"],Y=T!==void 0?T(ot({key:m,row:t,pageIndex:g})):[r(me,{modelValue:h,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(Z,gt)=>{I([m],[t],Z,gt)}})];P.unshift(r("td",{class:"q-table--col-auto-width"},Y))}const L={key:m,class:{selected:h}};return e.onRowClick!==void 0&&(L.class["cursor-pointer"]=!0,L.onClick=T=>{n("RowClick",T,t,g)}),e.onRowDblclick!==void 0&&(L.class["cursor-pointer"]=!0,L.onDblclick=T=>{n("RowDblclick",T,t,g)}),e.onRowContextmenu!==void 0&&(L.class["cursor-pointer"]=!0,L.onContextmenu=T=>{n("RowContextmenu",T,t,g)}),r("tr",L,P)}function nt(){const t=l.body,i=l["top-row"],g=l["bottom-row"];let m=V.value.map((h,k)=>Pe(h,t,k));return i!==void 0&&(m=i({cols:$.value}).concat(m)),g!==void 0&&(m=m.concat(g({cols:$.value}))),r("tbody",m)}function ke(t){return ge(t),t.cols=t.cols.map(i=>H({...i},"value",()=>A(i,t.row))),t}function rt(t){return ge(t),H(t,"value",()=>A(t.col,t.row)),t}function ot(t){return ge(t),t}function ge(t){Object.assign(t,{cols:$.value,colsMap:qe.value,sort:ie,rowIndex:W.value+t.pageIndex,color:e.color,dark:f.value,dense:e.dense}),Q.value===!0&&H(t,"selected",()=>oe(t.key),(i,g)=>{I([t.key],[t.row],i,g)}),H(t,"expand",()=>x(t.key),i=>{ze(t.key,i)})}function A(t,i){const g=typeof t.field=="function"?t.field(i):i[t.field];return t.format!==void 0?t.format(g,i):g}const N=c(()=>({pagination:y.value,pagesNumber:G.value,isFirstPage:se.value,isLastPage:ue.value,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,inFullscreen:s.value,toggleFullscreen:u}));function it(){const t=l.top,i=l["top-left"],g=l["top-right"],m=l["top-selection"],h=Q.value===!0&&m!==void 0&&re.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return r("div",{class:k},[t(N.value)]);let P;if(h===!0?P=m(N.value).slice():(P=[],i!==void 0?P.push(r("div",{class:"q-table__control"},[i(N.value)])):e.title&&P.push(r("div",{class:"q-table__control"},[r("div",{class:["q-table__title",e.titleClass]},e.title)]))),g!==void 0&&(P.push(r("div",{class:"q-table__separator col"})),P.push(r("div",{class:"q-table__control"},[g(N.value)]))),P.length!==0)return r("div",{class:k},P)}const Re=c(()=>_e.value===!0?null:Ie.value);function xe(){const t=st();return e.loading===!0&&l.loading===void 0&&t.push(r("tr",{class:"q-table__progress"},[r("th",{class:"relative-position",colspan:we.value},Ce())])),r("thead",t)}function st(){const t=l.header,i=l["header-cell"];if(t!==void 0)return t(be({header:!0})).slice();const g=$.value.map(m=>{const h=l[`header-cell-${m.name}`],k=h!==void 0?h:i,P=be({col:m});return k!==void 0?k(P):r(Tt,{key:m.name,props:P},()=>m.label)});if(Ue.value===!0&&e.grid!==!0)g.unshift(r("th",{class:"q-table--col-auto-width"}," "));else if(he.value===!0){const m=l["header-selection"],h=m!==void 0?m(be({})):[r(me,{color:e.color,modelValue:Re.value,dark:f.value,dense:e.dense,"onUpdate:modelValue":Te})];g.unshift(r("th",{class:"q-table--col-auto-width"},h))}return[r("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},g)]}function be(t){return Object.assign(t,{cols:$.value,sort:ie,colsMap:qe.value,color:e.color,dark:f.value,dense:e.dense}),he.value===!0&&H(t,"selected",()=>Re.value,Te),t}function Te(t){_e.value===!0&&(t=!1),I(V.value.map(v.value),V.value,t)}const J=c(()=>{const t=[e.iconFirstPage||o.iconSet.table.firstPage,e.iconPrevPage||o.iconSet.table.prevPage,e.iconNextPage||o.iconSet.table.nextPage,e.iconLastPage||o.iconSet.table.lastPage];return o.lang.rtl===!0?t.reverse():t});function ut(){if(e.hideBottom===!0)return;if(Ye.value===!0){if(e.hideNoData===!0)return;const g=e.loading===!0?e.loadingLabel||o.lang.table.loading:e.filter?e.noResultsLabel||o.lang.table.noResults:e.noDataLabel||o.lang.table.noData,m=l["no-data"],h=m!==void 0?[m({message:g,icon:o.iconSet.table.warning,filter:e.filter})]:[r(Ve,{class:"q-table__bottom-nodata-icon",name:o.iconSet.table.warning}),g];return r("div",{class:te+" q-table__bottom--nodata"},h)}const t=l.bottom;if(t!==void 0)return r("div",{class:te},[t(N.value)]);const i=e.hideSelectedBanner!==!0&&Q.value===!0&&re.value>0?[r("div",{class:"q-table__control"},[r("div",[(e.selectedRowsLabel||o.lang.table.selectedRecords)(re.value)])])]:[];if(e.hidePagination!==!0)return r("div",{class:te+" justify-end"},dt(i));if(i.length!==0)return r("div",{class:te},i)}function ct(t){F({page:1,rowsPerPage:t.value})}function dt(t){let i;const{rowsPerPage:g}=y.value,m=e.paginationLabel||o.lang.table.pagination,h=l.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(r("div",{class:"q-table__separator col"})),k===!0&&t.push(r("div",{class:"q-table__control"},[r("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||o.lang.table.recordsPerPage]),r(xt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:g,options:Je.value,displayValue:g===0?o.lang.table.allRows:g,dark:f.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":ct})])),h!==void 0)i=h(N.value);else if(i=[r("span",g!==0?{class:"q-table__bottom-item"}:{},[g?m(W.value+1,Math.min(K.value,X.value),X.value):m(1,ye.value,X.value)])],g!==0&&G.value>1){const P={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(P.size="sm"),G.value>2&&i.push(r(ee,{key:"pgFirst",...P,icon:J.value[0],disable:se.value,onClick:ce})),i.push(r(ee,{key:"pgPrev",...P,icon:J.value[1],disable:se.value,onClick:de}),r(ee,{key:"pgNext",...P,icon:J.value[2],disable:ue.value,onClick:ve})),G.value>2&&i.push(r(ee,{key:"pgLast",...P,icon:J.value[3],disable:ue.value,onClick:fe}))}return t.push(r("div",{class:"q-table__control"},i)),t}function vt(){const t=e.gridHeader===!0?[r("table",{class:"q-table"},[xe()])]:e.loading===!0&&l.loading===void 0?Ce():void 0;return r("div",{class:"q-table__middle"},t)}function ft(){const t=l.item!==void 0?l.item:i=>{const g=i.cols.map(h=>r("div",{class:"q-table__grid-item-row"},[r("div",{class:"q-table__grid-item-title"},[h.label]),r("div",{class:"q-table__grid-item-value"},[h.value])]));if(Q.value===!0){const h=l["body-selection"],k=h!==void 0?h(i):[r(me,{modelValue:i.selected,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(P,L)=>{I([i.key],[i.row],P,L)}})];g.unshift(r("div",{class:"q-table__grid-item-row"},k),r(Pt,{dark:f.value}))}const m={class:["q-table__grid-item-card"+q.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(m.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(m.onClick=h=>{n("RowClick",h,i.row,i.pageIndex)}),e.onRowDblclick!==void 0&&(m.onDblclick=h=>{n("RowDblclick",h,i.row,i.pageIndex)})),r("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(i.selected===!0?" q-table__grid-item--selected":"")},[r("div",m,g)])};return r("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},V.value.map((i,g)=>t(ke({key:v.value(i),row:i,pageIndex:g}))))}return Object.assign(d.proxy,{requestServerInteraction:O,setPagination:F,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,isRowSelected:oe,clearSelection:We,isRowExpanded:x,setExpanded:U,sort:ie,resetVirtualScroll:et,scrollTo:lt,getCellValue:A}),Ct(d.proxy,{filteredSortedRows:()=>ne.value,computedRows:()=>V.value,computedRowsNumber:()=>X.value}),()=>{const t=[it()],i={ref:S,class:C.value};return e.grid===!0?t.push(vt()):Object.assign(i,{class:[i.class,e.cardClass],style:e.cardStyle}),t.push(tt(),ut()),e.loading===!0&&l.loading!==void 0&&t.push(l.loading()),r("div",i,t)}}});export{il as Q,ol as a,rl as b};
