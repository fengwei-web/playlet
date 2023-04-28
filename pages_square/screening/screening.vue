<template>
	<view class="screening">
		<!-- 视频展示区域 -->
		<view class="screening_videoRegion">
			<view class="screening_videoRegion_mainBody">
				<video
					id="myVideo"
					class="videoRegin_mainBody_video"
					:src="srcUrl"
					:initial-time="initialTime"
					:controls="true"
					:show-play-btn="false"
					:show-center-play-btn="false"
					:show-fullscreen-btn="false"
					@timeupdate="videoTimeUpdateHandle"
					@ended="videoEndedHandle"
				></video>
				<template v-if="!isPlay">
					<view class="videoRegin_mainBody_play" @click="videoPlayHandle(true)">
						<image class="videoRegin_mainBody_play_icon" src="../static/start_icon.png" mode=""></image>
						<view class="videoRegin_mainBody_play_text">00:00</view>
					</view>
				</template>
			</view>
			
			<view class="screening_videoRegion_ability">
				<view class="videoRegion_ability_list">
					<image class="videoRegion_ability_list_icon" src="../static/like_icon.png" mode=""></image>
					<view class="videoRegion_ability_list_text">100</view>
				</view>
				<view class="videoRegion_ability_list">
					<image class="videoRegion_ability_list_icon" src="../static/share_icon.png" mode=""></image>
					<view class="videoRegion_ability_list_text">分享</view>
				</view>
				<view class="videoRegion_ability_list">
					<image class="videoRegion_ability_list_icon" src="../static/watching_icon.png" mode=""></image>
					<view class="videoRegion_ability_list_text">追剧</view>
				</view>
			</view>
		</view>
		<!-- 底部展示及操作按钮 -->
		<view class="screening_footer">
			<view class="screening_footer_info">
				<view class="screening_footer_dramaname">狂飙</view>
				<view class="screening_footer_diversity">狂飙第一集</view>
			</view>
			<view class="screening_footer_option">
				<view class="screening_footer_open">
					<view class="screening_footer_openItem">
						<image class="screening_footer_openItem_icon" src="../static/prev_icon.png" mode=""></image>
						<view class="screening_footer_openItem_text">上集</view>
					</view>
					<template v-if="!isPlay">
						<view class="screening_footer_openItem" @click="videoPlayHandle(true)">
							<image class="screening_footer_openItem_icon" src="../static/suspend_icon.png" mode=""></image>
							<view class="screening_footer_openItem_text">播放</view>
						</view>
					</template>
					<template v-else>
						<view class="screening_footer_openItem" @click="videoPlayHandle(false)">
							<image class="screening_footer_openItem_icon" src="../static/play_icon.png" mode=""></image>
							<view class="screening_footer_openItem_text">暂停</view>
						</view>
					</template>
					<view class="screening_footer_openItem">
						<image class="screening_footer_openItem_icon" src="../static/next_icon.png" mode=""></image>
						<view class="screening_footer_openItem_text">下集</view>
					</view>
				</view>
				<view class="screening_footer_meet" @click="isMeet = true;">
					<image class="screening_footer_meet_icon" src="../static/drama_icon.png" mode=""></image>
					<view class="screening_footer_meet_text">剧集</view>
				</view>
			</view>
		</view>
		<!-- 剧集选择区域 -->
		<template v-if="isMeet">
			<view class="screening_meetSelect animate__animated animate__fadeIn" @click="isMeet = false;">
				<view class="screening_meetSelect_content" @click.stop="isMeet = true;">123123123</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcUrl: 'http://47.93.9.90/img/1636141647.mp4',
				initialTime: 0,
				videoContext: null,
				isPlay: false,
				isMeet: false
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		onUnload() {
			this.videoContext = null;
		},
		methods: {
			// 播放暂停事件
			videoPlayHandle(isPlay) {
				this.isPlay = isPlay;
				if(isPlay) return this.videoContext.play();
				this.videoContext.pause();
			},
			// 监听视频进度变化
			videoTimeUpdateHandle({ detail }) {
				this.initialTime = detail.currentTime;
			},
			// 监听视频播放到结尾
			videoEndedHandle() {
				this.isPlay = false;
				this.initialTime = 0;
			}
		}
	}
</script>

<style>page { background: #000; }</style>
<style lang="scss" scoped>
	.screening { height: 100%; display: flex; flex-direction: column; }
	.screening_videoRegion {
		flex: 1; color: #fff; position: relative;
		.screening_videoRegion_mainBody {
			width: 100%; height: 100%; position: relative;
			.videoRegin_mainBody_video { width: 100%; height: 100%; }
			.videoRegin_mainBody_play {
				position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
				display: flex; flex-direction: column; align-items: center;
				.videoRegin_mainBody_play_icon { width: 64rpx; height: 64rpx; }
				.videoRegin_mainBody_play_text { font-size: 32rpx; margin-top: 4rpx; }
			}
		}
		.screening_videoRegion_ability {
			padding: 0 24rpx; position: absolute; right: 0; bottom: 0;
			.videoRegion_ability_list {
				display: flex; flex-direction: column; align-items: center; margin-bottom: 32rpx;
				.videoRegion_ability_list_icon { width: 60rpx; height: 60rpx; }
				.videoRegion_ability_list_text { font-size: 24rpx; margin-top: 5rpx; }
				&:last-of-type { margin-bottom: 100rpx; }
			}
		}
	}
	.screening_footer {
		height: 114rpx; padding: 0 24rpx; color: #fff;
		display: flex; align-items: center; justify-content: space-between;
		.screening_footer_info {
			flex: 1; flex-shrink: 0;
			.screening_footer_dramaname { font-size: 28rpx; font-weight: bold; }
			.screening_footer_diversity { font-size: 24rpx; margin-top: 8rpx; }
		}
		.screening_footer_option {
			display: flex; align-items: center;
			.screening_footer_open {
				display: flex; align-items: center;
				.screening_footer_openItem {
					display: flex; flex-direction: column; align-items: center;
					.screening_footer_openItem_icon { width: 40rpx; height: 40rpx; }
					.screening_footer_openItem_text { font-size: 24rpx; margin-top: 16rpx; }
					&:nth-child(2) { margin: 0 64rpx; }
				}
			}
			.screening_footer_meet {
				display: flex; flex-direction: column; align-items: center;
				padding-left: 68rpx; padding-right: 36rpx;
				.screening_footer_meet_icon { width: 48rpx; height: 48rpx; }
				.screening_footer_meet_text { font-size: 24rpx; margin-top: 8rpx; }
			}
		}
	}
	.screening_meetSelect {
		position: fixed; left: 0; right: 0; top: 0; bottom: 0;
		display: flex; align-items: flex-end; background: rgba(0, 0, 0, .4);
		.screening_meetSelect_content {
			height: 300rpx; width: 100%; background: #fff;
		}
	}
</style>