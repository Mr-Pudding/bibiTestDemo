<template>
	<view>
		<view style="width: 100%;" class="flex align-center py-2 border-bottom" @click="getVideoList">
			<image v-if="!cover" src="/static/list/3.jpg" style="width: 260rpx;height: 160rpx;"
				class="rounded-lg mx-2 flex-shrink"></image>

			<image v-else :src="cover" style="width: 260rpx;height: 160rpx;" class="rounded-lg mx-2 flex-shrink">
			</image>
			<view class="flex-1 flex flex-column">
				<text class="font" style="line-height: 1.2;">{{videoTitle}}</text>
				<text class="font-sm text-light-muted mt-auto">{{Time}}</text>
				<view class="flex align-center justify-between text-muted line-h">
					<view class="line-h">
						<text class="iconfont iconbofangshu font-md mx-1"></text>
						<text class="font-sm">{{hits}}</text>
					</view>
					<view class="line-h">
						<text class="iconfont icondanmushu font-md mx-1"></text>
						<text class="font-sm">{{danMus}}</text>
					</view>
					<text class="iconfont icongengduo"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['videoTitle', 'publishTime', 'hits', 'danMus', 'cover', 'videoInfo'],
		computed: {
			Time() {
				let time = new Date(this.publishTime)
				time = time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8)
				return time
			}
		},
		methods: {

			// 数组置顶
			toFirst(arr, index) {
				if (index != 0) {
					arr.unshift(arr.splice(index, 1)[0]);
				}
				return arr;
			},
			getVideoList() {
				this.$emit("getVideo")

				// 存储到历史记录中

				let list = uni.getStorageSync('history')
				list = list ? JSON.parse(list) : []


				list.unshift(this.videoInfo)
                 console.log(list)

				uni.setStorage({
					key: "history",
					data: JSON.stringify(list)
				})
			}
		}
	}
</script>

<style>

</style>
