webpackJsonp([6],{230:function(e,t,r){var o=r(1)(r(557),r(582),null,null);e.exports=o.exports},557:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(2),n=r.n(o),a=r(3);t.default={name:"logout",data:function(){return{}},created:function(){this.logout()},methods:n()({},r.i(a.b)(["authSetToken","authSetUser"]),{logout:function(){this.authSetToken(null),this.authSetUser(null);var e=localStorage.getItem("events"),t=localStorage.getItem("language");localStorage.clear(),localStorage.setItem("events",e),localStorage.setItem("language",t),window.cordova&&window.cookies.clear(function(){}),this.$router.push({path:this.$route.query.redirect?this.$route.query.redirect:"/",query:{redirect_back:this.$route.query.redirect_back}})}})}},582:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}}});
//# sourceMappingURL=6.1a20f6ec744b07096568.js.map