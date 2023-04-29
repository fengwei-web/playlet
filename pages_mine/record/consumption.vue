<template>
	<view class="consumption">
		<template v-if="consumptionList.length">
			<block v-for="item in consumptionList" :key="item.id">
				<view class="consumption_item">
					<view class="consumption_item_left">
						<view class="consumption_left_title">{{ item.mes || '' }}</view>
						<view class="consumption_left_date">{{ item.creTime || '' }}</view>
					</view>
					<view class="consumption_item_right">
						<view class="consumption_right_price">-{{ item.coin || '0U币' }}</view>
						<view class="consumption_right_desc">支付成功</view>
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
				consumptionList: []
			}
		},
		onLoad() {
			this.getConsumptionRecordData();
		},
		methods: {
			// 获取消费记录
			async getConsumptionRecordData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/expend');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.consumptionList = result || [];
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.consumption { padding: 0 26rpx; padding-right: 22rpx; }
	.consumption_item {
		padding: 32rpx 0; border-bottom: 2rpx solid #F2F2F2;
		display: flex; align-items: center; justify-content: space-between;
		.consumption_item_left, .consumption_item_right {
			.consumption_left_title, .consumption_right_price { font-size: 32rpx; color: #333; }
			.consumption_left_date, .consumption_right_desc { font-size: 24rpx; color: #999; margin-top: 8rpx; }
		}
		.consumption_right_desc { color: #fff !important; text-align: right; }
		&:last-of-type { border-bottom: none; }
	}
</style>