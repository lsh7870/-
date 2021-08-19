<template>
	<view>
		<musichead title="我的" icon="true" color="black"></musichead>
		<view class="container">
			<view class="quit" @tap="quit">退出</view>
			<scroll-view scroll-y="true" >
				<view class="myInfo">
					<view class="myInfo-hade">
						<image :src="playlist[0].creator.avatarUrl" mode=""></image>{{playlist[0].creator.nickname}}
					</view>
					<view class="myInfo-item" v-for="(item,index) in playlist" :key="index" @tap="handleToList(item.id)">
						<image :src="item.coverImgUrl" mode=""></image>
						<view class="myInfo-item-name">
							<view>{{item.name}}</view>{{item.trackCount}}首
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from'../../components/musichead/musichead.vue'
	import {getlist , geqr} from '../../common/myApi.js'
	export default {
		data() {
			return {
				playlist:[{creator:''}]
			}
		},
		onLoad() {
			const id = uni.getStorageSync('wyMusic_id')
			this.playList(id)
		},
		methods: {
			playList(id){ 
				getlist(id).then(res=>{
					console.log(res[1].data.playlist)
					this.playlist=res[1].data.playlist
				})
			},
			handleToList(id){
				console.log(id)
				uni.navigateTo({
					url:'/pages/list/list?listId='+id
				})
			},
			quit(){
				uni.removeStorage({
				    key: 'wyMusic_id',
				    success: function (res) {
				        uni.navigateTo({
				        	url:'/pages/index/index'
				        })
				    }
				});
			}
		},
		components:{musichead}
	}
</script>

<style scoped>
.myInfo{margin-top: 60rpx;width: 100%;height: 100%;}
.myInfo-hade{display: flex;justify-content: center;line-height: 80rpx;margin-bottom: 40rpx;}
.myInfo-hade image{width: 80rpx;height: 80rpx;margin-right: 12rpx;border-radius: 40rpx; }

.myInfo-item{width: 100%;height: 100%;display: flex;padding-left: 40rpx;margin: 20rpx 0;}
.myInfo-item image{width: 110rpx;height: 110rpx;border-radius: 20rpx;margin-right: 20rpx;}
.myInfo-item-name{height: 110rpx;font-size: 24rpx;}
.myInfo-item-name view{font-size: 30rpx;margin: 10rpx 0;}


	.quit {
		font-size: 32rpx;
		width: 80rpx;
		margin-left: 30rpx;
		border: #6F6E73 2rpx solid;
		text-align: center;
		border-radius: 20rpx;
	}
</style>
