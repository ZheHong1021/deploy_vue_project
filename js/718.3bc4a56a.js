"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[718],{474:function(e,t,a){a.r(t),a.d(t,{default:function(){return Re}});var s=a(3180),l=a(4414),i=a(3449),o=a(6930),r=a(2756),n=function(){var e=this,t=e._self._c;return t(i.A,{attrs:{fluid:""}},[t(r.A,[t(l.A,{attrs:{cols:"12"}},[t("CustomDataTable",{attrs:{items:e.items,itemsLength:e.itemsLength,options:e.options,headers:e.headers,height:"100%",loading:e.loading,disabled_select:e.disabled_select,"fixed-header":!1,"show-expand":""},on:{emitUpdateOptions:e.emitUpdateOptions,create:e.emitCreate,read:e.emitRead,update:e.emitUpdate,delete:e.emitDelete},scopedSlots:e._u([{key:"item.age",fn:function({item:a}){return[t("td",[a["age"]?[e._v(e._s(a["age"])+"歲")]:[e._v("未提供")]],2)]}},{key:"item.gender",fn:function({item:a}){return[t("td",[t(o.A,{attrs:{color:e.get_gender_style(a["gender"],"color")}},[e._v(" "+e._s(e.get_gender_style(a["gender"],"icon"))+" ")]),e._v(" "+e._s(a["gender_display"])+" ")],1)]}},{key:"item.groups",fn:function({item:a}){return[t("td",{staticClass:"py-4"},[a?.groups&&a.groups.length>0?t("div",{staticClass:"d-flex flex-wrap gap-2"},e._l(a.groups,(function(a){return t(s.A,{key:a.id,staticClass:"font-weight-bold text-subtitle-2 black--text elevation-4",attrs:{rounded:"",color:"indigo lighten-5"}},[t("div",{staticClass:"d-flex align-center gap-1"},[t(o.A,{attrs:{small:"",color:"indigo darken-2"}},[e._v("mdi-account-multiple")]),e._v(" "+e._s(a["name_zh"])+" ")],1)])})),1):t("div",{staticClass:"font-weight-bold grey--text text--darken-2 d-flex align-center gap-0"},[t(o.A,{attrs:{color:"error"}},[e._v("mdi-close-thick")]),e._v(" 尚未擁有 ")],1)])]}},{key:"item.is_active",fn:function({item:a}){return[t("td",[t(s.A,{staticClass:"elevation-4 black--text font-weight-bold",attrs:{label:"",color:e.get_is_active_style(a["is_active"],"bg_color")}},[t(o.A,{attrs:{small:"",left:"",color:e.get_is_active_style(a["is_active"],"color")}},[e._v(" mdi-circle ")]),e._v(" "+e._s(e.get_is_active_style(a["is_active"],"text"))+" ")],1)],1)]}},{key:"item.last_login",fn:function({item:a}){return[t("td",[t("div",[a["last_login"]?[e._v(e._s(a["last_login"]))]:[t(o.A,{attrs:{color:"red"}},[e._v("mdi-close-thick")]),t("span",{staticClass:"font-weight-bold grey--text text--darken-2"},[e._v("無登入紀錄")])]],2)])]}}])})],1)],1),t("CustomDialog",{attrs:{title:"新增用戶",color:"pink darken-2"},scopedSlots:e._u([{key:"body",fn:function(){return[e.create_dialog?t("CreateUserForm",{on:{refresh:e.refreshData}}):e._e()]},proxy:!0}]),model:{value:e.create_dialog,callback:function(t){e.create_dialog=t},expression:"create_dialog"}}),t("CustomDialog",{attrs:{title:"瀏覽用戶",color:"grey darken-2"},scopedSlots:e._u([{key:"body",fn:function(){return[e.read_dialog?t("ReadUserForm",{attrs:{id:e.read_id}}):e._e()]},proxy:!0}]),model:{value:e.read_dialog,callback:function(t){e.read_dialog=t},expression:"read_dialog"}}),t("CustomDialog",{attrs:{title:"修改用戶",color:"primary darken-2"},scopedSlots:e._u([{key:"body",fn:function(){return[e.update_dialog?t("UpdateUserForm",{attrs:{id:e.update_id},on:{refresh:e.refreshData}}):e._e()]},proxy:!0}]),model:{value:e.update_dialog,callback:function(t){e.update_dialog=t},expression:"update_dialog"}})],1)},d=[],c=a(4574),u=a(6989),p=a(4846),h=a(4460),m=a(3740),_=a(174),f=a(6355),g=a(569),v=a(6993),b=a(7717),x=a(8743),w=a(7515),C=a(7018),y=a(3381),A=a(8944),k=a(4152),S=a(5803),$=a(8041);const D=(0,S.A)(b.A,x.A,C.A,(0,w.P)("radioGroup"),y.A);var L=D.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:{type:Boolean,default:null},id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:{type:Boolean,default:null},value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){if(!this.isDisabled)return A.A.options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return v.A.options.computed.computedId.call(this)},hasLabel:v.A.options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){var e;return null!==(e=this.disabled)&&void 0!==e?e:!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){var e;return null!==(e=this.readonly)&&void 0!==e?e:!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||`radio-${this.radioGroup._uid}`},rippleState(){return A.A.options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(e){return A.A.options.methods.genInput.call(this,"radio",e)},genLabel(){return this.hasLabel?this.$createElement(f.A,{on:{click:A.F},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},(0,k.$c)(this,"label")||this.label):null},genRadio(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(g.A,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...t}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(e){const t={staticClass:"v-radio",class:this.classes,on:(0,$.wf)({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return e("div",t,[this.genRadio(),this.genLabel()])}}),R=(a(5601),a(48));const F=(0,S.A)(R.C,v.A);var G=F.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...v.A.options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},v.A.options.methods.genDefaultSlot.call(this))},genInputSlot(){const e=v.A.options.methods.genInputSlot.call(this);return delete e.data.on.click,e},genLabel(){const e=v.A.options.methods.genLabel.call(this);return e?(e.data.attrs.id=this.computedId,delete e.data.attrs.for,e.tag="legend",e):null},onClick:R.C.options.methods.onClick},render(e){const t=v.A.options.render.call(this,e);return this._b(t.data,"div",this.attrs$),t}}),U=a(3e3),B=a(7112),I=function(){var e=this,t=e._self._c;return t(_.A,{ref:"form",on:{submit:function(t){return t.preventDefault(),e.create.apply(null,arguments)}},model:{value:e.createFormValid,callback:function(t){e.createFormValid=t},expression:"createFormValid"}},[t(r.A,{staticClass:"justify-start"},[t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 帳號: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫帳號",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: example"},model:{value:e.create_data["username"],callback:function(t){e.$set(e.create_data,"username",t)},expression:"create_data['username']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 信箱: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫信箱",rules:[e.rules["requiredRules"],e.rules["emailRules"]],placeholder:"填寫範例: example@gmail.com"},model:{value:e.create_data["email"],callback:function(t){e.$set(e.create_data,"email",t)},expression:"create_data['email']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 密碼: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"append-icon":e.password_show?"mdi-eye":"mdi-eye-off",rules:[e.rules["requiredRules"],e.rules["passwordRules"]],type:e.password_show?"text":"password",label:"請填寫密碼",counter:"",outlined:""},on:{"click:append":function(t){e.password_show=!e.password_show}},model:{value:e.create_data["password"],callback:function(t){e.$set(e.create_data,"password",t)},expression:"create_data['password']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 確認密碼: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"append-icon":e.confirm_password_show?"mdi-eye":"mdi-eye-off",rules:[e.rules["requiredRules"],e.rules.confirmPasswordRules(e.create_data["password"])],type:e.confirm_password_show?"text":"password",label:"請填寫確認密碼",counter:"",outlined:""},on:{"click:append":function(t){e.confirm_password_show=!e.confirm_password_show}},model:{value:e.confirm_password,callback:function(t){e.confirm_password=t},expression:"confirm_password"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 姓氏: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫姓氏",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: 林"},model:{value:e.create_data["lastname"],callback:function(t){e.$set(e.create_data,"lastname",t)},expression:"create_data['lastname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 名字: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名字",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: 大明"},model:{value:e.create_data["firstname"],callback:function(t){e.$set(e.create_data,"firstname",t)},expression:"create_data['firstname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 手機號碼: "),t("strong",{staticClass:"blue--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (非必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫手機號碼",rules:[e.rules["phoneRules"]],placeholder:"填寫範例: 0912345678"},model:{value:e.create_data["phone_number"],callback:function(t){e.$set(e.create_data,"phone_number",t)},expression:"create_data['phone_number']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 性別: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(G,{attrs:{row:"",rules:[e.rules["requiredRules"]]},model:{value:e.create_data["gender"],callback:function(t){e.$set(e.create_data,"gender",t)},expression:"create_data['gender']"}},e._l(e.gender_select_list,(function(e){return t(L,{key:e["value"],attrs:{label:e["label"],value:e["value"]}})})),1)],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 啟用狀態: ")]),t(U.A,{attrs:{inset:""},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",[e._v(e._s(e.create_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:e.create_data["is_active"],callback:function(t){e.$set(e.create_data,"is_active",t)},expression:"create_data['is_active']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 角色選擇: ")]),t("GroupCheckedList",{model:{value:e.create_data["groups"],callback:function(t){e.$set(e.create_data,"groups",t)},expression:"create_data['groups']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("PermissionCheckedList",{model:{value:e.create_data["user_permissions"],callback:function(t){e.$set(e.create_data,"user_permissions",t)},expression:"create_data['user_permissions']"}})],1),t(l.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[t(m.A,{staticClass:"font-weight-bold white--text",attrs:{color:"pink darken-2",type:"submit",width:"150",height:"50"}},[e._v(" 創建 ")])],1)],1)],1)},V=[],q=a(3224),E=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{"max-width":"350px"}},[t("CustomListGroup",{attrs:{items:e.groups,"item-value":"group_id","item-text":"name_zh",loading:e.loading,"header-title":"角色清單","header-icon":"mdi-account-group","disable-select-all":"",readonly:e.readonly},on:{input:e.emitEvent},model:{value:e.group_checked,callback:function(t){e.group_checked=t},expression:"group_checked"}})],1)},P=[],T=(a(4603),a(7566),a(8721),a(6092)),j=a(9483),O=a(8983),N=a(7296),z=a(2659),Z=a(3138),H=a(1376),K=a(739),M=function(){var e=this,t=e._self._c;return t(O.A,{staticClass:"pb-0 elevation-2",attrs:{outlined:""}},[e.disableHeader?e._e():t(N.A,{attrs:{disabled:""}},[t(Z.A,{attrs:{color:"grey lighten-3"}},[t(o.A,[e._v(e._s(e.headerIcon))])],1),t(H.pr,[t(H.UZ,{staticClass:"font-weight-black text-subtitle-2"},[e._v(" "+e._s(e.headerTitle)+" ")]),t(H.w,{staticClass:"d-flex flex-wrap gap-2"},[t(s.A,{attrs:{rounded:"",small:"",color:"success"}},[e._v("已選: "+e._s(e.value.length))]),t(s.A,{staticClass:"white--text",attrs:{rounded:"",small:"",color:"deep-orange darken-1"}},[e._v(" 總共: "+e._s(e.items.length)+" ")])],1)],1)],1),e.disableSearch?e._e():t(N.A,[t(H.pr,[t("CustomSearchBox",{attrs:{clearable:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)],1),t(j.A,{staticClass:"mt-2 elevation-1"}),e.disableSelectAll?e._e():t(N.A,{directives:[{name:"show",rawName:"v-show",value:!e.is_no_search_items,expression:"!is_no_search_items"}],attrs:{ripple:""},on:{mousedown:function(e){e.preventDefault()},click:e.toggleSelectAll}},[t(z.A,[t(o.A,{attrs:{color:"indigo darken-4"}},[e._v(" "+e._s(e.selectActionIcon)+" ")])],1),t(H.pr,[t(H.UZ,[e._v(" 全選 ")])],1)],1),t(K.A,{directives:[{name:"show",rawName:"v-show",value:!e.is_no_search_items,expression:"!is_no_search_items"}],attrs:{value:e.value,multiple:"","active-class":"primary--text font-weight-bold"},on:{change:e.emitEvent}},[e._l(e.items,(function(a){return[t(N.A,{directives:[{name:"show",rawName:"v-show",value:e.item_is_search(a),expression:"item_is_search(item)"}],key:a[e.itemValue],attrs:{value:a[e.itemValue],disabled:e.readonly||e.item_is_disabled(a)},scopedSlots:e._u([{key:"default",fn:function({active:s}){return[t(z.A,[t(T.A,{attrs:{"input-value":s,color:"primary"}})],1),t(H.pr,[t(H.UZ,[t("div",{staticClass:"d-flex align-center gap-1"},[e._v(" "+e._s(a[e.itemText])+" "),e.item_is_disabled(a)&&e.showRequiredText?t("small",{staticClass:"font-weight-black red--text"},[e._v("(*必選)")]):e._e()])])],1)]}}],null,!0)})]}))],2),e.is_no_search_items?t(N.A,{attrs:{disabled:""}},[t(H.pr,[t("div",{staticClass:"d-flex align-center gap-1"},[t(o.A,{attrs:{size:"22"}},[e._v("mdi-magnify-remove-outline")]),t("span",[e._v("查詢不到搜尋內容")])],1)])],1):e._e()],1)},J=[],Q=function(){var e=this,t=e._self._c;return t(B.A,{attrs:{value:e.value,outlined:"","background-color":e.backgroundColor,label:e.label,placeholder:e.placeholder,"prepend-inner-icon":"mdi-magnify",clearable:e.clearable,"clear-icon":"mdi-close-circle",dense:e.dense,"hide-details":""},on:{input:function(t){return e.$emit("input",t)}}})},W=[],X={name:"CustomSearchBox",props:{value:{type:String,default:null},backgroundColor:{type:String,default:"white"},label:{type:String,default:"搜尋"},placeholder:{type:String,default:"請搜尋文字"},clearable:{type:Boolean,default:!1},dense:{type:Boolean,default:!1}},data(){return{}},watch:{value(e){null===e&&this.$emit("input","")}}},Y=X,ee=a(1656),te=(0,ee.A)(Y,Q,W,!1,null,null,null),ae=te.exports,se={name:"CustomListGroup",components:{CustomSearchBox:ae},props:{value:{type:Array,default:()=>[]},items:{type:Array,default:()=>[]},itemValue:{type:String,default:"value"},itemText:{type:String,default:"text"},itemDisabled:{type:Function,default:void 0},loading:{type:Boolean,default:!0},headerIcon:{type:String,default:"mdi-information"},headerTitle:{type:String,default:"選取清單"},disableHeader:{type:Boolean,default:!1},disableSearch:{type:Boolean,default:!1},disableSelectAll:{type:Boolean,default:!1},showRequiredText:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},data(){return{search:""}},computed:{isAllSelected(){return this.items.length===this.value.length},isSomeSelected(){return this.value.length>0&&!this.isAllSelected},isAllNotSelected(){return!this.isAllSelected&&!this.isSomeSelected},selectActionIcon(){return this.isAllSelected?"mdi-close-box":this.isSomeSelected?"mdi-minus-box":"mdi-checkbox-blank-outline"},selectDisabledList(){return this.itemDisabled?this.itemDisabled(this.items):[]},search_filter_items(){const{items:e,search:t,itemText:a}=this;return e.filter((e=>e[a].includes(t)))},is_no_search_items(){return 0===this.search_filter_items.length}},methods:{emitEvent(e){this.$emit("input",e)},toggleSelectAll(e){const t=this.isAllSelected?this.selectDisabledList:this.items,a=t.map((e=>e[this.itemValue]));this.emitEvent(a)},item_is_disabled(e){const{itemValue:t}=this;return this.selectDisabledList.some((a=>e[t]===a[t]))},item_is_search(e){return this.search_filter_items.some((t=>t["id"]===e["id"]))}}},le=se,ie=(0,ee.A)(le,M,J,!1,null,null,null),oe=ie.exports,re={name:"GroupCheckedList",components:{CustomListGroup:oe},props:{value:{type:Array,default:()=>[]},readonly:{type:Boolean,default:!1}},data(){return{loading:!0,groups:[],group_checked:[]}},watch:{value:{immediate:!0,handler(e){this.group_checked=this.value}}},async mounted(){await this.fetchGroup()},methods:{async fetchGroup(){try{const e=new URLSearchParams({page_size:-1}),t=await c.GS.get_all(e);200===t.status&&(this.groups=t.data)}catch(e){console.log(e)}finally{this.loading=!1}},emitEvent(e){this.$emit("input",e)}}},ne=re,de=(0,ee.A)(ne,E,P,!1,null,"3883fd4c",null),ce=de.exports,ue={name:"CreateUserForm",components:{PermissionCheckedList:q.A,GroupCheckedList:ce},data(){return{password_show:!1,confirm_password:null,confirm_password_show:!1,create_data:{username:null,email:null,password:null,firstname:null,lastname:null,phone_number:null,gender:"private",is_active:!0,user_permissions:[],groups:[]},createFormValid:!1,rules:u.aO,gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},async mounted(){},methods:{async create(){if(this.$refs.form.validate(),this.createFormValid)try{const e=new FormData;for(const[a,s]of Object.entries(this.create_data))null!==s&&void 0!==s&&e.append(a,s);const t=await c.DL.create(e);201===t.status?(this.$swal.fire("創建成功","","success"),this.$emit("refresh")):this.$swal.fire("創建失敗","","error")}catch(e){console.error(e)}else this.$swal.fire("請確實填寫內容","","error")}}},pe=ue,he=(0,ee.A)(pe,I,V,!1,null,"fe803b70",null),me=he.exports,_e=function(){var e=this,t=e._self._c;return t(_.A,{ref:"form",on:{submit:function(t){return t.preventDefault(),e.read.apply(null,arguments)}}},[t(r.A,{staticClass:"justify-start"},[t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 帳號: ")]),t(B.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫帳號",placeholder:"填寫範例: example"},model:{value:e.read_data["username"],callback:function(t){e.$set(e.read_data,"username",t)},expression:"read_data['username']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 信箱: ")]),t(B.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫信箱",placeholder:"填寫範例: example@gmail.com"},model:{value:e.read_data["email"],callback:function(t){e.$set(e.read_data,"email",t)},expression:"read_data['email']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 姓氏: ")]),t(B.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫姓氏",placeholder:"填寫範例: 林"},model:{value:e.read_data["lastname"],callback:function(t){e.$set(e.read_data,"lastname",t)},expression:"read_data['lastname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 名字: ")]),t(B.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫名字",placeholder:"填寫範例: 大明"},model:{value:e.read_data["firstname"],callback:function(t){e.$set(e.read_data,"firstname",t)},expression:"read_data['firstname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 手機號碼: ")]),t(B.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫手機號碼",placeholder:"填寫範例: 0912345678"},model:{value:e.read_data["phone_number"],callback:function(t){e.$set(e.read_data,"phone_number",t)},expression:"read_data['phone_number']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 性別: ")]),t(G,{attrs:{readonly:"",row:""},model:{value:e.read_data["gender"],callback:function(t){e.$set(e.read_data,"gender",t)},expression:"read_data['gender']"}},e._l(e.gender_select_list,(function(e){return t(L,{key:e["value"],attrs:{label:e["label"],value:e["value"]}})})),1)],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 啟用狀態: ")]),t(U.A,{attrs:{readonly:"",inset:""},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",[e._v(e._s(e.read_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:e.read_data["is_active"],callback:function(t){e.$set(e.read_data,"is_active",t)},expression:"read_data['is_active']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 角色選擇: ")]),t("GroupCheckedList",{attrs:{readonly:""},model:{value:e.read_data["groups"],callback:function(t){e.$set(e.read_data,"groups",t)},expression:"read_data['groups']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("PermissionCheckedList",{attrs:{group_checked:e.group_permission_checked,readonly:""},model:{value:e.read_data["user_permissions"],callback:function(t){e.$set(e.read_data,"user_permissions",t)},expression:"read_data['user_permissions']"}})],1)],1)],1)},fe=[],ge={name:"ReadUserForm",components:{PermissionCheckedList:q.A,GroupCheckedList:ce},props:["id"],data(){return{loading:!0,read_data:{},group_permission_checked:[],gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},watch:{id:{immediate:!0,handler(e){e&&this.fetchData()}}},async mounted(){},methods:{async fetchData(){try{const e=await c.DL.get_by_id(this.id);if(200===e.status){const t=e.data;this.read_data={username:t["username"],email:t["email"],firstname:t["firstname"],lastname:t["lastname"],phone_number:t["phone_number"],gender:t["gender"],is_active:t["is_active"],user_permissions:e.data.user_permissions.map((e=>e.id)),groups:e.data.groups.map((e=>e.id))},this.group_permission_checked=t.groups.flatMap((e=>e.permissions))}}catch(e){console.error(e)}finally{this.loading=!1}}}},ve=ge,be=(0,ee.A)(ve,_e,fe,!1,null,"aba3f508",null),xe=be.exports,we=function(){var e=this,t=e._self._c;return t(_.A,{ref:"form",on:{submit:function(t){return t.preventDefault(),e.update.apply(null,arguments)}},model:{value:e.updateFormValid,callback:function(t){e.updateFormValid=t},expression:"updateFormValid"}},[t(r.A,{staticClass:"justify-start"},[t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 帳號: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫帳號",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: example"},model:{value:e.update_data["username"],callback:function(t){e.$set(e.update_data,"username",t)},expression:"update_data['username']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 信箱: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫信箱",rules:[e.rules["requiredRules"],e.rules["emailRules"]],placeholder:"填寫範例: example@gmail.com"},model:{value:e.update_data["email"],callback:function(t){e.$set(e.update_data,"email",t)},expression:"update_data['email']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 姓氏: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫姓氏",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: 林"},model:{value:e.update_data["lastname"],callback:function(t){e.$set(e.update_data,"lastname",t)},expression:"update_data['lastname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 名字: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名字",rules:[e.rules["requiredRules"]],placeholder:"填寫範例: 大明"},model:{value:e.update_data["firstname"],callback:function(t){e.$set(e.update_data,"firstname",t)},expression:"update_data['firstname']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 手機號碼: "),t("strong",{staticClass:"blue--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (非必填) ")])]),t(B.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫手機號碼",rules:[e.rules["phoneRules"]],placeholder:"填寫範例: 0912345678"},model:{value:e.update_data["phone_number"],callback:function(t){e.$set(e.update_data,"phone_number",t)},expression:"update_data['phone_number']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 性別: "),t("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[e._v(" (*必填) ")])]),t(G,{attrs:{row:"",rules:[e.rules["requiredRules"]]},model:{value:e.update_data["gender"],callback:function(t){e.$set(e.update_data,"gender",t)},expression:"update_data['gender']"}},e._l(e.gender_select_list,(function(e){return t(L,{key:e["value"],attrs:{label:e["label"],value:e["value"]}})})),1)],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 啟用狀態: ")]),t(U.A,{attrs:{inset:""},scopedSlots:e._u([{key:"label",fn:function(){return[t("span",[e._v(e._s(e.update_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:e.update_data["is_active"],callback:function(t){e.$set(e.update_data,"is_active",t)},expression:"update_data['is_active']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[e._v(" 角色選擇: ")]),t("GroupCheckedList",{model:{value:e.update_data["groups"],callback:function(t){e.$set(e.update_data,"groups",t)},expression:"update_data['groups']"}})],1),t(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12"}},[t("PermissionCheckedList",{attrs:{group_checked:e.group_permission_checked},model:{value:e.update_data["user_permissions"],callback:function(t){e.$set(e.update_data,"user_permissions",t)},expression:"update_data['user_permissions']"}})],1),t(l.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[t(m.A,{staticClass:"font-weight-bold white--text",attrs:{color:"primary darken-2",type:"submit",width:"150",height:"50"}},[e._v(" 儲存 ")])],1)],1)],1)},Ce=[],ye={name:"UpdateUserForm",components:{PermissionCheckedList:q.A,GroupCheckedList:ce},props:["id"],data(){return{password_show:!1,confirm_password:null,confirm_password_show:!1,loading:!0,update_data:{},updateFormValid:!1,group_permission_checked:[],rules:u.aO,gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},watch:{id:{immediate:!0,handler(e){e&&this.fetchData()}}},async mounted(){},methods:{async fetchData(){try{const e=await c.DL.get_by_id(this.id);if(200===e.status){const t=e.data;this.update_data={username:t["username"],email:t["email"],firstname:t["firstname"],lastname:t["lastname"],phone_number:t["phone_number"],gender:t["gender"],is_active:t["is_active"],user_permissions:t["user_permissions"].map((e=>e.id)),groups:t["groups"].map((e=>e.id))},this.group_permission_checked=t.groups.flatMap((e=>e.permissions))}}catch(e){console.error(e)}finally{this.loading=!1}},async update(){if(this.$refs.form.validate(),this.updateFormValid)try{const e=new FormData;for(const[a,s]of Object.entries(this.update_data))null!==s&&void 0!==s&&e.append(a,s);const t=await c.DL.update(this.id,e);200===t.status?(this.$swal.fire("儲存成功","","success"),this.$emit("refresh")):this.$swal.fire("儲存失敗","","error")}catch(e){console.error(e)}else this.$swal.fire("請確實填寫內容","","error")}}},Ae=ye,ke=(0,ee.A)(Ae,we,Ce,!1,null,"2ae2c50f",null),Se=ke.exports,$e={components:{CustomDataTable:p.A,CustomDialog:h.A,CreateUserForm:me,ReadUserForm:xe,UpdateUserForm:Se},data(){return{dialog:!1,loading:!0,items:[],itemsLength:0,disabled_select:["username"],options:{page:1,itemsPerPage:30,sortBy:["date_joined"],sortDesc:[!0]},headers:[{text:"帳號",value:"username",sortable:!0},{text:"姓名",value:"fullname",sortable:!0},{text:"操作",value:"actions",sortable:!1},{text:"信箱",value:"email",sortable:!0},{text:"性別",value:"gender",sortable:!0},{text:"系統角色",value:"groups",sortable:!0},{text:"啟動狀態",value:"is_active",sortable:!0},{text:"註冊時間",value:"date_joined",sortable:!0},{text:"最後登入時間",value:"last_login",sortable:!0}],create_dialog:!1,read_dialog:!1,update_dialog:!1,read_id:null,update_id:null}},computed:{},async mounted(){await this.fetchData()},methods:{async fetchData(){this.loading=!0;try{const e=(0,u.UH)(this.options),t=await c.DL.get_all(e);if(200===t.status){const{data:e,count:a}=t.data;this.items=e,this.itemsLength=a}}catch(e){console.error(e)}finally{this.loading=!1}},get_gender_style(e,t="color"){const a={male:{color:"indigo",icon:"mdi-face-man"},female:{color:"pink",icon:"mdi-face-woman"},other:{color:"blue-grey darken-2",icon:"mdi-gender-non-binary"},private:{color:"grey darken-2",icon:"mdi-crosshairs-question"}};return a[e][t]},get_is_active_style(e,t="text"){const a={true:{color:"green",bg_color:"success lighten-5",text:"啟用"},false:{color:"red",bg_color:"error lighten-5",text:"停用"}};return a[e][t]},emitUpdateOptions(e){this.options=e,this.fetchData()},async refreshData(){await this.fetchData(),this.create_dialog=!1,this.update_dialog=!1},emitCreate(){this.create_dialog=!0},emitRead(e){this.read_id=e,this.read_dialog=!0},emitUpdate(e){this.update_id=e,this.update_dialog=!0},async emitDelete(e){const t=await(0,u.d4)();if(t.isConfirmed){const t=await(0,u.JV)();if(t)try{const t=await c.DL.delete(e);204===t.status&&(this.$swal.fire("刪除成功","","success"),await this.fetchData())}catch(a){console.log(a)}}}}},De=$e,Le=(0,ee.A)(De,n,d,!1,null,"6e1459de",null),Re=Le.exports},3e3:function(e,t,a){a.d(t,{A:function(){return d}});a(5601);var s=a(8944),l=a(6993),i=a(2699),o=a(5961),r=a(1554),n=a(4152),d=s.A.extend({name:"v-switch",directives:{Touch:i.A},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes(){return{...l.A.options.computed.classes.call(this),"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset}},attrs(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot(){return[this.genSwitch(),this.genLabel()]},genSwitch(){const{title:e,...t}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs,...t}),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",{staticClass:"v-input--switch__track",...this.switchData}),this.$createElement("div",{staticClass:"v-input--switch__thumb",...this.switchData},[this.genProgress()])])},genProgress(){return this.$createElement(o.Z,{},[!1===this.loading?null:(0,n.$c)(this,"progress")||this.$createElement(r.A,{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft(){this.isActive&&this.onChange()},onSwipeRight(){this.isActive||this.onChange()},onKeydown(e){(e.keyCode===n.uP.left&&this.isActive||e.keyCode===n.uP.right&&!this.isActive)&&this.onChange()}}})}}]);
//# sourceMappingURL=718.3bc4a56a.js.map