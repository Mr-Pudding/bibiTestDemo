(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-video-user-video"],{"0ed4":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"p-3"},[i("v-uni-view",{staticClass:"py-3 rounded-circle flex font-md text-white justify-center align-center bg-main",attrs:{"hover-class":"bg-main-hover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ToFatherMy.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1)},a=[]},"116f":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"myToSend[data-v-69de403c]{border-radius:0}",""]),t.exports=e},1537:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"flex border-bottom border-light-secondary",staticStyle:{height:"100rpx"}},[i("v-uni-view",{staticClass:"flex align-center justify-center font-md",staticStyle:{width:"170rpx",height:"100rpx"}},[t._v(t._s(t.title))]),i("v-uni-view",{staticClass:"flex-1 flex align-center"},[t._t("default")],2),i("v-uni-view",{staticClass:"flex justify-center align-center",staticStyle:{height:"100rpx",width:"80rpx"}},[i("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:t.rightIconShow,expression:"rightIconShow"}],staticClass:"iconfont iconjinru text-muted"})],1)],1)},a=[]},"26c7":function(t,e,i){"use strict";var n=i("b36b"),s=i.n(n);s.a},3541:function(t,e,i){"use strict";i.r(e);var n=i("c831"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"35b1":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t._l(t.list,(function(e,n){return[e.isWrite?i("v-uni-view",[i("v-uni-view",{staticClass:"bg-light position-relative",staticStyle:{height:"350rpx"},attrs:{"hover-class":"bg-hover-light"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.setVideo(e)}}},[e.url?i("v-uni-video",{staticStyle:{width:"100%",height:"350rpx"},attrs:{src:e.url}}):t._e(),e.url?t._e():i("v-uni-view",{staticClass:"position-absolute left-0 right-0 top-0 bottom-0 flex flex-column align-center justify-center",staticStyle:{"background-color":"rgba(255,255,255,0.2)"}},[i("v-uni-text",{staticClass:"iconfont iconjia",staticStyle:{"font-size":"50rpx"}}),i("v-uni-text",{staticClass:"font text-muted"},[t._v("点击添加视频")])],1)],1),e.url?i("v-uni-view",{staticClass:"flex align-center justify-center font border-bottom border-top",staticStyle:{height:"100rpx"},attrs:{"hover-class":"bg-light"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.setVideo(e)}}},[t._v("点击切换视频")]):t._e(),i("v-uni-view",{staticStyle:{width:"100%"}},[i("personalworksTypeDeatil",{attrs:{title:"标题"}},[i("v-uni-input",{staticClass:"w-100 pr-5",attrs:{type:"text",placeholder:"请填写视频标题","placeholder-class":"text-light-muted"},model:{value:e.title,callback:function(i){t.$set(e,"title",i)},expression:"items.title"}})],1),i("personalworksTypeDeatil",{attrs:{title:"描述"}},[i("v-uni-input",{staticClass:"w-100 pr-5",attrs:{type:"text",placeholder:"请填写视频描述","placeholder-class":"text-light-muted"},model:{value:e.desc,callback:function(i){t.$set(e,"desc",i)},expression:"items.desc"}})],1),i("v-uni-view",{staticClass:"flex mt-5",staticStyle:{height:"100rpx"}},[i("v-uni-view",{staticClass:"flex-1 font flex align-center justify-center bg-main text-white",attrs:{"hover-class":"bg-main-hover"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.submit(e)}}},[t._v("完成")]),i("v-uni-view",{staticClass:"flex-1 font flex align-center justify-center",attrs:{"hover-class":"bg-light"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.delet(e)}}},[t._v("删除")])],1)],1)],1):i("v-uni-view",{key:n+"_0",staticClass:"bg-light"},[i("v-uni-view",{staticClass:"bg-white"},[i("v-uni-video",{staticStyle:{height:"350rpx",width:"100%"},attrs:{src:e.url,controls:!0,"danmu-btn":!0,"page-gesture":!0,"enable-progress-gesture":!0}}),i("v-uni-view",{staticClass:"flex align-center p-2"},[i("v-uni-view",{staticClass:"text-ellipsis",staticStyle:{width:"200rpx"}},[t._v(t._s(e.title))]),i("v-uni-text",{staticClass:"ml-5 text-muted font-sm"},[t._v(t._s(e.desc))])],1),i("v-uni-view",{staticClass:"flex border-top border-bottom",staticStyle:{height:"100rpx"}},[i("v-uni-view",{staticClass:"flex flex-1 justify-center align-center font",attrs:{"hover-class":"bg-light"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.ToWrite(e)}}},[t._v("修改")]),i("v-uni-view",{staticClass:"flex flex-1 justify-center align-center font",attrs:{"hover-class":"bg-light"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.delet(e)}}},[t._v("删除")])],1),i("v-uni-view",{staticClass:"f-divider"})],1)],1)]})),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.addShow,expression:"addShow"}],staticClass:"position-relative",staticStyle:{width:"100%"}},[i("myToSend",{on:{onSetToClick:function(e){arguments[0]=e=t.$handleEvent(e),t.add.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"iconfont iconjia",staticStyle:{color:"aliceblue"}}),i("v-uni-view",[t._v("添加新章节")])],1)],1)],2)},a=[]},"4f24":function(t,e,i){"use strict";i.r(e);var n=i("1537"),s=i("3541");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"c04e5544",null,!1,n["a"],o);e["default"]=c.exports},"7a8f":function(t,e,i){"use strict";i.r(e);var n=i("35b1"),s=i("9a4e");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("26c7");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"69de403c",null,!1,n["a"],o);e["default"]=c.exports},9598:function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("4de4"),i("d81d"),i("a9e3"),i("d3b7"),i("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("4f24")),a=n(i("f4aa")),o={data:function(){return{list:[],id:0}},computed:{addShow:function(){var t=this.list.filter((function(t){return 1==t.isWrite}));return 0==t.length}},onLoad:function(t){if(!t.id)return uni.navigateBack({delta:1}),uni.showToast({title:"非法参数",icon:"none"});this.id=t.id,this.getDate()},methods:{genID:function(t){return Number(Math.random().toString().substr(3,t)+Date.now()).toString(36)},getDate:function(){var t=this;this.$selfApi.get("/video_detail/".concat(this.id)).then((function(e){t.list=e,t.list.map((function(t){return t.isWrite=!1}))}))},submit:function(t){return t.url?t.title?(t.isWrite=!1,void this.$selfApi.post("/video/detail/save",{title:t.title,url:t.url,video_id:this.id,desc:t.desc},{token:!0}).then((function(t){}))):uni.showToast({title:"标题不能为空",icon:"none"}):uni.showToast({title:"视频不能为空",icon:"none"})},ToWrite:function(t){t.isWrite=!0},delet:function(t){var e=this;uni.showModal({content:"是否删除?",success:function(i){i.confirm&&e.$selfApi.post("/video/detail/destroy",{id:t.id},{token:!0}).then((function(t){e.getDate(),uni.showToast({title:"删除成功",icon:"none"})}))}})},setVideo:function(e){var i=this;uni.chooseVideo({success:function(n){var s=function(t){return i.$selfApi.post("/vod/sign",{},{token:!0}).then((function(t){return t}))};i.genID(12);uni.showLoading({title:"上传中...",mask:!1});var a=new TcVod.default({getSignature:s}),o=a.upload({mediaFile:n.tempFile});o.on("media_progress",(function(e){t.log(e.percent)})),o.done().then((function(t){e.url=t.video.url,uni.hideLoading()})).catch((function(e){t.log(e),uni.hideLoading(),uni.showToast({title:"上传失败",icon:"none"})}))}})},add:function(){this.list.push({url:"",tilte:"",desc:"",isWrite:!0})}},components:{personalworksTypeDeatil:s.default,myToSend:a.default}};e.default=o}).call(this,i("5a52")["default"])},"9a4e":function(t,e,i){"use strict";i.r(e);var n=i("9598"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},b36b:function(t,e,i){var n=i("116f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("4f06").default;s("e03c06dc",n,!0,{sourceMap:!1,shadowMode:!1})},bdf9:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={methods:{ToFatherMy:function(){this.$emit("onSetToClick")}}};e.default=n},c831:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{title:{type:String},rightIconShow:{type:Boolean,default:!1}}};e.default=n},dd00:function(t,e,i){"use strict";i.r(e);var n=i("bdf9"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},f4aa:function(t,e,i){"use strict";i.r(e);var n=i("0ed4"),s=i("dd00");for(var a in s)"default"!==a&&function(t){i.d(e,t,(function(){return s[t]}))}(a);var o,r=i("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"2b2af2ec",null,!1,n["a"],o);e["default"]=c.exports}}]);