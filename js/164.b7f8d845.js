"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[164],{8164:function(t,e,a){a.r(e),a.d(e,{default:function(){return st}});var s=a(3180),l=a(4414),i=a(3449),o=a(6930),r=a(2756),n=function(){var t=this,e=t._self._c;return e(i.A,{attrs:{fluid:""}},[e(r.A,[e(l.A,{attrs:{cols:"12"}},[e("CustomDataTable",{attrs:{items:t.items,itemsLength:t.itemsLength,options:t.options,headers:t.headers,height:"100%",loading:t.loading,disabled_select:t.disabled_select,"fixed-header":!1,"show-expand":""},on:{emitUpdateOptions:t.emitUpdateOptions,create:t.emitCreate,read:t.emitRead,update:t.emitUpdate,delete:t.emitDelete},scopedSlots:t._u([{key:"item.age",fn:function({item:a}){return[e("td",[a["age"]?[t._v(t._s(a["age"])+"歲")]:[t._v("未提供")]],2)]}},{key:"item.gender",fn:function({item:a}){return[e("td",[e(o.A,{attrs:{color:t.get_gender_style(a["gender"],"color")}},[t._v(" "+t._s(t.get_gender_style(a["gender"],"icon"))+" ")]),t._v(" "+t._s(a["gender_display"])+" ")],1)]}},{key:"item.is_active",fn:function({item:a}){return[e("td",[e(s.A,{staticClass:"elevation-4 black--text font-weight-bold",attrs:{label:"",color:t.get_is_active_style(a["is_active"],"bg_color")}},[e(o.A,{attrs:{small:"",left:"",color:t.get_is_active_style(a["is_active"],"color")}},[t._v(" mdi-circle ")]),t._v(" "+t._s(t.get_is_active_style(a["is_active"],"text"))+" ")],1)],1)]}}])})],1)],1),e("CustomDialog",{attrs:{title:"新增角色",color:"pink darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.create_dialog?e("CreateUserForm",{on:{refresh:t.refreshData}}):t._e()]},proxy:!0}]),model:{value:t.create_dialog,callback:function(e){t.create_dialog=e},expression:"create_dialog"}}),e("CustomDialog",{attrs:{title:"瀏覽角色",color:"grey darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.read_dialog?e("ReadUserForm",{attrs:{id:t.read_id}}):t._e()]},proxy:!0}]),model:{value:t.read_dialog,callback:function(e){t.read_dialog=e},expression:"read_dialog"}}),e("CustomDialog",{attrs:{title:"修改角色",color:"primary darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.update_dialog?e("UpdateUserForm",{attrs:{id:t.update_id},on:{refresh:t.refreshData}}):t._e()]},proxy:!0}]),model:{value:t.update_dialog,callback:function(e){t.update_dialog=e},expression:"update_dialog"}})],1)},d=[],c=a(1822),u=a(6989),h=a(5153),p=a(7220),m=a(3740),f=a(174),_=a(6355),g=a(569),b=a(6993),v=a(7717),x=a(8743),w=a(7515),C=a(7018),y=a(3381),A=a(8944),k=a(4152),$=a(5803),D=a(8041);const S=(0,$.A)(v.A,x.A,C.A,(0,w.P)("radioGroup"),y.A);var R=S.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:{type:Boolean,default:null},id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:{type:Boolean,default:null},value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){if(!this.isDisabled)return A.A.options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return b.A.options.computed.computedId.call(this)},hasLabel:b.A.options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){var t;return null!==(t=this.disabled)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){var t;return null!==(t=this.readonly)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||`radio-${this.radioGroup._uid}`},rippleState(){return A.A.options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(t){return A.A.options.methods.genInput.call(this,"radio",t)},genLabel(){return this.hasLabel?this.$createElement(_.A,{on:{click:A.F},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},(0,k.$c)(this,"label")||this.label):null},genRadio(){const{title:t,...e}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(g.A,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...e}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(t){const e={staticClass:"v-radio",class:this.classes,on:(0,D.wf)({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return t("div",e,[this.genRadio(),this.genLabel()])}}),F=(a(5601),a(48));const L=(0,$.A)(F.C,b.A);var U=L.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...b.A.options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},b.A.options.methods.genDefaultSlot.call(this))},genInputSlot(){const t=b.A.options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel(){const t=b.A.options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:F.C.options.methods.onClick},render(t){const e=b.A.options.render.call(this,t);return this._b(e.data,"div",this.attrs$),e}}),I=a(3e3),V=a(7112),q=function(){var t=this,e=t._self._c;return e(f.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.create.apply(null,arguments)}},model:{value:t.createFormValid,callback:function(e){t.createFormValid=e},expression:"createFormValid"}},[e(r.A,{staticClass:"justify-start"},[e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 帳號: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫帳號",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: example"},model:{value:t.create_data["username"],callback:function(e){t.$set(t.create_data,"username",e)},expression:"create_data['username']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 信箱: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫信箱",rules:[t.rules["requiredRules"],t.rules["emailRules"]],placeholder:"填寫範例: example@gmail.com"},model:{value:t.create_data["email"],callback:function(e){t.$set(t.create_data,"email",e)},expression:"create_data['email']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 密碼: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"append-icon":t.password_show?"mdi-eye":"mdi-eye-off",rules:[t.rules["requiredRules"],t.rules["passwordRules"]],type:t.password_show?"text":"password",label:"請填寫密碼",counter:"",outlined:""},on:{"click:append":function(e){t.password_show=!t.password_show}},model:{value:t.create_data["password"],callback:function(e){t.$set(t.create_data,"password",e)},expression:"create_data['password']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 確認密碼: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"append-icon":t.confirm_password_show?"mdi-eye":"mdi-eye-off",rules:[t.rules["requiredRules"],t.rules.confirmPasswordRules(t.create_data["password"])],type:t.confirm_password_show?"text":"password",label:"請填寫確認密碼",counter:"",outlined:""},on:{"click:append":function(e){t.confirm_password_show=!t.confirm_password_show}},model:{value:t.confirm_password,callback:function(e){t.confirm_password=e},expression:"confirm_password"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 姓氏: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫姓氏",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 林"},model:{value:t.create_data["lastname"],callback:function(e){t.$set(t.create_data,"lastname",e)},expression:"create_data['lastname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 名字: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名字",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 大明"},model:{value:t.create_data["firstname"],callback:function(e){t.$set(t.create_data,"firstname",e)},expression:"create_data['firstname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 手機號碼: "),e("strong",{staticClass:"blue--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (非必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫手機號碼",rules:[t.rules["phoneRules"]],placeholder:"填寫範例: 0912345678"},model:{value:t.create_data["phone_number"],callback:function(e){t.$set(t.create_data,"phone_number",e)},expression:"create_data['phone_number']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 性別: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(U,{attrs:{row:"",rules:[t.rules["requiredRules"]]},model:{value:t.create_data["gender"],callback:function(e){t.$set(t.create_data,"gender",e)},expression:"create_data['gender']"}},t._l(t.gender_select_list,(function(t){return e(R,{key:t["value"],attrs:{label:t["label"],value:t["value"]}})})),1)],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 啟用狀態: ")]),e(I.A,{attrs:{inset:""},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",[t._v(t._s(t.create_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:t.create_data["is_active"],callback:function(e){t.$set(t.create_data,"is_active",e)},expression:"create_data['is_active']"}})],1),e(l.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[e(m.A,{staticClass:"font-weight-bold white--text",attrs:{color:"pink darken-2",type:"submit",width:"150",height:"50"}},[t._v(" 創建 ")])],1)],1)],1)},G=[],E={name:"CreateUserForm",components:{},data(){return{password_show:!1,confirm_password:null,confirm_password_show:!1,create_data:{username:null,email:null,password:null,firstname:null,lastname:null,phone_number:null,gender:"private",is_active:!0},createFormValid:!1,rules:u.aO,gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},async mounted(){},methods:{async create(){if(this.$refs.form.validate(),this.createFormValid)try{const t=new FormData;for(const[a,s]of Object.entries(this.create_data))null!==s&&void 0!==s&&t.append(a,s);const e=await c.DL.create(t);201===e.status?(this.$swal.fire("創建成功","","success"),this.$emit("refresh")):this.$swal.fire("創建失敗","","error")}catch(t){console.error(t)}else this.$swal.fire("請確實填寫內容","","error")}}},j=E,B=a(1656),O=(0,B.A)(j,q,G,!1,null,"48f74d71",null),P=O.exports,T=function(){var t=this,e=t._self._c;return e(f.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.read.apply(null,arguments)}},model:{value:t.readFormValid,callback:function(e){t.readFormValid=e},expression:"readFormValid"}},[e(r.A,{staticClass:"justify-start"},[e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 帳號: ")]),e(V.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫帳號",placeholder:"填寫範例: example"},model:{value:t.read_data["username"],callback:function(e){t.$set(t.read_data,"username",e)},expression:"read_data['username']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 信箱: ")]),e(V.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫信箱",placeholder:"填寫範例: example@gmail.com"},model:{value:t.read_data["email"],callback:function(e){t.$set(t.read_data,"email",e)},expression:"read_data['email']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 姓氏: ")]),e(V.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫姓氏",placeholder:"填寫範例: 林"},model:{value:t.read_data["lastname"],callback:function(e){t.$set(t.read_data,"lastname",e)},expression:"read_data['lastname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 名字: ")]),e(V.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫名字",placeholder:"填寫範例: 大明"},model:{value:t.read_data["firstname"],callback:function(e){t.$set(t.read_data,"firstname",e)},expression:"read_data['firstname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 手機號碼: ")]),e(V.A,{attrs:{readonly:"","background-color":"white",outlined:"",label:"請填寫手機號碼",placeholder:"填寫範例: 0912345678"},model:{value:t.read_data["phone_number"],callback:function(e){t.$set(t.read_data,"phone_number",e)},expression:"read_data['phone_number']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 性別: ")]),e(U,{attrs:{readonly:"",row:""},model:{value:t.read_data["gender"],callback:function(e){t.$set(t.read_data,"gender",e)},expression:"read_data['gender']"}},t._l(t.gender_select_list,(function(t){return e(R,{key:t["value"],attrs:{label:t["label"],value:t["value"]}})})),1)],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 啟用狀態: ")]),e(I.A,{attrs:{readonly:"",inset:""},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",[t._v(t._s(t.read_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:t.read_data["is_active"],callback:function(e){t.$set(t.read_data,"is_active",e)},expression:"read_data['is_active']"}})],1)],1)],1)},N=[],K={name:"UpdateUserForm",components:{},props:["id"],data(){return{loading:!0,read_data:{},gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},watch:{id:{immediate:!0,handler(t){t&&this.fetchData()}}},async mounted(){},methods:{async fetchData(){try{const t=await c.DL.get_by_id(this.id);if(200===t.status){const e=t.data;this.read_data={username:e["username"],email:e["email"],firstname:e["firstname"],lastname:e["lastname"],phone_number:e["phone_number"],gender:e["gender"],is_active:e["is_active"]}}}catch(t){console.error(t)}finally{this.loading=!1}}}},z=K,H=(0,B.A)(z,T,N,!1,null,"00479086",null),J=H.exports,Z=function(){var t=this,e=t._self._c;return e(f.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.update.apply(null,arguments)}},model:{value:t.updateFormValid,callback:function(e){t.updateFormValid=e},expression:"updateFormValid"}},[e(r.A,{staticClass:"justify-start"},[e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 帳號: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫帳號",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: example"},model:{value:t.update_data["username"],callback:function(e){t.$set(t.update_data,"username",e)},expression:"update_data['username']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 信箱: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫信箱",rules:[t.rules["requiredRules"],t.rules["emailRules"]],placeholder:"填寫範例: example@gmail.com"},model:{value:t.update_data["email"],callback:function(e){t.$set(t.update_data,"email",e)},expression:"update_data['email']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 姓氏: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫姓氏",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 林"},model:{value:t.update_data["lastname"],callback:function(e){t.$set(t.update_data,"lastname",e)},expression:"update_data['lastname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"3"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 名字: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名字",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 大明"},model:{value:t.update_data["firstname"],callback:function(e){t.$set(t.update_data,"firstname",e)},expression:"update_data['firstname']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"4",lg:"4"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 手機號碼: "),e("strong",{staticClass:"blue--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (非必填) ")])]),e(V.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫手機號碼",rules:[t.rules["phoneRules"]],placeholder:"填寫範例: 0912345678"},model:{value:t.update_data["phone_number"],callback:function(e){t.$set(t.update_data,"phone_number",e)},expression:"update_data['phone_number']"}})],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 性別: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(U,{attrs:{row:"",rules:[t.rules["requiredRules"]]},model:{value:t.update_data["gender"],callback:function(e){t.$set(t.update_data,"gender",e)},expression:"update_data['gender']"}},t._l(t.gender_select_list,(function(t){return e(R,{key:t["value"],attrs:{label:t["label"],value:t["value"]}})})),1)],1),e(l.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 啟用狀態: ")]),e(I.A,{attrs:{inset:""},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",[t._v(t._s(t.update_data["is_active"]?"啟用":"停用"))])]},proxy:!0}]),model:{value:t.update_data["is_active"],callback:function(e){t.$set(t.update_data,"is_active",e)},expression:"update_data['is_active']"}})],1),e(l.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[e(m.A,{staticClass:"font-weight-bold white--text",attrs:{color:"primary darken-2",type:"submit",width:"150",height:"50"}},[t._v(" 儲存 ")])],1)],1)],1)},M=[],Q={name:"UpdateUserForm",components:{},props:["id"],data(){return{password_show:!1,confirm_password:null,confirm_password_show:!1,loading:!0,update_data:{},updateFormValid:!1,rules:u.aO,gender_select_list:[{label:"男",value:"male"},{label:"女",value:"female"},{label:"其他",value:"other"},{label:"不公開",value:"private"}]}},computed:{},watch:{id:{immediate:!0,handler(t){t&&this.fetchData()}}},async mounted(){},methods:{async fetchData(){try{const t=await c.DL.get_by_id(this.id);if(200===t.status){const e=t.data;this.update_data={username:e["username"],email:e["email"],firstname:e["firstname"],lastname:e["lastname"],phone_number:e["phone_number"],gender:e["gender"],is_active:e["is_active"]}}}catch(t){console.error(t)}finally{this.loading=!1}},async update(){if(this.$refs.form.validate(),this.updateFormValid)try{const t=new FormData;for(const[a,s]of Object.entries(this.update_data))null!==s&&void 0!==s&&t.append(a,s);const e=await c.DL.update(this.id,t);200===e.status?(this.$swal.fire("儲存成功","","success"),this.$emit("refresh")):this.$swal.fire("儲存失敗","","error")}catch(t){console.error(t)}else this.$swal.fire("請確實填寫內容","","error")}}},W=Q,X=(0,B.A)(W,Z,M,!1,null,"1a49f18d",null),Y=X.exports,tt={components:{CustomDataTable:h.A,CustomDialog:p.A,CreateUserForm:P,ReadUserForm:J,UpdateUserForm:Y},data(){return{dialog:!1,loading:!0,items:[],itemsLength:0,disabled_select:["username"],options:{page:1,itemsPerPage:30,sortBy:["id"],sortDesc:[!1]},headers:[{text:"帳號",value:"username",sortable:!0},{text:"姓名",value:"fullname",sortable:!0},{text:"操作",value:"actions",sortable:!1},{text:"信箱",value:"email",sortable:!0},{text:"年齡",value:"age",sortable:!0},{text:"性別",value:"gender",sortable:!0},{text:"啟動狀態",value:"is_active",sortable:!0},{text:"最後登入時間",value:"last_login",sortable:!0}],create_dialog:!1,read_dialog:!1,update_dialog:!1,read_id:null,update_id:null}},computed:{},async mounted(){await this.fetchData()},methods:{async fetchData(){this.loading=!0;try{const t=(0,u.UH)(this.options),e=await c.DL.get_all(t);if(200===e.status){const{data:t,count:a}=e.data;this.items=t,this.itemsLength=a}}catch(t){console.error(t)}finally{this.loading=!1}},get_gender_style(t,e="color"){const a={male:{color:"indigo",icon:"mdi-face-man"},female:{color:"pink",icon:"mdi-face-woman"},other:{color:"blue-grey darken-2",icon:"mdi-gender-non-binary"},private:{color:"grey darken-2",icon:"mdi-crosshairs-question"}};return a[t][e]},get_is_active_style(t,e="text"){const a={true:{color:"green",bg_color:"success lighten-5",text:"啟用"},false:{color:"red",bg_color:"error lighten-5",text:"停用"}};return a[t][e]},emitUpdateOptions(t){this.options=t,this.fetchData()},async refreshData(){await this.fetchData(),this.create_dialog=!1,this.update_dialog=!1},emitCreate(){this.create_dialog=!0},emitRead(t){this.read_id=t,this.read_dialog=!0},emitUpdate(t){this.update_id=t,this.update_dialog=!0},async emitDelete(t){const e=await(0,u.d4)();if(e.isConfirmed){const e=await(0,u.JV)();if(e)try{const e=await c.DL.delete(t);204===e.status&&(this.$swal.fire("刪除成功","","success"),await this.fetchData())}catch(a){this.$swal.fire("刪除失敗",a,"error")}}}}},et=tt,at=(0,B.A)(et,n,d,!1,null,"239b0b82",null),st=at.exports},3e3:function(t,e,a){a.d(e,{A:function(){return d}});a(5601);var s=a(8944),l=a(6993),i=a(2699),o=a(5961),r=a(1554),n=a(4152),d=s.A.extend({name:"v-switch",directives:{Touch:i.A},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes(){return{...l.A.options.computed.classes.call(this),"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset}},attrs(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot(){return[this.genSwitch(),this.genLabel()]},genSwitch(){const{title:t,...e}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs,...e}),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",{staticClass:"v-input--switch__track",...this.switchData}),this.$createElement("div",{staticClass:"v-input--switch__thumb",...this.switchData},[this.genProgress()])])},genProgress(){return this.$createElement(o.Z,{},[!1===this.loading?null:(0,n.$c)(this,"progress")||this.$createElement(r.A,{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft(){this.isActive&&this.onChange()},onSwipeRight(){this.isActive||this.onChange()},onKeydown(t){(t.keyCode===n.uP.left&&this.isActive||t.keyCode===n.uP.right&&!this.isActive)&&this.onChange()}}})}}]);
//# sourceMappingURL=164.b7f8d845.js.map