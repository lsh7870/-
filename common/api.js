import {baseUrl} from "./config.js"

export function topLIst(){	
    return	new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			success:res=>{
				// console.log(res)
				let result = res.data.list
				result.length=4
				reslove(result)
			}
		})
	})	
}

export function list(id){	   	
	 return	uni.request({
			url:`${baseUrl}/playlist/detail?id=${id}`,
			method:'GET',
	})	
}



// /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D  详情
export function songDetail(id){	   	
	 return	uni.request({
			url:`${baseUrl}/song/detail?ids=${id}`,
			method:'GET',
	})	
}
// /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D  相关/related/allvideo?id
export function songRelated(id){	   	
	 return	uni.request({
			url:`${baseUrl}/simi/song?id=${id}`,
			method:'GET',
			// /related/allvideo?id=1857601902
	})
}
// /comment/music?id==89ADDE33C0AAE8EC14B99F6750DB954D 点赞
export function songInfo(id){	   	
	 return	uni.request({
			url:`${baseUrl}/comment/music?id=${id}`,
			method:'GET',
	})
}	
// /song/url?id=89ADDE33C0AAE8EC14B99F6750DB954D 播放地址
export function songUrl(id){	   	
	 return	uni.request({
			url:`${baseUrl}/song/url?id=${id}`,
			method:'GET',
	})
}
// /lyric?id=33894312 
export function songLyric(id){	   	
	 return	uni.request({
			url:`${baseUrl}/lyric?id=${id}`,
			method:'GET',
	})
}


// 搜索 /search/hot/detail
export function searchHot(){	   	
	 return	uni.request({
			url:`${baseUrl}/search/hot/detail`,
			method:'GET',
	})
}
// /search/suggest?keywords=%20海阔天空
// /search/suggest?keywords= 海阔天空
export function getsearchWord(word){	   	
	 return	uni.request({
			url:`${baseUrl}/search/suggest?keywords=${word}`,
			method:'GET',
	})
}
// /search/suggest?keywords= 海阔天空&type=mobile
export function searchSuggest(word){	   	
	 return	uni.request({
			url:`${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
			method:'GET',
	})
}
