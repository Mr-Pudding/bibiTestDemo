<template>
	<view>
		<!-- block和temlate差不多，用来遍历 -->
		<block v-for="(items,index) in list" :key="index">
			<view class="bg-light" v-if="!items.isWrite">
				<view class="bg-white">
					<video style="height: 350rpx;width: 100%;" :src="items.url" controls danmu-btn page-gesture
						enable-progress-gesture></video>

				<!-- 	<personalworksTypeDeatil :title="items.title">
						<text class="font-sm mx-2 text-muted">{{items.desc}}</text>
					</personalworksTypeDeatil> -->
					<view class="flex align-center p-2">
						<view style="width: 200rpx;" class="text-ellipsis">{{items.title}}</view>
						<text class="ml-5 text-muted font-sm">{{items.desc}}</text>
					</view>
					<view class="flex border-top border-bottom" style="height: 100rpx;">
						<view class="flex flex-1 justify-center align-center font" hover-class="bg-light"
							@click="ToWrite(items)">修改</view>
						<view class="flex flex-1 justify-center align-center font" hover-class="bg-light"
							@click="delet(items)">删除</view>
					</view>
					<view class="f-divider"></view>
				</view>
			</view>

			<view v-else="items.isWrite">
				<view style="height: 350rpx;" class="bg-light position-relative" hover-class="bg-hover-light"
					@click="setVideo(items)">
					<video v-if="items.url" style="width: 100%;height: 350rpx;" :src="items.url"></video>
					<view v-if="!items.url"
						class="position-absolute left-0 right-0 top-0 bottom-0 flex flex-column align-center justify-center"
						style="background-color: rgba(255,255,255,0.2);">
						<text class="iconfont iconjia" style="font-size: 50rpx;"></text>
						<text class="font text-muted">点击添加视频</text>
					</view>
				</view>
				<view v-if="items.url" class="flex align-center justify-center font border-bottom border-top"
					hover-class="bg-light" style="height: 100rpx;" @click="setVideo(items)">
					点击切换视频
				</view>
				<view style=" width: 100%;">
					<personalworksTypeDeatil title="标题">
						<input type="text" placeholder="请填写视频标题" v-model="items.title"
							placeholder-class="text-light-muted" class="w-100 pr-5" />
					</personalworksTypeDeatil>
					<personalworksTypeDeatil title="描述">
						<input type="text" placeholder="请填写视频描述" v-model="items.desc"
							placeholder-class="text-light-muted" class="w-100 pr-5" />
					</personalworksTypeDeatil>
					<view class="flex mt-5" style="height: 100rpx;">
						<view class="flex-1 font flex align-center justify-center bg-main text-white"
							hover-class="bg-main-hover" @click="submit(items)">完成</view>
						<view class="flex-1 font flex align-center justify-center" hover-class="bg-light"
							@click="delet(items)">删除</view>
					</view>
				</view>

			</view>
		</block>
		<view class="position-relative" style="width: 100%;" v-show="addShow">
			<myToSend @onSetToClick='add'>
				<view class="iconfont iconjia" style="color: aliceblue;"></view>
				<view>添加新章节</view>
			</myToSend>
		</view>
	</view>
</template>

<script>
	import personalworksTypeDeatil from '@/componets/personalworksTypeDeatil/personalworksTypeDeatil.vue';
	import myToSend from '@/componets/myToSend/MyToSend.vue';
	export default {
		data() {
			return {
				list: [],
				id: 0,
			}
		},
		computed: {
			addShow() {
				let arry = this.list.filter(item => {
					return item.isWrite == true
				})
				return arry.length == 0 ? true : false
			}
		},

		onLoad(e) {
			if (!e.id) {
				uni.navigateBack({
					delta: 1
				})
				return uni.showToast({
					title: "非法参数",
					icon: "none"
				})
			}
			this.id = e.id
			this.getDate()
		},
		
		
		

		methods: {


			// 生成唯一ID
			genID(length) {
				return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
			},

			getDate() {
				this.$selfApi.get(`/video_detail/${this.id}`).then(res => {
					this.list = res
					// this.list.forEach(item=>{
					//    return	item.isWrite=false
					// })
					this.list.map(item=>{
					  return item.isWrite=false
					})
				})
			},

			// 完成
			submit(item) {
				if (!item.url) {
					return uni.showToast({
						title: '视频不能为空',
						icon: 'none'
					});
				}
				if (!item.title) {
					return uni.showToast({
						title: '标题不能为空',
						icon: 'none'
					});
				}
				item.isWrite = false
				this.$selfApi.post(`/video/detail/save`, {
					title: item.title,
					url: item.url,
					video_id: this.id,
					desc: item.desc,
				}, {
					token: true
				}).then(res => {
					// console.log(res)/?????????????????????????????
				})
			},
			//编译模式开启。
			ToWrite(items) {
				items.isWrite = true
			},
			//删除
			delet(items) {
				// console.log(items)
				uni.showModal({
					content: '是否删除?',
					success: (res) => {
						if (res.confirm) {
							// this.list.splice(index, 1)
							this.$selfApi.post("/video/detail/destroy", {
								id: items.id
							}, {
								token: true
							}).then(res=>{
								this.getDate()
								uni.showToast({
									title:"删除成功",
									icon:'none'
								})
							})
							
						}
					}
				})
			},
			//添加选择视频
			setVideo(items) {
				uni.chooseVideo({
					success: (res) => {
						// items.videos = res.tempFilePath

						// #ifdef H5
						let getSignature = (callback) => {
							return this.$selfApi.post('/vod/sign', {}, {
								token: true
							}).then(res => {
								return res
							})
						}
						// #endif
						// 生成唯一名称
						let mediaName = this.genID(12)
						uni.showLoading({
							title: '上传中...',
							mask: false
						});
						// #ifdef H5
						const tcVod = new TcVod.default({
							getSignature: getSignature
						})
						const uploader = tcVod.upload({
							mediaFile: res.tempFile,
						})
						uploader.on('media_progress', (info) => {
							console.log(info.percent) // 进度
						})
						uploader.done().then((doneResult) => {
							// 上传后的视频链接
							// console.log(doneResult.video.url);
							items.url = doneResult.video.url
							uni.hideLoading()
						}).catch((err) => {
							console.log(err)
							uni.hideLoading()
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						})
						// #endif
					}
				})
			},
			//添加一个数组，新增视频。
			add() {
				this.list.push({
					url: "",

					tilte: '',

					desc: '',

					isWrite: true
				})
			},

		},
		components: {
			personalworksTypeDeatil,
			myToSend
		}
	}
</script>

<style>
	myToSend {
		border-radius: 0;
	}
</style>
