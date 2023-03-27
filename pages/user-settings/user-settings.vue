<template>
	<view>
		<myToSend @onSetToClick="loginout">退出登录</myToSend>
	</view>
</template>

<script>
	import myToSend from '@/componets/myToSend/MyToSend.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginout(){
				this.$store.dispatch("loginOut").then(res=>{
					uni.switchTab({
						url:"/pages/my/my"
					})
					console.log('退出登录')
				})
			}
		},
		components:{
			myToSend
		}
	}
</script>

<style>

</style>
