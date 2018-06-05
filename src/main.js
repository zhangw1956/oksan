// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'lib-flexible'
import '@/assets/css/main.css'
import { Indicator, MessageBox } from 'mint-ui'
import 'font-awesome/css/font-awesome.css'
import wx from 'weixin-js-sdk'
import request from '@/utils/request'
import getUrlParam from '@/utils/getUrlParam'

Vue.config.productionTip = false
// 获取dpr
Vue.prototype._dpr = (function () {
	const dpr = document.querySelector('html').getAttribute('data-dpr')
	if (dpr === '1' || dpr === '2') {
		return '2'
	}
	return '3'
})()
const code = getUrlParam('code')
// 启动项目
const startApp = () => {
	Vue.prototype.wx = wx
	Vue.prototype.request = request
	/* eslint-disable no-new */
	new Vue({ router }).$mount('#app')
}
// 注册sdk权限
const configWxSdk = data => {
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: process.env.APP_ID, // 必填，企业号的唯一标识，此处填写企业号corpid
		timestamp: data.timestamp, // 必填，生成签名的时间戳
		nonceStr: data.noncestr, // 必填，生成签名的随机串
		signature: data.sign, // 必填，签名，见附录1
		jsApiList: ['getLocation', 'scanQRCode', 'chooseImage', 'uploadImage', 'openAddress'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
	wx.ready(function () {
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	})
	wx.error(function (res) {
		console.error('微信sdk注册出错=====>', res.errMsg)
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	})
}
// 获取用户id
const addWxUser = () => {
	Indicator.open()
	request()
		.post('/wx/addWxUser', {
			authCode: code
		})
		.then(res => {
			if (!res.openId) {
				MessageBox('提示', `登录失败[${res.code}]`)
			} else {
				localStorage.setItem('$open_id', res.openId)
				startApp()
			}
			Indicator.close()
		})
		.catch(err => {
			MessageBox('提示', err.message)
			Indicator.close()
		})
}
// 获取sdk签名
const getSign = () => {
	request()
		.post('/sign/getSign', {
			url: encodeURIComponent(window.location.href)
		})
		.then(res => {
			if (res.code === 200) {
				configWxSdk(res.response || {})
			} else {
				throw new Error(res.result)
			}
		})
		.catch(err => {
			MessageBox('提示', err.message)
		})
}
getSign()
if (process.env.NODE_ENV === 'production') {
	if (code) {
		addWxUser()
	} else {
		const currentUrl = encodeURIComponent(window.location.href)
		const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + process.env.APP_ID + '&redirect_uri=' + currentUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
		window.location.replace(url)
	}
} else {
	startApp()
	localStorage.setItem('$open_id', 'oIdNR0lQRCriFGv_HoLWzOepK8To')
}
