<template>
	<view class="square_scroll_item">
		<image class="scroll_item_cover" :src="cover || ''" mode="aspectFill"></image>
		<view class="scroll_item_title">{{ title || '' }}</view>
	</view>
</template>

<script>
	export default {
		props: ['cover', 'title']
	}
</script>

<style lang="scss" scoped>
	.square_scroll_item {
		width: 228rpx; background: #fff; border-radius: 16rpx; overflow: hidden;
		box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(235,235,235,0.40);
		.scroll_item_cover { width: 100%; height: 364rpx; }
		.scroll_item_title {
			padding: 12rpx 16rpx; font-size: 28rpx; color: #333;
			overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
		}
		&:nth-child(3n+3) { margin-right: 0; }
	}
</style>