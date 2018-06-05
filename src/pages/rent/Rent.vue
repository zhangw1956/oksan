<template>
	<div class="rent">
		<div id="container"></div>
		<mt-popup
			v-model="popupVisible"
			position="left">
			<div class="siler">
				<div class="top">
					<div class="head-photo">
						<img :src="headImgUrl" alt="">
					</div>
					<p class="user-name">{{ nickname }}</p>
				</div>
				<div class="menu">
					<ul>
						<li class="c-flex" @click="toWallet">
							<div class="c-flex1">
								<span class="icon wallet"></span>
								<span class="text">我的钱包</span>
							</div>
							<div class="c-flex1">
								<span class="balance">{{ balance }}</span> 元
								<div class="icon-right"></div>
							</div>
						</li>
						<li class="c-flex" @click="toRecord">
							<div class="c-flex1">
								<span class="icon record"></span>
								<span class="text">租借记录</span>
							</div>
							<div class="c-flex1">
								<div class="icon-right"></div>
							</div>
						</li>
						<li class="c-flex" @click="toHelp">
							<div class="c-flex1">
								<span class="icon help"></span>
								<span class="text">用户指南</span>
							</div>
							<div class="c-flex1">
								<div class="icon-right"></div>
							</div>
						</li>
						<li class="c-flex" @click="toBuy">
							<div class="c-flex1">
								<span class="icon buy"></span>
								<span class="text">购买主题伞</span>
							</div>
							<div class="c-flex1">
								<div class="icon-right"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</mt-popup>
		<div class="tip" ref="tip">
			<p>
				可借 <span>11</span> 把
			</p>
			<p>
				可还 <span>12</span> 把
			</p>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Popup, MessageBox, Indicator } from 'mint-ui'
import Map from '@/utils/map'
import request from '@/utils/request'

Vue.component(Popup.name, Popup)
let BDMap = null

export default {
	data () {
		return {
			code: '',
			popupVisible: false,
			map: null,
			headImgUrl: '',
			balance: '',
			nickname: '',
			list: []
		}
	},
	created () {
		this._getWalletInfo()

		// 优化侧滑菜单上不背景图加载慢的问题
		const sliderImg2 = new Image()
		sliderImg2.src = require('../../assets/images/user/top@2x.png')
		const sliderImg3 = new Image()
		sliderImg3.src = require('../../assets/images/user/top@3x.png')
	},
	mounted () {
		Map
			.initMap()
			.then((BMap) => {
				BDMap = BMap
				this.getCurrenPosition(points => {
					this.map = new BMap.Map('container')
					let point = new BMap.Point(points.lng, points.lat)
					this.map.centerAndZoom(point, 15)
					console.log('加载成功...')
					// 创建控件
					this.addMapControl(BMap, this.map)
					// 查询附近商铺
					this._getNearShop(point)
				})
			})
	},
	methods: {
		toBuy () {
			this.$router.push('/user/buy')
		},
		toHelp () {
			this.$router.push('/user/help')
		},
		toRecord () {
			this.$router.push('/user/record')
		},
		toWallet () {
			this.$router.push('/user/wallet')
		},
		doScan () {
			const vm = this
			// this.$router.push('/state/1')
			this.wx.scanQRCode({
				desc: 'scanQRCode desc',
				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
				success: function (res) {
					// 查询余额
					const result = res.resultStr
					const array = result.split('/')
					vm.$router.push('/rent/submit/' + array[array.length - 1])
				},
				fail: function (res) {
					if (res.errMsg.indexOf('function_not_exist') > 0) {
						MessageBox('提示', '版本过低请升级')
					} else {
						MessageBox('提示', res)
					}
				}
			})
		},
		toUser () {
			this.popupVisible = true
		},
		toRepair () {
			this.$router.push('/user/repair')
		},
		doGelocate () {
			this.getCurrenPosition(points => {
				let point = new BDMap.Point(points.lng, points.lat)
				this.map.centerAndZoom(point, 15)
			})
		},
		toBack () {
			this.$router.push('/back')
		},
		addMapControl (BMap, map) {
			// 定义一个控件类，即function
			function ZoomControl (param) {
				// 设置默认停靠位置和偏移量
				this.defaultAnchor = param.pos
				this.defaultOffset = new BMap.Size(param.size.x || 10, param.size.y || 10)
				this.className = param.className
				this.click = param.doclick
			}
			// 通过JavaScript的prototype属性继承于BMap.Control
			ZoomControl.prototype = new BMap.Control()
			// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回
			// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
			ZoomControl.prototype.initialize = function (map) {
				let box = document.createElement('div')
				box.className = this.className
				let that = this
				box.addEventListener('click', function () {
					that.click()
				})
				// 添加DOM元素到地图中
				map.getContainer().appendChild(box)
				// 将DOM元素返回
				return box
			}
			const size = {
				x: 30,
				y: 30
			}
			let vm = this
			/* eslint-disable */
			const controlList = [
				{ // 个人中心控件
					pos: BMAP_ANCHOR_TOP_LEFT,
					size: size,
					className: 'top-left ctr',
					doclick () {
						vm.toUser()
					}
				},
				{ // 故障报修控件
					pos: BMAP_ANCHOR_TOP_RIGHT,
					size: size,
					className: 'top-right ctr',
					doclick () {
						vm.toRepair()
					}
				},
				{ // 创建附近定位控件实例
					pos: BMAP_ANCHOR_BOTTOM_LEFT,
					size: size,
					className: 'bottom-left ctr',
					doclick () {
						vm.doGelocate()
					}
				},
				{ // 创建还伞控件实例
					pos: BMAP_ANCHOR_BOTTOM_RIGHT,
					size: size,
					className: 'bottom-right ctr',
					doclick () {
						vm.toBack()
					}
				},
				{
					pos: BMAP_ANCHOR_BOTTOM_LEFT,
					size: {
						x: (document.documentElement.offsetWidth || document.body.offsetWidth) / 2 - 62,
						y: size.y
					},
					className: 'center',
					doclick () {
						vm.doScan()
					}
				}
			]
			controlList.forEach(element => {
				// 添加到地图当中
				map.addControl(new ZoomControl(element))
			})
		},
		addMapOverlay (BMap, map, list) {
			// const other = require(`../../assets/images/main/_overlay@${dpr === '3' ? dpr : 2}x.png`)
			// 复杂的自定义覆盖物
			function ComplexCustomOverlay (point) {
				this._point = point
			}
			ComplexCustomOverlay.prototype = new BMap.Overlay()
			ComplexCustomOverlay.prototype.initialize = function (map) {
				this._map = map
				let div = this._div = document.createElement('div')
				div.style.position = 'absolute'
				div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
				div.style.backgroundColor = '#fff'
				div.style.color = '#000'
				div.style.borderRadius = '10px'
				div.style.padding = '3px 20px'
				div.style.whiteSpace = 'nowrap'
				let p1 = document.createElement('p')
				div.appendChild(p1)
				p1.appendChild(document.createTextNode('可借'))
				let span1 = document.createElement('span')
				span1.style.color = 'rgb(240, 90, 0)'
				span1.style.margin = '0 5px'
				span1.innerText = 20
				p1.appendChild(span1)
				p1.appendChild(document.createTextNode('把'))
				let p2 = document.createElement('p')
				div.appendChild(p2)
				p2.appendChild(document.createTextNode('可还'))
				let span2 = document.createElement('span')
				span2.style.color = 'rgb(6, 182, 255)'
				span2.style.margin = '0 5px'
				span2.innerText = 20
				p2.appendChild(span2)
				p2.appendChild(document.createTextNode('把'))
				let arrow = this._arrow = document.createElement('div')
				arrow.style.position = 'absolute'
				arrow.style.width = '0'
				arrow.style.height = '0'
				arrow.style.bottom = '-10px'
				arrow.style.left = '50%'
				arrow.style.transform = 'translateX(-10px)'
				arrow.style.borderTop = '10px solid #fff'
				arrow.style.borderLeft = '10px solid transparent'
				arrow.style.borderRight = '10px solid transparent'
				div.appendChild(arrow)
				map.getPanes().labelPane.appendChild(div)
				return div
			}
			ComplexCustomOverlay.prototype.draw = function () {
				var map = this._map
				var pixel = map.pointToOverlayPixel(this._point)
				this._div.style.left = pixel.x - (this._div.offsetWidth / 4) + 'px'
				this._div.style.top = pixel.y - 60 + 'px'
			}
			let createIcon = () => { // 创建图标对象
				const dpr = document.querySelector('html').getAttribute('data-dpr')
				const current = require(`../../assets/images/main/overlay@${dpr === '3' ? dpr : 2}x.png`)
				return new BMap.Icon(current, new BMap.Size(46.5, 29.5), {
					// 指定定位位置
					// 当标注显示在地图上时，其所指向的地理位置距离图标左上
					// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
					// 图标中央下端的尖角位置.
					anchor: new BMap.Size(0, 0),
					// 设置图片偏移
					// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
					// 需要指定大图的偏移位置，此做法与css sprites技术类似
					imageOffset: new BMap.Size(0, 0) // 设置图片偏移
				})
			}
			let itemList = []
			list.forEach((item, index) => {
				itemList[index] = {}
				// itemList[index].text = new ComplexCustomOverlay(item)
				// map.addOverlay(itemList[index].text)
				// itemList[index].text.hide()
				const point = new BMap.Point(item.longitude, item.latitude)
				itemList[index].icon = new BMap.Marker(point, {icon: createIcon()})
				map.addOverlay(itemList[index].icon); // 将标注添加到地图中
				// (function (i) {
				// 	itemList[i].icon.addEventListener('click', function () {
				// 		itemList.forEach(item => {
				// 			item.text.hide()
				// 		})
				// 		itemList[i].text.show()
				// 		console.log(itemList[i].icon.Yc.lastElementChild.currentSrc)
				// 	})
				// })(index)
				// itemList[0].text.show()
			})
		},
		getCurrenPosition (callback) {

			// Map.translateBMapPoint(24.978788, 118.573707, callback, err => {
			// 	MessageBox('提示', err)
			// })
			this.wx.ready(() => {
				this.wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success (res) {
						const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
						const longitude = res.longitude  // 经度，浮点数，范围为180 ~ -180。
						const speed = res.speed // 速度，以米/每秒计
						const accuracy = res.accuracy // 位置精度
						Map.translateBMapPoint(longitude, latitude, callback, err => {
							MessageBox('提示', err)
						})
					},
					fail (res) {
						MessageBox('提示', res)
						console.log(res)
					}
				})
			})
		},
		_getWalletInfo () {
			request()
				.post('/wx/getWxUserInfo', {
					openId: localStorage.getItem('$open_id')
				})
				.then(res => {
					if (res.code === 200) {
						this.headImgUrl = res.result.headImgUrl
						this.nickname = res.result.nickname
						this.balance = res.result.balance
					} else {
						throw new Error(res.result)
					}
				})
				.catch(err => {
					MessageBox('提示', err.message)
				})
		},
		_getNearShop (points) {
			Indicator.open()
			request()
				.post('/shop/getNearShop', {
					openId: localStorage.getItem('$open_id'),
					longitude: points.lng,
					latitude: points.lat,
					city: '',
					range: 200
				})
				.then(res => {
					if (res.code === 200) {
						this.list = res.result
						// 自定义标注
						this.addMapOverlay(BDMap, this.map, this.list)
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					Indicator.close()
					MessageBox('提示', err.message)
				})
		}
	}
}
</script>

<style scoped>
.rent{
	width: 100%;
	height: 100%;
	position: relative;
}
.rent .slider{
	width: 80%;
}
.rent .top{
	background-size: cover;
	overflow: hidden;
}
[data-dpr="1"] .rent .top{
	width: 569px;
	height: 291px;
	background-image: url(../../assets/images/user/top@2x.png)
}
[data-dpr="2"] .rent .top{
	background-image: url(../../assets/images/user/top@2x.png)
}
[data-dpr="3"] .rent .top{
	background-image: url(../../assets/images/user/top@3x.png)
}
.rent .top .head-photo{
	width: 150px;
	height: 150px;
	background-color: orchid;
	margin-top: 70px;
	margin-left: 85px;
	border-radius: 100%;
	overflow: hidden;
	border: 2px solid #fff; /*no*/
}
.rent .top .head-photo img{
	width: 100%;
	height: 100%;
}
.rent .top .user-name{
	color: #fff;
	margin-top: 10px;
	width: 320px;
	text-align: center;
	font-size: 28px; /*px*/
}
.rent .menu {
	padding-top: 50px;
	padding-left: 70px;
}
.rent .menu li{
	padding: 20px 0;
}
.rent .menu li > div:first-child{
	display: flex;
	align-items: center;
}
.rent .menu .balance{
	color: rgb(254, 95, 9);
}
.rent .menu .icon{
	display: inline-block;
	margin-right: 20px;
	background-size: 100%;
}
.rent .menu .icon{
	width: 47px;
	height: 46px;
}
[data-dpr="1"] .rent .menu .wallet{
	background-image: url(../../assets/images/user/wallet@2x.png)
}
[data-dpr="2"] .rent .menu .wallet{
	background-image: url(../../assets/images/user/wallet@2x.png)
}
[data-dpr="3"] .rent .menu .wallet{
	background-image: url(../../assets/images/user/wallet@3x.png)
}
[data-dpr="1"] .rent .menu .record{
	background-image: url(../../assets/images/user/record@2x.png)
}
[data-dpr="2"] .rent .menu .record{
	background-image: url(../../assets/images/user/record@2x.png)
}
[data-dpr="3"] .rent .menu .record{
	background-image: url(../../assets/images/user/record@3x.png)
}
[data-dpr="1"] .rent .menu .help{
	background-image: url(../../assets/images/user/help@2x.png)
}
[data-dpr="2"] .rent .menu .help{
	background-image: url(../../assets/images/user/help@2x.png)
}
[data-dpr="3"] .rent .menu .help{
	background-image: url(../../assets/images/user/help@3x.png)
}
[data-dpr="1"] .rent .menu .buy{
	background-image: url(../../assets/images/user/buy@2x.png)
}
[data-dpr="2"] .rent .menu .buy{
	background-image: url(../../assets/images/user/buy@2x.png)
}
[data-dpr="3"] .rent .menu .buy{
	background-image: url(../../assets/images/user/buy@3x.png)
}
.rent .menu > ul > li > div:last-child{
	text-align: right;
	padding-right: 70px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.rent .menu .icon-right{
	width: 15px;
	height: 30px;
	background-size: 100%;
}
[data-dpr="1"] .rent .menu .icon-right{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="2"] .rent .menu .icon-right{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="3"] .rent .menu .icon-right{
	background-image: url(../../assets/images/user/right@3x.png)
}
</style>

<style>
html{height:100%}
body{height:100%;margin:0px;padding:0px}
#container{height:100%}
.mint-popup.mint-popup-left{
	width: 569px;
	height: 100%;
}
.rent .ctr{
	width: 90px;
	height: 90px;
	background-size: 100%;
}
[data-dpr="1"] .rent .top-left{
	background-image: url(../../assets/images/main/slider@2x.png)
}
[data-dpr="2"] .rent .top-left{
	background-image: url(../../assets/images/main/slider@2x.png)
}
[data-dpr="3"] .rent .top-left{
	background-image: url(../../assets/images/main/slider@3x.png)
}
[data-dpr="1"] .rent .top-right{
	background-image: url(../../assets/images/main/repair@2x.png)
}
[data-dpr="2"] .rent .top-right{
	background-image: url(../../assets/images/main/repair@3x.png)
}
[data-dpr="3"] .rent .top-left{
	background-image: url(../../assets/images/main/repair@3x.png)
}
[data-dpr="1"] .rent .bottom-left{
	background-image: url(../../assets/images/main/gel@2x.png)
}
[data-dpr="2"] .rent .bottom-left{
	background-image: url(../../assets/images/main/gel@2x.png)
}
[data-dpr="3"] .rent .bottom-left{
	background-image: url(../../assets/images/main/gel@3x.png)
}
[data-dpr="1"] .rent .bottom-right{
	background-image: url(../../assets/images/main/back@2x.png)
}
[data-dpr="2"] .rent .bottom-right{
	background-image: url(../../assets/images/main/back@2x.png)
}
[data-dpr="3"] .rent .bottom-right{
	background-image: url(../../assets/images/main/back@3x.png)
}
.rent .center{
	width: 244px;
	height: 103px;
	background-size: 100%;
}
[data-dpr="1"] .rent .center{
	background-image: url(../../assets/images/main/rent@2x.png)
}
[data-dpr="2"] .rent .center{
	background-image: url(../../assets/images/main/rent@2x.png)
}
[data-dpr="3"] .rent .center{
	background-image: url(../../assets/images/main/rent@3x.png)
}
.BMap_Marker img{
	width: 100%;
}
</style>
