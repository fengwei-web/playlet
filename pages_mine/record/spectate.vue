<template>
	<view class="spectate">
		<template v-if="viewList.length">
			<block v-for="item in viewList" :key="item.tvId">
				<view class="spectate_select">
					<image class="spectate_select_cover" :src="item.tvImage || ''" mode="aspectFill"></image>
					<view class="spectate_select_content">
						<view class="select_content_title">{{ item.tvName || '' }}</view>
						<view class="select_content_look">看到{{ item.tvName || '' }}第{{ item.series || 0 }}集</view>
						<view class="select_content_all">{{ item.numUpdate || 0 }}集全</view>
					</view>
					<view class="spectate_select_btn" @click="$goJump(`/pages_square/screening/screening?id=${ item.tvId }&series=${ item.series - 1 }`, 'token')">继续观看</view>
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
				viewList: []
			}
		},
		onLoad() {
			this.getViewRecordData();
			uni.$on('updateRecord', () => {
				this.getViewRecordData();
			})
		},
		methods: {
			// 获取观看记录
			async getViewRecordData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/record');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.viewList = result || [];
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.spectate { padding: 12rpx 24rpx; padding-bottom: 32rpx; }
	.spectate_select {
		margin-top: 20rpx; display: flex; align-items: center;
		.spectate_select_cover { width: 178rpx; height: 262rpx; border-radius: 16rpx; }
		.spectate_select_content {
			flex: 1; padding: 0 20rpx;
			.select_content_title {
				font-size: 32rpx; color: #333;
				overflow: hidden; text-overflow: ellipsis;
				display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
			}
			.select_content_look {
				font-size: 24rpx; color: #999; margin-top: 44rpx;
				overflow: hidden; text-overflow: ellipsis;
				display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
			}
			.select_content_all {
				font-size: 24rpx; color: #999; margin-top: 38rpx;
				overflow: hidden; text-overflow: ellipsis;
				display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
			}
		}
		.spectate_select_btn {
			width: 216rpx; height: 72rpx; border-radius: 36rpx; background: $color;
			display: flex; align-items: center; justify-content: center;
			font-size: 30rpx; color: #fff;
		}
	}
</style>