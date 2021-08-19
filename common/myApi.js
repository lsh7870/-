import {baseUrl} from "./config.js"
export function getmy(name,password){	   	
	 return	uni.request({
			url:`${baseUrl}/login/cellphone?phone=${name}&password=${password}`,
			method:'GET',
	})
}

// 登录 /login/cellphone?phone=17772017870&password=hua258011


// /login/qr/key
export function geqr(time){	   	
	 return	uni.request({
			url:`${baseUrl}/login/qr/key?${time}`,
			method:'GET',
	})
}
// /login/qr/create?qrimg=qrimg&&key=3f79e513-8537-43ae-a687-f84624e7eb56
export function getcreate(key){	   	
	 return	uni.request({
			url:`${baseUrl}/login/qr/create?qrimg=qrimg&&key=${key}`,
			method:'GET',
	})
}
// /login/qr/check?key=xxx
export function getcheck(key){	   	
	 return	uni.request({
			url:`${baseUrl}/login/qr/check?key=${key}`,
			method:'GET',
	})
}

export function getlist(time){	   	
	 return	uni.request({
			url:`${baseUrl}/user/playlist?uid=${time}`,
			method:'GET',
	})
}
// /user/playlist?uid=1555632669



// /playlist/detail?id=2395444596