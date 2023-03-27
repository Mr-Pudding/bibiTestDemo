<template>
	<view>
	<view style="width: 187.5rpx;height: 187.5rpx;
		line-height: 1;justify-content: center;align-items: center;flex-direction: column;display:inline-flex!important; "
		v-for="(icon,index) in iconList" :key="icon.id" @click="enterList(icon)">
		<image :src='icon.cover' style="width: 70rpx;height: 70rpx;" class="bg-light"></image>
		<text class="font mt-2">{{icon.title}}</text>
	</view>
	</view>
</template>

<script>
	export default{
		props:['iconList'],
		data(){
			return{
				
			}
		},
		methods:{
			enterList(icon){
			  this.$emit("EnterList",icon)
			}
		}
	}
</script>

<style>
</style>
