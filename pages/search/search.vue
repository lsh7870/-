<template>
	<view class="search">
		<musichead title="搜索" icon="true" :icon="true"></musichead>
		<scroll-view scroll-y="true" >
			<view class="search-search" >
				<text class="iconfont icon-fangdajing"></text>
				<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm='handleToSearch(searchWord)' @input="handleToSuggest"/>
				<text v-show="searchType != 1" class="iconfont icon-guanbi" @tap="handleToClose"></text>
			</view>
			<block v-if="searchType == 1">
				<view class="cearch-history">
					<view class="cearch-history-head">
						<text>历史记录</text>
						<text class="iconfont icon-laji" @tap="handleToClear"></text>
					</view>
					<view class="cearch-history-list">
						<view v-for="(item,index) in searchHistory" :key="index" @tap='handleToWore(item)'>{{item}}</view>
					</view>
				</view>
				
				<view class="search-hot">
					<view class="search-hot-head">热搜</view>
					<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWore(item.searchWord)">
						<view class="search-hot-top">{{index+1}}</view>
						<view class="search-hot-word">
							<view>
								{{item.searchWord}}<image :src="item.iconUrl" mode="aspectFit"></image>							
							</view>	
						<view class="">{{item.content}}</view>
						</view>
						<text class="search-hot--count">{{item.score}}</text>
					</view>
				</view>
			</block>
			
			<block v-else-if="searchType == 2">
				<view class="search-result">
					<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
						<view class="search-result-word">
							<view>{{item.name}}</view>
							<view>{{item.name}}-{{item.artists[0].name}}</view>
						</view>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
			</block>
			<block v-else-if="searchType == 3">
				<view class="search-suggest">
					<view class="search-suggest-head" >搜索&Prime;{{searchWord}}&Prime;</view>
					<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleToWore(item.keyword)">
						<text class="iconfont icon-fangdajing"></text>{{item.keyword}}
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import musichead from'../../components/musichead/musichead.vue'
	import {searchHot,getsearchWord,searchSuggest} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:'',
				searchHistory:[],
				searchType:1,
				searchList:[],
				searchSuggest:[]
			}
		},
		onLoad() {

			searchHot().then((res)=>{
				// console.log(res)
				if(res[1].data.code==200){
					this.searchHot=res[1].data.data
				}
			})
			uni.getStorage({
				key:'searchHistory',
				 success:  (res)=> {
				        // console.log(res.data);
						this.searchHistory=res.data
				    }
			})
		},
		methods: {
			// 点击热词
			handleToWore(searchWord){
				console.log(searchWord)
				this.searchWord=searchWord
				this.handleToSearch(searchWord)
			},
			// 按下回车/
			handleToSearch(searchWord){
				// console.log(searchWord)
				this.searchHistory.unshift(searchWord)
				this.searchHistory=[...new Set(this.searchHistory)]
				if(this.searchHistory.length>5){
					this.searchHistory.length=5
				}
				uni.setStorage({
					key:'searchHistory',
					data:this.searchHistory
				})
				this.getSearchLisy(searchWord)
			},
			// 点击垃圾桶
			handleToClear(){
				 uni.removeStorageSync('searchHistory');
				 this.searchHistory=[]
			},
			// 搜索
			getSearchLisy(searchWord){
				getsearchWord(searchWord).then(res=>{
					// console.log(res[1].data)
					this.searchList=res[1].data.result.songs
					this.searchType=2
					// console.log(this.searchList)
				})
			},
			// 点击关闭按钮
			handleToClose(){
				this.searchWord=''
				this.searchType=1
			},
			// 点击跳转
			handleToDetail(id){
				uni.navigateTo({
					url:"/detail/detail?id="+id
				})
				console.log(id)
			},
			
			handleToSuggest(e){
				let value = e.detail.value
				console.log(value)
				if(!value){
					this.searchType=1;
					return
				}
				searchSuggest(value).then(res=>{
					// console.log(res[1].data.result)
					if(res[1].data.code=='200'){
						this.searchSuggest=res[1].data.result.allMatch
						this.searchType=3
					}
				})
			},
			handleToWord(){
				
			}
		},
		components:{
			musichead
		},
	}
</script>

<style scoped>
.search-search{display: flex; align-items: center;height: 70rpx;margin: 70rpx 30rpx 30rpx 30rpx;
	background: #F7F7F7;border-radius: 50rpx;}
.search-search text{margin: 0 26rpx; }
.search-search input{flex: 1;font-size: 26rpx;}

.cearch-history{margin: 0 30rpx; font-size: 26rpx;}
.cearch-history-head{display: flex;justify-content: space-between;margin-bottom: 36rpx;}
.cearch-history-list{display: flex;flex-wrap: wrap;}
.cearch-history-list view{padding: 16rpx 28rpx;border-radius: 40rpx;margin-right: 30rpx;margin-bottom: 30rpx;background-color: #F7F7F7;}

.search-hot{margin: 0 30rpx 50rpx 30rpx; font-size: 26rpx;}
.search-hot-head{margin-bottom: 36rpx;}
.search-hot-item{display: flex;align-items: center; margin-bottom: 58rpx;}
.search-hot-top{color: #fb2222;width: 60rpx;margin-left: 8rpx;}
.search-hot-word{flex: 1;}
.search-hot-word view:nth-child(1){font-size: 30rpx;color: black;}
.search-hot-word view:nth-child(2){font-size: 24rpx;color: #878787;}
.search-hot-word image{width: 48rpx;height: 22rpx;}
.search-hot-count{color: #878787;}

.search-result{border-top: 2rpx #e4e4e4 solid;padding: 30rpx;}
.search-result-item{display: flex; justify-content: space-between;align-items: center;padding-bottom: 30rpx;margin-bottom: 30rpx;border-bottom: 2rpx #e4e4e4 solid;}
.search-result-item text{font-size: 50rpx;}
.search-result-word{}
.search-result-word view:nth-child(1){font-size: 28rpx;color: #235790;margin-bottom: 12rpx;}
.search-result-word view:nth-child(2){font-size: 22rpx;color: #898989;}

.search-suggest{border-top: 2rpx #e4e4e4 solid;padding: 30rpx;font-size: 26rpx;}
.search-suggest-head{color: #4574a5;margin-bottom: 74rpx;}
.search-suggest-item{color: #5d5d5d;margin-bottom: 74rpx;}
.search-suggest-item text{color: #dbdbdb;margin-right: 28rpx;position: relative;top: 2rpx;}
</style>
