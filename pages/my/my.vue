<template>
	<view>
		<!-- <navigator v-if="user" url="/pages/login/login"> -->
		<view class="flex align-center p-3" v-if="user" @click="toUserSpace">
			<image :src="user.avatar?user.avatar:'/static/-42b7f4da80d15437.jpg'" style="height: 120rpx; width:120rpx;" class="bg-light rounded-circle flex-shrink"></image>
			<view class="flex flex-column pl-3 flex-1">
				<view class="font-md text-dark">{{user.username}} <text class="font-sm text-light-muted ml-3">{{user.sex}},合肥</text></view>
				<text class="font-sm text-muted my-1">凸头it男</text>
			</view>
		</view>
<!-- 		</navigator> -->
         <navigator v-else  url="/pages/login/login">
			<view class="p-3 flex align-center">
				<image src="/static/-42b7f4da80d15437.jpg" style="height: 120rpx; width:120rpx" class="bg-light
				rounded-circle flex-shrink"></image>
				<view class="flex flex-1 flex-column pl-3">
					<view class="font-md text-main">点击登录</view>
					<view class="font-sm text-muted mt-1">请先登录</view>
				</view>
			</view>
         </navigator>
		<view class="f-divider"></view>
		
		<myDeatil icon='iconshipin' @ToPersonal="navigateTo('personalVideo')" text='我的作品' :showText='videos+"个"'></myDeatil>
		<myDeatil icon='iconshoucang1' @ToPersonal="navigateTo('user-collection')" text='收藏' showText='>'></myDeatil>
		<myDeatil icon='iconguanzhu' @ToPersonal="navigateTo('concern')" text='关注' :showText='followers'></myDeatil>
		<myDeatil icon='iconlishi'  @ToPersonal="navigateTo('user-history')" text='历史记录' showText='>'></myDeatil>
		<view class="f-divider"></view>
		<myToSend @onSetToClick='GetSonMy'>立即投稿</myToSend>
		
		<!-- messageBox -->
		<view v-if="messageBoxShow" class="position-fixed top-0 left-0 bottom-0 right-0 animated faster fadeIn" style="background-color: rgba(0,0,0,0.3);">
			<view class="position-absolute  right-0 left-0 bg-white" style="bottom: 90rpx;">
				<view class="flex" style="height: 200rpx;">
					<view class="flex justify-center align-center flex-column flex-1" hover-class="bg-light">
						<text class="iconfont icondingdanwenjian justify-center align-center flex rounded-circle" style="width: 80rpx; height:80rpx;background-color: #6bc7ff;" @click="navigateTo('presonalWorks')"></text>
						<text class="font-sm mt-1">单集</text>
					</view>
					<view class="flex justify-center align-center flex-column flex-1" hover-class="bg-light">
						<text class="iconfont icon918caidan_wenjian justify-center align-center flex rounded-circle bg-main" style="width: 80rpx; height:80rpx;" @click="navigateTo('presonalWorks')"></text>
						<text class="font-sm mt-1">连载</text>
					</view>
				</view>
				<view class="f-divider"></view>
				<view @click.stop="messageBoxShow=false" class="py-2 flex align-center justify-center font-md text-muted" hover-class="bg-light">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import myDeatil from '@/componets/myDeatil/myDeatil.vue';
	import myToSend from '@/componets/myToSend/MyToSend.vue';
	export default {
		data() {
			return {
				messageBoxShow:false,
				followers:0,
				videos:0
			}
		},
		methods: {
			toUserSpace(){
				uni.navigateTo({
					url:`../user-space/user-space?user_id=${this.user.id}`
				})
			},
			GetSonMy(){
				this.messageBoxShow=true
			},
			navigateTo(path){
			    this.userPower(`/pages/${path}/${path}`)
			},
			getDate(){
				this.$selfApi.get(`/user/statistics`,{token:true}).then(res=>{
                      this.followers=res.userFollowers
					  this.videos=res.userVideos
				})
			}
		},
		mounted() {
			this.getDate()
		},
		computed:{
			...mapState({
				user:state=>state.user
			})
		},
		
		watch:{
			user(newValue,oldValue){
				if(!this.user.id){
					this.followers=0
					this.videos=0
				}else{
					this.getDate()
				}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateTo({
					url:"../user-settings/user-settings"
				})
			}
		},
		components:{
			myDeatil,
			myToSend
		}
	}
</script>

<style>

</style>
