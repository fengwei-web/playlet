<template>
	<view class="opera">
		<block v-for="item in scrollList" :key="item.id">
			<playItem class="opera_component" :item="item" />
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					{ id: 12, image: '../../static/pageImages/play06.png', title: '梦华录' },
					{ id: 13, image: '../../static/pageImages/play01.png', title: '狂飙' },
					{ id: 14, image: '../../static/pageImages/play02.png', title: '杀破狼' },
					{ id: 15, image: '../../static/pageImages/play03.png', title: '妖狐小红娘' },
					{ id: 16, image: '../../static/pageImages/play04.png', title: '你是我的荣耀' },
					{ id: 17, image: '../../static/pageImages/play05.png', title: '司藤' },
					{ id: 18, image: '../../static/pageImages/play06.png', title: '梦华录' }
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.opera {
		padding: 0 20rpx; display: grid; grid-template-columns: auto auto auto;
		.opera_component {
			margin: 0 16rpx 20rpx 0;
		}
	}
</style>