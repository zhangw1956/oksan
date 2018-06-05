<template>
	<div class="walk">
		<div id="allmap"></div>
		<div id="result"></div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Map from '@/utils/map'

let BMap = null

export default {
	data () {
		return {
			longitude: '',
			latitude: '',
			map: null
		}
	},
	created () {
		this.longitude = this.$route.params.longitude
		this.latitude = this.$route.params.latitude
		// 百度地图API功能
		if (window.BMap) {
			BMap = window.BMap
			this.getCurrentPosition()
		} else {
			Map.initMap().then(map => {
				BMap = map
				this.getCurrentPosition()
			})
		}
	},
	methods: {
		getCurrentPosition () {
			let vm = this
			this.wx.ready(() => {
				this.wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success (res) {
						const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
						const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
						Map.translateBMapPoint(longitude, latitude, points => {
							vm.map = new BMap.Map('allmap')
							const point = new BMap.Point(points.lng, points.lat)
							vm.map.centerAndZoom(point, 11)
							const end = new BMap.Point(vm.longitude, vm.latitude)
							console.error(end)
							vm.walking(point, end)
						}, err => {
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
		geocoder (points, callback) {
			// 百度地图地址逆向解析
			const point = new BMap.Point(points.lng, points.lat)
			const geoc = new BMap.Geocoder()
			geoc.getLocation(point, rs => {
				const addComp = rs.addressComponents
				console.log(addComp)
				const address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
				if (address === '') {
					MessageBox('提示', '当前位置解析失败')
				} else {
					callback(address)
				}
			})
		},
		walking (start, end) {
			const walking = new BMap.WalkingRoute(this.map, {
				renderOptions: {
					map: this.map,
					panel: 'result',
					autoViewport: true
				}
			})
			console.log('walk page 当前地址逆解析结果=====>', start)
			console.log('walk page 目的地地址=====>', end)
			walking.search(start, end)
		}
	}
}
</script>

<style>
body, html{
	width: 100%;
	height: 100%;margin:0;
}
.walk{
	width: 100%;
	height: 100%;
}
#allmap{
	height:100%;
	width:100%;
}
#result,#result table{
	width:100%;
}
</style>
