<template>
	<div class="action-state">
		<div class="center">
			<div class="slot">
				<slot name="des">
					<div style="text-align: center">成功</div>
				</slot>
				<slot name="icon">
					<div class="icon success"></div>
				</slot>
			</div>
		</div>
		<div class="tip">
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
	name: 'o-state',
	beforeCreate () {
		const img = new Image()
		if (this._dpr === '2') {
			img.src = require('../assets/images/get/bg@2x.png')
		} else {
			img.src = require('../assets/images/get/bg@3x.png')
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
.action-state{
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
	position: relative;
}
[data-dpr="1"] .action-state,[data-dpr="2"] .action-state{
	background-image: url('../assets/images/get/bg@2x.png');
}
[data-dpr="3"] .action-state{
	background-image: url('../assets/images/get/bg@3x.png');
}
.action-state .center{
	width: 573px;
	height: 656px;
	position: absolute;
	background-size: 100% 100%;
	top: 100px;
	left: 50%;
	transform: translate(-286.5px);
	line-height: 1.5;
	overflow: hidden;
}
[data-dpr="1"] .action-state .center,[data-dpr="2"] .action-state .center{
	background-image: url('../assets/images/get/center@2x.png');
}
[data-dpr="3"] .action-state .center{
	background-image: url('../assets/images/get/center@3x.png');
}
.action-state .slot{
	margin-top: 430px;
}
.action-state .tip{
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	top: 800px;
	left: 0;
	padding: 70px 80px;
	line-height: 1.5;
	color: #777;
}
.action-state .tip h3{
	color: orange;
	margin-bottom: 20px;
}
.action-state .icon{
	width: 28px;
	height: 28px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-14px)
}
[data-dpr="1"] .action-state .success, [data-dpr="2"] .action-state .success{
	background-image: url('../assets/images/get/success@2x.png')
}
[data-dpr="3"] .action-state .success{
	background-image: url('../assets/images/get/success@3x.png')
}
</style>
