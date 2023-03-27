<template>
	<view>
		<block v-for="(i,index) in list" :key="index">
			<view class="p-3 mt-4 flex align-center" style="height: 40rpx;width: 100%;background-color: #F7F4F4;">
				<image class="rounded-circle" :src="i.user_follow?i.user_follow.avatar:'../../static/-42b7f4da80d15437.jpg'"></image>
				<text class="font ml-2">{{i.user_follow.username}}</text>
				<view class="flex align-center justify-center rounded bg-main text-white py-1 px-2 ml-auto mr-5"
					hover-class="bg-main-hover">
					<text class="font">已关注</text>
				</view>
			</view>
		</block>
		<view v-if="list.length==0" class="flex  flex-column  justify-center align-center mt-5">没有数据</view>
		<view v-else-if="list.length > 10" class="flex align-center justify-center font-md text-secondary"
			style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				list: [],
				loadText: "上拉加载更多",
			}
		},
		onLoad() {
			this.getDate()
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

		methods: {
			getDate() {
				return this.$selfApi.get(`/user/follows/${this.page}`, {
					token: true
				}).then(res => {
					if (this.page == 1) {
						// console.log(res)
						this.list = res
					} else {
						this.list = [...this.list, ...(res)]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				})
			}
		},
	}
</script>

<style>
	image {
		width: 80rpx;
		height: 80rpx;
	}
</style>
