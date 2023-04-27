<template>
	<view class="login">
		<view class="login_head">
			<image src="../../static/logo.png" mode=""></image>
			<text>短剧小程序</text>
		</view>
		<view class="login_opens">
			<view class="login_opens_loginBtn" @click="weixinLoginHandle">用户一键登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// 微信一键登录
			weixinLoginHandle() {
				uni.login({
					success(res) {
						console.log(res);
					}
				})
			}
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