<template>
	<view>
		<view style="height: 350rpx;" class="bg-light position-relative" hover-class="bg-hover-light">
			<image v-for="(img,index) in imgList" :key="index" :src="img" mode="aspectFill"
				style="width: 100%;height: 350rpx;background-color: rgba(255,255,255,0.2);"></image>
			<view class="position-absolute flex flex-column align-center justify-center left-0 bottom-0 right-0 top-0">
				<text class="iconfont iconjia" style="font-size: 50rpx;" @click="setPhoto"></text>
				<text class="font text-muted">{{imgList.length==1?'点击切换封面图':'点击添加封面图'}}</text>
			</view>
		</view>

		<personalworksTypeDeatil title="标题">
			<input type="text" placeholder="请填写视频标题" v-model="form.title" placeholder-class="text-light-muted"
				class="w-100 pr-5" />
		</personalworksTypeDeatil>
		<personalworksTypeDeatil title="分类" :rightIconShow="true">
			<!-- picker选择器，@change事件detail中只能拿到被点击选择的索引 -->
			<picker mode="selector" :range="sortRange" :value="index" range-key="title" @change="sortSelector($event)">
				<input type="text" placeholder="请选择分类" v-model="title" placeholder-class="text-light-muted"
					class="w-100 pr-5" />
			</picker>
		</personalworksTypeDeatil>
		<personalworksTypeDeatil title="描述">
			<input type="text" placeholder="请填写视频描述" v-model="form.desc" placeholder-class="text-light-muted"
				class="w-100 pr-5" />
		</personalworksTypeDeatil>


		<view class="mt-4"></view>
		<myToSeend @onSetToClick="setVideo">{{buttonText}}</myToSeend>


	</view>
</template>

<script>
	import personalworksTypeDeatil from '@/componets/personalworksTypeDeatil/personalworksTypeDeatil.vue';
	import myToSeend from '@/componets/myToSend/MyToSend.vue';
	export default {
		components: {
			personalworksTypeDeatil,
			myToSeend
		},
		data() {
			return {
				buttonText: '立即发布',
				imgList: [],
				form: {
					title: '',
					category_id: "",
					desc: '',
				},
				sortRange: [],
				index: 0,
				result: {},
				title: ''
			}
		},
		onLoad(e) {
			if (e.date) {
				this.result = JSON.parse(decodeURIComponent(e.date))
				console.log(this.result)
				this.imgList.push(this.result.cover)
				this.form.title = this.result.title
				this.form.category_id = this.result.category_id
				this.form.desc = this.result.desc
				this.buttonText = "立即修改"
				uni.setNavigationBarTitle({
					title: "修改作品"
				})
			}
			this.$selfApi.get("/sorticon").then(res => {
				this.sortRange = res
			})
		},

		methods: {
			setPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: result => {
						this.$selfApi.upload("/upload", {
							filePath: result.tempFilePaths[0]
						}).then(res => {
							if (this.imgList.length == 0) {
								this.imgList.push(res.url)
								uni.showToast({
									title: "上传成功",
									icon: 'none'
								})
							} else {
								this.imgList = []
								this.imgList.push(res.url)
								uni.showToast({
									title: "切换成功",
									icon: 'none'
								})
							}

						}).catch(err => {
							console.log(err)
						})
					}
				});
			},
			sortSelector(e) {
				this.index = e.detail.value
				// console.log(this.sortRange[this.index].id)
				this.form.category_id = this.sortRange[this.index].id
				this.title = this.sortRange[this.index].title
			},
			setVideo() {
				if (this.result.id) {
					this.updateVideo()
				} else {
					this.$selfApi.post("/video", {
						title: this.form.title,
						cover: this.imgList[0],
						category_id: this.form.category_id,
						desc: this.form.desc,
					}, {
						token: true
					}).then(res => {
						// console.log(res)
						uni.showToast({
							title: res,
							icon: "none"
						})
						if (res.id) {
							uni.showToast({
								title: "发布成功",
								icon: "none"
							})
							setTimeout(function(){
								uni.navigateTo({
									url: `/pages/list/list?id=${res.category_id}`
								})
								// console.log(res.id)
							},1500)
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},


			updateVideo() {
				let url = `/video/update/${this.result.id}`
				return this.$selfApi.post(url, {
					title: this.form.title,
					cover: this.imgList[0],
					category_id: this.form.category_id,
					desc: this.form.desc,
				}, {
					token: true
				}).then(res => {
					// console.log(res)
					uni.showToast({
						title: '修改成功'
					})

					uni.navigateTo({
						url: '../personalVideo/personalVideo'
					})
					this.form.title = res.title
					this.imgList[0] = res.cover
					this.form.category_id = res.category_id
					this.form.desc = res.desc

				})
			}

		}
	}
</script>

<style>

</style>
