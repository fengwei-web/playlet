<template>
	<view class="screening">
		<!-- 视频展示区域 -->
		<view class="screening_videoRegion">
			<view class="screening_videoRegion_mainBody">
				<video
					id="myVideo"
					class="videoRegin_mainBody_video"
					:src="currentEpisodeData.videoUrl"
					:poster="currentEpisodeData.tvImage"
					:initial-time="initialTime"
					:autoplay="isPlay"
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
					<button open-type="share"></button>
				</view>
				<view class="videoRegion_ability_list" @click="chaseShortHandle">
					<template v-if="!isLike">
						<image class="videoRegion_ability_list_icon" src="../static/watching_icon.png" mode=""></image>
					</template>
					<template v-else>
						<image class="videoRegion_ability_list_icon" src="../static/watching_select_icon.png" mode=""></image>
					</template>
					<view class="videoRegion_ability_list_text">追剧</view>
				</view>
			</view>
		</view>
		<!-- 底部展示及操作按钮 -->
		<view class="screening_footer">
			<view class="screening_footer_info">
				<view class="screening_footer_dramaname">{{ currentEpisodeData.title || '' }}</view>
				<view class="screening_footer_diversity">{{ currentEpisodeData.title || '' }}</view>
			</view>
			<view class="screening_footer_option">
				<view class="screening_footer_open">
					<view class="screening_footer_openItem" @click="prevEpisodeHandle">
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
					<view class="screening_footer_openItem" @click="nextEpisodeHandle">
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
				<view class="screening_meetSelect_content" @click.stop="isMeet = true;">
					<view class="meetSelect_content_head">
						<view class="meetSelect_head_name">{{ currentEpisodeData.title || 0 }}</view>
						<view class="meetSelect_head_desc">{{ shortDetailList.length || 0 }}集全</view>
					</view>
					<view class="meetSelect_content_list">
						<block v-for="(item, itemIndex) in shortDetailList" :key="itemIndex">
							<view class="meetSelect_content_item" @click.stop="selectSeriesHandle(item, itemIndex)">
								<template v-if="item.pay">
									<image class="meetSelect_item_lock" src="../static/lock_icon.png" mode=""></image>
								</template>
								<view class="meetSelect_item_name">第{{ item.series || 0 }}集</view>
								<template v-if="currentEpisodeData.series === item.series">
									<image class="meetSelect_item_select" src="../static/select_icon.png" mode=""></image>
								</template>
							</view>
						</block>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				currentEpisode: null,
				currentEpisodeData: {},
				shortDetailList: [],
				srcUrl: 'http://47.93.9.90/img/1636141647.mp4',
				initialTime: 0,
				videoContext: null,
				isLike: 0,
				isPlay: false,
				isMeet: false
			}
		},
		onLoad(option) {
			this.id = option.id ? parseInt(option.id) : 0;
			this.currentEpisode = option.series ? parseInt(option.series) : 0;
			this.getShortDetailData();
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		onUnload() {
			this.videoContext = null;
		},
		watch: {
			
			currentEpisode(newData) {
				this.setLookShortData();
			}
		},
		methods: {
			// 获取短剧详情数据
			async getShortDetailData() {
				const params = { id: this.id };
				uni.showLoading({ mask: true });
				const { code, message, result, like } = await this.$http('/tvDetailAll', params);
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				this.shortDetailList = result || [];
				this.currentEpisodeData = this.shortDetailList[this.currentEpisode];
				this.isLike = like;
				this.isPlay = true;
				uni.hideLoading();
			},
			// 看剧接口调用
			async setLookShortData() {
				const params = { tvId: this.id, series: this.currentEpisodeData.series }
				const { code } = await this.$http('/recordAdd', params);
				uni.$emit('updateRecord')
			},
			// 追剧
			chaseShortHandle() {
				if(!this.isLike) return this.setChaseShortAjax('/likeAdd');
				this.setChaseShortAjax('/likeDel')
			},
			// 追剧接口调用
			async setChaseShortAjax(url) {
				const params = { tvId: this.id };
				uni.showLoading({ mask: true });
				const { code, message } = await this.$http(url, params);
				if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
				if(!this.isLike) {
					uni.showToast({ title: '追剧成功', icon: 'none' });
					this.isLike = 1;
				}else {
					uni.showToast({ title: '取消追剧成功', icon: 'none' });
					this.isLike = 0;
				}
			},
			// 上一集
			prevEpisodeHandle() {
				if(this.currentEpisode === 0) return uni.showToast({ title: '当前为第一集', icon: 'none' });
				this.isPlay = true; this.initialTime = 0; this.currentEpisode--;
				this.currentEpisodeData = this.shortDetailList[this.currentEpisode];
			},
			// 下一集
			nextEpisodeHandle() {
				if(this.currentEpisode === this.shortDetailList.length - 1) return uni.showToast({ title: '当前为最后一集', icon: 'none' });
				if(this.shortDetailList[this.currentEpisode + 1].pay) {
					this.isPlay = false; this.initialTime = 0;
					uni.showToast({ title: '购买本集后可看', icon: 'none' });
					return;
				}
				this.isPlay = true; this.initialTime = 0; this.currentEpisode++;
				this.currentEpisodeData = this.shortDetailList[this.currentEpisode];
			},
			// 播放暂停事件
			videoPlayHandle(isPlay) {
				this.isPlay = isPlay;
				if(isPlay) return this.videoContext.play();
				this.videoContext.pause();
			},
			// 选择剧集
			selectSeriesHandle(item, index) {
				if(item.pay) return uni.showToast({ title: '购买本集后可看', icon: 'none' });
				this.currentEpisode = index;
				this.currentEpisodeData = item;
				this.isPlay = true; this.initialTime = 0; this.isMeet = false;
			},
			// 监听视频进度变化
			videoTimeUpdateHandle({ detail }) {
				this.initialTime = detail.currentTime;
			},
			// 监听视频播放到结尾
			videoEndedHandle() {
				this.nextEpisodeHandle();
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
				position: relative;
				.videoRegion_ability_list_icon { width: 60rpx; height: 60rpx; }
				.videoRegion_ability_list_text { font-size: 24rpx; margin-top: 5rpx; }
				button { position: absolute; left: 0; right: 0; top: 0; bottom: 0; opacity: 0; }
				&:last-of-type { margin-bottom: 100rpx; }
			}
		}
	}
	.screening_footer {
		height: 114rpx; padding: 0 24rpx; color: #fff;
		display: flex; align-items: center; justify-content: space-between;
		.screening_footer_info {
			flex: 1; flex-shrink: 0;
			.screening_footer_dramaname {
				font-size: 28rpx; font-weight: bold;
				overflow: hidden; text-overflow: ellipsis;
				display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
			}
			.screening_footer_diversity {
				font-size: 24rpx; margin-top: 8rpx;
				overflow: hidden; text-overflow: ellipsis;
				display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;
			}
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
			display: flex; flex-direction: column;
			height: 910rpx; width: 100%; background: #fff; border-radius: 32rpx 32rpx 0 0;
			.meetSelect_content_head {
				padding: 32rpx 24rpx; padding-bottom: 30rpx; border-bottom: 2rpx solid #E5E5E5;
				display: flex; align-items: center;
				.meetSelect_head_name { font-size: 32rpx; font-weight: bold; color: #333; }
				.meetSelect_head_desc { font-size: 28rpx; color: #666; margin-left: 20rpx; }
			}
			.meetSelect_content_list {
				flex: 1; overflow: auto; padding: 12rpx 24rpx; padding-bottom: 32rpx;
				display: flex; flex-wrap: wrap;
				.meetSelect_content_item {
					width: 220rpx; height: 80rpx; border-radius: 16rpx; overflow: hidden;
					display: flex; align-items: center; justify-content: center; background: #F5F5F5;
					margin: 20rpx 20rpx 0 0; position: relative;
					.meetSelect_item_lock {
						width: 18rpx; height: 24rpx;
						position: absolute; top: 16rpx; right: 16rpx;
					}
					.meetSelect_item_name { font-size: 28rpx; color: #333; }
					.meetSelect_item_select {
						width: 50rpx; height: 44rpx;
						position: absolute; bottom: 0; right: 0;
					}
					&:nth-child(3n+3) { margin-right: 0; } 
				}
			}
		}
	}
</style>