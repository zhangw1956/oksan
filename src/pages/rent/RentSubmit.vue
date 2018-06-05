<template>
	<div class="rent-submit">
		<o-state>
			<div slot="des" class="des" v-if="code === 0">
				<p class="balance">{{ msg }}</p>
			</div>
			<div slot="icon" v-if="code === 0"></div>

			<div slot="des" class="des" v-if="code === 200">
				<p class="balance">账户余额 {{ balance }}</p>
				<p class="text">钱包余额充足</p>
			</div>
			<div slot="icon" v-if="code === 200"></div>

			<div slot="des" class="des" v-if="code === 203">
				<p class="balance">账户余额 {{ balance }}</p>
				<p class="text">应充值 {{ rechargeMoney }}</p>
			</div>
			<div slot="icon" v-if="code === 203">
				<div class="recharge-btn" @click="toRecharge"></div>
			</div>

			<div slot="des" class="des" v-if="code === 300">
				<p class="balance">{{ msg }}</p>
				<p class="text">出伞中</p>
			</div>
			<div slot="icon" v-if="code === 300">
				<div class="wait">
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
				</div>
			</div>

			<div slot="des" class="des" v-if="code === '100'">
				<p class="balance">{{ msg }}</p>
				<p class="text">开锁成功,请取伞</p>
			</div>
			<div slot="icon" v-if="code === '100'">
				<div class="icon action"></div>
			</div>

			<div slot="des" class="des" v-if="code === '101'">
				<p class="balance">{{ msg }}</p>
				<p class="text">开锁失败</p>
			</div>
			<div slot="icon" v-if="code === '101'">
				<div class="icon fail"></div>
			</div>

			<div slot="des" class="des" v-if="code === '102'">
				<p class="balance">感谢您的使用</p>
				<p class="text">取伞成功</p>
			</div>

			<div slot="des" class="des" v-if="code === '103'">
				<p class="balance">{{ msg }}</p>
				<p class="text">取伞失败</p>
			</div>
			<div slot="icon" v-if="code === '103'">
				<div class="icon fail"></div>
			</div>
		</o-state>
	</div>
</template>

<script>
import Vue from 'vue'
import { Indicator, MessageBox } from 'mint-ui'
import ActionState from '@/components/ActionState'

Vue.component(ActionState.name, ActionState)

export default {
	data () {
		return {
			code: 0,
			msg: '正在查询...',
			orderid: '',
			balance: 0,
			rechargeMoney: 0,
			uniqueCode: '',
			payInfo: null,
			goEasy: null
		}
	},
	created () {
		this.uniqueCode = this.$route.params.uniqueCode
		this.submitOrder()
	},
	methods: {
		toRecharge () {
			const data = this.payInfo
			const vm = this
			// 微信支付
			this.wx.chooseWXPay({
				timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
				package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: data.paySign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数
					MessageBox.alert('付款成功').then(action => {
						// 调用充值接口
						vm.postRecharge()
					})
				},
				failt: function () {
					// 支付失败回调
				}
			})
		},
		submitOrder () {
			Indicator.open()
			this.request()
				.post('/umbrella/subBorrowUmbrella', {
					openId: localStorage.getItem('$open_id'),
					uniqueCode: this.uniqueCode
				})
				.then(res => {
					if (res.code === 200) {
						// 查询余额
						this.getBalance()
						this.code = 200
						this.orderid = res.result
						const t = setTimeout(() => {
							// 切换到出伞中状态
							this.msg = res.result
							this.code = 300
							// 订阅开伞结果消息
							this.openSubscribe()
							clearTimeout(t)
						}, 1000)
					} else if (res.code === 203) {
						this.code = 203
						this.rechargeMoney = res.response.rechargeMoney
						this.balance = res.response.balance
						this.orderid = res.response.orderid
						this.payInfo = res.response
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					this.msg = err.message
					Indicator.close()
				})
		},
		postRecharge () {
			Indicator.open('正在开伞...')
			this.request()
				.post('http://oksan.vip/guns-admin/rent/recharge', {
					orderid: this.orderid,
					openid: localStorage.getItem('$open_id'),
					flag: 1,
					source: 1,
					uniqueCode: this.uniqueCode,
					strategy: 1
				})
				.then(res => {
					if (res.code === 200) {
						// 切换到出伞中状态
						this.code = 300
						this.msg = res.result
						const t = setTimeout(() => {
							// 订阅开伞结果消息
							this.openSubscribe()
							clearTimeout(t)
						}, 1000)
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					this.msg = err.message
					Indicator.close()
				})
		},
		closeSubscribe () {
			/* eslint-disable */
			this.goEasy.unsubscribe({
				channel: this.orderid
			})
		},
		openSubscribe () {
			const vm = this
			/* eslint-disable */
			this.goEasy = new GoEasy({
				appkey: 'BS-c377e5b8275d418caadd0be6a7dd9167',
				onConnected: function () {
					console.log("成功连接GoEasy")
				},
				onDisconnected: function () {
					MessageBox('提示', '与服务器连接断开')
				},
				onConnectFailed: function (error) {
					MessageBox('提示', `与服务器连接失败${error.code}:${error.content}`)
				}
			})
			this.goEasy.subscribe({
				channel: this.orderid,
				onMessage: function (message) {
					// alert("Channel:" + message.channel + " content:" + message.content);
					message.content = message.content || {}
					let result = {}
					if (typeof message.content === 'string') {
						try {
							result = JSON.parse(message.content)
						} catch (e) {
							MessageBox('提示', '接口正在维护...')
						}
					} else {
						result = message.content
					}
					// 开锁成功
					if (result.code.toString() === '100') {
						vm.code = '100'
					} else if (result.code.toString() === '101') {
						// 开锁失败
						vm.code = '101'
					} else if (result.code.toString() === '102') {
						// 取伞成功
						vm.code = '102'
						// 取消订阅
						vm.closeSubscribe()
					} else if (result.code.toString() === '103') {
						// 取伞失败
						vm.code = '103'
					} else {
						MessageBox('提示', result.message || '返回信息未知')
					}
					vm.msg = result.message || '返回信息未知'
				},
				onSuccess: function () {
					console.log(`${vm.orderid} 频道订阅成功`)
				},
				onFailed: function (error) {
					MessageBox('提示', `开伞操作响应失败[${error.code} : ${error.content}`)
				}
			})
		},
		getBalance () {
			Indicator.open()
			this.request()
				.post('/wx/getWxUserInfo', {
					openId: localStorage.getItem('$open_id')
				})
				.then(res => {
					if (res.code === 200) {
						this.balance = res.result.balance
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					MessageBox('提示', '查询余额失败:' + err.message)
					Indicator.close()
				})
		}
	}
}
</script>

<style scoped>
.rent-submit{
	width: 100%;
	height: 100%;
}
.rent-submit .des{
	text-align: center;
}
.rent-submit .balance{
	margin-top: 400px;
	font-size: 32px; /*px*/
}
.rent-submit .text{
	font-size: 28px; /*px*/
	color: orange;
}
.rent-submit .recharge-btn{
	margin-top: 30px;
	width: 272px;
	height: 40px;
	background-size: 100% 100%;
	margin-left: 50%;
	transform: translate(-136px);
}
[data-dpr="1"] .rent-submit .recharge-btn, [data-dpr="2"] .get .center .recharge-btn{
	background-image: url('../../assets/images/get/btn@2x.png')
}
[data-dpr="3"] .rent-submit .recharge-btn{
	background-image: url('../../assets/images/get/btn@3x.png')
}
.rent-submit .wait{
	width: 72px;
	height: 24px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-36px);
	overflow: hidden;
	margin-top: 5px;
}
.rent-submit .wait .item{
	width: 12px;
	height: 12px;
	float: left;
	background-size: 100%;
	margin: 0 5px;
}
.rent-submit .icon{
	width: 28px;
	height: 28px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-14px)
}
[data-dpr="1"] .rent-submit .wait .item, [data-dpr="2"] .rent-submit .wait .item{
	background-image: url('../../assets/images/get/wait@2x.png')
}
[data-dpr="3"] .rent-submit .wait .item{
	background-image: url('../../assets/images/get/wait@3x.png')
}
[data-dpr="1"] .get .state .action, [data-dpr="2"] .get .state .action{
	background-image: url('../../assets/images/get/action@2x.png')
}
[data-dpr="3"] .get .state .action{
	background-image: url('../../assets/images/get/action@3x.png')
}
[data-dpr="1"] .get .state .fail, [data-dpr="2"] .get .state .fail{
	background-image: url('../../assets/images/get/fail@2x.png')
}
[data-dpr="3"] .get .state .fail{
	background-image: url('../../assets/images/get/fail@3x.png')
}
</style>
