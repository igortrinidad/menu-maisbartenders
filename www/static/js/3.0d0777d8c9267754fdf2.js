webpackJsonp([3],{222:function(e,o,t){t(529);var a=t(1)(t(517),t(536),"data-v-2dcfc2a1",null);e.exports=a.exports},517:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=t(2),s=t.n(a),n=t(3);t(21),t(16);o.default={name:"login",data:function(){return{interactions:{showEmailLogin:!1},email:null,password:null,redirect:null}},computed:s()({},t.i(n.a)(["currentUser","isLogged"])),mounted:function(){window.cordova&&openFB.init({appId:"262783620860879",tokenStore:localStorage})},methods:s()({},t.i(n.c)(["authSetToken","authSetUser","setLoading","setUserDrinkLikes"]),{login:function(){var e=this;e.setLoading({is_loading:!0,message:""}),this.$auth.login({url:"guest/auth/login",fetchUser:!0,data:{email:this.email,password:this.password},rememberMe:this.rememberMe,redirect:this.handleRedirect(),success:function(o){this.authSetToken(o.data.access_token),this.authSetUser(o.data.user),e.setLoading({is_loading:!1,message:""}),successNotify("","Login efetuado com sucesso.")},error:function(o){e.setLoading({is_loading:!1,message:""}),errorNotify("Ops!","Login ou senha inválidos. Dica: Tente pelo Facebook.");var t=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",t),window.cordova&&window.cookies.clear()}})},facebookLogin:function(){var e=this;e.setLoading({is_loading:!0,message:""}),window.cordova&&openFB.login(function(o){"connected"===o.status?e.statusChangeCallback(o):(e.setLoading({is_loading:!1,message:""}),alert("Facebook login failed: "+o.error),window.cordova&&window.cookies.clear())},{scope:"public_profile,email,publish_actions"}),window.cordova||FB.login(function(o){e.statusChangeCallback(o)},{scope:"public_profile,email,publish_actions"})},statusChangeCallback:function(e){var o=this;"connected"===e.status?o.getUserInfo(e.authResponse.accessToken):(errorNotify("","É necessário fazer login para continuar."),o.setLoading({is_loading:!1,message:""}))},getUserInfo:function(e){var o=this;window.cordova&&openFB.api({path:"/v2.8/me",params:{access_token:e,fields:"id,name,first_name,last_name,email"},success:function(t){t.photo_url="https://graph.facebook.com/"+t.id+"/picture?type=normal",t.access_token=e,t.role="guest",o.socialLogin(t),o.setLoading({is_loading:!1,message:""})},error:o.errorHandler}),window.cordova||FB.api("/me",{fields:"name,first_name, last_name, email"},function(t){t.photo_url="https://graph.facebook.com/"+t.id+"/picture?type=normal",t.access_token=e,t.role="guest",o.socialLogin(t)})},socialLogin:function(e){var o=this;localStorage.setItem("provider","facebook"),o.setLoading({is_loading:!0,message:""}),o.$http.post("/auth/social",e).then(function(e){o.authSetToken(e.data.access_token),o.authSetUser(e.data.user),o.setLoading({is_loading:!1,message:""}),successNotify("","Login efetuado com sucesso."),o.getUserDrinkLikes(),o.$router.push(o.handleRedirect())}).catch(function(e){errorNotify("Ops!","Erro ao efetuar login."),o.setLoading({is_loading:!1,message:""});var t=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",t),window.cordova&&window.cookies.clear()})},handleRedirect:function(){var e=this;return(e.$route.query.redirect_back?e.$route.query.redirect_back:e.$route.query.redirect)||"/"},errorHandler:function(e){that.setLoading({is_loading:!1,message:""}),errorNotify("",e.message);var o=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",o),window.cordova&&window.cookies.clear()},getUserDrinkLikes:function(){var e=this;e.$http.get("/guest/drinkLikes").then(function(o){e.setUserDrinkLikes(o.data.likes)}).catch(function(e){console.log(e)})}})}},523:function(e,o,t){o=e.exports=t(508)(),o.push([e.i,".text-selected[data-v-2dcfc2a1]{background-color:#fed136;font-size:22px}#contact[data-v-2dcfc2a1]{background-color:#f7f7f7}.btn[data-v-2dcfc2a1]:active{-webkit-transform:scale(.99);transform:scale(.99)}","",{version:3,sources:["/Users/igortrindade/Code/app-maisbartenders/src/modules/landing/auth/components/login.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B,AACD,6BACI,6BAA+B,AACvB,oBAAuB,CAClC",file:"login.vue",sourcesContent:["\n.text-selected[data-v-2dcfc2a1]{\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-2dcfc2a1]{\n    background-color: #F7F7F7;\n}\n.btn[data-v-2dcfc2a1]:active{\n    -webkit-transform: scale(0.99);\n            transform: scale(0.99);\n}\n"],sourceRoot:""}])},529:function(e,o,t){var a=t(523);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(509)("b53cbfb0",a,!0)},536:function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",[e.$auth.ready()?t("section",{attrs:{id:"login"}},[t("div",{staticClass:"container"},[e._m(0),e._v(" "),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[t("div",{staticClass:"form-group"},[t("button",{staticClass:"btn btn-info btn-block facebook",on:{click:function(o){e.facebookLogin()}}},[t("i",{staticClass:"fa fa-facebook fa-lg button-icon"}),e._v(" Entrar com Facebook\n                     ")])])]),e._v(" "),t("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[t("div",{staticClass:"form-group"},[t("button",{staticClass:"btn btn-info btn-block",on:{click:function(o){e.interactions.showEmailLogin=!0}}},[t("i",{staticClass:"fa fa-email fa-lg button-icon"}),e._v(" Login com Email\n                     ")])])])]),e._v(" "),e.interactions.showEmailLogin?t("div",{staticClass:"row m-t-20",on:{keydown:function(o){if(!("button"in o)&&e._k(o.keyCode,"enter",13))return null;e.login(o)}}},[t("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Email")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Informe seu e-mail"},domProps:{value:e.email},on:{input:function(o){o.target.composing||(e.email=o.target.value)}}})])]),e._v(" "),t("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[t("div",{staticClass:"form-group"},[t("label",[e._v("Senha")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",placeholder:"Informe sua senha"},domProps:{value:e.password},on:{input:function(o){o.target.composing||(e.password=o.target.value)}}})])]),e._v(" "),t("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[t("div",{staticClass:"form-group"},[t("button",{staticClass:"btn btn-xl btn-primary",attrs:{disabled:!e.email||!e.password},on:{click:function(o){o.preventDefault(),e.login(o)}}},[e._v("Login")])])])]):e._e()])]):e._e()])},staticRenderFns:[function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"row m-b-30"},[t("div",{staticClass:"col-lg-12"},[t("h2",{staticClass:"section-heading"},[e._v("Login")]),e._v(" "),t("h4",{staticClass:"text-muted m-t-30"},[e._v("Salve e compartilhe com os amigos seus drinks preferidos.")])])])}]}}});
//# sourceMappingURL=3.0d0777d8c9267754fdf2.js.map