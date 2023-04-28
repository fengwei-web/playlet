<template>
	<view class="login">
		<view class="login_head">
			<image src="../../static/pageImages/logo_icon.png" mode=""></image>
			<text>短剧小程序</text>
		</view>
		<view class="login_opens">
			<view class="login_opens_loginBtn" @click="weixinLoginHandle">用户一键登录</view>
			<button @click="getUserInfos">用户一键登录</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				osName: '',
				deviceModel: ''
			}
		},
		onLoad(option) {
			const { deviceModel, osName } = uni.getSystemInfoSync();
			this.osName = osName || ''; this.deviceModel = deviceModel || '';
			console.log(this.list)
		},
		computed: {
			...mapState(['list'])
		},
		methods: {
			getUserInfos(event) {
				wx.getUserProfile({
					desc: '获取您的微信个人信息',
					success:(res)=>{
						console.log(res)
					},
					fail:function(e){
							wx.showToast({
								title: '你选择了取消',
								icon: "none",
								duration: 1500,
								mask: true
							})
					}
				})
			},
			// 微信一键登录
			weixinLoginHandle() {
				uni.login({
					success: ({ code }) => {
						this.setLoginAjax(code);
					},
					fail: error => {
						uni.showToast({ title: '登录失败！', icon: 'none' })
					}
				})
			},
			// 登录接口请求
			async setLoginAjax(code) {
				const appid = 'wx6b96da9ef24474f8';
				const params = { appid, code, model: this.deviceModel, systemType: this.osName };
				uni.showLoading({ mask: true });
				const { code: status, result, message } = await this.$http('/login', params, 'POST');
				if(status !== 200) return uni.showToast({ title: message, icon: 'none' });
				uni.setStorageSync('userid', result.id);
				this.getUserInfoData();
			},
			// 获取用户信息并存储
			async getUserInfoData() {
				const { code, result } = await this.$http('/user');
				this.$store.commit('setUserInfo', result);
				uni.showToast({ title: '登录成功', icon: 'none' });
				uni.$emit('updatePageData');
				setTimeout(() => { uni.navigateBack({ delta: 1 }) }, 500)
			},
			...mapMutations(['setUserInfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.login { display: flex; flex-direction: column; align-items: center; }
	.login_head {
		height: 650rpx;
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		image { width: 120rpx; height: 120rpx; }
		text { font-size: 28rpx; color: #333; margin-top: 20rpx; }
	}
	.login_opens {
		.login_opens_loginBtn {
			width: 690rpx; height: 88rpx; border-radius: 44rpx; background: $color;
			display: flex; align-items: center; justify-content: center;
			font-size: 28rpx; color: #fff;
		}
	}
</style>