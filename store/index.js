import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let state = {
	loginData: {}
}
let mutations = {
	// 更新用户信息
	setUserInfo(state, newUserInfo) {
		if(!newUserInfo) return;
		state.loginData = newUserInfo;
		uni.setStorageSync('userInfo', newUserInfo);
	}
}
const store = new Vuex.Store({
	state, mutations
})

export default store;