webpackJsonp([1],{215:function(t,o,s){s(473);var a=s(1)(s(462),s(485),"data-v-8544160c",null);t.exports=a.exports},462:function(t,o,s){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=s(18),e=s.n(a),n=s(3),i=s.n(n),c=s(2);s(28),s(16);o.default={name:"signup",data:function(){return{interactions:{showEmailLogin:!1},guest:{name:"",last_name:"",email:"",password:"",password_confirmation:"",photo:null}}},computed:i()({},s.i(c.a)(["currentUser","isLogged"])),mounted:function(){},methods:{signup:function(){var t=this,o=new FormData;e()(t.guest).map(function(s,a){o.append(s,t.guest[s])}),t.$http.post("/guest/create",o,{headers:{"Content-Type":"multipart/form-data"}}).then(function(o){successNotify("","Cadastro realizado com sucesso."),t.$router.push({path:"/login"})}).catch(function(t){errorNotify("","Houve um erro ao realizar o cadastro.")})},loadPhoto:function(t){this.guest.photo=t.target.files[0]},socialLogin:function(t){localStorage.setItem("role","guest"),this.$auth.oauth2({provider:t})}}}},467:function(t,o,s){o=t.exports=s(450)(),o.push([t.i,".text-selected[data-v-8544160c]{background-color:#fed136;font-size:22px}#contact[data-v-8544160c]{background-color:#f7f7f7}","",{version:3,sources:["/Users/igortrindade/Code/menu-maisbartenders/src/modules/landing/auth/components/signup.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B",file:"signup.vue",sourcesContent:["\n.text-selected[data-v-8544160c] {\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-8544160c] {\n    background-color: #F7F7F7;\n}\n"],sourceRoot:""}])},473:function(t,o,s){var a=s(467);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(451)("21eae7cc",a,!0)},485:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",[t.$auth.ready()?s("section",{attrs:{id:"login"}},[s("div",{staticClass:"container"},[t._m(0),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block facebook",on:{click:function(o){t.socialLogin("facebook")}}},[s("i",{staticClass:"fa fa-facebook fa-lg button-icon"}),t._v(" Cadastre-se com Facebook\n                        ")])])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block google",on:{click:function(o){t.socialLogin("google")}}},[s("i",{staticClass:"fa fa-google fa-lg button-icon"}),t._v(" Cadastre-se com Google\n                        ")])])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-info btn-block",on:{click:function(o){t.interactions.showEmailLogin=!0}}},[s("i",{staticClass:"fa fa-email fa-lg button-icon"}),t._v(" Cadastre-se com Email\n                        ")])])])]),t._v(" "),t.interactions.showEmailLogin?s("div",{staticClass:"row m-t-20"},[s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Nome")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.name,expression:"guest.name"}],staticClass:"form-control",domProps:{value:t.guest.name},on:{input:function(o){o.target.composing||(t.guest.name=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Sobrenome")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.last_name,expression:"guest.last_name"}],staticClass:"form-control",domProps:{value:t.guest.last_name},on:{input:function(o){o.target.composing||(t.guest.last_name=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.email,expression:"guest.email"}],staticClass:"form-control",domProps:{value:t.guest.email},on:{input:function(o){o.target.composing||(t.guest.email=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Telefone")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.phone,expression:"guest.phone"}],staticClass:"form-control",domProps:{value:t.guest.phone},on:{input:function(o){o.target.composing||(t.guest.phone=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Senha")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password,expression:"guest.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.guest.password},on:{input:function(o){o.target.composing||(t.guest.password=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Confirmar senha")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password_confirmation,expression:"guest.password_confirmation"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.guest.password_confirmation},on:{input:function(o){o.target.composing||(t.guest.password_confirmation=o.target.value)}}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("label",[t._v("Foto")]),t._v(" "),s("input",{staticClass:"form-control",attrs:{type:"file"},on:{change:t.loadPhoto}})])]),t._v(" "),s("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn btn-xl btn-primary",on:{click:function(o){o.preventDefault(),t.signup()}}},[t._v("Cadastrar")])])])]):t._e()])]):t._e()])},staticRenderFns:[function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"row m-b-30"},[s("div",{staticClass:"col-lg-12"},[s("h2",{staticClass:"section-heading"},[t._v("Cadastre-se")]),t._v(" "),s("h4",{staticClass:"text-muted m-t-30"},[t._v("Salve e compartilhe com os amigos seus drinks preferidos.")])])])}]}}});
//# sourceMappingURL=1.45b233d00659b4c1766a.js.map