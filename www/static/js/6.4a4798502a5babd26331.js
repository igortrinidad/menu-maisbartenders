webpackJsonp([6],{240:function(e,t,r){var o=r(1)(r(552),r(575),null,null);e.exports=o.exports},552:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(2),n=r.n(o),u=r(3);t.default={name:"logout",data:function(){return{}},created:function(){this.logout()},methods:n()({},r.i(u.c)(["authSetToken","authSetUser"]),{logout:function(){this.authSetToken(null),this.authSetUser(null);var e=localStorage.getItem("events");localStorage.clear(),localStorage.setItem("events",e),window.cordova&&window.cookies.clear(function(){}),this.$router.push({path:this.$route.query.redirect?this.$route.query.redirect:"/",query:{redirect_back:this.$route.query.redirect_back}})}})}},575:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}}});
//# sourceMappingURL=6.4a4798502a5babd26331.js.map