import{c as O,a as f,h as w,d as oe,i as ve,e as V,r as L,o as U,f as G,t as ze,w as Je,R as Ye,s as Le,g as Ze,j as et,Q as ne,k as Be,l as N,m as tt,u as nt,n as at,p as lt,q as p,v as pe,x as Ie,y as xe,z as fe,A as ce,B as Re,C as he,D as ot,E as it,F as rt,G as be,H as st,I as ut,J as ct,K as dt,L as de,M as ee,N as ft,O as vt,P as ht,S as bt,T as W,U as M,V as ae,W as ke}from"./index.947b612b.js";import{r as gt}from"./rtl.b51694b1.js";import{u as mt}from"./use-quasar.e260abcb.js";var yt=O({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:T}){const o=f(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>w("div",{class:o.value},oe(T.default))}}),wt=O({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:T}){const o=f(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>w("div",{class:o.value,role:"toolbar"},oe(T.default))}});let Tt=0;const _t=["click","keydown"],qt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Tt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Ct(e,T,o,a){const n=ve(ze,V);if(n===V)return console.error("QTab/QRouteTab component needs to be child of QTabs"),V;const{proxy:v}=N(),m=L(null),R=L(null),b=L(null),c=f(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),x=f(()=>n.currentModel.value===e.name),$=f(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(x.value===!0?" q-tab--active"+(n.tabProps.value.activeClass?" "+n.tabProps.value.activeClass:"")+(n.tabProps.value.activeColor?` text-${n.tabProps.value.activeColor}`:"")+(n.tabProps.value.activeBgColor?` bg-${n.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&n.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||n.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(a!==void 0?a.linkClass.value:"")),P=f(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(n.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),d=f(()=>e.disable===!0||n.hasFocus.value===!0||x.value===!1&&n.hasActiveTab.value===!0?-1:e.tabindex||0);function q(i,r){if(r!==!0&&m.value!==null&&m.value.focus(),e.disable===!0){a!==void 0&&a.hasRouterLink.value===!0&&Le(i);return}if(a===void 0){n.updateModel({name:e.name}),o("click",i);return}if(a.hasRouterLink.value===!0){const g=(_={})=>{let k;const B=_.to===void 0||tt(_.to,e.to)===!0?n.avoidRouteWatcher=nt():null;return a.navigateToRouterLink(i,{..._,returnRouterError:!0}).catch(Q=>{k=Q}).then(Q=>{if(B===n.avoidRouteWatcher&&(n.avoidRouteWatcher=!1,k===void 0&&(Q===void 0||Q.message!==void 0&&Q.message.startsWith("Avoided redundant navigation")===!0)&&n.updateModel({name:e.name})),_.returnRouterError===!0)return k!==void 0?Promise.reject(k):Q})};o("click",i,g),i.defaultPrevented!==!0&&g();return}o("click",i)}function I(i){Ze(i,[13,32])?q(i,!0):et(i)!==!0&&i.keyCode>=35&&i.keyCode<=40&&i.altKey!==!0&&i.metaKey!==!0&&n.onKbdNavigate(i.keyCode,v.$el)===!0&&Le(i),o("keydown",i)}function H(){const i=n.tabProps.value.narrowIndicator,r=[],g=w("div",{ref:b,class:["q-tab__indicator",n.tabProps.value.indicatorClass]});e.icon!==void 0&&r.push(w(ne,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&r.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&r.push(e.alertIcon!==void 0?w(ne,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),i===!0&&r.push(g);const _=[w("div",{class:"q-focus-helper",tabindex:-1,ref:m}),w("div",{class:P.value},Be(T.default,r))];return i===!1&&_.push(g),_}const A={name:f(()=>e.name),rootRef:R,tabIndicatorRef:b,routeData:a};U(()=>{n.unregisterTab(A)}),G(()=>{n.registerTab(A)});function s(i,r){const g={ref:R,class:$.value,tabindex:d.value,role:"tab","aria-selected":x.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:q,onKeydown:I,...r};return Je(w(i,g,H()),[[Ye,c.value]])}return{renderTab:s,$tabs:n}}var te=O({name:"QRouteTab",props:{...at,...qt},emits:_t,setup(e,{slots:T,emit:o}){const a=lt({useDisableForRouterLinkProps:!1}),{renderTab:n,$tabs:v}=Ct(e,T,o,{exact:f(()=>e.exact),...a});return p(()=>`${e.name} | ${e.exact} | ${(a.resolvedLink.value||{}).href}`,()=>{v.verifyRouteModel()}),()=>n(a.linkTag.value,a.linkAttrs.value)}});function St(){const e=L(!pe.value);return e.value===!1&&G(()=>{e.value=!0}),{isHydrated:e}}const Ae=typeof ResizeObserver!="undefined",Pe=Ae===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var le=O({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:T}){let o=null,a,n={width:-1,height:-1};function v(b){b===!0||e.debounce===0||e.debounce==="0"?m():o===null&&(o=setTimeout(m,e.debounce))}function m(){if(o!==null&&(clearTimeout(o),o=null),a){const{offsetWidth:b,offsetHeight:c}=a;(b!==n.width||c!==n.height)&&(n={width:b,height:c},T("resize",n))}}const{proxy:R}=N();if(R.trigger=v,Ae===!0){let b;const c=x=>{a=R.$el.parentNode,a?(b=new ResizeObserver(v),b.observe(a),m()):x!==!0&&xe(()=>{c(!0)})};return G(()=>{c()}),U(()=>{o!==null&&clearTimeout(o),b!==void 0&&(b.disconnect!==void 0?b.disconnect():a&&b.unobserve(a))}),Ie}else{let x=function(){o!==null&&(clearTimeout(o),o=null),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",v,fe.passive),c=void 0)},$=function(){x(),a&&a.contentDocument&&(c=a.contentDocument.defaultView,c.addEventListener("resize",v,fe.passive),m())};const{isHydrated:b}=St();let c;return G(()=>{xe(()=>{a=R.$el,a&&$()})}),U(x),()=>{if(b.value===!0)return w("object",{class:"q--avoid-card-border",style:Pe.style,tabindex:-1,type:"text/html",data:Pe.url,"aria-hidden":"true",onLoad:$})}}}});function Lt(e,T,o){const a=o===!0?["left","right"]:["top","bottom"];return`absolute-${T===!0?a[0]:a[1]}${e?` text-${e}`:""}`}const xt=["left","center","right","justify"];var Rt=O({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>xt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:T,emit:o}){const{proxy:a}=N(),{$q:n}=a,{registerTick:v}=ce(),{registerTick:m}=ce(),{registerTick:R}=ce(),{registerTimeout:b,removeTimeout:c}=Re(),{registerTimeout:x,removeTimeout:$}=Re(),P=L(null),d=L(null),q=L(e.modelValue),I=L(!1),H=L(!0),A=L(!1),s=L(!1),i=[],r=L(0),g=L(!1);let _=null,k=null,B;const Q=f(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Lt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Me=f(()=>{const t=r.value,l=q.value;for(let u=0;u<t;u++)if(i[u].name.value===l)return!0;return!1}),Qe=f(()=>`q-tabs__content--align-${I.value===!0?"left":s.value===!0?"justify":e.align}`),He=f(()=>`q-tabs row no-wrap items-center q-tabs--${I.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),Ee=f(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),X=f(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),J=f(()=>e.vertical!==!0&&n.lang.rtl===!0),ie=f(()=>gt===!1&&J.value===!0);p(J,K),p(()=>e.modelValue,t=>{re({name:t,setCurrent:!0,skipEmit:!0})}),p(()=>e.outsideArrows,Y);function re({name:t,setCurrent:l,skipEmit:u}){q.value!==t&&(u!==!0&&e["onUpdate:modelValue"]!==void 0&&o("update:modelValue",t),(l===!0||e["onUpdate:modelValue"]===void 0)&&(Ve(q.value,t),q.value=t))}function Y(){v(()=>{ge({width:P.value.offsetWidth,height:P.value.offsetHeight})})}function ge(t){if(X.value===void 0||d.value===null)return;const l=t[X.value.container],u=Math.min(d.value[X.value.scroll],Array.prototype.reduce.call(d.value.children,(S,y)=>S+(y[X.value.content]||0),0)),C=l>0&&u>l;I.value=C,C===!0&&m(K),s.value=l<parseInt(e.breakpoint,10)}function Ve(t,l){const u=t!=null&&t!==""?i.find(S=>S.name.value===t):null,C=l!=null&&l!==""?i.find(S=>S.name.value===l):null;if(u&&C){const S=u.tabIndicatorRef.value,y=C.tabIndicatorRef.value;_!==null&&(clearTimeout(_),_=null),S.style.transition="none",S.style.transform="none",y.style.transition="none",y.style.transform="none";const h=S.getBoundingClientRect(),z=y.getBoundingClientRect();y.style.transform=e.vertical===!0?`translate3d(0,${h.top-z.top}px,0) scale3d(1,${z.height?h.height/z.height:1},1)`:`translate3d(${h.left-z.left}px,0,0) scale3d(${z.width?h.width/z.width:1},1,1)`,R(()=>{_=setTimeout(()=>{_=null,y.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",y.style.transform="none"},70)})}C&&I.value===!0&&j(C.rootRef.value)}function j(t){const{left:l,width:u,top:C,height:S}=d.value.getBoundingClientRect(),y=t.getBoundingClientRect();let h=e.vertical===!0?y.top-C:y.left-l;if(h<0){d.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(h),K();return}h+=e.vertical===!0?y.height-S:y.width-u,h>0&&(d.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(h),K())}function K(){const t=d.value;if(t===null)return;const l=t.getBoundingClientRect(),u=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);J.value===!0?(H.value=Math.ceil(u+l.width)<t.scrollWidth-1,A.value=u>0):(H.value=u>0,A.value=e.vertical===!0?Math.ceil(u+l.height)<t.scrollHeight:Math.ceil(u+l.width)<t.scrollWidth)}function me(t){k!==null&&clearInterval(k),k=setInterval(()=>{Fe(t)===!0&&D()},5)}function ye(){me(ie.value===!0?Number.MAX_SAFE_INTEGER:0)}function we(){me(ie.value===!0?0:Number.MAX_SAFE_INTEGER)}function D(){k!==null&&(clearInterval(k),k=null)}function Oe(t,l){const u=Array.prototype.filter.call(d.value.children,z=>z===l||z.matches&&z.matches(".q-tab.q-focusable")===!0),C=u.length;if(C===0)return;if(t===36)return j(u[0]),u[0].focus(),!0;if(t===35)return j(u[C-1]),u[C-1].focus(),!0;const S=t===(e.vertical===!0?38:37),y=t===(e.vertical===!0?40:39),h=S===!0?-1:y===!0?1:void 0;if(h!==void 0){const z=J.value===!0?-1:1,E=u.indexOf(l)+h*z;return E>=0&&E<C&&(j(u[E]),u[E].focus({preventScroll:!0})),!0}}const De=f(()=>ie.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,l)=>{t.scrollLeft=-l}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,l)=>{t.scrollTop=l}}:{get:t=>t.scrollLeft,set:(t,l)=>{t.scrollLeft=l}});function Fe(t){const l=d.value,{get:u,set:C}=De.value;let S=!1,y=u(l);const h=t<y?-1:1;return y+=h*5,y<0?(S=!0,y=0):(h===-1&&y<=t||h===1&&y>=t)&&(S=!0,y=t),C(l,y),K(),S}function Te(t,l){for(const u in t)if(t[u]!==l[u])return!1;return!0}function We(){let t=null,l={matchedLen:0,queryDiff:9999,hrefLen:0};const u=i.filter(h=>h.routeData!==void 0&&h.routeData.hasRouterLink.value===!0),{hash:C,query:S}=a.$route,y=Object.keys(S).length;for(const h of u){const z=h.routeData.exact.value===!0;if(h.routeData[z===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:E,query:se,matched:Ge,href:Xe}=h.routeData.resolvedLink.value,ue=Object.keys(se).length;if(z===!0){if(E!==C||ue!==y||Te(S,se)===!1)continue;t=h.name.value;break}if(E!==""&&E!==C||ue!==0&&Te(se,S)===!1)continue;const F={matchedLen:Ge.length,queryDiff:y-ue,hrefLen:Xe.length-E.length};if(F.matchedLen>l.matchedLen){t=h.name.value,l=F;continue}else if(F.matchedLen!==l.matchedLen)continue;if(F.queryDiff<l.queryDiff)t=h.name.value,l=F;else if(F.queryDiff!==l.queryDiff)continue;F.hrefLen>l.hrefLen&&(t=h.name.value,l=F)}t===null&&i.some(h=>h.routeData===void 0&&h.name.value===q.value)===!0||re({name:t,setCurrent:!0})}function Ne(t){if(c(),g.value!==!0&&P.value!==null&&t.target&&typeof t.target.closest=="function"){const l=t.target.closest(".q-tab");l&&P.value.contains(l)===!0&&(g.value=!0,I.value===!0&&j(l))}}function je(){b(()=>{g.value=!1},30)}function Z(){qe.avoidRouteWatcher===!1?x(We):$()}function _e(){if(B===void 0){const t=p(()=>a.$route.fullPath,Z);B=()=>{t(),B=void 0}}}function Ke(t){i.push(t),r.value++,Y(),t.routeData===void 0||a.$route===void 0?x(()=>{if(I.value===!0){const l=q.value,u=l!=null&&l!==""?i.find(C=>C.name.value===l):null;u&&j(u.rootRef.value)}}):(_e(),t.routeData.hasRouterLink.value===!0&&Z())}function Ue(t){i.splice(i.indexOf(t),1),r.value--,Y(),B!==void 0&&t.routeData!==void 0&&(i.every(l=>l.routeData===void 0)===!0&&B(),Z())}const qe={currentModel:q,tabProps:Q,hasFocus:g,hasActiveTab:Me,registerTab:Ke,unregisterTab:Ue,verifyRouteModel:Z,updateModel:re,onKbdNavigate:Oe,avoidRouteWatcher:!1};he(ze,qe);function Ce(){_!==null&&clearTimeout(_),D(),B!==void 0&&B()}let Se;return U(Ce),ot(()=>{Se=B!==void 0,Ce()}),it(()=>{Se===!0&&_e(),Y()}),()=>w("div",{ref:P,class:He.value,role:"tablist",onFocusin:Ne,onFocusout:je},[w(le,{onResize:ge}),w("div",{ref:d,class:Ee.value,onScroll:K},oe(T.default)),w(ne,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(H.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||n.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ye,onTouchstartPassive:ye,onMouseupPassive:D,onMouseleavePassive:D,onTouchendPassive:D}),w(ne,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(A.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||n.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:we,onTouchstartPassive:we,onMouseupPassive:D,onMouseleavePassive:D,onTouchendPassive:D})])}}),kt=O({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:T,emit:o}){const{proxy:{$q:a}}=N(),n=ve(be,V);if(n===V)return console.error("QHeader needs to be child of QLayout"),V;const v=L(parseInt(e.heightHint,10)),m=L(!0),R=f(()=>e.reveal===!0||n.view.value.indexOf("H")!==-1||a.platform.is.ios&&n.isContainer.value===!0),b=f(()=>{if(e.modelValue!==!0)return 0;if(R.value===!0)return m.value===!0?v.value:0;const s=v.value-n.scroll.value.position;return s>0?s:0}),c=f(()=>e.modelValue!==!0||R.value===!0&&m.value!==!0),x=f(()=>e.modelValue===!0&&c.value===!0&&e.reveal===!0),$=f(()=>"q-header q-layout__section--marginal "+(R.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(c.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),P=f(()=>{const s=n.rows.value.top,i={};return s[0]==="l"&&n.left.space===!0&&(i[a.lang.rtl===!0?"right":"left"]=`${n.left.size}px`),s[2]==="r"&&n.right.space===!0&&(i[a.lang.rtl===!0?"left":"right"]=`${n.right.size}px`),i});function d(s,i){n.update("header",s,i)}function q(s,i){s.value!==i&&(s.value=i)}function I({height:s}){q(v,s),d("size",s)}function H(s){x.value===!0&&q(m,!0),o("focusin",s)}p(()=>e.modelValue,s=>{d("space",s),q(m,!0),n.animate()}),p(b,s=>{d("offset",s)}),p(()=>e.reveal,s=>{s===!1&&q(m,e.modelValue)}),p(m,s=>{n.animate(),o("reveal",s)}),p(n.scroll,s=>{e.reveal===!0&&q(m,s.direction==="up"||s.position<=e.revealOffset||s.position-s.inflectionPoint<100)});const A={};return n.instances.header=A,e.modelValue===!0&&d("size",v.value),d("space",e.modelValue),d("offset",b.value),U(()=>{n.instances.header===A&&(n.instances.header=void 0,d("size",0),d("offset",0),d("space",!1))}),()=>{const s=rt(T.default,[]);return e.elevated===!0&&s.push(w("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(w(le,{debounce:0,onResize:I})),w("header",{class:$.value,style:P.value,onFocusin:H},s)}}}),Pt=O({name:"QPageContainer",setup(e,{slots:T}){const{proxy:{$q:o}}=N(),a=ve(be,V);if(a===V)return console.error("QPageContainer needs to be child of QLayout"),V;he(st,!0);const n=f(()=>{const v={};return a.header.space===!0&&(v.paddingTop=`${a.header.size}px`),a.right.space===!0&&(v[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${a.right.size}px`),a.footer.space===!0&&(v.paddingBottom=`${a.footer.size}px`),a.left.space===!0&&(v[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${a.left.size}px`),v});return()=>w("div",{class:"q-page-container",style:n.value},oe(T.default))}});const{passive:$e}=fe,$t=["both","horizontal","vertical"];var zt=O({name:"QScrollObserver",props:{axis:{type:String,validator:e=>$t.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:T}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let a=null,n,v;p(()=>e.scrollTarget,()=>{b(),R()});function m(){a!==null&&a();const $=Math.max(0,ct(n)),P=dt(n),d={top:$-o.position.top,left:P-o.position.left};if(e.axis==="vertical"&&d.top===0||e.axis==="horizontal"&&d.left===0)return;const q=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";o.position={top:$,left:P},o.directionChanged=o.direction!==q,o.delta=d,o.directionChanged===!0&&(o.direction=q,o.inflectionPoint=o.position),T("scroll",{...o})}function R(){n=ut(v,e.scrollTarget),n.addEventListener("scroll",c,$e),c(!0)}function b(){n!==void 0&&(n.removeEventListener("scroll",c,$e),n=void 0)}function c($){if($===!0||e.debounce===0||e.debounce==="0")m();else if(a===null){const[P,d]=e.debounce?[setTimeout(m,e.debounce),clearTimeout]:[requestAnimationFrame(m),cancelAnimationFrame];a=()=>{d(P),a=null}}}const{proxy:x}=N();return p(()=>x.$q.lang.rtl,m),G(()=>{v=x.$el.parentNode,R()}),U(()=>{a!==null&&a(),b()}),Object.assign(x,{trigger:c,getPosition:()=>o}),Ie}}),Bt=O({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:T,emit:o}){const{proxy:{$q:a}}=N(),n=L(null),v=L(a.screen.height),m=L(e.container===!0?0:a.screen.width),R=L({position:0,direction:"down",inflectionPoint:0}),b=L(0),c=L(pe.value===!0?0:de()),x=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),$=f(()=>e.container===!1?{minHeight:a.screen.height+"px"}:null),P=f(()=>c.value!==0?{[a.lang.rtl===!0?"left":"right"]:`${c.value}px`}:null),d=f(()=>c.value!==0?{[a.lang.rtl===!0?"right":"left"]:0,[a.lang.rtl===!0?"left":"right"]:`-${c.value}px`,width:`calc(100% + ${c.value}px)`}:null);function q(r){if(e.container===!0||document.qScrollPrevented!==!0){const g={position:r.position.top,direction:r.direction,directionChanged:r.directionChanged,inflectionPoint:r.inflectionPoint.top,delta:r.delta.top};R.value=g,e.onScroll!==void 0&&o("scroll",g)}}function I(r){const{height:g,width:_}=r;let k=!1;v.value!==g&&(k=!0,v.value=g,e.onScrollHeight!==void 0&&o("scrollHeight",g),A()),m.value!==_&&(k=!0,m.value=_),k===!0&&e.onResize!==void 0&&o("resize",r)}function H({height:r}){b.value!==r&&(b.value=r,A())}function A(){if(e.container===!0){const r=v.value>b.value?de():0;c.value!==r&&(c.value=r)}}let s=null;const i={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:n,height:v,containerHeight:b,scrollbarWidth:c,totalWidth:f(()=>m.value+c.value),rows:f(()=>{const r=e.view.toLowerCase().split(" ");return{top:r[0].split(""),middle:r[1].split(""),bottom:r[2].split("")}}),header:ee({size:0,offset:0,space:!1}),right:ee({size:300,offset:0,space:!1}),footer:ee({size:0,offset:0,space:!1}),left:ee({size:300,offset:0,space:!1}),scroll:R,animate(){s!==null?clearTimeout(s):document.body.classList.add("q-body--layout-animate"),s=setTimeout(()=>{s=null,document.body.classList.remove("q-body--layout-animate")},155)},update(r,g,_){i[r][g]=_}};if(he(be,i),de()>0){let _=function(){r=null,g.classList.remove("hide-scrollbar")},k=function(){if(r===null){if(g.scrollHeight>a.screen.height)return;g.classList.add("hide-scrollbar")}else clearTimeout(r);r=setTimeout(_,300)},B=function(Q){r!==null&&Q==="remove"&&(clearTimeout(r),_()),window[`${Q}EventListener`]("resize",k)},r=null;const g=document.body;p(()=>e.container!==!0?"add":"remove",B),e.container!==!0&&B("add"),ft(()=>{B("remove")})}return()=>{const r=Be(T.default,[w(zt,{onScroll:q}),w(le,{onResize:I})]),g=w("div",{class:x.value,style:$.value,ref:e.container===!0?void 0:n,tabindex:-1},r);return e.container===!0?w("div",{class:"q-layout-container overflow-hidden",ref:n},[w(le,{onResize:H}),w("div",{class:"absolute-full",style:P.value},[w("div",{class:"scroll",style:d.value},[g])])]):g}}}),pt="/assets/logo.9213cb01.png",It="/assets/dark-mode.e6484dcf.png";const At={class:"row"},Mt=ae("img",{src:pt},null,-1),Qt=ae("div",{class:"text-h5 text-weight-light self-center q-ml-sm"}," Kube Watchtower ",-1),Ot=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){const T=mt();function o(){T.dark.toggle()}return(a,n)=>{const v=vt("router-view");return ht(),bt(Bt,{view:"hHh lpR fFf"},{default:W(()=>[M(kt,{elevated:"",class:"bg-header text-white","height-hint":"98"},{default:W(()=>[M(wt,null,{default:W(()=>[M(yt,null,{default:W(()=>[ae("div",At,[M(ke,null,{default:W(()=>[Mt]),_:1}),Qt,M(ke,{class:"self-center absolute-right q-mr-md"},{default:W(()=>[ae("img",{clickable:"",onClick:o,src:It})]),_:1})])]),_:1})]),_:1}),M(Rt,{align:"left"},{default:W(()=>[M(te,{to:"/",label:"Overview"}),M(te,{to:"/deployments",label:"Deployments"}),M(te,{to:"/configmaps",label:"ConfigMaps"}),M(te,{to:"/services",label:"Services"})]),_:1})]),_:1}),M(Pt,null,{default:W(()=>[M(v)]),_:1})]),_:1})}}});export{Ot as default};
