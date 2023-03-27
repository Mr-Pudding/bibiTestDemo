<template>
	<view>
		<view v-for="(item,index) in list" :key="index">

			<view style="width: 100%;" class="flex align-center py-2 border-bottom">
				<image :src="item?item.cover:'无'" style="width: 260rpx;height: 160rpx;"
					class="rounded-lg mx-2 flex-shrink"></image>


				<view class="flex flex-column">
					<view class="font text-ellipsis" style="line-height: 1.5; width:400rpx">
						{{item?item.title:'无'}}</view>
					<view class="flex flex-column mt-3 py-1">
						<view class="font-sm text-muted">今天</view>
						<view class="font-sm text-muted">up:快乐的小白</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.getData()
			// console.log(this.list)
		},
		
		methods: {
			getData() {
				let list = uni.getStorageSync('history')
				this.list = list ? JSON.parse(list) : []
			},
		},
		computed: {
			...mapState({
				user_id: (state) => state.user.id
			})
		}
	}
</script>

<style>

</style>
