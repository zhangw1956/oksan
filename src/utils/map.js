export default class Map {
	static initMap () {
		/* eslint-disable */
		const AK = '7Bgn5wYuEGgzffmmYGEHskfmRiXHAor5'
		const BMapURL = `https://api.map.baidu.com/api?v=3.0&ak=${AK}&s=1&callback=onBMapCallback`
		return new Promise((resolve, reject) => {
			// 如果已加载直接返回
			if (typeof BMap !== 'undefined') {
				resolve(BMap)
				return true
			}
			// 百度地图异步加载回调处理
			window.onBMapCallback = () => {
				console.log('百度地图脚本初始化成功...')
				resolve(BMap)
			}
			// 插入script脚本
			let scriptNode = document.createElement('script')
			scriptNode.setAttribute('type', 'text/javascript')
			scriptNode.setAttribute('src', BMapURL)
			document.body.appendChild(scriptNode)
		})
	}
	static translateBMapPoint (longitude, latitude, success, error) {
		const point = new BMap.Point(longitude, latitude)
		const convertor = new BMap.Convertor()
		convertor.translate([point], 1, 5, function (data) {
			if (data.status === 0) {
				if (process.env.NODE_ENV === 'production') {
					success(data.points[0])
				} else {
					success({
						lat: 24.495274,
						lng: 118.190844
					})
				}
			} else {
				error(data.status)
			}
		})
	}
}
