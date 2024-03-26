import{h as f,c as E,aw as se,ax as re,ay as ie,r as P,a as m,A as ue,B as ce,az as de,aA as fe,aB as ve,q as L,o as K,at as R,as as $,I as he,aH as pe,l as M,d as G,s as ge,a5 as me,a6 as be,ag as ye,y as Se,m as we,ah as N,b1 as Pe,b2 as Te,b3 as Oe,g as ke}from"./index.2087af4f.js";import{d as qe,v as W,e as Ee,p as I,f as xe,g as Ce,r as U,s as _e,h as z,i as Be,j as De}from"./QPage.f444a092.js";const Me=f("div",{class:"q-space"});var Qe=E({name:"QSpace",setup(){return()=>Me}}),Ve=E({name:"QTooltip",inheritAttrs:!1,props:{...qe,...se,...re,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:W},self:{type:String,default:"top middle",validator:W},offset:{type:Array,default:()=>[14,14],validator:Ee},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...ie],setup(e,{slots:n,emit:t,attrs:o}){let l,r;const i=M(),{proxy:{$q:a}}=i,c=P(null),h=P(!1),b=m(()=>I(e.anchor,a.lang.rtl)),p=m(()=>I(e.self,a.lang.rtl)),O=m(()=>e.persistent!==!0),{registerTick:y,removeTick:k}=ue(),{registerTimeout:g}=ce(),{transitionProps:x,transitionStyle:C}=de(e),{localScrollTarget:q,changeScrollEvent:_,unconfigureScrollTarget:u}=xe(e,V),{anchorEl:d,canShow:J,anchorEvents:S}=Ce({showing:h,configureAnchorEl:oe}),{show:X,hide:B}=fe({showing:h,canShow:J,handleShow:Z,handleHide:ee,hideOnRouteChange:O,processOnMount:!0});Object.assign(S,{delayShow:te,delayHide:ne});const{showPortal:j,hidePortal:H,renderPortal:Y}=ve(i,c,le,"tooltip");if(a.platform.is.mobile===!0){const s={anchorEl:d,innerRef:c,onClickOutside(v){return B(v),v.target.classList.contains("q-dialog__backdrop")&&ge(v),!0}},D=m(()=>e.modelValue===null&&e.persistent!==!0&&h.value===!0);L(D,v=>{(v===!0?Be:U)(s)}),K(()=>{U(s)})}function Z(s){j(),y(()=>{r=new MutationObserver(()=>w()),r.observe(c.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),w(),V()}),l===void 0&&(l=L(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,w)),g(()=>{j(!0),t("show",s)},e.transitionDuration)}function ee(s){k(),H(),Q(),g(()=>{H(!0),t("hide",s)},e.transitionDuration)}function Q(){r!==void 0&&(r.disconnect(),r=void 0),l!==void 0&&(l(),l=void 0),u(),R(S,"tooltipTemp")}function w(){_e({targetEl:c.value,offset:e.offset,anchorEl:d.value,anchorOrigin:b.value,selfOrigin:p.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function te(s){if(a.platform.is.mobile===!0){z(),document.body.classList.add("non-selectable");const D=d.value,v=["touchmove","touchcancel","touchend","click"].map(A=>[D,A,"delayHide","passiveCapture"]);$(S,"tooltipTemp",v)}g(()=>{X(s)},e.delay)}function ne(s){a.platform.is.mobile===!0&&(R(S,"tooltipTemp"),z(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),g(()=>{B(s)},e.hideDelay)}function oe(){if(e.noParentEvent===!0||d.value===null)return;const s=a.platform.is.mobile===!0?[[d.value,"touchstart","delayShow","passive"]]:[[d.value,"mouseenter","delayShow","passive"],[d.value,"mouseleave","delayHide","passive"]];$(S,"anchor",s)}function V(){if(d.value!==null||e.scrollTarget!==void 0){q.value=he(d.value,e.scrollTarget);const s=e.noParentEvent===!0?w:B;_(q.value,s)}}function ae(){return h.value===!0?f("div",{...o,ref:c,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",o.class],style:[o.style,C.value],role:"tooltip"},G(n.default)):null}function le(){return f(pe,x.value,ae)}return K(Q),Object.assign(i.proxy,{updatePosition:w}),Y}}),Ae=E({name:"QBar",props:{...me,dense:Boolean},setup(e,{slots:n}){const{proxy:{$q:t}}=M(),o=be(e,t),l=m(()=>`q-bar row no-wrap items-center q-bar--${e.dense===!0?"dense":"standard"}  q-bar--${o.value===!0?"dark":"light"}`);return()=>f("div",{class:l.value,role:"toolbar"},G(n.default))}});function T(e,n=new WeakMap){if(Object(e)!==e)return e;if(n.has(e))return n.get(e);const t=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const o=e.valueOf();if(Object(o)!==o){const l=new e.constructor(o);return n.set(e,l),l}}return n.set(e,t),e instanceof Set?e.forEach(o=>{t.add(T(o,n))}):e instanceof Map&&e.forEach((o,l)=>{t.set(l,T(o,n))}),Object.assign(t,...Object.keys(e).map(o=>({[o]:T(e[o],n)})))}var Le=E({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:n,emit:t}){const{proxy:o}=M(),{$q:l}=o,r=P(null),i=P(""),a=P("");let c=!1;const h=m(()=>ye({initialValue:i.value,validate:e.validate,set:b,cancel:p,updatePosition:O},"value",()=>a.value,u=>{a.value=u}));function b(){e.validate(a.value)!==!1&&(y()===!0&&(t("save",a.value,i.value),t("update:modelValue",a.value)),k())}function p(){y()===!0&&t("cancel",a.value,i.value),k()}function O(){Se(()=>{r.value.updatePosition()})}function y(){return we(a.value,i.value)===!1}function k(){c=!0,r.value.hide()}function g(){c=!1,i.value=T(e.modelValue),a.value=T(e.modelValue),t("beforeShow")}function x(){t("show")}function C(){c===!1&&y()===!0&&(e.autoSave===!0&&e.validate(a.value)===!0?(t("save",a.value,i.value),t("update:modelValue",a.value)):t("cancel",a.value,i.value)),t("beforeHide")}function q(){t("hide")}function _(){const u=n.default!==void 0?[].concat(n.default(h.value)):[];return e.title&&u.unshift(f("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&u.push(f("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[f(N,{flat:!0,color:e.color,label:e.labelCancel||l.lang.label.cancel,onClick:p}),f(N,{flat:!0,color:e.color,label:e.labelSet||l.lang.label.set,onClick:b})])),u}return Object.assign(o,{set:b,cancel:p,show(u){r.value!==null&&r.value.show(u)},hide(u){r.value!==null&&r.value.hide(u)},updatePosition:O}),()=>{if(e.disable!==!0)return f(De,{ref:r,class:"q-popup-edit",cover:e.cover,onBeforeShow:g,onShow:x,onBeforeHide:C,onHide:q,onEscapeKey:p},_)}}});function F(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const n=parseInt(e,10);return isNaN(n)?0:n}var Ke=Pe({name:"close-popup",beforeMount(e,{value:n}){const t={depth:F(n),handler(o){t.depth!==0&&setTimeout(()=>{const l=Te(e);l!==void 0&&Oe(l,o,t.depth)})},handlerKey(o){ke(o,13)===!0&&t.handler(o)}};e.__qclosepopup=t,e.addEventListener("click",t.handler),e.addEventListener("keyup",t.handlerKey)},updated(e,{value:n,oldValue:t}){n!==t&&(e.__qclosepopup.depth=F(n))},beforeUnmount(e){const n=e.__qclosepopup;e.removeEventListener("click",n.handler),e.removeEventListener("keyup",n.handlerKey),delete e.__qclosepopup}}),Re=(e,n)=>{const t=e.__vccOpts||e;for(const[o,l]of n)t[o]=l;return t};export{Ke as C,Ae as Q,Re as _,Qe as a,Ve as b,Le as c};
