webpackJsonp([0],{241:function(t,s,a){a(578);var o=a(1)(a(565),a(590),"data-v-8544160c",null);t.exports=o.exports},565:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=a(46),e=a.n(o),n=a(2),i=a.n(n),r=a(3),l=(a(44),a(567)),c=a(5),d=a.n(c);a(45);s.default={name:"signup",components:{mainHeader:d.a},data:function(){return{interactions:{showEmailLogin:!1},guest:{name:"",last_name:"",email:"",password:"",password_confirmation:"",photo:null}}},computed:i()({},a.i(r.a)(["currentUser","isLogged","language"]),{translations:function(){return"en"===this.language?l.a:"pt"===this.language?l.b:void 0}}),mounted:function(){window.cordova&&openFB.init({appId:"262783620860879"})},methods:i()({},a.i(r.b)(["authSetToken","authSetUser","setLoading"]),{signup:function(){var t=this,s=new FormData;t.setLoading({is_loading:!0,message:""}),e()(t.guest).map(function(a,o){s.append(a,t.guest[a])}),t.$http.post("/guest/create",s,{headers:{"Content-Type":"multipart/form-data"}}).then(function(s){successNotify("","Cadastro realizado com sucesso, faça o login."),t.$router.push({path:"/login"}),t.setLoading({is_loading:!1,message:""})}).catch(function(s){errorNotify("","Houve um erro ao realizar o cadastro."),t.setLoading({is_loading:!1,message:""})})},loadPhoto:function(t){this.guest.photo=t.target.files[0]},facebookLogin:function(){var t=this;t.setLoading({is_loading:!0,message:""}),window.cordova&&openFB.login(function(s){if("connected"===s.status)t.statusChangeCallback(s);else{alert("Facebook login failed: "+s.error);var a=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",a),window.cordova&&window.cookies.clear()}},{scope:"public_profile,email"}),window.cordova||FB.login(function(s){t.statusChangeCallback(s)},{scope:"public_profile,email,publish_actions"})},statusChangeCallback:function(t){var s=this;"connected"===t.status?s.getUserInfo(t.authResponse.accessToken):errorNotify("","É necessário fazer login para continuar."),s.setLoading({is_loading:!1,message:""})},getUserInfo:function(t){var s=this;window.cordova&&openFB.api({path:"/v2.8/me",params:{access_token:t,fields:"id,name,first_name,last_name,email"},success:function(a){a.photo_url="https://graph.facebook.com/"+a.id+"/picture?type=normal",a.access_token=t,a.role="guest",s.socialLogin(a)},error:s.errorHandler}),window.cordova||FB.api("/me",{fields:"name,first_name, last_name, email"},function(a){a.photo_url="https://graph.facebook.com/"+a.id+"/picture?type=normal",a.access_token=t,a.role="guest",s.socialLogin(a)})},socialLogin:function(t){var s=this;localStorage.setItem("provider","facebook"),s.$http.post("/auth/social",t).then(function(t){s.authSetToken(t.data.access_token),s.authSetUser(t.data.user),successNotify("","Login efetuado com sucesso."),s.setLoading({is_loading:!1,message:""}),s.$router.push(s.$route.query.redirect?s.$route.query.redirect:"/")}).catch(function(t){console.log(t),errorNotify("Ops!","Erro ao efetuar login.");var s=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",s),window.cordova&&window.cookies.clear()})},errorHandler:function(t){that.setLoading({is_loading:!1,message:""}),errorNotify("",t.message),localStorage.clear(),window.cordova&&window.cookies.clear()}})}},567:function(t,s,a){"use strict";a.d(s,"a",function(){return o}),a.d(s,"b",function(){return e});var o={title:"Signup",message:"Save and share your favorite drinks with your friends.",labels:{name:"Name",last_name:"Last name",email:"E-mail",phone:"Phone",password:"Password",confirm_password:"Confirm password",photo:"Photo"},placeholders:{name:"Enter your name",last_name:"Enter your last name",email:"Enter your e-mail",phone:"Enter your phone",password:"Enter your password",confirm_password:"Confirm your password"},already_signed:"Already have an account?",buttons:{signup_email:"Signup with e-mail",signup_facebook:"Signup with Facebook",signup:"Signup",login:"Go to login",go_home:"Go home"}},e={title:"Cadastre-se",message:"Salve e compartilhe com os amigos seus drinks preferidos.",labels:{name:"Nome",last_name:"Sobrenome",email:"E-mail",phone:"Telefone",password:"Senha",confirm_password:"Confirmar senha",photo:"Foto"},placeholders:{name:"Informe seu nome",last_name:"Informe seu sobrenome",email:"Informe seu e-mail",phone:"Informe seu telefone",password:"Digite sua senha",confirm_password:"Confirme sua senha"},already_signed:"Já possui uma conta?",buttons:{signup_email:"Entrar com e-mail",signup_facebook:"Entrar com Facebook",signup:"Cadastrar",login:"Entrar",go_home:"Voltar ao início"}}},572:function(t,s,a){s=t.exports=a(553)(),s.push([t.i,".text-selected[data-v-8544160c]{background-color:#fed136;font-size:22px}#contact[data-v-8544160c]{background-color:#f7f7f7}","",{version:3,sources:["/home/andre/we-planner/menu-maisbartenders/src/modules/landing/auth/components/signup.vue"],names:[],mappings:"AACA,gCACI,yBAA0B,AAC1B,cAAgB,CACnB,AACD,0BACI,wBAA0B,CAC7B",file:"signup.vue",sourcesContent:["\n.text-selected[data-v-8544160c] {\n    background-color: #FED136;\n    font-size: 22px;\n}\n#contact[data-v-8544160c] {\n    background-color: #F7F7F7;\n}\n"],sourceRoot:""}])},578:function(t,s,a){var o=a(572);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(554)("21eae7cc",o,!0)},590:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"first-container"},[a("main-header",{attrs:{title:t.translations.title}}),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"svg-container"},[a("svg",{attrs:{viewBox:"0 0 90 90"}},[a("defs",[a("linearGradient",{attrs:{id:"linear",x1:"0%",y1:"0%",x2:"100%",y2:"0%"}},[a("stop",{attrs:{offset:"0%","stop-color":"#FB923B"}}),t._v(" "),a("stop",{attrs:{offset:"100%","stop-color":"#F66439"}})],1)],1),t._v(" "),a("g",{attrs:{transform:"translate(-2.7877853,62.500941)"}},[a("g",{attrs:{transform:"matrix(3.9793611,0,0,3.9793611,-3.2721775,-67.931684)"}},[a("path",{staticClass:"non-fill-xs animated",attrs:{stroke:"url(#linear)",d:"M 14.585786,11 12.292893,8.7071068 c -0.390524,-0.3905243 -0.390524,-1.0236893 0,-1.4142136 0.390524,-0.3905243 1.02369,-0.3905243 1.414214,0 l 4,3.9999998 c 0.390524,0.390524 0.390524,1.02369 0,1.414214 l -4,4 c -0.390524,0.390524 -1.02369,0.390524 -1.414214,0 -0.390524,-0.390525 -0.390524,-1.02369 0,-1.414214 L 14.585786,13 H 7 C 6.4477152,13 6,12.552285 6,12 6,11.447715 6.4477152,11 7,11 Z M 3.428327,6.8496192 C 6.2728037,2.115615 12.416377,0.58385025 17.150381,3.428327 21.884385,6.2728037 23.41615,12.416377 20.571673,17.150381 17.727196,21.884385 11.583624,23.41615 6.8496192,20.571673 5.4312948,19.719458 4.2684755,18.550512 3.4333679,17.162236 3.148683,16.688978 3.3015515,16.074544 3.7748093,15.789859 4.2480671,15.505175 4.862501,15.658043 5.147186,16.131301 5.814698,17.240967 6.7434521,18.174615 7.8796954,18.857338 11.666899,21.13292 16.581757,19.907508 18.857338,16.120305 21.13292,12.333101 19.907508,7.418243 16.120305,5.1426616 12.333101,2.8670802 7.418243,4.092492 5.1426616,7.8796954 4.8582139,8.3530958 4.2438566,8.5062723 3.7704562,8.2218246 3.2970558,7.9373769 3.1438793,7.3230197 3.428327,6.8496192 Z"}})])])])]),t._v(" "),a("h4",{staticClass:"title-section m-b-20 m-t-10"},[t._v(t._s(t.translations.message))]),t._v(" "),a("div",{staticClass:"text-center m-b-10"},[a("button",{staticClass:"btn btn-mb-facebook btn-block m-b-10",on:{click:function(s){t.facebookLogin()}}},[t._v("\n                "+t._s(t.translations.buttons.signup_facebook)+"\n            ")]),t._v(" "),a("button",{staticClass:"btn btn-mb-info btn-block",on:{click:function(s){t.interactions.showEmailLogin=!0}}},[t._v("\n                "+t._s(t.translations.buttons.signup_email)+"\n            ")])])]),t._v(" "),a("div",{staticClass:"container-colored",class:{"bottom-fixed":!t.interactions.showEmailLogin}},[t.$auth.ready()?a("div",{attrs:{id:"login"}},[a("div",{staticClass:"container"},[t.interactions.showEmailLogin?a("div",{staticClass:"card"},[a("div",{staticClass:"card-body card-padding"},[a("div",{staticClass:"row m-t-20"},[a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-name"}},[t._v(t._s(t.translations.labels.name))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.name,expression:"guest.name"}],staticClass:"form-control",attrs:{id:"signup-name",placeholder:t.translations.placeholders.name},domProps:{value:t.guest.name},on:{input:function(s){s.target.composing||t.$set(t.guest,"name",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-lastname"}},[t._v(t._s(t.translations.labels.last_name))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.last_name,expression:"guest.last_name"}],staticClass:"form-control",attrs:{id:"signup-lastname",placeholder:t.translations.placeholders.last_name},domProps:{value:t.guest.last_name},on:{input:function(s){s.target.composing||t.$set(t.guest,"last_name",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-email"}},[t._v(t._s(t.translations.labels.email))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.email,expression:"guest.email"}],staticClass:"form-control",attrs:{id:"signup-email",placeholder:t.translations.placeholders.email},domProps:{value:t.guest.email},on:{input:function(s){s.target.composing||t.$set(t.guest,"email",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-phone"}},[t._v(t._s(t.translations.labels.phone))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.phone,expression:"guest.phone"}],staticClass:"form-control",attrs:{id:"signup-phone",placeholder:t.translations.placeholders.phone},domProps:{value:t.guest.phone},on:{input:function(s){s.target.composing||t.$set(t.guest,"phone",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-password"}},[t._v(t._s(t.translations.labels.password))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password,expression:"guest.password"}],staticClass:"form-control",attrs:{id:"signup-password",type:"password",placeholder:t.translations.placeholders.password},domProps:{value:t.guest.password},on:{input:function(s){s.target.composing||t.$set(t.guest,"password",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-confirm"}},[t._v(t._s(t.translations.labels.confirm_password))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.guest.password_confirmation,expression:"guest.password_confirmation"}],staticClass:"form-control",attrs:{id:"signup-confirm",type:"password",placeholder:t.translations.placeholders.confirm_password},domProps:{value:t.guest.password_confirmation},on:{input:function(s){s.target.composing||t.$set(t.guest,"password_confirmation",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"signup-photo"}},[t._v(t._s(t.translations.labels.photo))]),t._v(" "),a("input",{staticClass:"form-control",attrs:{id:"signup-photo",type:"file"},on:{change:t.loadPhoto}})])]),t._v(" "),a("div",{staticClass:"col-md-6 col-md-offset-3 col-xs-12"},[a("div",{staticClass:"form-group text-center"},[a("button",{staticClass:"btn btn-mb-primary",on:{click:function(s){s.preventDefault(),t.signup()}}},[t._v(t._s(t.translations.buttons.signup))])])]),t._v(" "),a("hr")])])]):t._e(),t._v(" "),a("div",{staticClass:"card m-b-0"},[a("div",{staticClass:"card-body card-padding"},[a("div",{staticClass:"text-center"},[a("h5",{staticClass:"card-title"},[t._v(t._s(t.translations.already_signed))]),t._v(" "),a("router-link",{staticClass:"btn btn-xs btn-mb-primary",attrs:{tag:"button",to:{name:"landing.auth.login"}}},[t._v(t._s(t.translations.buttons.login))]),t._v(" "),a("router-link",{staticClass:"btn btn-xs btn-mb-primary",attrs:{tag:"button",to:{name:"landing.home.show"},exact:""}},[t._v(t._s(t.translations.buttons.go_home))])],1)])])])]):t._e()])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=0.01c0c720839d304d9daf.js.map