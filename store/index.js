import Vue from "vue"
import Vuex from "vuex"
import $selfApi from '@/common/request.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		user:false,
		token:false
	},
	actions:{
		login({state},user){
			state.user = user
			state.token=user.token
			uni.setStorageSync('user',JSON.stringify(user))
			uni.setStorageSync('token',user.token)
		},
		
		initUser({state}){
			let userInfo=uni.getStorageSync('user')
			if(userInfo){
				userInfo=JSON.parse(userInfo)
				state.user=userInfo
				state.token=userInfo.token
			}
		},
		loginOut({state}){
			$selfApi.post('/users/loginout',{},{token:true})
			state.user=false
			state.token=false
			uni.removeStorageSync('user')
			uni.removeStorageSync("token")
		}
	}
})
