<template>
	<div class="buy-confirm">
		<div class="">
			<mt-field label="收货地址" placeholder="请输入收货地址" v-model.trim="order.address"></mt-field>
			<mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="order.phone" :attr="{ 'maxlength': 11 }"></mt-field>
		</div>
		<div class="type c-flex">
			<div class="c-flex1">配送方式</div>
			<div class="c-flex1">免运费</div>
		</div>
		<div class="detail c-flex">
			<div class="c-flex1 img-box">
				<img :src="info.image" alt="">
			</div>
			<div class="c-flex3">
				<p>{{ info.name }}</p>
				<div class="price">
					<span>&yen; {{ info.price }}</span>
					<span class="num"> X {{ order.num }}</span>
				</div>
			</div>
		</div>
		<div class="amount">
			<span>实付金额（免运费）</span>
			<span class="total">&yen; {{ order.num * info.price }}</span>
		</div>
		<div class="pay" @click="confirmBuy">
			<button type="button">
				<strong>去付款</strong>
			</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Field, MessageBox, Indicator } from 'mint-ui'
import request from '@/utils/request'
import reg from '@/utils/reg'

Vue.component(Field.name, Field)

export default {
	data () {
		return {
			info: {
				id: '',
				name: '',
				price: '',
				image: ''
			},
			order: {
				num: 0,
				address: '',
				phone: ''
			}
		}
	},
	created () {
		// 读取订单信息
		const order = JSON.parse(localStorage.getItem('$order'))
		this.info = order.info
		this.order.num = order.order.num
		// this.wx.ready(() => {
		// 	this.wx.openAddress({
		// 		success: function (res) {
		// 			this.userName = res.userName // 收货人姓名
		// 			this.postalCode = res.postalCode // 邮编
		// 			this.provinceName = res.provinceName // 国标收货地址第一级地址（省）
		// 			this.cityName = res.cityName // 国标收货地址第二级地址（市）
		// 			this.countryName = res.countryName // 国标收货地址第三级地址（国家）
		// 			this.detailInfo = res.detailInfo // 详细收货地址信息
		// 			this.nationalCode = res.nationalCode // 收货地址国家码
		// 			this.telNumber = res.telNumber // 收货人手机号码
		// 		},
		// 		fail: function (err) {
		// 			alert(JSON.stringify(err))
		// 		}
		// 	})
		// })
	},
	methods: {
		confirmBuy () {
			// 校验收货地址不为空
			if (!this.order.address) {
				MessageBox('提示', '请填写收货地址')
				return
			}
			if (!reg.mobile.test(this.order.phone)) {
				MessageBox('提示', '手机号码格式不正确')
				return
			}
			Indicator.open()
			request()
				.post('/umbrella/submitUmtheme', {
					openId: localStorage.getItem('$open_id'),
					number: this.order.num,
					price: this.info.price,
					umthemeName: this.info.id,
					umthemeid: this.info.id,
					name: this.info.name,
					phone: this.order.phone,
					address: this.order.address
				})
				.then(res => {
					if (res.code === 200) {
						this.wxPay(res.response)
					} else {
						throw new Error(res.msg)
					}
					Indicator.close()
				})
				.catch(err => {
					MessageBox('提示', err.message)
					Indicator.close()
				})
		},
		wxPay (data) {
			this.wx.chooseWXPay({
				timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
				package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.paySign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数
					MessageBox('提示', '付款成功')
				},
				failt: function () {
					// 支付失败回调
				}
			})
		}
	}
}
</script>

<style scoped>
.buy-confirm{
	font-size: 1.2em;
	padding: 20px 0; /*no*/
	overflow: hidden;
	background-color: rgb(239, 239, 243);
	height: 100%;
}
.address{
	border-top: 1px solid rgb(201, 201, 203);
	padding: 10px 10px 0 10px; /*no*/
	background-color: #fff;
}
.address div{
	padding-bottom: 10px; /*no*/
	border-bottom: 1px solid rgb(201, 201, 203);
}
.type{
	padding: 10px; /*no*/
	background-color: #fff;
}
.type div:last-child{
	text-align: right;
}
.detail{
	margin-top: 20px; /*no*/
	padding: 10px; /*no*/
	background-color: #fff;
	border-bottom: 1px solid rgb(201, 201, 203);
}
.detail .img-box{
	position: relative;
	background-color: #ddd;
	overflow: hidden;
}
.detail .img-box::after{
	display: block;
	content: '';
	padding-top: 100%;
}
.detail .img-box img{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
.detail div:last-child{
	padding-left: 10px; /*no*/
}
.detail p{
	color: rgb(165, 165, 165);
	font-size: 1.3em;
	margin-bottom: 30px; /*no*/
}
.detail .price{
	font-size: 1.3em;
	text-align: right;
}
.detail .num{
	margin-left: 30px; /*no*/
}
.amount{
	font-size: 1.2em;
	padding: 20px 10px; /*no*/
	text-align: right;
}
.amount .total{
	font-size: 1.5em;
	margin-left: 10px; /*no*/
}
.pay{
	padding: 10px; /*no*/
}
.pay button{
	padding: 10px 0; /*no*/
	width: 100%;
	font-size: 1.2em;
	border: none;
	outline: none;
	background-color: rgb(3, 189, 0);
	color: #fff;
	border-radius: 7px; /*no*/
}
</style>
