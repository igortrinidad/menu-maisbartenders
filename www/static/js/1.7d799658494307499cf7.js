webpackJsonp([1],{238:function(o,t,e){e(558);var s=e(1)(e(547),e(570),"data-v-8544160c",null);o.exports=s.exports},547:function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e(42),a=e.n(s),n=e(2),i=e.n(n),c=e(3);e(32),e(21);t.default={name:"signup",data:function(){return{interactions:{showEmailLogin:!1},guest:{name:"",last_name:"",email:"",password:"",password_confirmation:"",photo:null}}},computed:i()({},e.i(c.a)(["currentUser","isLogged"])),mounted:function(){window.cordova&&openFB.init({appId:"262783620860879"})},methods:i()({},e.i(c.c)(["authSetToken","authSetUser","setLoading"]),{signup:function(){var o=this,t=new FormData;o.setLoading({is_loading:!0,message:""}),a()(o.guest).map(function(e,s){t.append(e,o.guest[e])}),o.$http.post("/guest/create",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){successNotify("","Cadastro realizado com sucesso, faça o login."),o.$router.push({path:"/login"}),o.setLoading({is_loading:!1,message:""})}).catch(function(t){errorNotify("","Houve um erro ao realizar o cadastro."),o.setLoading({is_loading:!1,message:""})})},loadPhoto:function(o){this.guest.photo=o.target.files[0]},facebookLogin:function(){var o=this;o.setLoading({is_loading:!0,message:""}),window.cordova&&openFB.login(function(t){if("connected"===t.status)o.statusChangeCallback(t);else{alert("Facebook login failed: "+t.error);var e=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",e),window.cordova&&window.cookies.clear()}},{scope:"public_profile,email"}),window.cordova||FB.login(function(t){o.statusChangeCallback(t)},{scope:"public_profile,email,publish_actions"})},statusChangeCallback:function(o){var t=this;"connected"===o.status?t.getUserInfo(o.authResponse.accessToken):errorNotify("","É necessário fazer login para continuar."),t.setLoading({is_loading:!1,message:""})},getUserInfo:function(o){var t=this;window.cordova&&openFB.api({path:"/v2.8/me",params:{access_token:o,fields:"id,name,first_name,last_name,email"},success:function(e){e.photo_url="https://graph.facebook.com/"+e.id+"/picture?type=normal",e.access_token=o,e.role="guest",t.socialLogin(e)},error:t.errorHandler}),window.cordova||FB.api("/me",{fields:"name,first_name, last_name, email"},function(e){e.photo_url="https://graph.facebook.com/"+e.id+"/picture?type=normal",e.access_token=o,e.role="guest",t.socialLogin(e)})},socialLogin:function(o){var t=this;localStorage.setItem("provider","facebook"),t.$http.post("/auth/social",o).then(function(o){t.authSetToken(o.data.access_token),t.authSetUser(o.data.user),successNotify("","Login efetuado com sucesso."),t.setLoading({is_loading:!1,message:""}),t.$router.push(t.$route.query.redirect?t.$route.query.redirect:"/")}).catch(function(o){console.log(o),errorNotify("Ops!","Erro ao efetuar login.");var t=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",t),window.cordova&&window.cookies.clear()})},errorHandler:function(o){that.setLoading({is_loading:!1,message:""}),errorNotify("",o.message),localStorage.clear(),window.cordova&&window.cookies.clear()}})}},552:function(o,t,e){t=o.exports=e(535)(),t.push([o.i,".text-selected[data-v-8544160c]{background-color:#fed136;font-size:22px}#contact[data-v-8544160c]{background-color:#f7f7f7}","",{version:3,sources:["/Users/igortrindade/Code/menu-maisbartenders/src/modules/landing/auth/components/signup.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B",file:"signup.vue",sourcesContent:["\n.text-selected[data-v-8544160c] {\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-8544160c] {\n    background-color: #F7F7F7;\n}\n"],sourceRoot:""}])},558:function(o,t,e){var s=e(552);"string"==typeof s&&(s=[[o.i,s,""]]),s.locals&&(o.exports=s.locals);e(536)("21eae7cc",s,!0)},570:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",[o.$auth.ready()?e("section",{attrs:{id:"login"}},[e("div",{staticClass:"container"},[o._m(0),o._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-info btn-block facebook",on:{click:function(t){o.facebookLogin()}}},[e("i",{staticClass:"fa fa-facebook fa-lg button-icon"}),o._v(" Cadastre-se com Facebook\n                        ")])])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-info btn-block",on:{click:function(t){o.interactions.showEmailLogin=!0}}},[e("i",{staticClass:"fa fa-email fa-lg button-icon"}),o._v(" Cadastre-se com Email\n                        ")])])])]),o._v(" "),o.interactions.showEmailLogin?e("div",{staticClass:"row m-t-20"},[e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Nome")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.name,expression:"guest.name"}],staticClass:"form-control",domProps:{value:o.guest.name},on:{input:function(t){t.target.composing||(o.guest.name=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Sobrenome")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.last_name,expression:"guest.last_name"}],staticClass:"form-control",domProps:{value:o.guest.last_name},on:{input:function(t){t.target.composing||(o.guest.last_name=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Email")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.email,expression:"guest.email"}],staticClass:"form-control",domProps:{value:o.guest.email},on:{input:function(t){t.target.composing||(o.guest.email=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Telefone")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.phone,expression:"guest.phone"}],staticClass:"form-control",domProps:{value:o.guest.phone},on:{input:function(t){t.target.composing||(o.guest.phone=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Senha")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.password,expression:"guest.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:o.guest.password},on:{input:function(t){t.target.composing||(o.guest.password=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Confirmar senha")]),o._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:o.guest.password_confirmation,expression:"guest.password_confirmation"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:o.guest.password_confirmation},on:{input:function(t){t.target.composing||(o.guest.password_confirmation=t.target.value)}}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[o._v("Foto")]),o._v(" "),e("input",{staticClass:"form-control",attrs:{type:"file"},on:{change:o.loadPhoto}})])]),o._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-xl btn-primary",on:{click:function(t){t.preventDefault(),o.signup()}}},[o._v("Cadastrar")])])])]):o._e()])]):o._e()])},staticRenderFns:[function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"row m-b-30"},[e("div",{staticClass:"col-lg-12"},[e("h2",{staticClass:"section-heading"},[o._v("Cadastre-se")]),o._v(" "),e("h4",{staticClass:"text-muted m-t-30"},[o._v("Salve e compartilhe com os amigos seus drinks preferidos.")])])])}]}}});
//# sourceMappingURL=1.7d799658494307499cf7.js.map