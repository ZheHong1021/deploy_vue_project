"use strict";(self["webpackChunkdeploy_vue_project"]=self["webpackChunkdeploy_vue_project"]||[]).push([[918],{7918:function(e,s,a){a.r(s),a.d(s,{default:function(){return w}});var r=a(7314),l=a(1484),t=a(2938),n=a(3449),o=a(174),i=(a(158),a(4152)),u=(0,i.Gn)("spacer","div","v-spacer"),c=a(8399),d=function(){var e=this,s=e._self._c;return s(n.A,{staticClass:"d-flex justify-center align-center login-container",attrs:{"fill-height":""}},[s(l.A,{staticClass:"pa-5",attrs:{"max-width":"400"}},[s(t.ri,{staticClass:"text-h5"},[e._v("Login")]),s(t.OQ,[s(o.A,{ref:"form",model:{value:e.valid,callback:function(s){e.valid=s},expression:"valid"}},[s(c.A,{attrs:{rules:e.usernameRules,label:"Username",required:""},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}}),s(c.A,{attrs:{rules:e.passwordRules,label:"Password",type:"password",required:""},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}})],1)],1),s(t.SL,[s(u),s(r.A,{attrs:{color:"primary"},on:{click:e.login}},[e._v("Login")])],1)],1)],1)},p=[],m={data(){return{valid:!1,username:"",password:"",usernameRules:[e=>!!e||"Username is required",e=>e.length>=3||"Username must be at least 3 characters"],passwordRules:[e=>!!e||"Password is required",e=>e.length>=6||"Password must be at least 6 characters"]}},methods:{login(){this.$refs.form.validate()&&(console.log("Username:",this.username),console.log("Password:",this.password))}}},f=m,h=a(1656),v=(0,h.A)(f,d,p,!1,null,"e6b47e34",null),w=v.exports}}]);
//# sourceMappingURL=918.af2e3593.js.map