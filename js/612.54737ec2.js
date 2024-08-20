"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[612],{3612:function(t,e,a){a.r(e),a.d(e,{default:function(){return q}});var s=a(4414),l=a(3449),r=a(2756),i=function(){var t=this,e=t._self._c;return e(l.A,{attrs:{fluid:""}},[e(r.A,[e(s.A,{attrs:{cols:"12"}},[e("CustomDataTable",{attrs:{items:t.items,itemsLength:t.itemsLength,options:t.options,headers:t.headers,height:"100%",loading:t.loading,disabled_select:t.disabled_select,"fixed-header":!1,"show-expand":""},on:{emitUpdateOptions:t.emitUpdateOptions,create:t.emitCreate,read:t.emitRead,update:t.emitUpdate,delete:t.emitDelete}})],1)],1),e("CustomDialog",{attrs:{title:"新增角色",color:"pink darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.create_dialog?e("CreateGroupForm",{on:{refresh:t.refreshData}}):t._e()]},proxy:!0}]),model:{value:t.create_dialog,callback:function(e){t.create_dialog=e},expression:"create_dialog"}}),e("CustomDialog",{attrs:{title:"瀏覽角色",color:"grey darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.read_dialog?e("ReadGroupForm",{attrs:{id:t.read_id}}):t._e()]},proxy:!0}]),model:{value:t.read_dialog,callback:function(e){t.read_dialog=e},expression:"read_dialog"}}),e("CustomDialog",{attrs:{title:"修改角色",color:"primary darken-2"},scopedSlots:t._u([{key:"body",fn:function(){return[t.update_dialog?e("UpdateGroupForm",{attrs:{id:t.update_id},on:{refresh:t.refreshData}}):t._e()]},proxy:!0}]),model:{value:t.update_dialog,callback:function(e){t.update_dialog=e},expression:"update_dialog"}})],1)},o=[],d=a(9534),n=a(6989),c=a(6340),u=a(1897),h=a(3740),m=a(174),p=a(7112),f=function(){var t=this,e=t._self._c;return e(m.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.create.apply(null,arguments)}},model:{value:t.createFormValid,callback:function(e){t.createFormValid=e},expression:"createFormValid"}},[e(r.A,{staticClass:"justify-start"},[e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色代號: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫角色代號",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: role"},model:{value:t.create_data["name"],callback:function(e){t.$set(t.create_data,"name",e)},expression:"create_data['name']"}})],1),e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色名稱: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫角色名稱",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 角色"},model:{value:t.create_data["name_zh"],callback:function(e){t.$set(t.create_data,"name_zh",e)},expression:"create_data['name_zh']"}})],1),e(s.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[e(h.A,{staticClass:"font-weight-bold white--text",attrs:{color:"pink darken-2",type:"submit",width:"150",height:"50"}},[t._v(" 創建 ")])],1)],1)],1)},_=[],g={name:"CreateGroupForm",components:{},data(){return{create_data:{name:null,name_zh:null},createFormValid:!1,rules:n.aO}},computed:{},async mounted(){},methods:{async create(){if(this.$refs.form.validate(),this.createFormValid)try{const t=new FormData;for(const[a,s]of Object.entries(this.create_data))null!==s&&void 0!==s&&t.append(a,s);const e=await d.GS.create(t);201===e.status?(this.$swal.fire("創建成功","","success"),this.$emit("refresh")):this.$swal.fire("創建失敗","","error")}catch(t){console.error(t)}else this.$swal.fire("請確實填寫內容","","error")}}},b=g,x=a(1656),w=(0,x.A)(b,f,_,!1,null,"23dad47b",null),v=w.exports,y=function(){var t=this,e=t._self._c;return e(r.A,{staticClass:"justify-start"},[e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色代號: ")]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫代號",readonly:"",placeholder:"填寫範例: role"},model:{value:t.read_data["name"],callback:function(e){t.$set(t.read_data,"name",e)},expression:"read_data['name']"}})],1),e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色名稱: ")]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名稱",readonly:"",placeholder:"填寫範例: 角色"},model:{value:t.read_data["name_zh"],callback:function(e){t.$set(t.read_data,"name_zh",e)},expression:"read_data['name_zh']"}})],1)],1)},C=[],k={name:"ReadGroupForm",components:{},props:["id"],data(){return{loading:!0,read_data:{name:null,name_zh:null}}},watch:{id:{immediate:!0,handler(t){t&&this.fetchData()}}},methods:{async fetchData(){try{const t=await d.GS.get_by_id(this.id);if(200===t.status){const e=t.data;this.read_data={name:e["name"],name_zh:e["name_zh"]}}}catch(t){console.error(t)}finally{this.loading=!1}}}},A=k,D=(0,x.A)(A,y,C,!1,null,"1deb0d34",null),F=D.exports,$=function(){var t=this,e=t._self._c;return e(m.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.update.apply(null,arguments)}},model:{value:t.updateFormValid,callback:function(e){t.updateFormValid=e},expression:"updateFormValid"}},[e(r.A,{staticClass:"justify-start"},[e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色代號: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫代號",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: teacher"},model:{value:t.update_data["name"],callback:function(e){t.$set(t.update_data,"name",e)},expression:"update_data['name']"}})],1),e(s.A,{staticClass:"d-flex flex-column gap-2",attrs:{cols:"12",md:"6"}},[e("div",{staticClass:"label-container font-weight-bold text-subtitle-1"},[t._v(" 角色名稱: "),e("strong",{staticClass:"red--text font-weight-bold text-caption text-left text-sm-right"},[t._v(" (*必填) ")])]),e(p.A,{attrs:{"background-color":"white",outlined:"",label:"請填寫名稱",rules:[t.rules["requiredRules"]],placeholder:"填寫範例: 老師"},model:{value:t.update_data["name_zh"],callback:function(e){t.$set(t.update_data,"name_zh",e)},expression:"update_data['name_zh']"}})],1),e(s.A,{staticClass:"d-flex align-center justify-center gap-4",attrs:{cols:"12"}},[e(h.A,{staticClass:"font-weight-bold white--text",attrs:{color:"primary darken-2",type:"submit",width:"150",height:"50"}},[t._v(" 儲存 ")])],1)],1)],1)},z=[],G={name:"UpdateGroupForm",components:{},props:["id"],data(){return{loading:!0,update_data:{},updateFormValid:!1,rules:n.aO}},watch:{id:{immediate:!0,handler(t){t&&this.fetchData()}}},methods:{async fetchData(){try{const t=await d.GS.get_by_id(this.id);if(200===t.status){const e=t.data;this.update_data={name:e["name"],name_zh:e["name_zh"]}}}catch(t){console.error(t)}finally{this.loading=!1}},async update(){if(this.$refs.form.validate(),this.updateFormValid)try{const t=new FormData;for(const[a,s]of Object.entries(this.update_data))null!==s&&void 0!==s&&t.append(a,s);const e=await d.GS.update(this.id,t);200===e.status?(this.$swal.fire("儲存成功","","success"),this.$emit("refresh")):this.$swal.fire("儲存失敗","","error")}catch(t){console.error(t)}else this.$swal.fire("請確實填寫內容","","error")}}},V=G,j=(0,x.A)(V,$,z,!1,null,"3ac863da",null),R=j.exports,U={components:{CustomDataTable:c.A,CustomDialog:u.A,CreateGroupForm:v,ReadGroupForm:F,UpdateGroupForm:R},data(){return{dialog:!1,loading:!0,items:[],itemsLength:0,disabled_select:["title"],options:{page:1,itemsPerPage:30,sortBy:["id"],sortDesc:[!1]},headers:[{text:"id",value:"id",sortable:!0},{text:"操作",value:"actions",sortable:!0},{text:"角色名稱",value:"name_zh",sortable:!0},{text:"角色代號",value:"name",sortable:!0}],create_dialog:!1,read_dialog:!1,update_dialog:!1,read_id:null,update_id:null}},computed:{},async mounted(){await this.fetchData()},methods:{async fetchData(){this.loading=!0;try{const t=(0,n.UH)(this.options),e=await d.Bd.get_all_group_with_profiles(t);if(200===e.status){const{data:t,count:a}=e.data;this.items=t,this.itemsLength=a}}catch(t){console.error(t)}finally{this.loading=!1}},emitUpdateOptions(t){this.options=t,this.fetchData()},async refreshData(){await this.fetchData(),this.create_dialog=!1,this.update_dialog=!1},emitCreate(){this.create_dialog=!0},emitRead(t){this.read_id=t,this.read_dialog=!0},emitUpdate(t){this.update_id=t,this.update_dialog=!0},async emitDelete(t){const e=await(0,n.d4)();if(e.isConfirmed){const e=await(0,n.JV)();if(e)try{const e=await d.GS.delete(t);204===e.status&&(this.$swal.fire("刪除成功","","success"),await this.fetchData())}catch(a){this.$swal.fire("刪除失敗",a,"error")}}}}},S=U,O=(0,x.A)(S,i,o,!1,null,"26237264",null),q=O.exports}}]);
//# sourceMappingURL=612.54737ec2.js.map