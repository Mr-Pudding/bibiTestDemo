<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="flex justify-center fixed-top " style="height: 44rpx;">
			<view class="flex justify-start flex-1 rounded-circle le px-3"
				style="background-color: #F6F7F8;  color: #959FA0;">
				<image src="../../static/搜搜.png" style="width: 38rpx;height: 38rpx;margin: 5rpx; 0rpx"></image>
				<text style="font-size: 30rpx;margin: 0px 20rpx;">请输入关建词</text>
			</view>
		</view>
		<view style="height: 44rpx;"></view>
		<!-- #endif -->



		<card title='热门分类'>
			<scroll-view scroll-x="true" class="scroll-row">
				<sortIcon @EnterList="enterlist" :iconList='iconList'></sortIcon>
			</scroll-view>
		</card>
		<view class="f-divider"></view>
		<card title='全部分类'>
			<sortIcon @EnterList="enterlist" :iconList='iconList'></sortIcon>
		</card>

	</view>
</template>

<script>
	import card from '@/componets/card/card.vue';
	import sortIcon from '@/componets/sortIcon/sortIcon.vue';
	export default {
		components: {
			card,
			sortIcon
		},
		data() {
			return {
				iconList: []
			}
		},
		onLoad() {
			this.getsortInfo()
		},
		onPullDownRefresh() {
			this.getsortInfo().then(res => {
				uni.showToast({
					title: '刷新成功'
				})
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			getsortInfo() {
				return this.$selfApi.get('/sorticon').then(res => {
					// console.log(res)
					this.iconList = res
				}).catch(err => {
					console.log(err)
				})
			},
			enterlist(data) {
				uni.navigateTo({
					url: `/pages/list/list?id=${data.id}&title=${data.title}`
				})
			}
		},
}
</script>

<style>

</style>
