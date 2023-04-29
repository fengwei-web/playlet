<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.getUserInfoData();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 获取用户信息并存储
			async getUserInfoData() {
				const userid = uni.getStorageSync('userid');
				if(!userid) return;
				const { code, result } = await this.$http('/user');
				if(code !== 200) return;
				this.$store.commit('setUserInfo', result);
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
