<template>
	<view>
		<view class="flex px-3">
			<text class="font-md font-weight-bold py-2">{{title}}</text>
		</view>
		<slot></slot>
		<view class="flex justify-center align-center my-3"  v-if="false">
			<text class="iconfont iconshuaxin text-main" hover-class="text-main-hover">换一批</text>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
		   	
		}
	},
	props:['title']
	
}
</script>

<style>
</style>