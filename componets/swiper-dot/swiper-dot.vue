<template>
	<view class="position-relative"><!-- 轮播图组件 -->
		<slot></slot><!-- 轮播图图片插槽slot -->
		<view class="seiper-box">
			<view style="width: 80%;">{{info[current]?info[current].title:""}}</view>
			<view style="width: 20%;" class="flex align-center justify-end">
				<view v-for="(i,index) in info" :key="index" class="rounded-circle mx-1"
					style="width: 16rpx; height: 16rpx;"
					:style="index===current?'background-color:aliceblue':'background-color:#94989B'"></view><!-- 轮播图小按钮颜色切换 -->
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		props:['info','current']
	}
</script>

<style>
	.seiper-box {
		align-content: center;
		display: flex;
		width: 100%;
		height: 70rpx;
		position: absolute;
		top: 180rpx;
		background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
		border-bottom-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
		color: white;
	}
</style>
