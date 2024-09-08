"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[224],{3224:function(e,t,n){n.d(t,{A:function(){return _}});var r=n(1484),i=n(6092),s=n(4414),o=n(6930),a=n(2756),c=n(1034),u=function(){var e=this,t=e._self._c;return t(a.A,[t(s.A,{staticClass:"d-flex flex-wrap",attrs:{cols:"12"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 權限選擇: ")]),t(c.A),t("div",{staticClass:"d-flex align-center gap-4"},[t(r.A,{staticClass:"pa-2 d-flex flex-wrap gap-2",attrs:{outlined:"",color:"#ffcfc4"}},[t(o.A,{attrs:{small:"",color:"red darken-2"}},[e._v("mdi-check-circle")]),t("span",{staticClass:"font-weight-black text-subtitle-2"},[e._v(" 當前選擇 ")])],1),e.group_checked.length>0?t(r.A,{staticClass:"pa-2 d-flex flex-wrap gap-2",attrs:{outlined:"",color:"#c4e1ff"}},[t(o.A,{attrs:{small:"",color:"indigo darken-2"}},[e._v("mdi-check-circle")]),t("span",{staticClass:"font-weight-black text-subtitle-2"},[e._v(" 角色選擇 ")])],1):e._e()],1)],1),t(s.A,{attrs:{cols:"12"}},[t("div",{staticClass:"table-container mt-1"},[t("table",{staticClass:"black--text text-subtitle-2 text-md-subtitle-1",attrs:{id:"table",border:"1"}},[t("thead",{staticClass:"text-subtitle-2 text-md-subtitle-1"},e._l(e.headers,(function(n){return t("th",{key:n["value"]},[e._v(" "+e._s(n["text"])+" ")])})),0),t("tbody",{staticClass:"text-subtitle-2 text-md-subtitle-1",attrs:{align:"center"}},e._l(e.tree_permissions,(function(n,r){return t("tr",{key:r},e._l(e.headers,(function(s){return t("td",{key:s["value"],class:{is_checked:e.is_checked_column(n[s["value"]]?.id),is_group_checked:e.is_group_checked(n[s["value"]]?.id)}},["content_type_name"===s.value?[e._v(" "+e._s(r)+" ")]:"全選"===s.value?[t(i.A,{attrs:{"input-value":e.is_row_checked_all(n),label:"全選",readonly:e.readonly,disabled:e.readonly},on:{change:t=>e.toggleCheckedAll(t,n)}})]:[t("div",{staticClass:"d-flex flex-wrap justify-center align-center"},[t(i.A,{attrs:{value:n[s.value]["id"],label:n[s.value]["name"],readonly:e.readonly||e.is_group_checked(n[s.value]["id"]),disabled:e.readonly||e.is_group_checked(n[s.value]["id"])},on:{change:e.changePermissionChecked},model:{value:e.permission_checked,callback:function(t){e.permission_checked=t},expression:"permission_checked"}})],1)]],2)})),0)})),0)])])])],1)},l=[],f=(n(3375),n(9225),n(3972),n(9209),n(5714),n(7561),n(6197),n(4603),n(7566),n(8721),n(132)),d={name:"PermissionCheckedList",props:{value:{type:Array,default:()=>[]},readonly:{type:Boolean,default:!1},group_checked:{type:Array,default:()=>[]}},data(){return{loading:!0,permissions:[],tree_permissions:{},permission_checked:[],headers:[{text:"權限對象",value:"content_type_name"},{text:"全選",value:"全選"},{text:"查看",value:"查看"},{text:"新增",value:"新增"},{text:"修改",value:"修改"},{text:"刪除",value:"刪除"}]}},watch:{value:{immediate:!0,handler(e){this.permission_checked=this.value}},group_checked:{immediate:!0,handler(e){this.permission_checked=[...new Set([...this.value,...e])]}}},async mounted(){await this.fetchPermission()},methods:{async fetchPermission(){try{const e=new URLSearchParams({page_size:-1}),t=await f.n1.get_all(e);if(200===t.status){const{data:e,count:n}=t.data;this.permissions=e,await this.getTreePermission()}}catch(e){console.log(e)}finally{this.loading=!1}},getTreePermission(){const e={};for(const t of this.permissions){const{content_type_name:n,action:r}=t;e[n]||(e[n]={}),e[n][r]||(e[n][r]={}),e[n][r]=t}this.tree_permissions=e},changePermissionChecked(e){const{permission_checked:t}=this;t.includes(e)?this.emitEvent(t.filter((t=>t!==e))):e&&this.emitEvent(this.permission_checked)},emitEvent(e){this.$emit("input",e)},toggleCheckedAll(e,t){const n=Object.values(t).map((e=>e.id));this.permission_checked=e?[...new Set([...this.permission_checked,...n])]:this.permission_checked.filter((e=>!n.includes(e)||this.is_group_checked(e))),this.emitEvent(this.permission_checked)},is_row_checked_all(e){const t=Object.values(e).map((e=>e.id));return t.every((e=>this.permission_checked.includes(e)))},is_checked_column(e){return this.value.includes(e)},is_group_checked(e){return this.group_checked.includes(e)}}},h=d,p=n(1656),v=(0,p.A)(h,u,l,!1,null,"12ea2ed4",null),_=v.exports},7080:function(e,t,n){var r=n(4402).has;e.exports=function(e){return r(e),e}},6706:function(e,t,n){var r=n(9504),i=n(9306);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(s){}}},1767:function(e){e.exports=function(e){return{iterator:e,next:e.next,done:!1}}},3789:function(e,t,n){var r=n(9306),i=n(8551),s=n(9565),o=n(1291),a=n(1767),c="Invalid size",u=RangeError,l=TypeError,f=Math.max,d=function(e,t){this.set=e,this.size=f(t,0),this.has=r(e.has),this.keys=r(e.keys)};d.prototype={getIterator:function(){return a(i(s(this.keys,this.set)))},includes:function(e){return s(this.has,this.set,e)}},e.exports=function(e){i(e);var t=+e.size;if(t!==t)throw new l(c);var n=o(t);if(n<0)throw new u(c);return new d(e,n)}},507:function(e,t,n){var r=n(9565);e.exports=function(e,t,n){var i,s,o=n?e:e.iterator,a=e.next;while(!(i=r(a,o)).done)if(s=t(i.value),void 0!==s)return s}},9539:function(e,t,n){var r=n(9565),i=n(8551),s=n(5966);e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},9286:function(e,t,n){var r=n(4402),i=n(8469),s=r.Set,o=r.add;e.exports=function(e){var t=new s;return i(e,(function(e){o(t,e)})),t}},3440:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(5170),a=n(3789),c=n(8469),u=n(507),l=i.has,f=i.remove;e.exports=function(e){var t=r(this),n=a(e),i=s(t);return o(t)<=n.size?c(t,(function(e){n.includes(e)&&f(i,e)})):u(n.getIterator(),(function(e){l(t,e)&&f(i,e)})),i}},4402:function(e,t,n){var r=n(9504),i=Set.prototype;e.exports={Set:Set,add:r(i.add),has:r(i.has),remove:r(i["delete"]),proto:i}},8750:function(e,t,n){var r=n(7080),i=n(4402),s=n(5170),o=n(3789),a=n(8469),c=n(507),u=i.Set,l=i.add,f=i.has;e.exports=function(e){var t=r(this),n=o(e),i=new u;return s(t)>n.size?c(n.getIterator(),(function(e){f(t,e)&&l(i,e)})):a(t,(function(e){n.includes(e)&&l(i,e)})),i}},4449:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(8469),c=n(507),u=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<=n.size)return!1!==a(t,(function(e){if(n.includes(e))return!1}),!0);var l=n.getIterator();return!1!==c(l,(function(e){if(i(t,e))return u(l,"normal",!1)}))}},3838:function(e,t,n){var r=n(7080),i=n(5170),s=n(8469),o=n(3789);e.exports=function(e){var t=r(this),n=o(e);return!(i(t)>n.size)&&!1!==s(t,(function(e){if(!n.includes(e))return!1}),!0)}},8527:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(507),c=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<n.size)return!1;var u=n.getIterator();return!1!==a(u,(function(e){if(!i(t,e))return c(u,"normal",!1)}))}},8469:function(e,t,n){var r=n(9504),i=n(507),s=n(4402),o=s.Set,a=s.proto,c=r(a.forEach),u=r(a.keys),l=u(new o).next;e.exports=function(e,t,n){return n?i({iterator:u(e),next:l},t):c(e,t)}},4916:function(e,t,n){var r=n(7751),i=function(e){return{size:e,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}};e.exports=function(e){var t=r("Set");try{(new t)[e](i(0));try{return(new t)[e](i(-1)),!1}catch(n){return!0}}catch(s){return!1}}},5170:function(e,t,n){var r=n(6706),i=n(4402);e.exports=r(i.proto,"size","get")||function(e){return e.size}},3650:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(3789),a=n(507),c=i.add,u=i.has,l=i.remove;e.exports=function(e){var t=r(this),n=o(e).getIterator(),i=s(t);return a(n,(function(e){u(t,e)?l(i,e):c(i,e)})),i}},4204:function(e,t,n){var r=n(7080),i=n(4402).add,s=n(9286),o=n(3789),a=n(507);e.exports=function(e){var t=r(this),n=o(e).getIterator(),c=s(t);return a(n,(function(e){i(c,e)})),c}},7642:function(e,t,n){var r=n(6518),i=n(3440),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("difference")},{difference:i})},8004:function(e,t,n){var r=n(6518),i=n(9039),s=n(8750),o=n(4916),a=!o("intersection")||i((function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))}));r({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},3853:function(e,t,n){var r=n(6518),i=n(4449),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("isDisjointFrom")},{isDisjointFrom:i})},5876:function(e,t,n){var r=n(6518),i=n(3838),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("isSubsetOf")},{isSubsetOf:i})},2475:function(e,t,n){var r=n(6518),i=n(8527),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("isSupersetOf")},{isSupersetOf:i})},5024:function(e,t,n){var r=n(6518),i=n(3650),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("symmetricDifference")},{symmetricDifference:i})},1698:function(e,t,n){var r=n(6518),i=n(4204),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("union")},{union:i})},3375:function(e,t,n){n(7642)},9225:function(e,t,n){n(8004)},3972:function(e,t,n){n(3853)},9209:function(e,t,n){n(5876)},5714:function(e,t,n){n(2475)},7561:function(e,t,n){n(5024)},6197:function(e,t,n){n(1698)}}]);
//# sourceMappingURL=224.6b233607.js.map