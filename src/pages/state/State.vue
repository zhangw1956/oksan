<template>
	<div class="get">
		<div class="prev" @click="prev">上一步</div>
		<div class="next" @click="next">下一步</div>
		<div class="center">
			<div class="state" v-if="state === '1'">
				<p class="balance">
					<span>账户余额</span>
					<span>200</span>
				</p>
				<p class="recharge">
					<span>应充值</span>
					<span>100</span>
				</p>
				<div class="recharge-btn" @click="toRecharge"></div>
			</div>
			<div class="state" v-if="state === '2'">
				<p class="balance">
					<span>账户余额</span>
					<span>3000</span>
				</p>
				<p class="recharge">
					<span>钱包余额充足</span>
				</p>
				<div class="icon action"></div>
			</div>
			<div class="state" v-if="state === '3'">
				<p class="balance">
					<span>10号伞槽</span>
				</p>
				<p class="recharge">
					<span>出伞中</span>
				</p>
				<div class="wait">
					<div class="item"></div>
					<div class="item"></div>
					<div class="item"></div>
				</div>
			</div>
			<div class="state" v-if="state === '4'">
				<p class="balance">
					<span>10号伞已出请取伞</span>
				</p>
				<p class="recharge">
					<span>请取伞</span>
				</p>
				<div class="icon action"></div>
			</div>
			<div class="state" v-if="state === '5'">
				<p class="balance">
					<span>感谢您的使用</span>
				</p>
				<p class="recharge">
					<span>取伞成功</span>
				</p>
				<div class="icon success"></div>
			</div>
			<div class="state" v-if="state === '6'">
				<p class="balance">
					<span>设备无响应</span>
				</p>
				<p class="recharge">
					<span>取伞失败</span>
				</p>
				<div class="icon fail"></div>
			</div>
			<div class="state" v-if="state === '7'">
				<p class="balance">
					<span>未有效时间内取伞</span>
				</p>
				<p class="recharge">
					<span>取伞失败</span>
				</p>
				<div class="icon fail"></div>
			</div>
		</div>
		<div class="state" v-if="state === '8'">
				<p class="balance">
					<span>感谢您的使用</span>
				</p>
				<p class="recharge">
					<span>提现成功</span>
				</p>
				<div class="icon success"></div>
			</div>
		<div class="text">
			<h3>温馨提示:</h3>
			<p>
				1、借伞时，需支付30元押金，当钱包余额大于等于30元时，自动把30元余额转为押金;
			</p>
			<p>
				2、还伞时，从押金中扣除用伞费用，并自动将余额押金转为余额；
			</p>
			<p>
				3、如果您需要其他帮助，欢迎致电客服400-9008113.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'get',
	data () {
		return {
			state: '0',
			balance: '',
			recharge: ''
		}
	},
	created () {
		this.state = this.$route.params.status
	},
	methods: {
		toRecharge () {},
		prev () {
			if (this.state === '1') {
				this.$router.back()
			} else {
				this.state = (parseInt(this.state) - 1).toString()
			}
		},
		next () {
			if (this.state === '7') {
				return
			}
			this.state = (parseInt(this.state) + 1).toString()
		}
	}
}
</script>

<style>
html{
	background-color: rgb(240,240,240)
}
</style>

<style scoped>
.get{
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
	position: relative;
}
.prev,.next{
	padding: 20px;
	background-color: #fff;
	position: absolute;
	top: 0;
}
.prev{
	left: 0;
}
.next{
	right: 0;
}
[data-dpr="1"] .get,[data-dpr="2"] .get{
	background-image: url('../../assets/images/get/bg@2x.png');
}
[data-dpr="3"] .get{
	background-image: url('../../assets/images/get/bg@3x.png');
}
.get .center{
	width: 573px;
	height: 656px;
	position: absolute;
	background-size: 100% 100%;
	top: 100px;
	left: 50%;
	transform: translate(-286.5px);
	line-height: 1.5;
}
[data-dpr="1"] .get .center,[data-dpr="2"] .get .center{
	background-image: url('../../assets/images/get/center@2x.png');
}
[data-dpr="3"] .get .center{
	background-image: url('../../assets/images/get/center@3x.png');
}
.get .center .balance, .get .center .recharge{
	text-align: center;
}
.get .center .balance{
	margin-top: 400px;
	font-size: 32px; /*px*/
}
.get .center .recharge{
	font-size: 28px; /*px*/
	color: orange;
}
.get .center .recharge-btn{
	margin-top: 30px;
	width: 272px;
	height: 36px;
	background-size: 100% 100%;
	margin-left: 50%;
	transform: translate(-136px);
}
[data-dpr="1"] .get .center .recharge-btn, [data-dpr="2"] .get .center .recharge-btn{
	background-image: url('../../assets/images/get/btn@2x.png')
}
[data-dpr="3"] .get .center .recharge-btn{
	background-image: url('../../assets/images/get/btn@3x.png')
}
.get .text{
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	top: 800px;
	left: 0;
	padding: 70px 80px;
	line-height: 1.5;
	color: #777;
}
.get .text h3{
	color: orange;
	margin-bottom: 20px;
}
.get .state .icon{
	width: 28px;
	height: 28px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-14px)
}
[data-dpr="1"] .get .state .fail, [data-dpr="2"] .get .state .fail{
	background-image: url('../../assets/images/get/fail@2x.png')
}
[data-dpr="3"] .get .state .fail{
	background-image: url('../../assets/images/get/fail@3x.png')
}
[data-dpr="1"] .get .state .success, [data-dpr="2"] .get .state .success{
	background-image: url('../../assets/images/get/success@2x.png')
}
[data-dpr="3"] .get .state .success{
	background-image: url('../../assets/images/get/success@3x.png')
}
.get .state .wait{
	width: 72px;
	height: 24px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-36px);
	overflow: hidden;
	margin-top: 5px;
}
.get .state .wait .item{
	width: 12px;
	height: 12px;
	float: left;
	background-size: 100%;
	margin: 0 5px;
}
[data-dpr="1"] .get .state .action, [data-dpr="2"] .get .state .action{
	background-image: url('../../assets/images/get/action@2x.png')
}
[data-dpr="3"] .get .state .action{
	background-image: url('../../assets/images/get/action@3x.png')
}

[data-dpr="1"] .get .state .wait .item, [data-dpr="2"] .get .state .wait .item{
	background-image: url('../../assets/images/get/wait@2x.png')
}
[data-dpr="3"] .get .state .wait .item{
	background-image: url('../../assets/images/get/wait@3x.png')
}
</style>
