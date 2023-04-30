<template>
	<view class="opera">
		<template v-if="scrollList.length">
			<block v-for="item in scrollList" :key="item.id">
				<playItem
					class="opera_component"
					:cover="item.tvImage"
					:title="item.tvName"
					@click.native="$goJump(`/pages_square/screening/screening?id=${ item.id }`, 'token')"
				/>
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
				scrollList: []
			}
		},
		onLoad() {
			this.getMustData();
		},
		methods: {
			// 获取必看数据
			async getMustData() {
				uni.showLoading({ mask: true });
				const { code, message, result } = await this.$http('/top');
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.scrollList = result || [];
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.opera {
		padding: 0 20rpx; padding-top: 20rpx; display: flex; flex-wrap: wrap;
		.opera_component {
			margin: 0 12rpx 20rpx 0;
			&:nth-child(3n+3) { margin-right: 0; }
		}
	}
</style>