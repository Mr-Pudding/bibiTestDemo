<template>
	<view>
		<view class="p-3">
			<view @click="ToFatherMy" class="py-3 rounded-circle flex font-md text-white justify-center align-center bg-main" hover-class="bg-main-hover">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			ToFatherMy(){
				this.$emit('onSetToClick')
			}
		}
	}
</script>

<style>
</style>