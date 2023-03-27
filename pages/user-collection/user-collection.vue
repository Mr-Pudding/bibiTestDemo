<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uniSwipeAction>
				<uniSwipeActionItem :right-options="options" @click="bindClick($event,item)">
					<StyleList3 @getVideo="getVideo(item)" :videoTitle="item.video.title"
						:publishTime="item.created_time" :hits="item.video.play_count" :danMus="item.video.danmu_count"
						:cover="item.video.cover">
					</StyleList3>
				</uniSwipeActionItem>
			</uniSwipeAction>
		</view>
		<view v-if="list.length==0" class="flex  flex-column  justify-center align-center mt-5">没有数据</view>
		<view v-else-if="list.length > 10" class="flex align-center justify-center font-md text-secondary"
			style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import uniSwipeActionItem from '@/componets/uni-swipe-action-item/uni-swipe-action-item.vue';
	import uniSwipeAction from '@/componets/uni-swipe-action/uni-swipe-action.vue';
	import StyleList3 from '@/componets/StyleList3/StyleList3.vue';
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				loadText: "上拉加载更多",
				options: [{
					text: '取消收藏'
				}],
				list: [],
				page: 1
			}
		},



		onPullDownRefresh() {
			this.page = 1
			this.getDate().then(res => {
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
			this.getDate()

		},

		onLoad() {
			this.getDate()
		},
		methods: {

			getVideo(item) {
				uni.navigateTo({
					url: `../detail-video/detail-video?id=${item.video_id}`
				})
			},




			bindClick(e, item) {
				this.$selfApi.post('/fava/video', {
					video_id: item.video.id
				}, {
					token: true
				}).then(res => {
					// console.log(res)
					if (res.msg == "取消收藏成功") {
						uni.showToast({
							// title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
							title: "已取消收藏",
							icon: 'none'
						});
						this.page = 1
						this.getDate()
					}
				})
			},
			getDate() {
				return this.$selfApi.get(`/fava_list/${this.page}?user_id=${this.user_id}`).then(res => {
					if (this.page == 1) {
						this.list = res.rows
					} else {
						this.list = [...this.list, ...(res.rows)]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				})
			}
		},
		computed: {
			...mapState({
				user_id: (state) => state.user.id
			})
		},
		components: {
			StyleList3,
			uniSwipeActionItem,
			uniSwipeAction
		}
	}
</script>

<style>

</style>
