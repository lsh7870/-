<template>
	<view>
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="my" @tap="handleToMy">我的</view>
		<view class="container index-container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view v-if="isLoading">
					<m-for-skeleton :avatarSize="200" :row="3" :title="false" :loading="isLoading" :isarc="'square'"
						:titleStyle="{}" v-for="(item,key) in 4" :key="key">
					</m-for-skeleton>
				</view>
				<!-- 歌曲列表 -->
				<view v-else="isLoading" class="index-list" v-for="(item,index) in topLIst" :key="index"
					@tap="handleToList(item.id)">
					<view class="index-list-item">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item,index) in item.tracks" :key="index">
								{{index+1}}.{{item.first}}-{{item.second}}</view>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import {
		topLIst,
		top
	} from '../../common/api.js'
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";
	export default {
		data() {
			return {
				topLIst: [],
				listId: [],
				isLoading: true
			}
		},
		components: {
			musichead,
			mForSkeleton
		},
		onLoad() {
			topLIst().then(res => {
				console.log(res)
				if (res.length) {
					this.topLIst = res
					setTimeout(() => {
						this.isLoading = false
					}, 1000)

				}
			})
		},
		methods: {
			handleToList(listId) {
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId,
				})
			},
			handleToSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			handleToMy() {
				const id = uni.getStorageSync('wyMusic_id')
				if(id){
					uni.navigateTo({
						url: '/pages/personal/personal'
					})
				}else{
					uni.navigateTo({
						url: '/pages/my/my'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.my {
		font-size: 32rpx;
		width: 80rpx;
		margin-left: 30rpx;
		border: #6F6E73 2rpx solid;
		text-align: center;
		border-radius: 20rpx;
	}

	.container scroll-view {
		height: 100%;
	}

	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #F7F7F7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 26rpx;
		flex: 1;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}

	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}

	.index-list-text {
		font-size: 24rpx;
		line-height: 66rpx;
	}
</style>
