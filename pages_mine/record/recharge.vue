<template>
	<view class="recharge">
		<block v-for="item in rechargeList" :key="item.id">
			<view class="recharge_item">
				<view class="recharge_item_left">
					<view class="recharge_left_title">{{ item.title || '' }}</view>
					<view class="recharge_left_date">{{ item.date || '' }}</view>
				</view>
				<view class="recharge_item_right">
					<view class="recharge_right_price">+{{ item.price || '0.00' }}</view>
					<view class="recharge_right_desc">支付成功</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rechargeList: [
					{ id: 1, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 2, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 3, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 4, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 5, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 6, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 7, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 8, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 9, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' },
					{ id: 10, title: '道聚城：100元礼包*1', date: '2023-4-13 21:42', price: '97.00' }
				]
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