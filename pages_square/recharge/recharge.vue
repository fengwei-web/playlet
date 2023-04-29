<template>
	<view class="recharge">
		<view class="recharge_balance">账户余额：<text>{{ loginData.balance || 0 }}</text> U币</view>
		<!-- 充值选项 -->
		<view class="recharge_option">
			<block v-for="(item, index) in rechargeList" :key="item.id">
				<view class="recharge_option_list" :class="{ 'active': currentIndex == index }" @click="rechargeItemHandle(index)">
					<view class="recharge_list_regular">
						<view class="recharge_list_regular_price">{{ item.amount || 0 }}元</view>
						<view class="recharge_list_regular_get">{{ item.mes || '' }}</view>
					</view>
					<template v-if="item.mes2">
						<view class="recharge_list_many">{{ item.mes2 || '' }}</view>
					</template>
				</view>
			</block>
		</view>
		<!-- 广告 -->
		<view class="recharge_advert" @click="advertHandle">
			<image class="recharge_advert_cover" src="../../static/pageImages/recharge_advert.png" mode=""></image>
		</view>
		<!-- 充值说明 -->
		<view class="recharge_prove">
			<view class="recharge_prove_title">充值说明：</view>
			<view class="recharge_prove_desc">虚拟商品，已经购买不得退换</view>
			<view class="recharge_prove_content">用户使用K币解锁剧集，后期重复观看无需重新解锁充值后到账可能有延迟，2小时内未到账请与客服联系。</view>
			<view class="recharge_prove_content">未满18周岁的未成年人，应在父母或其他监护人的监护、指导、同意下进行如付费充值、付费 阅读等相关操作</view>
			<view class="recharge_prove_content">在本平台所做的任何操作将视为已获得您的父母或其他监护人的同意并由您和您的父母或其他监护人承担相关法律责任</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				currentIndex: null,
				rechargeList: []
			}
		},
		onLoad() {
			this.getRechargeData();
		},
		computed: {
			...mapState(['loginData'])
		},
		methods: {
			// 获取充值列表
			async getRechargeData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/scheme');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.rechargeList = result || [];
				uni.hideLoading();
			},
			// 点击广告匹配一年
			advertHandle() {
				let index = null;
				this.rechargeList.forEach((item, itemIndex) => {
					if(item.amount === 365) index = itemIndex;
				})
				if(index === null) return;
				this.rechargeItemHandle(index);
			},
			// 点击列表项选中并下单支付
			rechargeItemHandle(index) {
				if(index === this.currentIndex) return this.currentIndex = null;
				this.currentIndex = index;
				// 调用下单接口
				this.setPlaceOrderAjax()
			},
			// 调用下单接口
			async setPlaceOrderAjax() {
				const appid = 'wx6b96da9ef24474f8';
				const schemeId = this.rechargeList[this.currentIndex].id
				const params = { appid, schemeId };
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/order', params);
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				uni.showToast({ title: '下单成功', icon: 'none' });
				this.setPaymentAjax(result);
			},
			// 支付
			setPaymentAjax(result) {
				const option = {
					provider: 'wxpay', timeStamp: result.timestamp,
					nonceStr: result.nonceStr, package: result.packageVal,
					signType: result.signType, paySign: result.paySign
				}
				uni.requestPayment({
					...option,
					success: res => {
						this.currentIndex = null;
						this.getUserInfoData();
						uni.showToast({ title: '支付成功', icon: 'none' });
					},
					fail: error => {
						uni.showToast({ title: '支付失败', icon: 'none' });
					}
				})
			},
			// 获取用户信息并存储
			async getUserInfoData() {
				const { code, result } = await this.$http('/user');
				if(code !== 200) return;
				this.$store.commit('setUserInfo', result);
			},
			...mapMutations(['setUserInfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.recharge { padding: 0 24rpx; }
	.recharge_balance {
		padding: 40rpx 0; display: flex; align-items: center;
		font-size: 28rpx; color: #1D1D1D;
		text { color: $color; margin-right: 16rpx; }
	}
	.recharge_option {
		display: flex; flex-wrap: wrap; justify-content: space-between;
		.recharge_option_list {
			width: 338rpx; background: rgba(255, 255, 255, .11); border: 2rpx solid #f5f5f5;
			border-radius: 16rpx; margin-top: 20rpx; overflow: hidden;
			.recharge_list_regular {
				padding: 16rpx 24rpx;
				.recharge_list_regular_price { font-size: 38rpx; font-weight: bold; color: #333 }
				.recharge_list_regular_get {
					font-size: 24rpx; color: #999; margin-top: 8rpx;
					overflow: hidden; text-overflow: ellipsis;
					display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
				}
			}
			.recharge_list_many {
				padding: 4rpx 0; border-top: 2rpx solid #f5f5f5;
				font-size: 28rpx; color: $color; text-align: center;
			}
			&.active {
				background: rgba(233, 89, 37, .11); border-color: $color;
				.recharge_list_regular {
					.recharge_list_regular_price { color: $color; }
				}
				.recharge_list_many { background: $color; color: #fff; }
			}
		}
	}
	.recharge_advert {
		height: 208rpx; padding: 0 8rpx; margin-top: 60rpx;
		.recharge_advert_cover { width: 100%; height: 100%; border-radius: 16rpx; }
	}
	.recharge_prove {
		padding: 36rpx 0; padding-bottom: 78rpx;
		.recharge_prove_title { font-size: 24rpx; color: #666; }
		.recharge_prove_desc { padding: 16rpx 0 6rpx 0; font-size: 24rpx; color: #666 }
		.recharge_prove_content { font-size: 22rpx; color: #666; line-height: 40rpx; margin-top: 10rpx; }
	}
</style>