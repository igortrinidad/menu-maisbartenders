webpackJsonp([6],{224:function(e,t,r){var o=r(1)(r(519),r(540),null,null);e.exports=o.exports},519:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(2),u=r.n(o),n=r(3);t.default={name:"logout",data:function(){return{}},created:function(){this.logout()},methods:u()({},r.i(n.c)(["authSetToken","authSetUser"]),{logout:function(){this.authSetToken(null),this.authSetUser(null),localStorage.removeItem("token"),localStorage.removeItem("user"),localStorage.removeItem("default-auth-token"),localStorage.removeItem("provider"),localStorage.clear(),window.cordova&&window.cookies.clear(function(){}),this.$router.push({path:this.$route.query.redirect?this.$route.query.redirect:"/",query:{redirect_back:this.$route.query.redirect_back}})}})}},540:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}}});
//# sourceMappingURL=6.a7adc1663f9aa968a099.js.map