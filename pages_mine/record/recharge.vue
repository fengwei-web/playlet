<template>
	<view class="recharge">
		<template v-if="rechargeList.length">
			<block v-for="(item, index) in rechargeList" :key="index">
				<view class="recharge_item">
					<view class="recharge_item_left">
						<view class="recharge_left_title">{{ item.mes || '' }}</view>
						<view class="recharge_left_date">{{ item.creTime || '' }}</view>
					</view>
					<view class="recharge_item_right">
						<view class="recharge_right_price">+{{ item.coin || '0U币' }}</view>
						<view class="recharge_right_desc">支付成功</view>
					</view>
				</view>
			</block>
		</template>
		<template v-else>
			<view class="no-data">暂无数据</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rechargeList: []
			}
		},
		onLoad() {
			this.getRechargeRecordData();
		},
		methods: {
			// 获取充值记录
			async getRechargeRecordData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/recharge');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.rechargeList = result || [];
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recharge { padding: 0 26rpx; padding-right: 22rpx; }
	.recharge_item {
		padding: 32rpx 0; border-bottom: 2rpx solid #F2F2F2;
		display: flex; align-items: center; justify-content: space-between;
		.recharge_item_left, .recharge_item_right {
			.recharge_left_title, .recharge_right_price { font-size: 32rpx; color: #333; }
			.recharge_left_date, .recharge_right_desc { font-size: 24rpx; color: #999; margin-top: 8rpx; }
		}
		.recharge_right_desc { text-align: right; }
		&:last-of-type { border-bottom: none; }
	}
</style>