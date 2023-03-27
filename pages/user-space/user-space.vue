<template>
	<view>
		<image src="/static/list/1.jpg" mode="aspectFill" style="width: 750rpx;height: 320rpx;"></image>
		<view style="height: 350rpx;" class="border-bottom">
			<view class="flex align-center justify-between px-4">
				<image :src="userInfo.user?userInfo.user.avatar:'/static/-42b7f4da80d15437.jpg'" style="width: 130rpx;height: 130rpx; margin-top: -60rpx;"
					class="rounded-circle"></image>
				<view v-if=" user_id != my_user_id " class="flex align-center justify-center rounded bg-main text-white py-1 px-2"
					hover-class="bg-main-hover">
					<text class="font"  @click="doFollow">{{ followStatus ? '已关注' : '关注' }}</text>
				</view>
			</view>

			<view class="px-4 flex align-center py-1">
				<view class="font text-main font-weight-bold">呢称</view>
				<text class="font-sm text-light-muted ml-2">{{userInfo.user.username}}</text>
			</view>
			<view class="flex align-center px-4 mt-1">
				<view class="rounded font-sm  text-white px-1" style="background-color: #ADADAD;">普通用户</view>
			</view>

			<view class="flex align-center px-4 mt-3">
				<view class="font-md text-dark flex align-center">{{userInfo.followCount}}<text
						class="ml-1 font-sm text-light-muted">关注</text></view>
				<view class="font-md text-dark flex align-center ml-3">{{userInfo.fensCount}}<text
						class="ml-1 font-sm text-light-muted">粉丝</text></view>
			</view>
			<view class="px-4 mt-3">
				<view class="text-ellipsis font-sm text-light-muted" style="line-height: 1.5;">
					{{userInfo.user.desc==""?'暂无描术':userInfo.user.desc}}
				</view>
			</view>
		</view>

		<view class="flex align-center" style="height: 40px;">
			<view @click="changeTitle(index)" class="flex-1 flex align-center justify-center"
				:class="currentIndex==index?'text-main':''" v-for="(titles, index) in scrollTitle" :key="index">
				{{titles.title}}
			</view>
		</view>

		<swiper :current="currentIndex" @change="ToSwiper" :duration="150" :style='"height:"+windowHeight+"px;"'>
			<swiper-item v-for="(i,index) in scrollTitle" :key="index">
				<scroll-view scroll-y="true" :style='"height:"+windowHeight+"px;"'>
					<view class="f-divider"></view>
					<block v-for="(item,index) in list[currentIndex].data.rows" :key="index">
				<StyleList3  v-if="currentIndex==0"  :videoTitle="item.title"
				:publishTime="item.created_time" :hits="item.play_count" :danMus="item.danmu_count" :cover="item.cover">
				</StyleList3>
				
				<StyleList3  v-else  :videoTitle="item.video.title"
				:publishTime="item.video.created_time" :hits="item.video.play_count" :danMus="item.video.danmu_count" :cover="item.video.cover">
				</StyleList3>
					</block>
					<view class="flex justify-center align-center font-sm mt-3" style="color: #ADADAD;">只显示最近十条最新数据</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import StyleList3 from '@/componets/StyleList3/StyleList3';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				followStatus: false,
				user_id: 0,
				userInfo: {
					user:{
						username:''
					}
				},
				currentIndex: 0,
				windowHeight: 0,
				scrollTitle: [
					{
						key:"videolist",
						title:"作品",
						page:1,
						loadText:"上拉加载更多"
					},
					{
						key:"fava_list",
						title:"收藏",
						page:1,
						loadText:"上拉加载更多"
					},
				],
				list:[{
					data:[]
				},{
					data:[]
				}]
			}
		},
		mounted() {
			let result = uni.getSystemInfoSync()
			this.windowHeight = result.windowHeight - 90 - result.statusBarHeight
		},
		onLoad(e) {
			this.user_id = e.user_id
			this.getUserDate()
			this.getData()
		},
   
        computed:{
			tab(){
				return this.scrollTitle[this.currentIndex]
			},
			url() {
				let t = this.tab
				return `/${t.key}/${t.page}?user_id=${this.user_id}`
			},
			...mapState({
				my_user_id:state=>{
					return state.user ? state.user.id : 0
				}
			}),
		},

		methods: {
			
			
			// 关注/取消关注
			doFollow(){
				let url = this.followStatus ? '/user/unfollow':'/user/follow'
				let msg = this.followStatus ? '取消关注' : '关注'
				this.$selfApi.post(url,{
					follow_id:this.user_id
				},{
					token:true
				}).then(res=>{
					this.followStatus = !this.followStatus
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					// console.log(res);
				}).catch(err=>{
					console.log(err);
				})
			},
			getUserDate() {
				this.$selfApi.get(`/user/user_info?user_id=${this.user_id}`, {
					token: true
				}).then(res => {
					// console.log(res)
					this.userInfo = res
					this.followStatus = res.follow
				})
			},
			
			getData(){
				let index = this.currentIndex
				let page = this.scrollTitle[index].page
				this.$selfApi.get(this.url).then(res=>{
					// console.log(res)
					this.list[index].data = page === 1 ? res : [...this.list[index].data,...res]
					this.scrollTitle[index].loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err=>{
					if(page > 1){
						this.scrollTitle[index].page--
					}
					this.scrollTitle[index].loadText = '上拉加载更多'
				})
			},


			changeTitle(index) {
				this.currentIndex = index
			},
			ToSwiper(e) {
				this.currentIndex = e.detail.current
				this.scrollTitle[this.currentIndex].page = 1
				this.getData()
			}
		},
		components: {
			StyleList3
		}
	}
</script>

<style>

</style>
