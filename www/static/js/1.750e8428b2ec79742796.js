webpackJsonp([1],{237:function(t,o,e){e(554);var a=e(1)(e(543),e(566),"data-v-8544160c",null);t.exports=a.exports},543:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=e(43),s=e.n(a),n=e(2),i=e.n(n),r=e(3),c=(e(42),e(5)),l=e.n(c);e(25);o.default={name:"signup",components:{mainHeader:l.a},data:function(){return{interactions:{showEmailLogin:!1},guest:{name:"",last_name:"",email:"",password:"",password_confirmation:"",photo:null}}},computed:i()({},e.i(r.a)(["currentUser","isLogged"])),mounted:function(){window.cordova&&openFB.init({appId:"262783620860879"})},methods:i()({},e.i(r.c)(["authSetToken","authSetUser","setLoading"]),{signup:function(){var t=this,o=new FormData;t.setLoading({is_loading:!0,message:""}),s()(t.guest).map(function(e,a){o.append(e,t.guest[e])}),t.$http.post("/guest/create",o,{headers:{"Content-Type":"multipart/form-data"}}).then(function(o){successNotify("","Cadastro realizado com sucesso, faça o login."),t.$router.push({path:"/login"}),t.setLoading({is_loading:!1,message:""})}).catch(function(o){errorNotify("","Houve um erro ao realizar o cadastro."),t.setLoading({is_loading:!1,message:""})})},loadPhoto:function(t){this.guest.photo=t.target.files[0]},facebookLogin:function(){var t=this;t.setLoading({is_loading:!0,message:""}),window.cordova&&openFB.login(function(o){if("connected"===o.status)t.statusChangeCallback(o);else{alert("Facebook login failed: "+o.error);var e=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",e),window.cordova&&window.cookies.clear()}},{scope:"public_profile,email"}),window.cordova||FB.login(function(o){t.statusChangeCallback(o)},{scope:"public_profile,email,publish_actions"})},statusChangeCallback:function(t){var o=this;"connected"===t.status?o.getUserInfo(t.authResponse.accessToken):errorNotify("","É necessário fazer login para continuar."),o.setLoading({is_loading:!1,message:""})},getUserInfo:function(t){var o=this;window.cordova&&openFB.api({path:"/v2.8/me",params:{access_token:t,fields:"id,name,first_name,last_name,email"},success:function(e){e.photo_url="https://graph.facebook.com/"+e.id+"/picture?type=normal",e.access_token=t,e.role="guest",o.socialLogin(e)},error:o.errorHandler}),window.cordova||FB.api("/me",{fields:"name,first_name, last_name, email"},function(e){e.photo_url="https://graph.facebook.com/"+e.id+"/picture?type=normal",e.access_token=t,e.role="guest",o.socialLogin(e)})},socialLogin:function(t){var o=this;localStorage.setItem("provider","facebook"),o.$http.post("/auth/social",t).then(function(t){o.authSetToken(t.data.access_token),o.authSetUser(t.data.user),successNotify("","Login efetuado com sucesso."),o.setLoading({is_loading:!1,message:""}),o.$router.push(o.$route.query.redirect?o.$route.query.redirect:"/")}).catch(function(t){console.log(t),errorNotify("Ops!","Erro ao efetuar login.");var o=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",o),window.cordova&&window.cookies.clear()})},errorHandler:function(t){that.setLoading({is_loading:!1,message:""}),errorNotify("",t.message),localStorage.clear(),window.cordova&&window.cookies.clear()}})}},548:function(t,o,e){o=t.exports=e(531)(),o.push([t.i,".text-selected[data-v-8544160c]{background-color:#fed136;font-size:22px}#contact[data-v-8544160c]{background-color:#f7f7f7}","",{version:3,sources:["/home/andre/we-planner/menu-maisbartenders/src/modules/landing/auth/components/signup.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B",file:"signup.vue",sourcesContent:["\n.text-selected[data-v-8544160c] {\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-8544160c] {\n    background-color: #F7F7F7;\n}\n"],sourceRoot:""}])},554:function(t,o,e){var a=e(548);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(532)("21eae7cc",a,!0)},566:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("main-header",{attrs:{title:"Cadastre-se"}}),t._v(" "),t.$auth.ready()?e("section",{attrs:{id:"login"}},[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-info btn-block facebook",on:{click:function(o){t.facebookLogin()}}},[e("i",{staticClass:"fa fa-facebook fa-lg button-icon"}),t._v(" Cadastre-se com Facebook\n                        ")])])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-info btn-block",on:{click:function(o){t.interactions.showEmailLogin=!0}}},[e("i",{staticClass:"fa fa-email fa-lg button-icon"}),t._v(" Cadastre-se com Email\n                        ")])])])]),t._v(" "),t.interactions.showEmailLogin?e("div",{staticClass:"row m-t-20"},[e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Nome")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.name,expression:"guest.name"}],staticClass:"form-control",domProps:{value:t.guest.name},on:{input:function(o){o.target.composing||t.$set(t.guest,"name",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Sobrenome")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.last_name,expression:"guest.last_name"}],staticClass:"form-control",domProps:{value:t.guest.last_name},on:{input:function(o){o.target.composing||t.$set(t.guest,"last_name",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Email")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.email,expression:"guest.email"}],staticClass:"form-control",domProps:{value:t.guest.email},on:{input:function(o){o.target.composing||t.$set(t.guest,"email",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Telefone")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.phone,expression:"guest.phone"}],staticClass:"form-control",domProps:{value:t.guest.phone},on:{input:function(o){o.target.composing||t.$set(t.guest,"phone",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Senha")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password,expression:"guest.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.guest.password},on:{input:function(o){o.target.composing||t.$set(t.guest,"password",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Confirmar senha")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password_confirmation,expression:"guest.password_confirmation"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.guest.password_confirmation},on:{input:function(o){o.target.composing||t.$set(t.guest,"password_confirmation",o.target.value)}}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Foto")]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"file"},on:{change:t.loadPhoto}})])]),t._v(" "),e("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-xl btn-primary",on:{click:function(o){o.preventDefault(),t.signup()}}},[t._v("Cadastrar")])])])]):t._e(),t._v(" "),e("p",{staticClass:"text-muted text-center"},[t._v("\n                Já possui cadastro? "),e("router-link",{attrs:{to:{name:"landing.auth.login"}}},[t._v("Faça login.")])],1)])]):t._e()],1)},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"row m-b-30"},[e("div",{staticClass:"col-lg-12 text-center"},[e("h4",{staticClass:"text-muted m-t-30"},[t._v("Salve e compartilhe com os amigos seus drinks preferidos.")])])])}]}}});
//# sourceMappingURL=1.750e8428b2ec79742796.js.map