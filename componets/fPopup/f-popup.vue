<template>
	<view class="position-fixed top-0 left-0 right-0 bottom-0 animated faster fadeIn" style="background-color: rgba(0,0,0,0.3);z-index: 1000;" @click.stop="hide" v-if="status">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: false
			}
		},
		methods: {
			// 显示
			show(){
				this.status = true
			},
			// 隐藏
			hide() {
				this.status = false
			}
		},
	}
</script>

<style>
</style>
