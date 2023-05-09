<template>
	<view class="watching">
		<!-- 追剧记录 -->
		<view class="watching_view">
			<view class="watching_title">观看记录</view>
			<view class="watching_view_select">
				<template v-if="viewList.length">
					<block v-for="(item, index) in viewList" :key="item.tvId">
						<template v-if="index < 6">
							<playItem class="watching_select_component" :cover="item.tvImage" :title="item.tvName" @click.native="$goJump(`/pages_square/screening/screening?id=${ item.tvId }&series=${ item.series - 1 }`, 'token')"></playItem>
						</template>
					</block>
				</template>
				<template v-else>
					<view class="no-data">暂无数据</view>
				</template>
			</view>
			<template v-if="viewList.length > 6">
				<view class="watching_view_more" @click="$goJump('/pages_mine/record/spectate', 'token')">
					<view>查看更多</view>
					<image src="../../static/pageImages/more_icon.png" mode=""></image>
				</view>
			</template>
		</view>
		<!-- 我的追剧 -->
		<view class="watching_mine">
			<view class="watching_title">我的追剧</view>
			<template v-if="likeList.length">
				<view class="watching_mine_select">
					<block v-for="item in likeList" :key="item.tvId">
						<view class="watching_mine_item" @click="$goJump(`/pages_square/screening/screening?id=${ item.tvId }&series=${ item.series - 1 }`, 'token')">
							<image class="watching_item_cover" :src="item.tvImage || ''" mode="aspectFill"></image>
							<view class="watching_item_content">
								<view class="watch_content_name">{{ item.tvName || '' }}</view>
								<view class="watch_content_info">
									<view class="content_info_left">
										<view class="content_left_head">更新至 <text>第{{ item.numUpdate || 0 }}集</text></view>
										<view class="content_left_desc">看到 <text>{{ item.tvName ||'' }}第{{ item.series || 0 }}集</text></view>
									</view>
									<text class="content_info_icon iconfont icon-icmore"></text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</template>
			<template v-else>
				<view class="watching_mine_nodata">
					<image class="watching_nodata_icon" src="../../static/pageImages/no_play.png" mode=""></image>
					<view class="watching_nodata_desc">暂无追剧</view>
					<image class="watching_nodata_btn" src="../../static/pageImages/watch_btn.png" mode="" @click="guWatchingHandle"></image>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewList: [],
				likeList: []
			}
		},
		onShow() {
			const userid = uni.getStorageSync('userid');
			if(!userid) return;
			this.getViewRecordData();
			this.getMyLikeData();
		},
		methods: {
			// 获取观看记录
			async getViewRecordData() {
				const { code, message, result } = await this.$http('/record');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.viewList = result || [];
			},
			// 获取我的追剧
			async getMyLikeData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/like');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.likeList = result || [];
				uni.hideLoading();
			},
			// 去追剧跳转首页
			guWatchingHandle() {
				uni.switchTab({ url: '/pages/square/square' });
			}
		}
	}
</script>

<style>page { min-height: 100vh; background: linear-gradient(180deg,#ffffff, #f6f7f8); }</style>
<style lang="scss" scoped>
	.watching { padding: 0 20rpx; min-height: 100vh; background: linear-gradient(180deg,#ffffff, #f6f7f8); }
	.watching_view {
		.watching_view_select {
			padding-top: 20rpx; display: flex; flex-wrap: wrap;
			.watching_select_component {
				margin: 0 12rpx 20rpx 0;
				&:nth-child(3n+3) { margin-right: 0; }
			}
		}
		.watching_view_more {
			padding: 12rpx 0; display: flex; align-items: center; justify-content: center;
			view { font-size: 28rpx; color: $color; }
			image { width: 28.48rpx; height: 28.48rpx; margin-left: 16rpx; }
		}
	}
	.watching_mine {
		padding-top: 40rpx;
		.watching_mine_select {
			.watching_mine_item {
				display: flex; align-items: center; margin-top: 32rpx;
				.watching_item_cover { width: 228rpx; height: 364rpx; border-radius: 10rpx; }
				.watching_item_content {
					flex: 1; padding-left: 22rpx; padding-right: 28rpx;
					.watch_content_name { font-size: 32rpx; color: #333; }
					.watch_content_info {
						padding-top: 60rpx; display: flex; align-items: center; justify-content: space-between;
						.content_info_left {
							.content_left_head {
								display: flex; align-items: center;
								font-size: 28rpx; color: #333;
								text { font-weight: bold; margin-left: 8rpx; }
							}
							.content_left_desc {
								display: flex; align-items: center; margin-top: 32rpx;
								font-size: 28rpx; color: #333;
								text { color: $color; margin-left: 8rpx; }
							}
						}
						.content_info_icon { font-size: 48rpx; color: #333; }
					}
				}
			}
		}
		.watching_mine_nodata {
			display: flex; flex-direction: column; align-items: center;
			.watching_nodata_icon { width: 320rpx; height: 256rpx; }
			.watching_nodata_desc { padding: 32rpx 0; font-size: 28rpx; color: #999; }
			.watching_nodata_btn { width: 248rpx; height: 72rpx; }
		}
	}
	.watching_title { font-size: 32rpx; font-weight: bold; color: #333; padding: 0 4rpx; }
</style>