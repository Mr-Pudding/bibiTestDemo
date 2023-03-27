<template>
	<view>
		<view style="height: 160rpx;"></view>
		<view class="flex align-center justify-center font-lg text-muted py-5">
			<text>欢迎回来</text>
		</view>

		<view class="align-center justify-center  mx-5 my-5" style="background-color: #FAF7FC;height: 80rpx;">
			<input v-model="form.username" style="height: 100%;padding-left: 20rpx;" placeholder="手机号/用户名/邮箱" />
		</view>
		<view class="align-center justify-center  mx-5 my-5" style="background-color: #FAF7FC;height: 80rpx;">
			<input  type="password" v-model="form.password" style="height: 100%;padding-left: 20rpx;" placeholder="请输入密码" />
		</view>

		<view v-if="type=='register'" class="align-center justify-center  mx-5 my-5"
			style="background-color: #FAF7FC;height: 80rpx;">
			<input v-model="form.repassword" style="height: 100%;padding-left: 20rpx;" placeholder="请再次确认密码" />
		</view>
		<myToSend @onSetToClick="smbit">{{type=='login'?'登录':'注册'}}</myToSend>

		<view class="flex align-center" style="width: 100%;padding-left:100rpx;">
			<view class="m-5" style="height: 2rpx;width: 100rpx;background-color:#C6C8CE ;"></view>
			<view class="font-sm">社交账号登录</view>
			<view class="m-5" style="height: 2rpx;width: 100rpx;background-color:#C6C8CE ;"></view>
		</view>
		<view class="flex px-5 align-center" style="height: 150rpx;">
			<view style="width: 20rpx;"></view>
			<view class="flex rounded-circle justify-center align-center mx-5"
				style="width: 100rpx;height: 100rpx;background-color: #FAF7FC;">
				<text class="iconfont iconweixin"></text>
			</view>
			<view class="flex rounded-circle justify-center align-center mx-5"
				style="width: 100rpx;height: 100rpx;background-color: #FAF7FC;">
				<text class="iconfont iconQQ"></text>
			</view>
			<view class="flex rounded-circle justify-center align-center mx-5"
				style="width: 100rpx;height: 100rpx;background-color: #FAF7FC;">
				<text class="iconfont iconxinlangweibo"></text>
			</view>
		</view>

		<view style="width: 100%;" class="flex align-center justify-center font-sm text-main mt-3" @click="typeChage">
			{{type=='login'?'没有账号?去注册':'去登录'}}
		</view>
	</view>
</template>

<script>
	import myToSend from '@/componets/myToSend/MyToSend.vue';
	export default {
		components: {
			myToSend
		},
		data() {
			return {
				type: 'login',
				form: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			typeChage() {
				if (this.type == 'login') {
					this.type = 'register'
					this.form = {
						username: '',
						password: '',
						repassword: ''
					}
				} else {
					this.type = 'login'
					this.form = {
						username: '',
						password: '',
						repassword: ''
					}
				}
			},
			smbit() {
				if (this.type == 'register') {
					this.$selfApi.post('/users/register', this.form).then(res => {
						if (res.username) {
							this.typeChage()
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: res,
								icon: 'none'
							})
						}
					})
				} else {
					this.$selfApi.post('/users/login', this.form).then(async res => {
						this.$store.dispatch('login', res)
						if (res.token) {
							uni.switchTab({
								url: "../index/index",
								success() {
									uni.showToast({
										title: '登录成功',
										icon: 'none',
									})
								}
							})
						} else {
							uni.showToast({
								title: res,
								icon: "none"
							})
						}
					})
				}




			}
		}
	}
</script>

<style>

</style>
