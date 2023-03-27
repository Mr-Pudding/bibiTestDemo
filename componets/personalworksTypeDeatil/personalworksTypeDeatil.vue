<template>
	<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
		<view style="width: 170rpx;height: 100rpx;" class="flex align-center justify-center font-md">{{title}}</view>
		<view class="flex-1 flex align-center">
			<slot></slot>
		</view>
		<view class="flex justify-center align-center" style="height: 100rpx;width: 80rpx;">
			<text v-show="rightIconShow" class="iconfont iconjinru text-muted"></text>
		</view>
	</view>
</template>

<script>
    export default{
		props:{
			title:{
				type:String
			},
			rightIconShow:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style>
</style>