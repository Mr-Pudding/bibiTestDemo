<template>
	<view>
		<StyleList3 @getVideo="getVideo(item)" v-for="(item,index) in list" :key="index" :videoTitle="item.title"
			:publishTime="item.created_time" :hits="item.play_count" :danMus="item.danmu_count" :cover="item.cover"
			:videoInfo="item">
		</StyleList3>
		<view v-if="list.length==0" class="flex  flex-column  justify-center align-center mt-5">没有数据</view>
		<view v-else-if="list.length > 10" class="flex align-center justify-center font-md text-secondary"
			style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import StyleList3 from '@/componets/StyleList3/StyleList3.vue';
	export default {
		data() {
			return {
				category_id: "",
				page: 1,
				list: [],
				loadText: "上拉加载更多"
			}
		},
		components: {
			StyleList3
		},

		onPullDownRefresh() {
			this.page = 1
			this.getSort().then(res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},

		onReachBottom() {
			if (this.loadText === '正在加载中...') {
				return
			}
			this.loadText = '正在加载中...'
			this.page = this.page + 1
			this.getSort()

		},


		methods: {

			getVideo(item) {
				uni.navigateTo({
					url: `../detail-video/detail-video?id=${item.id}`
				})

			},
			getSort() {
				let url = `/category/${this.category_id}/video/${this.page}`
				let page = this.page
				return this.$selfApi.get(url).then(res => {
					if (page == 1) {
						this.list = res.rows
					} else {
						this.list = [...this.list, ...(res.rows)]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err => {
					if (this.page > 1) {
						this.page--
					}
					this.loadText = '上拉加载更多'
				})
			}
		},
		onLoad(e) {
			this.category_id = e.id
			uni.setNavigationBarTitle({
				title: e.title
			})
			this.getSort()
		},



	}
</script>

<style>
</style>
