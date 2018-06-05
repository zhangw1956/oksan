<template>
	<div class="wallet">
		<div class="content">
			<div class="block">
				<div class="top c-flex">
					<div class="c-flex1">钱包（元）</div>
					<div class="c-flex1 c-text-right" @click="toDetail">明细</div>
				</div>
				<div class="body">
					<span class="num">{{ balance }}</span>
					<span>元</span>
				</div>
				<div class="footer c-flex">
					<div class="c-flex1">
						<span class="margin">押金</span>
						<span>{{ cashpledge }} 元</span>
					</div>
					<div class="c-flex1">
						<span class="margin">余额</span>
						<span>{{ balance }} 元</span>
					</div>
				</div>
				<div class="bottom" @click="toWithdraw">
					提 现
				</div>
			</div>
		</div>
		<div class="text">
			<h3>钱包说明:</h3>
			<p>1.借伞时，需支付30.00元押金。当钱包余额大于等于30.00元时，自动把30.00元余额转为押金。</p>
			<p>2.还伞时，从押金扣除用伞费用后，自动将剩余押金转为余额。</p>
			<p>3.如果您有需要其他帮助，欢迎致电客服400-900-8113。</p>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import request from '@/utils/request'
export default {
	data () {
		return {
			cashpledge: 0,
			balance: 0
		}
	},
	created () {
		const openId = localStorage.getItem('$open_id')
		request()
			.post('/wx/getWxUserInfo', {openId: openId})
			.then(res => {
				if (res.code === 200) {
					this.balance = res.result.balance
					this.cashpledge = res.result.cashpledge
				} else {
					throw new Error(res.msg)
				}
			})
			.catch(err => {
				MessageBox('提示', err.message)
			})
	},
	methods: {
		toDetail () {
			this.$router.push('/user/wallet/detail')
		},
		toWithdraw () {
			this.$router.push('/user/wallet/withdraw')
		}
	}
}
</script>

<style scoped>
.wallet{
	width: 100%;
	height: 100%;
	font-size: 30px; /*px*/
}
.wallet .content{
	width: 100%;
	height: 50%;
	background-color: rgb(255,90,0);
	position: relative;
}
.wallet .content .block{
	position: absolute;
	left: 50px;
	top: 50px;
	right: 50px;
	background-color: rgb(238,238,238);
	border-radius: 20px;
	padding: 30px;
}
.wallet .content .block .body{
	margin-top: 100px;
	text-align: center;
	font-size: 40px; /*no*/
	margin-bottom: 50px;
}
.wallet .content .block .body .num{
	font-size: 60px; /*no*/
}
.wallet .content .block .footer{
	margin-left: -30px;
	margin-right: -30px;
	background-color: rgb(255,255,255);
	border-top: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
	font-size: 32px; /*px*/
}
.wallet .content .block .footer > div{
	display: flex;
	justify-content: center;
	padding: 15px 0;
}
.wallet .content .block .footer div:first-child{
	border-right: 1px solid #e5e5e5; /*no*/
}
.wallet .content .block .footer .margin{
	margin-right: 15px;
}
.wallet .content .block .bottom{
	width: 300px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	border-radius: 10px;
	background-color: rgb(255,90,0);
	font-size: 32px; /*px*/
	margin-left: 50%;
	transform: translate(-150px);
	margin-top: 130px;
	margin-bottom: 100px;
}
.wallet .text{
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	background-color: rgb(0,0,0);
	color: #fff;
	padding-top: 200px;
	padding-left: 70px;
	padding-right: 70px;
	line-height: 2;
	font-size: 26px; /*px*/
}
.wallet .text h3{
	color: orangered;
}
</style>
