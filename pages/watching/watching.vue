<template>
	<view class="watching">
		<!-- 追剧记录 -->
		<view class="watching_view">
			<view class="watching_title">观看记录</view>
			<view class="watching_view_select">
				<block v-for="item in viewList" :key="item.id">
					<playItem class="watching_select_component" :item="item"></playItem>
				</block>
			</view>
		</view>
		<!-- 我的追剧 -->
		<view class="watching_mine">
			<view class="watching_title">我的追剧</view>
			<view class="watching_mine_select">
				<block v-for="item in 2" :key="item">
					<view class="watching_mine_item">
						<image class="watching_item_cover" src="../../static/pageImages/play01.png" mode="aspectFill"></image>
						<view class="watching_item_content">
							<view class="watch_content_name">狂飙</view>
							<view class="watch_content_info">
								<view class="content_info_left">
									<view class="content_left_head">更新至 <text>第三十五集</text></view>
									<view class="content_left_desc">看到 <text>狂飙第一集</text></view>
								</view>
								<text class="content_info_icon iconfont icon-icmore"></text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewList: [
					{ id: 1, image: '../../static/pageImages/play01.png', title: '狂飙' },
					{ id: 2, image: '../../static/pageImages/play02.png', title: '杀破狼' },
					{ id: 3, image: '../../static/pageImages/play03.png', title: '妖狐小红娘' },
					// { id: 4, image: '../../static/pageImages/play04.png', title: '你是我的荣耀' },
					// { id: 5, image: '../../static/pageImages/play05.png', title: '司藤' },
					// { id: 6, image: '../../static/pageImages/play06.png', title: '梦华录' },
				]
			}
		}
	}
</script>

<style>page { min-height: 100vh; background: linear-gradient(180deg,#ffffff, #f6f7f8); }</style>
<style lang="scss" scoped>
	.watching { padding: 0 20rpx; min-height: 100vh; background: linear-gradient(180deg,#ffffff, #f6f7f8); }
	.watching_view {
		.watching_view_select {
			padding-top: 32rpx; display: grid; grid-template-columns: auto auto auto;
			.watching_select_component {
				margin: 0 16rpx 20rpx 0;
			}
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
	}
	.watching_title { font-size: 32rpx; font-weight: bold; color: #333; padding: 0 4rpx; }
</style>