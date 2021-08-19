<template>
	<view>
		<musichead title="登录" icon="true" color="black"></musichead>
		<view class="my">
			<view class="my-head">
				<image src="../../static/109951165806093811.jpg" mode=""></image>
			</view>
			<view class="from">
				<input type="text" v-model="name" placeholder="请输入账号" />
				<input type="password" v-model="password" placeholder="请输入密码" />
				<button @tap="submit">登录</button>
				<button @tap="getCode">二维码登录</button>
			</view>
			<view class="getimg" v-show="isqr">
				<text class="iconfont icon-guanbi" @tap="close"></text>
				<image :src="qrurl" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import {
		getmy,
		geqr,
		getcreate,
		getcheck
	} from '../../common/myApi.js'
	export default {
		data() {
			return {
				name: '17772017870',
				password: '',
				isqr: false,
				qrKey: '',
				qrurl: '',
				timer: ''
			}
		},
		onLoad() {
			var timestamp = new Date().getTime()
			// console.log(timestamp)
		},
		methods: {
			submit() {
				getmy(this.name, this.password).then(res => {
					console.log(res)
					if (res[1].data.code == '200') {
						// console.log(res[1].data.account.id)
						uni.setStorageSync('wyMusic_id', res[1].data.account.id);
						uni.navigateTo({
							url: '/pages/personal/personal'
						})
					}
				})
			},
			getCode() {
				this.isqr = true
				var timestamp = new Date().getTime()

				geqr(timestamp).then(res => {
					if (res[1].data.code == '200') {
						console.log(res[1].data.data.unikey)
						this.qrKey = res[1].data.data.unikey
						getcreate(this.qrKey).then(res => {
							// console.log(res[1].data.data.qrimg)
							if (res[1].data.code == '200') {
								this.qrurl = res[1].data.data.qrimg
							}
						})
					}

				}) 
				 this.timer=setInterval(()=>{
					 getcheck(this.qrKey).then(res => {
						 console.log(res[1].data)
					 		if (res[1].data.code == '803') {
					 			console.log(res[1].data)
								clearInterval(this.timer)
					 			uni.navigateTo({
					 				url: '/pages/personal/personal'
					 				// uni.setStorageSync('storage_key', 'hello');
					 			})
					 		}
							if (res[1].data.code == '800') {
								this.close()
							}
					 	})
				 },1000)
			},
			close() {
				this.isqr = false
				clearInterval(this.timer)
			}
		},
		components: {
			musichead
		}
	}
</script>

<style>
	.my {
		width: 70%;
		height: 800rpx;
		margin: 100rpx auto 0;
		position: relative;
	}

	.my-head {
		width: 150rpx;
		height: 150rpx;
		margin-left: 190rpx;
	}

	.my-head image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}

	.from {
		width: 100%;
		margin: 20rpx auto;
	}

	.from input {
		border: #333333 2rpx solid;
		margin-bottom: 20rpx;
	}

	.from button {
		margin-bottom: 20rpx;
	}

	.getimg {
		position: relative;
		top: -628rpx;
		height: 500rpx;
		width: 100%;
		overflow: hidden;
		background-color: #FFFDEF;
	}

	.getimg image {
		width: 80%;
		height: 80%;
		position: absolute;
		top: 32rpx;
		left: 32rpx;
	}

	.iconfont {
		position: absolute;
		right: 12rpx;
		top: 12rpx;
		z-index: 10;
	}
</style>
