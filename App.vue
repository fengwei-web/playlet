<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		onLaunch: function({ query }) {
			uni.showModal({
				title: '参数',
				content: JSON.stringify(query)
			})
			if(!query.caId) return this.weixinLoginHandle();
			const optionData = { caId: query.caId, planId: query.planId, bd_vid: query.bd_vid };
			this.weixinLoginHandle(optionData);
		},
		methods: {
			// 微信一键登录
			weixinLoginHandle(optionData) {
				const { deviceModel, osName } = uni.getSystemInfoSync();
				uni.login({
					success: ({ code }) => {
						this.setLoginAjax(code, deviceModel, osName, optionData);
					},
					fail: error => {
						uni.showToast({ title: '登录失败！', icon: 'none' })
					}
				})
			},
			// 登录接口请求
			async setLoginAjax(code, model, systemType, optionData) {
				const appid = 'wx6b96da9ef24474f8';
				let params = { appid, code, model, systemType };
				params = optionData ? { ...params, ...optionData } : params;
				uni.showLoading({ mask: true });
				const { code: status, result, message } = await this.$http('/login', params, 'POST');
				if(status !== 200) return uni.showToast({ title: message, icon: 'none' });
				uni.setStorageSync('userid', result.id);
				this.getUserInfoData();
			},
			// 获取用户信息并存储
			async getUserInfoData() {
				const { code, result } = await this.$http('/user');
				if(code !== 200) return;
				this.$store.commit('setUserInfo', result);
				uni.hideLoading();
				this.$isResolve()
			},
			...mapMutations(['setUserInfo'])
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url('./common/css/animate.css');
	@import url('./common/css/flex.css');
	@import url('./common/css/reset.css');
	@import url('./common/font/iconfont.css');
</style>
