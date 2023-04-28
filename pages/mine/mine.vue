<template>
	<view class="mine">
		<!-- 用户信息 -->
		<view class="mine_user">
			<image class="mine_user_avatar" :src="loginData.icon || '../../static/pageImages/default_avatar.png'" mode="aspectFill"></image>
			<view class="mine_user_info">
				<view class="mine_info_title">{{ loginData.nickname || '微信用户' }}</view>
				<view class="mine_info_major">用户名ID：{{ loginData.id || 000000 }}</view>
				<view class="mine_info_remainder">我的U币：{{ loginData.balance || 0 }} U币</view>
			</view>
		</view>
		<!-- 三个记录 -->
		<view class="mine_take">
			<block v-for="item in takeList" :key="item.id">
				<view class="mine_take_item" @click="takeItemHandleEvent(item)">
					<view class="mine_take_title">
						<image :src="item.icon || ''" mode=""></image> {{ item.title || '' }}
					</view>
					<text class="mine_take_icon iconfont icon-youjiantou"></text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				takeList: [
					{ id: 1, icon: '../../static/pageImages/info01.png', title: '观看记录', url: '/pages/watching/watching' },
					{ id: 2, icon: '../../static/pageImages/info02.png', title: '消费记录', url: '/pages_mine/record/consumption' },
					{ id: 3, icon: '../../static/pageImages/info03.png', title: '充值记录', url: '/pages_mine/record/recharge' }
				]
			}
		},
		computed: {
			...mapState(['loginData'])
		},
		methods: {
			// take的每一项点击事件
			takeItemHandleEvent({ id, url }) {
				if(id !== 1) return this.$goJump(url, 'token');
				uni.switchTab({ url });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine {}
	.mine_user {
		padding: 36rpx 20rpx; padding-bottom: 55rpx;
		display: flex; align-items: center;
		.mine_user_avatar { width: 120rpx; height: 120rpx; border-radius: 50%; }
		.mine_user_info {
			flex: 1; padding-left: 20rpx;
			.mine_info_title { font-size: 36rpx; font-weight: bold; color: #333; }
			.mine_info_major, .mine_info_remainder { font-size: 24rpx; color: #999; margin-top: 6rpx; }
		}
	}
	.mine_take {
		padding: 0 48rpx;
		.mine_take_item {
			margin-top: 52rpx;
			display: flex; align-items: center; justify-content: space-between;
			.mine_take_title {
				font-size: 32rpx; color: #333; display: flex; align-items: center;
				image { width: 44rpx; height: 44rpx; margin-right: 16rpx; }
			}
			.mine_take_icon { font-size: 32rpx; color: #C1C1C3; }
		}
	}
</style>