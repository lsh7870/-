<template>
	<view class="music-head" :style="{color:color}">
		<view v-if="icon" class="music-head-icon" >
			<text class="iconfont icon-zuojiantou" @tap="handleToBack"></text>|<text class="iconfont icon-shouye" @tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:['title',"icon","color"],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: black;
		position: relative;
		z-index: 1;
		 overflow: hidden;
	}
	.music-head-icon{
		position: absolute;left: 8px;top: 26px;width: 90px;height: 31px;background: rgba(0,0,0,0.4);color: white;
		line-height: 31px;border-radius: 15px;display: flex;justify-content: space-evenly;
		z-index: 4;
	}

/* .music-head{ height:75px; text-align: center; line-height: 80px; font-size:16px; color:black; overflow: hidden; position: relative;}
.music-head-icon{ width:97px; height:31px; background:rgba(0,0,0,0.4); border-radius: 15px; position: absolute; left:10px; top:25px; line-height: 31px; display: flex; justify-content: space-evenly; color:white;}
.music-head-iconBlack{ color:black; background:white; border:1px #dddddd solid;} */
</style>
