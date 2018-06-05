<template>
	<div class="scan">
		<div>
			OKSan
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
	created () {
		const wx = this.wx
		const vm = this
		// this.$router.push('/state/1')
		wx.ready(function () {
			wx.scanQRCode({
				desc: 'scanQRCode desc',
				needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
				success (res) {
					const result = res.resultStr
					const array = result.split('/')
					vm.$router.push('/rent/submit/' + array[array.length - 1])
				},
				fail (res) {
					if (res.errMsg.indexOf('function_not_exist') > 0) {
						MessageBox('提示', '版本过低请升级')
					} else {
						MessageBox('提示', res)
					}
				}
			})
		})
	}
}
</script>

<style scoped>
.scan div{
	padding: 30px; /*no*/
	text-align: center;
}
</style>
