webpackJsonp([2],{223:function(e,t,i){i(528);var a=i(1)(i(518),i(535),"data-v-2b7924fb",null);e.exports=a.exports},518:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(2),s=i.n(a),o=i(3),n=i(10);i.n(n);t.default={name:"login-social",data:function(){return{context:"oauth2 context",code:this.$route.query.code,type:this.$route.params.type,role:null,redirect:"/"}},mounted:function(){if(this.$auth.ready()){this.role=localStorage.getItem("role");var e=localStorage.getItem("redirect");"undefined"!=e&&e?(this.redirect=e,localStorage.removeItem("redirect")):this.redirect="admin"===this.role?"/dashboard":"/",this.$auth.oauth2({code:!0,provider:this.type,params:{code:this.code,user_email:this.currentUser?this.currentUser.email:null,user_id:this.currentUser?this.currentUser.id:null,role:this.role},redirect:this.redirect,success:function(e){this.authSetToken(e.data.access_token),this.authSetUser(e.data.user),localStorage.removeItem("role")},error:function(e){console.log("error "+this.context),this.isLogged&&(this.$swal("Ops!","Não é possivel utilizar esta conta do "+i.i(n.capitalize)(this.type)+", isto pode significar que a conta já esteja em uso no sistema. Desconecte-se e faça login utilizando o "+i.i(n.capitalize)(this.type)+".","error"),this.$router.push({path:"/dashboard/profile"}))}})}},computed:s()({},i.i(o.a)(["currentUser","isLogged"])),methods:s()({},i.i(o.c)(["authSetToken","authSetUser"]))}},522:function(e,t,i){t=e.exports=i(508)(),t.push([e.i,".main[data-v-2b7924fb]{position:absolute;width:300px;height:100px;top:50%;left:50%;margin-top:-50px;margin-left:-150px}.authin-social[data-v-2b7924fb]{font-size:30px}@media(max-width:768px){.authin-social[data-v-2b7924fb]{font-size:20px}}","",{version:3,sources:["/Users/igortrindade/Code/app-maisbartenders/src/modules/landing/auth/components/login_social.vue"],names:[],mappings:"AACA,uBACI,kBAAmB,AACnB,YAAa,AACb,aAAc,AACd,QAAS,AACT,SAAU,AACV,iBAAkB,AAClB,kBAAoB,CACvB,AACD,gCACI,cAAgB,CACnB,AACD,wBACA,gCACQ,cAAgB,CACvB,CACA",file:"login_social.vue",sourcesContent:["\n.main[data-v-2b7924fb] {\n    position: absolute;\n    width: 300px;\n    height: 100px;\n    top: 50%;\n    left: 50%;\n    margin-top: -50px;\n    margin-left: -150px;\n}\n.authin-social[data-v-2b7924fb]{\n    font-size: 30px;\n}\n@media(max-width: 768px){\n.authin-social[data-v-2b7924fb]{\n        font-size: 20px;\n}\n}\n"],sourceRoot:""}])},528:function(e,t,i){var a=i(522);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(509)("08df0a88",a,!0)},535:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container text-center"},[i("div",{staticClass:"main"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12 col-xs-12"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.code&&e.type,expression:"code && type"}]},[i("i",{staticClass:"fa fa-spinner fa-pulse fa-3x fa-fw"}),e._v(" "),i("p",{staticClass:"authin-social"},[e._v("Autenticando com "),i("strong",[e._v(e._s(e.type))]),e._v(".")])])])])])])},staticRenderFns:[]}}});
//# sourceMappingURL=2.16a5c1bc9270814f27e9.js.map