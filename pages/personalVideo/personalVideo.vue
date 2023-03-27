<template>
	<view>
		<block v-for="(item,index) in rows" :key="index">
			<StyleList3  :videoTitle="item.title"
				:publishTime="item.created_time" :hits="item.play_count" :danMus="item.danmu_count" :cover="item.cover">
			</StyleList3>
			<view class="flex align-center" style="height: 80rpx;">
				<view class="flex-1 flex justify-center align-center font" style="height: 100%;" hover-class="bg-light" @click="upDateVideo(item)">
					修改</view>
				<view class="flex-1 flex justify-center align-center font" style="height: 100%;" hover-class="bg-light"
					@click="toUserVideo(item)">视频</view>
				<view @click="toDelet(item)" class="flex-1 flex justify-center align-center font" style="height: 100%;" hover-class="bg-light">
					删除</view>
			</view>
			<view class="f-divider"></view>
		</block>
		<view v-if="rows.length==0" class="flex  flex-column  justify-center align-center mt-5">没有数据</view>
		<view  v-else-if="rows.length > 10"  class="flex align-center justify-center font-md text-secondary" style="height: 80rpx;" hover-class="bg-light">
			{{ loadText }}
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import StyleList3 from '@/componets/StyleList3/StyleList3.vue';
	export default {
		data() {
			return {
				page: 1,
				loadText:"上拉加载更多",
				rows:[]
			}
		},
		mounted() {
			this.getDate()
		},
		
		
		onPullDownRefresh() {
			this.page = 1
			this.getDate().then(res=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch(err=>{
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},
		
		
		onReachBottom() {
			if(this.loadText === '正在加载中...'){
				return
			}
			this.loadText = '正在加载中...'
			this.page=this.page+1
			this.getDate()
			
		},
		
		
		methods: {
			
			toDelet(item){
				this.$selfApi.post('/video/destroy',{id:item.id},{token:true}).then(res=>{
					if(res=="ok"){
						uni.showToast({
							title:"删除成功",
							icon:'none'
						})
						this.getDate()
					}
				})
			},
			
			getDate() {
				let api = `/videolist/${this.page}?user_id=${this.userId}`
				return this.$selfApi.get(api).then(res => {
					if(this.page==1){
						// console.log(res)
						this.rows= res.rows
					}else{
						this.rows=[...this.rows,...(res.rows)]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err=>{
					if(this.page>1){
						this.page--
					}
				})
			},

			toUserVideo(item) {
				uni.navigateTo({
					url: "/pages/user-video/user-video?id="+item.id
				})
			},
			upDateVideo(item){
				uni.navigateTo({
					url:`/pages/presonalWorks/presonalWorks?date=${encodeURIComponent(JSON.stringify(item))}`
				})
				// console.log(encodeURIComponent(JSON.stringify(item)))
			}
		},
		computed: {
			...mapState({
				userId: (state) => state.user.id
			})
		},
		components: {
			StyleList3
		}
	}
</script>

<style>

</style>
