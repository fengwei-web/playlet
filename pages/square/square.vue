<template>
	<view class="square">
		<!-- 金刚区 -->
		<view class="square_giant flex flex--align-items--center flex--justify-content--space-around">
			<block v-for="item in giantList" :key="item.id">
				<view class="square_giant_item flex flex--row flex--align-items--center" @click="$goJump(item.url, 'token')">
					<image :src="item.image || ''" mode=""></image>
					<text>{{ item.title || '' }}</text>
				</view>
			</block>
		</view>
		<!-- 内容列表 -->
		<scroll-view :scroll-y="true" :style="{ height: `${ scrollHeight }px` }">
			<view class="square_scroll">
				<block v-for="item in scrollList" :key="item.id">
					<playItem class="square_scroll_component" :item="item" @click.native="$goJump(`/pages_square/screening/screening`, 'token')" />
				</block>
			</view>
		</scroll-view>
		<!-- 悬浮弹框 -->
		<template v-if="isFloat">
			<view class="square_float animate__animated animate__fadeInUp" :style="{ bottom: `${ floatBottom }px` }">
				<image class="square_float_cover" src="../../static/pageImages/play01.png" mode="aspectFill"></image>
				<view class="square_float_info">
					<view class="square_info_title">狂飙</view>
					<view class="square_info_desc">上次追到狂飙第二集</view>
				</view>
				<view class="square_float_btn">继续观看</view>
				<text class="square_float_close iconfont icon-guanbi" @click="isFloat = false"></text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFloat: false,
				scrollHeight: 457,
				floatBottom: 8,
				giantList: [
					{ id: 1, image: '../../static/pageImages/giant01.png', title: '排行', url: '/pages_square/opera/ranking' },
					{ id: 2, image: '../../static/pageImages/giant02.png', title: '更新', url: '/pages_square/opera/update' },
					{ id: 3, image: '../../static/pageImages/giant03.png', title: '必看', url: '/pages_square/opera/breaking' },
					{ id: 4, image: '../../static/pageImages/giant04.png', title: '充值', url: '/pages_square/recharge/recharge' }
				],
				page: 1,
				scrollList: [
					{ id: 1, image: '../../static/pageImages/play01.png', title: '狂飙' },
					{ id: 2, image: '../../static/pageImages/play02.png', title: '杀破狼' },
					{ id: 3, image: '../../static/pageImages/play03.png', title: '妖狐小红娘' },
					{ id: 4, image: '../../static/pageImages/play04.png', title: '你是我的荣耀' },
					{ id: 5, image: '../../static/pageImages/play05.png', title: '司藤' },
					{ id: 6, image: '../../static/pageImages/play06.png', title: '梦华录' },
					{ id: 7, image: '../../static/pageImages/play01.png', title: '狂飙' },
					{ id: 8, image: '../../static/pageImages/play02.png', title: '杀破狼' },
					{ id: 9, image: '../../static/pageImages/play03.png', title: '妖狐小红娘' },
					{ id: 10, image: '../../static/pageImages/play04.png', title: '你是我的荣耀' },
					{ id: 11, image: '../../static/pageImages/play05.png', title: '司藤' },
					{ id: 12, image: '../../static/pageImages/play06.png', title: '梦华录' }
				]
			}
		},
		onLoad() {
			// setTimeout(() => { this.isFloat = true; }, 500)
			this.getShortPlayData();
		},
		onReady() {
			this.getScrollHeight();
		},
		methods: {
			// 获取短剧列表
			async getShortPlayData() {
				uni.showLoading({ mask: true });
				const params = { pageNo: this.page, pageSize: 20 };
				const { code, message, result } = await this.$http('/tv', params);
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.scrollList = result || [];
			},
			// 获取页面剩余高度
			getScrollHeight() {
				const { windowHeight, windowBottom } = uni.getSystemInfoSync();
				this.floatBottom = windowBottom + uni.upx2px(20);
				const query = uni.createSelectorQuery().in(this);
				query.select('.square_giant').boundingClientRect(({ height }) => {
					this.scrollHeight = windowHeight - height;
				}).exec()
			}
		}
	}
</script>

<style>page { background: linear-gradient(180deg, #ffffff, #f6f7f8); }</style>
<style lang="scss" scoped>
	.square { padding: 0 20rpx; }
	.square_giant {
		padding: 40rpx 0;
		.square_giant_item {
			image { width: 96rpx; height: 96rpx; }
			text { font-size: 28rpx; color: #333; margin-top: 16rpx; }
		}
	}
	.square_scroll {
		display: grid; grid-template-columns: auto auto auto;
		.square_scroll_component {
			margin: 0 16rpx 20rpx 0;
		}
	}
	.square_float {
		width: 674rpx; height: 218rpx; background: rgba(51, 51, 51, .8);
		padding: 20rpx; box-sizing: border-box; border-radius: 16rpx; 
		position: fixed; bottom: 128rpx; z-index: 2; left: 38rpx;
		display: flex; align-items: center;
		.square_float_cover { width: 132rpx; height: 100%; border-radius: 16rpx; }
		.square_float_info {
			flex: 1; padding: 0 20rpx; color: #fff;
			.square_info_title { font-size: 28rpx; }
			.square_info_desc { font-size: 24rpx; margin-top: 20rpx; }
		}
		.square_float_btn {
			width: 216rpx; height: 72rpx; border-radius: 36rpx; background: $color;
			display: flex; align-items: center; justify-content: center;
			font-size: 30rpx; color: #fff;
		}
		.square_float_close {
			position: absolute; top: 20rpx; right: 20rpx;
			font-size: 28rpx; color: #fff;
		}
	}
</style>