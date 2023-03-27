import App from './App'

import $selfApi from '@/common/request.js';
Vue.prototype.$selfApi = $selfApi

import store from '@/store/index.js';
Vue.prototype.$store = store

Vue.prototype.userPower = (options) => {
	if (!store.state.token) {
		setTimeout(() => {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
		}, 500);
		uni.navigateTo({
			url: '/pages/login/login'
		});
	} else {
		uni.navigateTo({
			url: `${options}`
		})
	}
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
