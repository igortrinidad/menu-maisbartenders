webpackJsonp([3],{212:function(t,o,s){s(469);var e=s(1)(s(459),s(480),"data-v-6c525212",null);t.exports=e.exports},459:function(t,o,s){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=s(3),a=s.n(e),i=s(2);s(28),s(16);o.default={name:"login",data:function(){return{interactions:{showEmailLogin:!1},email:null,password:null}},computed:a()({},s.i(i.a)(["currentUser","isLogged"])),mounted:function(){},methods:a()({},s.i(i.c)(["authSetToken","authSetUser"]),{login:function(){this.$auth.login({url:"guest/auth/login",fetchUser:!0,params:{email:this.email,password:this.password},rememberMe:this.rememberMe,redirect:"/",success:function(t){this.authSetToken(t.data.access_token),this.authSetUser(t.data.user),successNotify("","Login efetuado com sucesso.")},error:function(t){errorNotify("Ops!","Erro ao efetuar login.")}})},socialLogin:function(t){localStorage.setItem("role","guest"),localStorage.setItem("provider",t),this.$auth.oauth2({provider:t})}})}},463:function(t,o,s){o=t.exports=s(450)(),o.push([t.i,".text-selected[data-v-6c525212]{background-color:#fed136;font-size:22px}#contact[data-v-6c525212]{background-color:#f7f7f7}","",{version:3,sources:["/Users/igortrindade/Code/menu-maisbartenders/src/modules/landing/auth/components/login.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B",file:"login.vue",sourcesContent:["\n.text-selected[data-v-6c525212]{\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-6c525212]{\n    background-color: #F7F7F7;\n}\n"],sourceRoot:""}])},469:function(t,o,s){var e=s(463);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);s(451)("b2a7f3d8",e,!0)},480:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",[t.$auth.ready()?s("section",{attrs:{id:"login"}},[s("div",{staticClass:"container"},[t._m(0),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block facebook",on:{click:function(o){t.socialLogin("facebook")}}},[s("i",{staticClass:"fa fa-facebook fa-lg button-icon"}),t._v(" Login com Facebook\n                     ")])])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block google",on:{click:function(o){t.socialLogin("google")}}},[s("i",{staticClass:"fa fa-google fa-lg button-icon"}),t._v(" Login com Google\n                     ")])])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block",on:{click:function(o){t.interactions.showEmailLogin=!0}}},[s("i",{staticClass:"fa fa-email fa-lg button-icon"}),t._v(" Login com Email\n                     ")])])])]),t._v(" "),t.interactions.showEmailLogin?s("div",{staticClass:"row m-t-20",on:{keydown:function(o){if(!("button"in o)&&t._k(o.keyCode,"enter",13))return null;t.login(o)}}},[s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",domProps:{value:t.email},on:{input:function(o){o.target.composing||(t.email=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Senha")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(o){o.target.composing||(t.password=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-xl btn-primary",on:{click:function(o){o.preventDefault(),t.login(o)}}},[t._v("Login")])])])]):t._e()])]):t._e()])},staticRenderFns:[function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"row m-b-30"},[s("div",{staticClass:"col-lg-12"},[s("h2",{staticClass:"section-heading"},[t._v("Login")]),t._v(" "),s("h4",{staticClass:"text-muted m-t-30"},[t._v("Salve e compartilhe com os amigos seus drinks preferidos.")])])])}]}}});
//# sourceMappingURL=3.94c9b81f345be89a8eb9.js.map