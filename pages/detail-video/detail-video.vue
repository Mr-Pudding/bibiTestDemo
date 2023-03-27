<template>
	<view>
		<!-- #ifndef APP-PLUS -->
		<video :src="src" :poster="poster" style="height: 225px;width: 750rpx;" controls></video>
		<!-- #endif -->

		<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
			<view class="border-bottom border-light-secondary flex align-stretch bg-white"
				style="height: 80rpx;position: fixed;left: 0;right: 0; z-index: 100;">

				<view class="flex-1 flex align-center justify-center" v-for="(item,index) in tabBars" :key="index"
					@click="changeTab(index)">
					<text class="font py-1" :class="tabIndex === index ? 'text-main border-main':''"
						:style="tabIndex === index ? 'border-bottom: 5rpx solid;' : ''">{{item.name}}</text>
				</view>
			</view>
			<view style="height: 80rpx;"></view>

			<!-- 简介 -->
			<view v-if="tabIndex === 0" class="animated fadeIn fast">
				<view class="py-2 px-3 flex align-center">
					<image @click="openUserSpace" :src="detail.user?detail.user.avatar:'/static/-42b7f4da80d15437.jpg'"
						style="width: 80rpx;height: 80rpx;" class="mr-3 rounded-circle"></image>
					<view class="flex flex-column">
						<text class="text-main font-md mb-1">{{detail.user.username}}</text>
						<text class="font-sm text-muted" style="line-height: 1;">369 粉丝</text>
					</view>
					<view class="flex align-center justify-center rounded bg-main text-white py-1 px-2 ml-auto"
						hover-class="bg-main-hover" v-if=" detail.user.id !== user_id ">
						<text decode="true" @click="concern" class="font">{{ followStatus ? '已关注' : '关注' }}</text>
					</view>
				</view>
				<view>
					<view class="font-md px-3 mt-1">
						{{detail.title}}
					</view>
					<view class="flex align-center text-muted px-3 mt-3 mb-2">
						<text class="iconfont iconbofangshu font-md mr-1"></text>
						<text class="font-sm">{{detail.play_count}}</text>
						<text class="iconfont icondanmushu font-md mx-1"></text>
						<text class="font-sm">{{detail.danmu_count}}</text>
						<text class="font-sm ml-1">{{Time}}</text>
						<view class="flex flex-column align-center justify-center rounded   py-1 px-2 ml-auto" style=""
							@click="doFava">
							<text v-if="favaStatus?false:true">
								<svg t="1661101439068" class="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="2736" width="80" height="80">
									<path
										d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z"
										p-id="2737"></path>
								</svg>
							</text>
							<text v-else>
								<svg t="1661102578565" class="icon" viewBox="0 0 1024 1024" version="1.1"
									xmlns="http://www.w3.org/2000/svg" p-id="2891" width="80" height="80">
									<path
										d="M875.157333 521.386667l74.709334-85.461334c26.090667-29.824 13.866667-67.52-24.768-76.309333L681.728 304.213333l-127.786667-214.677333c-20.288-34.069333-59.946667-34.090667-80.213333 0l-127.786667 214.677333-243.392 55.381334c-38.442667 8.746667-50.837333 46.506667-24.768 76.309333l164.394667 188.053333-22.613333 248.917334c-3.605333 39.466667 28.437333 62.805333 64.874666 47.146666l229.376-98.432-16.810666-39.210666-229.397334 98.453333c-6.698667 2.88-6.229333 3.221333-5.546666-4.096l24.256-267.093333-176.426667-201.813334c-4.757333-5.461333-4.885333-5.034667 2.133333-6.634666l261.205334-59.434667 137.173333-230.4c3.733333-6.293333 3.114667-6.293333 6.869333 0l137.152 230.4 261.205334 59.434667c7.125333 1.621333 6.954667 1.088 2.133333 6.613333l-74.709333 85.482667 32.106666 28.074666z m0 0l74.709334-85.461334c26.090667-29.824 13.866667-67.52-24.768-76.309333L681.728 304.213333l-127.786667-214.677333c-20.288-34.069333-59.946667-34.090667-80.213333 0l-127.786667 214.677333-243.392 55.381334c-38.442667 8.746667-50.837333 46.506667-24.768 76.309333l164.394667 188.053333-22.613333 248.917334c-3.605333 39.466667 28.437333 62.805333 64.874666 47.146666l229.376-98.432-16.810666-39.210666-229.397334 98.453333c-6.698667 2.88-6.229333 3.221333-5.546666-4.096l24.256-267.093333-176.426667-201.813334c-4.757333-5.461333-4.885333-5.034667 2.133333-6.634666l261.205334-59.434667 137.173333-230.4c3.733333-6.293333 3.114667-6.293333 6.869333 0l137.152 230.4 261.205334 59.434667c7.125333 1.621333 6.954667 1.088 2.133333 6.613333l-74.709333 85.482667 32.106666 28.074666z"
										fill="#FB7299" p-id="2892"></path>
									<path
										d="M682.666667 917.333333a192 192 0 1 0 0-384 192 192 0 0 0 0 384z m0 42.666667c-129.6 0-234.666667-105.066667-234.666667-234.666667s105.066667-234.666667 234.666667-234.666666 234.666667 105.066667 234.666666 234.666666-105.066667 234.666667-234.666666 234.666667z"
										fill="#FB7299" p-id="2893"></path>
									<path
										d="M769.429333 646.122667a21.333333 21.333333 0 0 1 29.930667 30.421333l-143.978667 141.653333a21.333333 21.333333 0 0 1-30.037333-0.106666l-64.426667-64.426667a21.333333 21.333333 0 0 1 30.165334-30.186667l49.472 49.472 128.853333-126.826666z"
										fill="#FB7299" p-id="2894"></path>
								</svg>
							</text>
							<text class="font-sm mr-2"
								:style="favaStatus ? 'color: #FB7299;':''">{{ favaStatus ? '已收藏' : '收藏' }}</text>
						</view>
					</view>
				</view>
				<!-- 滚动 -->
				<view class="py-3 border-top border-bottom border-light-secondary">
					<view class="flex align-center px-3">
						<text class="font-md">选集</text>
						<view class="flex align-center text-muted ml-auto" @click="openPopup">
							共{{videos.length}}集 <text class="iconfont iconjinru ml-1"></text>
						</view>
					</view>
					<scroll-view scroll-x="true" class="scroll-row mt-2">
						<view v-for="(i,index) in videos" :key="index" class="scroll-row-item  rounded border ml-2 p-2 "
							:class="tabIndex === index ? 'text-main border-main' : 'text-muted border-light-secondary'"
							style="width: 340rpx;height: 120rpx;">
							<text class="font">{{i.desc}}</text>
							<view class="font-md text-ellipsis mt-2">{{i.title}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="f-list">
					<!-- 	<styleList3  v-for="i in 6 " :key="i" videoTitle="Uni-app第三季实战仿微信教程上线了" publishTime="今天06:00" hits="203.6万" danMus="6910"></styleList3> -->
					<StyleList3 @getVideo="getVideo(item)" v-for="(item,index) in hot" :key="index"
						:videoTitle="item.title" :publishTime="item.created_time" :hits="item.play_count"
						:danMus="item.danmu_count" :cover="item.cover">
					</StyleList3>
				</view>


				<f-popup ref="popup">
					<view class="position-absolute bottom-0 left-0 right-0 bg-white animated faster fadeIn"
						@click.stop="stop">
						<view style="height: 600rpx;">
							<view class="flex align-center">
								<text class="font-md ml-3">选集</text>
								<view class="flex align-center justify-center ml-auto"
									style="width: 80rpx;height: 80rpx;" hover-class="bg-light" @click="hidePopup">
									<text class="iconfont iconguanbi text-muted"></text>
								</view>
							</view>
							<scroll-view scroll-y="true" style="height: 520rpx;">
								<view class="flex flex-wrap">
									<view style="width: 50%;box-sizing: border-box;" v-for="(i,index) in videos"
										:key="index" class="p-2">
										<view class="rounded border p-2 "
											:class="tabIndex === index ? 'text-main border-main' : 'text-muted border-light-secondary'">
											<text class="font">{{i.desc}}</text>
											<view class="font-md text-ellipsis">{{i.title}}</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</f-popup>

			</view>
			<!-- 评论 -->
			<view v-else class="animated fadeIn fast px-3 py-1">
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image src="/static/-42b7f4da80d15437.jpg" style="width: 80rpx;height: 80rpx;"
							class="rounded-circle"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top"><text class="font text-main">id</text></view>
						<view class="uni-comment-date"><text class="font-sm text-muted">10:10</text></view>
						<view class="uni-comment-content">评论内容</view>
						<view class="flex flex-wrap p-2 bg-light rounded">
							<text class="font text-main">呢称:</text>
							<text class="font-sm ml-2">回复</text>
						</view>
					</view>
				</view>


				<view class="position-fixed flex align-center justify-center rounded-circle bg-main animated fast"
					style="right: 50rpx; bottom: 50rpx;width: 120rpx;height: 120rpx;" hover-class="bg-main-hover pulse"
					@click="openComment">
					<text class="iconfont iconjia text-white"></text>
				</view>

				<f-popup ref="comment">
					<view class="position-absolute bottom-0 left-0 right-0 bg-white animated faster fadeIn"
						@click.stop="stop">
						<view style="height: 100rpx;" class="flex align-center px-3">
							<input type="text" value="" class="bg-light rounded mr-3 flex-1" style="height: 60rpx;"
								placeholder="请输入谈话内容" />
							<view class="flex align-center justify-center rounded bg-main text-white py-1 px-2 ml-auto"
								hover-class="bg-main-hover">
								<text class="font">发送</text>
							</view>
						</view>
					</view>
				</f-popup>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import StyleList3 from '@/componets/StyleList3/StyleList3.vue';
	import fPopup from '@/componets/fPopup/f-popup.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			StyleList3,
			fPopup
		},
		data() {
			return {
				id: 0,
				activeIndex: 0,
				tabIndex: 0,
				tabBars: [{
					name: "简介"
				}, {
					name: "评论"
				}],
				src: "",
				poster: "",
				detail: {
					category_id: 0,
					cover: "",
					created_time: "",
					danmu_count: 0,
					desc: "",
					duration: 0,
					id: 0,
					play_count: 0,
					title: "",
					user: {
						id: 0,
						username: "",
						nickname: "",
						avatar: "",
					},
					user_id: 0
				},
				videos: [],
				scrollH: 500,
				hot: [],
				comments: [],
				followStatus: false,
				favaStatus: false,

				content: "",
				reply_id: 0,
				reply_user: {
					id: 0,
					name: ""
				},
				fensCount: 0
			}
		},
		onLoad(e) {
			let res = uni.getSystemInfoSync()
			this.scrollH = res.windowHeight - 226
			this.id = e.id
			this.getDate()
			// console.log("123")
			// console.log(this.detail.videos)
		},
		computed: {
			Time() {
				let time = new Date(this.detail.created_time)
				time = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8)
				return time
			},
			...mapState({
				user_id: state => {
					return state.user ? state.user.id : 0
				}
			})
		},
		methods: {

			getVideo(item) {
				uni.navigateTo({
					url: `../detail-video/detail-video?id=${item.id}`
				})
			},
			openUserSpace() {
				uni.navigateTo({
					url: `../user-space/user-space?user_id=${this.detail.user_id}`
				})
			},

			getDate() {
				this.$selfApi.get(`/video_read/${this.id}`, {
					token: true
				}).then(res => {
					// console.log(res)
					this.hot = res.hot
					this.detail = res.video
					this.poster = this.detail.cover
					this.videos = res.video.video_details || []
					this.src = this.videos[this.activeIndex] ? this.videos[this.activeIndex].url : ''
					this.followStatus = res.follow
					this.favaStatus = res.fava
				})
			},


			concern() {
				let url = this.followStatus ? '/user/unfollow' : '/user/follow'
				let msg = this.followStatus ? '取消关注' : '关注'
				this.$selfApi.post(url, {
					follow_id: this.detail.user.id
				}, {
					token: true
				}).then(res => {
					this.followStatus = !this.followStatus
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					// console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},

			// 收藏/取消收藏
			doFava() {
				this.$selfApi.post('/fava/video', {
					video_id: this.detail.id
				}, {
					token: true
				}).then(res => {
					this.favaStatus = res.status
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				})
			},

			stop() {},
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			// 弹出选集
			openPopup() {
				this.$refs.popup.show()
			},
			hidePopup() {
				this.$refs.popup.hide()
			},
			openComment() {
				this.$refs.popup.show()
			}
		}
	}
</script>

<style>
	svg {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
		color: #BFBFBF;
	}
</style>
