(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-my"],{"0ed4":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"p-3"},[n("v-uni-view",{staticClass:"py-3 rounded-circle flex font-md text-white justify-center align-center bg-main",attrs:{"hover-class":"bg-main-hover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ToFatherMy.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1)},s=[]},"3aee":function(t,e,n){"use strict";var i=n("4ea4");n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5530")),s=n("26cb"),o=i(n("6b03")),c=i(n("f4aa")),r={data:function(){return{messageBoxShow:!1,followers:0,videos:0}},methods:{toUserSpace:function(){uni.navigateTo({url:"../user-space/user-space?user_id=".concat(this.user.id)})},GetSonMy:function(){this.messageBoxShow=!0},navigateTo:function(t){this.userPower("/pages/".concat(t,"/").concat(t))},getDate:function(){var t=this;this.$selfApi.get("/user/statistics",{token:!0}).then((function(e){t.followers=e.userFollowers,t.videos=e.userVideos}))}},mounted:function(){this.getDate()},computed:(0,a.default)({},(0,s.mapState)({user:function(t){return t.user}})),watch:{user:function(t,e){this.user.id?this.getDate():(this.followers=0,this.videos=0)}},onNavigationBarButtonTap:function(t){0==t.index&&uni.navigateTo({url:"../user-settings/user-settings"})},components:{myDeatil:o.default,myToSend:c.default}};e.default=r},"6b03":function(t,e,n){"use strict";n.r(e);var i=n("e645"),a=n("eaab");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);var o,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"e236518e",null,!1,i["a"],o);e["default"]=r.exports},"6d85":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t.user?n("v-uni-view",{staticClass:"flex align-center p-3",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toUserSpace.apply(void 0,arguments)}}},[n("v-uni-image",{staticClass:"bg-light rounded-circle flex-shrink",staticStyle:{height:"120rpx",width:"120rpx"},attrs:{src:t.user.avatar?t.user.avatar:"/static/-42b7f4da80d15437.jpg"}}),n("v-uni-view",{staticClass:"flex flex-column pl-3 flex-1"},[n("v-uni-view",{staticClass:"font-md text-dark"},[t._v(t._s(t.user.username)),n("v-uni-text",{staticClass:"font-sm text-light-muted ml-3"},[t._v(t._s(t.user.sex)+",合肥")])],1),n("v-uni-text",{staticClass:"font-sm text-muted my-1"},[t._v("凸头it男")])],1)],1):n("v-uni-navigator",{attrs:{url:"/pages/login/login"}},[n("v-uni-view",{staticClass:"p-3 flex align-center"},[n("v-uni-image",{staticClass:"bg-light\n\t\t\t\trounded-circle flex-shrink",staticStyle:{height:"120rpx",width:"120rpx"},attrs:{src:"/static/-42b7f4da80d15437.jpg"}}),n("v-uni-view",{staticClass:"flex flex-1 flex-column pl-3"},[n("v-uni-view",{staticClass:"font-md text-main"},[t._v("点击登录")]),n("v-uni-view",{staticClass:"font-sm text-muted mt-1"},[t._v("请先登录")])],1)],1)],1),n("v-uni-view",{staticClass:"f-divider"}),n("myDeatil",{attrs:{icon:"iconshipin",text:"我的作品",showText:t.videos+"个"},on:{ToPersonal:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("personalVideo")}}}),n("myDeatil",{attrs:{icon:"iconshoucang1",text:"收藏",showText:">"},on:{ToPersonal:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("user-collection")}}}),n("myDeatil",{attrs:{icon:"iconguanzhu",text:"关注",showText:t.followers},on:{ToPersonal:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("concern")}}}),n("myDeatil",{attrs:{icon:"iconlishi",text:"历史记录",showText:">"},on:{ToPersonal:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("user-history")}}}),n("v-uni-view",{staticClass:"f-divider"}),n("myToSend",{on:{onSetToClick:function(e){arguments[0]=e=t.$handleEvent(e),t.GetSonMy.apply(void 0,arguments)}}},[t._v("立即投稿")]),t.messageBoxShow?n("v-uni-view",{staticClass:"position-fixed top-0 left-0 bottom-0 right-0 animated faster fadeIn",staticStyle:{"background-color":"rgba(0,0,0,0.3)"}},[n("v-uni-view",{staticClass:"position-absolute  right-0 left-0 bg-white",staticStyle:{bottom:"90rpx"}},[n("v-uni-view",{staticClass:"flex",staticStyle:{height:"200rpx"}},[n("v-uni-view",{staticClass:"flex justify-center align-center flex-column flex-1",attrs:{"hover-class":"bg-light"}},[n("v-uni-text",{staticClass:"iconfont icondingdanwenjian justify-center align-center flex rounded-circle",staticStyle:{width:"80rpx",height:"80rpx","background-color":"#6bc7ff"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("presonalWorks")}}}),n("v-uni-text",{staticClass:"font-sm mt-1"},[t._v("单集")])],1),n("v-uni-view",{staticClass:"flex justify-center align-center flex-column flex-1",attrs:{"hover-class":"bg-light"}},[n("v-uni-text",{staticClass:"iconfont icon918caidan_wenjian justify-center align-center flex rounded-circle bg-main",staticStyle:{width:"80rpx",height:"80rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("presonalWorks")}}}),n("v-uni-text",{staticClass:"font-sm mt-1"},[t._v("连载")])],1)],1),n("v-uni-view",{staticClass:"f-divider"}),n("v-uni-view",{staticClass:"py-2 flex align-center justify-center font-md text-muted",attrs:{"hover-class":"bg-light"},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.messageBoxShow=!1}}},[t._v("取消")])],1)],1):t._e()],1)},s=[]},bdf9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={methods:{ToFatherMy:function(){this.$emit("onSetToClick")}}};e.default=i},c649:function(t,e,n){"use strict";n.r(e);var i=n("3aee"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},d515:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:["icon","text","showText"],methods:{sendPersonal:function(){this.$emit("ToPersonal")}}};e.default=i},dd00:function(t,e,n){"use strict";n.r(e);var i=n("bdf9"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},e645:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"p-3 flex align-center justify-between",attrs:{"hover-class":"bg-light"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendPersonal.apply(void 0,arguments)}}},[n("v-uni-view",[n("v-uni-text",{staticClass:"iconfont  mx-2 text-light-muted",class:t.icon},[t._t("default")],2),n("v-uni-text",{staticClass:"font-md"},[t._v(t._s(t.text))])],1),n("v-uni-text",{staticClass:"font text-muted"},[t._v(t._s(t.showText))])],1)],1)},s=[]},e760:function(t,e,n){"use strict";n.r(e);var i=n("6d85"),a=n("c649");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);var o,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"ccff54da",null,!1,i["a"],o);e["default"]=r.exports},eaab:function(t,e,n){"use strict";n.r(e);var i=n("d515"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},f4aa:function(t,e,n){"use strict";n.r(e);var i=n("0ed4"),a=n("dd00");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);var o,c=n("f0c5"),r=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"2b2af2ec",null,!1,i["a"],o);e["default"]=r.exports}}]);