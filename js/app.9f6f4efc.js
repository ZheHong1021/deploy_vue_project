(function(){"use strict";var e={5811:function(e,t,r){var n=r(5471),o=r(5668),u=r(6506),i=function(){var e=this,t=e._self._c;return t(o.A,[t(u.A,[t("div",{staticClass:"d-flex gap-4"},e._l(e.routes,(function(r){return t("router-link",{key:r["name"],attrs:{to:r["path"]}},[e._v(" "+e._s(r["name"])+" ")])})),1),t("router-view")],1)],1)},a=[],s={name:"App",data:()=>({routes:[{name:"HomeView",path:"/"},{name:"AboutView",path:"/about"},{name:"WebSocket",path:"/web-socket"}]})},c=s,l=r(1656),f=(0,l.A)(c,i,a,!1,null,"3e16930e",null),p=f.exports,d=r(173),v=r(3635),h=function(){var e=this,t=e._self._c;return t("div",[t(v.A,{attrs:{color:"primary"},on:{click:e.getOrders}},[e._v("Click")]),e._l(e.orders,(function(r){return t("p",{key:r["id"]},[e._v(" "+e._s(r)+" ")])}))],2)},m=[],y=(r(4603),r(7566),r(8721),r(1250));const b=y.A.create({baseURL:"http://127.0.0.1:8000/api",timeout:1e4,headers:{"Content-Type":"application/json"}});b.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e}),(e=>Promise.reject(e))),b.interceptors.response.use((e=>e),(e=>(e.response.status,Promise.reject(e))));var g=b;class A{constructor(e){this.resource=e}getAll(e){return g.get(`/${this.resource}`,{params:e})}getById(e,t){return g.get(`/${this.resource}/${e}`,{params:t})}create(e){return g.post(`/${this.resource}`,e)}update(e,t){return g.put(`/${this.resource}/${e}`,t)}delete(e){return g.delete(`/${this.resource}/${e}`)}}var w=A;class _ extends w{constructor(){super("orders")}}var k=new _,j={data(){return{orders:[]}},mounted(){},beforeDestroy(){},methods:{async getOrders(){try{const e=new URLSearchParams({detail:!0}),t=await k.getAll(e);200===t.status&&(this.orders=t.data)}catch(e){console.log(e)}}}},O=j,S=(0,l.A)(O,h,m,!1,null,null,null),$=S.exports;n.Ay.use(d.Ay);const x=[{path:"/",name:"HomeView",component:$},{path:"/about",name:"AboutView",component:()=>r.e(594).then(r.bind(r,1794))},{path:"/web-socket",name:"WebSocket",component:()=>r.e(594).then(r.bind(r,1328))}],C=new d.Ay({mode:"history",base:"/deploy_vue_project/",routes:x});var P=C,T=r(5353);n.Ay.use(T.Ay);var E=new T.Ay.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),L=r(5868);n.Ay.use(L.A);var V=new L.A({});n.Ay.config.productionTip=!1,new n.Ay({router:P,store:E,vuetify:V,render:e=>e(p)}).$mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}r.m=e,function(){var e=[];r.O=function(t,n,o,u){if(!n){var i=1/0;for(l=0;l<e.length;l++){n=e[l][0],o=e[l][1],u=e[l][2];for(var a=!0,s=0;s<n.length;s++)(!1&u||i>=u)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(a=!1,u<i&&(i=u));if(a){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}u=u||0;for(var l=e.length;l>0&&e[l-1][2]>u;l--)e[l]=e[l-1];e[l]=[n,o,u]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/about.68da0401.js"}}(),function(){r.miniCssF=function(e){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="deploy_vue_project:";r.l=function(n,o,u,i){if(e[n])e[n].push(o);else{var a,s;if(void 0!==u)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var f=c[l];if(f.getAttribute("src")==n||f.getAttribute("data-webpack")==t+u){a=f;break}}a||(s=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",t+u),a.src=n),e[n]=[o];var p=function(t,r){a.onerror=a.onload=null,clearTimeout(d);var o=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(r)})),t)return t(r)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),s&&document.head.appendChild(a)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p="/deploy_vue_project/"}(),function(){var e={524:0};r.f.j=function(t,n){var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var u=new Promise((function(r,n){o=e[t]=[r,n]}));n.push(o[2]=u);var i=r.p+r.u(t),a=new Error,s=function(n){if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var u=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+u+": "+i+")",a.name="ChunkLoadError",a.type=u,a.request=i,o[1](a)}};r.l(i,s,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,u,i=n[0],a=n[1],s=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(s)var l=s(r)}for(t&&t(n);c<i.length;c++)u=i[c],r.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return r.O(l)},n=self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[504],(function(){return r(5811)}));n=r.O(n)})();
//# sourceMappingURL=app.9f6f4efc.js.map