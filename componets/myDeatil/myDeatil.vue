<template>
	<view>
		<view  class="p-3 flex align-center justify-between"  @click="sendPersonal"  hover-class="bg-light">
				<view>
				<text class="iconfont  mx-2 text-light-muted" :class="icon">
					<slot></slot>
				</text>
				<text class="font-md">{{text}}</text>
				</view>
				<text class="font text-muted">{{showText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['icon','text','showText'],
		methods:{
			sendPersonal(){
				this.$emit('ToPersonal')
			}
		}
	}
</script>

<style>
	
</style>