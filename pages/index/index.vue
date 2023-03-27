<template>
	<view>
		<!-- #ifdef MP-WEIXIN --><!-- 微信小程序的样式 -->
		<view class="flex justify-center fixed-top " style="height: 44rpx;">
			<view class="flex justify-start flex-1 rounded-circle le px-3"
				style="background-color: #F6F7F8;  color: #959FA0;">
				<image src="../../static/搜搜.png" style="width: 38rpx;height: 38rpx;margin: 5rpx; 0rpx"></image>
				<text style="font-size: 30rpx;margin: 0px 20rpx;">请输入关建词</text>
			</view>
			<view class="flex align-center px-2" style="color: #959FA0;font-size: 32rpx;">分类</view>
		</view>
		<view style="height: 44rpx;"></view>
		<!-- #endif -->

		<!-- 轮播图组件 -->
		<view class="px-3 py-2">
			<swiperDot :info="swiperList" :current="current">
				<swiper circular="true" :current="current" @change="changeSwier" :autoplay="true" :interval="3000"
					:duration="150" style="height: 250rpx;">
					<swiper-item v-for="i in swiperList" :key="i.id">
						<image @click="toBannerVideo(i.video_id)" :src="i.cover" mode="aspectFill" style="height: 250rpx; width: 100%;" class="rounded-lg">
						</image>
					</swiper-item>
				</swiper>
			</swiperDot>
		</view>

		<view class="f-divider"></view>
		<!-- 为你推荐布局 -->
		<card title="为你推荐">
			<view class="f-list">
				<view v-for="(item,index) in recommed" :key="index" @click="ToVideo(item)"
					style="margin-left: 15rpx;margin-right: 15rpx;min-height: 5rpx;width:328rpx;position: relative;"
					class="rounded-lg border mt-2">
					<image  :src="item.cover" style="width: 100%;height: 220rpx;" class="rounded-top-lg"></image>
					<view
						style="height: 65rpx;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));position: absolute;left: 0;right: 0;top: 155rpx;"
						class="text-white flex align-center">
						<text class="iconfont iconbofangshu font-md mx-1"></text>
						<text class="font-sm">{{item.play_count}}</text>
						<text class="iconfont icondanmushu font-md mx-1"></text>
						<text class="font-sm">{{item.danmu_count}}</text>
					</view>
					<view class="px-1 pb-1">
						<view class="font">
							{{item.title}}
						</view>
						<view class="flex align-center justify-between text-light-muted mt-1">
							<text class="font-sm text-ellipsis">{{item.desc}}</text>
							<text class="iconfont icongengduo"></text>
						</view>
					</view>
				</view>
			</view>
		</card>

		<view class="f-divider"></view>
		<!-- 样式列表二 -->
		<card title="电影解说">
			<view class="f-list">
				<view v-for="(moive,index) in moiveList" :key="index"
					style="margin-left: 15rpx;margin-right: 15rpx;min-height: 5rpx;width:210rpx;position: relative;"
					class="rounded-lg  mt-2">
					<image  @click="ToVideo(moive)" :src="moive.cover" style="width: 100%;height: 280rpx;" class="rounded-lg"></image>
					<view
						style="height: 65rpx;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));position: absolute;left: 0;right: 0;top: 215rpx;"
						class="text-white flex align-center rounded-bottom-lg">
						<text class="iconfont iconbofangshu font-md mx-1"></text>
						<text class="font-sm">{{moive.play_count}}</text>
					</view>
					<view class="px-1 pb-1 font">
						{{moive.title}}
					</view>
				</view>
			</view>
		</card>

		<view class="f-divider"></view>
		<!-- 样式列表三 -->
		<card title="为你推荐">
			<StyleList3   @getVideo="getVideo(item)" v-for="(item,index) in list" :key="index" :videoTitle="item.title"
				:publishTime="item.created_time" :hits="item.play_count" :danMus="item.danmu_count" :cover="item.cover">
			</StyleList3>
		</card>

	</view>
</template>

<script>
	import swiperDot from '@/componets/swiper-dot/swiper-dot.vue';
	import card from "@/componets/card/card.vue"
	import StyleList3 from '@/componets/StyleList3/StyleList3';
	export default {
		data() {
			return {
				recommed:[],
				moiveList:[],
				list:[],
				current: 0,
				swiperList: []

			}
		},
		components: {
			swiperDot,
			card,
			StyleList3
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search"
			})
		},
		onNavigationBarButtonTap() {
		     uni.switchTab({
		     	url:"/pages/sort/sort"
		     })
		},
		
		onPullDownRefresh() {
			this.getMovie().then(res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},
		

		
		onLoad() {
			this.getDate()
			this.getMovie()
			this.getRecommed()
			this.gerBanner()
		},

		methods: {
			toBannerVideo(bannerVideo){
				uni.navigateTo({
					url:`../detail-video/detail-video?id=${bannerVideo}`
				})
			},
			
			
			getVideo(item){
				uni.navigateTo({
					url:`../detail-video/detail-video?id=${item.id}`
				})
			},
			
			gerBanner(){
				this.$selfApi.get('/banner/list').then(res=>{
				    this.swiperList=res
				})
			},
			
			
			ToVideo(item){
				uni.navigateTo({
					url:`/pages/detail-video/detail-video?id=${item.id}`
				})
				// console.log(item)
			},
			
			changeSwier(curr) {
				this.current = curr.detail.current
			},
			toDeatilVideo(){
				uni.navigateTo({
					url:"../detail-video/detail-video"
				})
			},
			
			getMovie(){
			  return this.$selfApi.get("/moive").then(res=>{
					this.moiveList=res
				})
			},
			
			getDate(){
				this.$selfApi.get('/index_data').then(res=>{
					this.list=res
				})
			},
			getRecommed(){
				this.$selfApi.get('/recommend').then(res=>{
					this.recommed=res
				})
			}
		}
	}
</script>

<style>
	.f-list {
		display: flex;
		flex-wrap: wrap;
		padding-left: 15rpx;
		padding-right: 15rpx;
	}
</style>
