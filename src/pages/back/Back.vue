<template>
	<div class="back">
		<div class="top"></div>
		<div class="search">
			<span class="icon"></span>
			<form action="javascript:void(0)">
				<input type="search" placeholder="搜索OKsan共享雨伞附近网点" autocomplete="off" v-model="searchName" @keyup.enter="search">
			</form>
		</div>
		<div class="list">
			<ul>
				<div class="c-r-tip" v-if="msg">
					{{ msg }}
				</div>
				<li class="c-flex" @click="toWalk(item)" v-for="item in list" :key="item.id">
					<div class="c-flex1">
						<div class="img">
							<img src="../../assets/images/back/photo_1.png" class=""/>
						</div>
					</div>
					<div class="c-flex3">
						<p>{{ item.name }}</p>
						<p>{{ item.address }}</p>
						<div class="btn">
							<!-- <span class="get">可借 0</span>
							<span class="take">可还 0</span> -->
						</div>
					</div>
					<div class="c-flex1">
						{{ item.distance }}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { Indicator, MessageBox } from 'mint-ui'
import request from '@/utils/request'
import Map from '@/utils/map'

let BDMap = null
export default {
	data () {
		return {
			searchName: '',
			list: [],
			msg: ''
		}
	},
	created () {
		if (window.BMap) {
			BDMap = window.BMap
			this.getCurrentPosition(this.getBackAddress)
		} else {
			Map.initMap().then(BMap => {
				BDMap = BMap
				this.getCurrentPosition(this.getBackAddress)
			})
		}
	},
	methods: {
		getCurrentPosition (callback) {
			// callback({
			// 	lat: 24.978788, // res.latitude // 纬度，浮点数，范围为90 ~ -90
			// 	lng: 118.573707 // res.longitude  // 经度，浮点数，范围为180 ~ -180。
			// })

			this.wx.ready(() => {
				this.wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success (res) {
						const latitude = res.latitude // 24.495274 // 纬度，浮点数，范围为90 ~ -90
						const longitude = res.longitude // 118.190844 // 经度，浮点数，范围为180 ~ -180。
						Map.translateBMapPoint(longitude, latitude, callback, err => {
							MessageBox('提示', err)
						})
					},
					fail (res) {
						MessageBox('提示', res.errMsg)
						console.error('还伞微信sdk定位出错=====>', res.errMsg)
					}
				})
			})
		},
		getBackAddress (points) {
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
						if (res.result.length === 0) {
							this.msg = '-- 没有更多数据了 --'
						} else {
							let list = res.result
							const pointA = new BDMap.Point(points.lng, points.lat)
							const map = new BDMap.Map('')
							list.forEach(value => {
								let pointB = new BDMap.Point(value.longitude, value.latitude)
								const distance = map.getDistance(pointA, pointB).toFixed(0)
								value.distance = distance > 1000 ? (distance / 1000).toFixed(1) + 'km' : distance + 'm'
							})
							this.list = list
						}
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					Indicator.close()
					this.msg = err.message
					MessageBox('提示', err.message)
				})
		},
		search () {
			Indicator.open()
			request()
				.post('/shop/shopByLikeName', {
					openId: localStorage.getItem('$open_id'),
					siteName: this.searchName
				})
				.then(res => {
					if (res.code === 200) {
						if (res.result.length === 0) {
							this.msg = '-- 没有更多数据了 --'
							this.list = []
						} else {
							this.list = res.result
							this.msg = ''
						}
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					Indicator.close()
					this.msg = err.message
					MessageBox('提示', err.message)
				})
		},
		toWalk (item) {
			this.$router.push(`/back/walk/${item.longitude}/${item.latitude}`)
		}
	}
}
</script>

<style scoped>
.back{
	position: relative;
	height: 100%;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	overflow-scrolling: touch;
}
.back .top{
	width: 750px;
	height: 123px;
	background-size: 100%;
}
[data-dpr="1"] .back .top{
	background-image: url(../../assets/images/back/top@2x.png)
}
[data-dpr="2"] .back .top{
	background-image: url(../../assets/images/back/top@2x.png)
}
[data-dpr="3"] .back .top{
	background-image: url(../../assets/images/back/top@3x.png)
}
.back .search{
	margin: 30px 80px;
	padding: 15px 20px;
	background-color: rgb(238,238,238);
	border-radius: 5px; /*no*/
}
.back .search .icon{
	display: inline-block;
	width: 22px;
	height: 24px;
	background-size: 100%;
	vertical-align: middle;
}
[data-dpr="1"] .back .search .icon{
	background-image: url(../../assets/images/back/search@2x.png)
}
[data-dpr="2"] .back .search .icon{
	background-image: url(../../assets/images/back/search@2x.png)
}
[data-dpr="3"] .back .search .icon{
	background-image: url(../../assets/images/back/search@3x.png)
}
.back .search form{
	width: 90%;
	display: inline-block;
}
.back .search input[type="search"]::-webkit-search-cancel-button{
	display: none;
	-webkit-appearance: none;
}
.back .search input{
	margin-left: 10px; /*no/*/
	outline: 0;
	border: none;
	background-color: inherit;
	width: 100%;
	font-size: 22px; /*px*/
}
.back .list{
	margin: 0 80px;
}
.back .list .img{
	width: 82px;
	height: 82px;
	background-size: 100%;
	overflow: hidden;
}
.back .list .img img{
	width: 100%;
	height: 100%;
	border-radius: 100%;
}
.back .list li{
	border-bottom: 1px solid #ddd; /*no*/
	padding: 40px 0;
}
.back .list li > div:first-child{
	display: flex;
	align-items: center;
}
.back .list li > div:nth-child(2) p:nth-child(1){
	font-size: 26px; /*px*/
}
.back .list li > div:nth-child(2) p:nth-child(2){
	margin: 10px 0;
	font-size: 22px; /*px*/
	color: gray;
}
.back .list .get,.back .list .take{
	text-align: center;
	width: 80px;
	height: 26px;
	line-height: 26px;
	display: inline-block;
	color: #fff;
	border-radius: 10px;
	font-size: 20px; /*px*/
}
.back .list .get{
	background-color: #000;
}
.back .list .take{
	background-color: rgb(240,90,0);
}
.back .list li > div:nth-child(3){
	color: gray;
	text-align: right;
}
</style>
