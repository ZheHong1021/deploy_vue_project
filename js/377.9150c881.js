"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[377],{8377:function(t,r,e){e.r(r),e.d(r,{default:function(){return g}});var s=e(4414),n=e(4566),a=e(2756),o=function(){var t=this,r=t._self._c;return r(n.A,[r(a.A,[r(s.A,{attrs:{cols:"12"}},[r("h6",{staticClass:"text-h6 font-weight-bold"},[t._v("儀錶板")])]),r(s.A,{attrs:{cols:"12"}},t._l(t.orders,(function(e){return r("p",{key:e["id"]},[t._v(" "+t._s(e)+" ")])})),0)],1)],1)},i=[],d=(e(4603),e(7566),e(8721),e(1099)),c=e(5353),l={data(){return{orders:[]}},mounted(){this.getOrders()},computed:{...(0,c.L8)("auth",["isLoggedIn"])},methods:{async getOrders(){try{const t=new URLSearchParams({detail:!0}),r=await d.QE.getAll(t);200===r.status&&(this.orders=r.data)}catch(t){console.log(t)}}}},u=l,p=e(1656),f=(0,p.A)(u,o,i,!1,null,null,null),g=f.exports},4566:function(t,r,e){e.d(r,{A:function(){return o}});e(125);var s=e(5471);function n(t){return s.Ay.extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(r,{props:e,data:s,children:n}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:a}=s;if(a){s.attrs={};const t=Object.keys(a).filter((t=>{if("slot"===t)return!1;const r=a[t];return t.startsWith("data-")?(s.attrs[t]=r,!1):r||"string"===typeof r}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return e.id&&(s.domProps=s.domProps||{},s.domProps.id=e.id),r(e.tag,s,n)}})}var a=e(8041),o=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:r,data:e,children:s}){let n;const{attrs:o}=e;return o&&(e.attrs={},n=Object.keys(o).filter((t=>{if("slot"===t)return!1;const r=o[t];return t.startsWith("data-")?(e.attrs[t]=r,!1):r||"string"===typeof r}))),r.id&&(e.domProps=e.domProps||{},e.domProps.id=r.id),t(r.tag,(0,a.Ay)(e,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(n||[])}),s)}})}}]);
//# sourceMappingURL=377.9150c881.js.map