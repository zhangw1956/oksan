<template>
	<div class="help">
		<ul @click="doClick">
			<li>
				<div class="list">
					<a href="javascript:void(0)" class="">一、如何租借伞？</a>
					<div class="content">
						<p>微信扫描每把伞所对应的二维码，关注公众号后，充值押金成功，在25秒内取走伞</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">二、如何归还伞？</a>
					<div class="content">
						<p>1.将伞柄插入伞孔，稍等3-5秒，语音提示还伞成功、押金自动退回我的零钱。</p>
						<p>2.可通过公众号主页的“附近网点”找到最近的网点，任意网点都可归还</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">三、伞如何收费？</a>
					<div class="content">
						<p>借伞时，需缴纳押金30元/把。还伞后，用伞费用会从押金中扣减，剩余押金将自动转为可提现的余额。</p>
						<p>用伞计费标准——</p>
						<p>前10分钟免费，租金为每3元/24小时收费，不足24小时按24小时计算、以此类推。</p>
						<p>超过10天未归还伞，系统默认用户购伞成功。扣除30元押金，并归还所有租伞费用</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">四、还伞后持续计费？</a>
					<div class="content">
						<p>还伞后持续计费可能是因为硬件故障而导致的，可以拨打客服电话（400*********），说明情况。</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">五、扫码取伞时，伞卡住取不出伞</a>
					<div class="content">
						<p>伞槽故障，（系统不收取任何费用）请换另一个二维码扫码借伞</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">六、租到破损的伞如何解决？</a>
					<div class="content">
						<p>请尽快归还，重新租借，我们为您每次借伞提供前10分钟免费。</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">七、伞丢失？你想把伞带回家？</a>
					<div class="content">
						<p>系统默认扣押金30元，相当于你把伞买走，并归还所有租伞费用。</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">八、归还时提示归还失败？</a>
					<div class="content">
						<p>1.请将伞柄完全插入伞槽（伞柄插入不到位）。</p>
						<p>2.当伞柜 断电或电讯号断网情况下会导致还伞失败（检查电源、取下插座开关重新插入）。</p>
						<p>3.如需帮助，请在公众号留言或致电客服400-*********。</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">九、归还伞后，没收到还伞成功提示？</a>
					<div class="content">
						<p>1.请检查伞柄是否完全卡入伞槽中（伞柄插入不到位）</p>
						<p>2.在一些网络不佳的环境下，提示会有延迟，请尝试刷新</p>
						<p>3.如需帮助，请在公众号留言或致电客服400-*********。</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">十、如何退回押金？</a>
					<div class="content">
						<p>无需手动退回押金。还伞后，用伞费用会从押金中扣减，剩余押金将自动转为余额，余额可在“个人中心-我的钱包”中提现</p>
					</div>
				</div>
			</li>
			<li>
				<div class="list">
					<a href="javascript:void(0)">十一、提现后如何确认到账？</a>
					<div class="content">
						<p>微信零钱支付：</p>
						<p>1.到账查询点击微信→钱包→零钱→零钱明细，查看您的提现记录，以确认提现是否到账</p>
						<p>2.微信绑定银行卡支付：到账时微信支付会有退款到账通知，若需确认，请您查看银行交易明细，是否有提现金额入账</p>
						<p>3.微信绑定信用卡支付：信用卡客户和银行卡客户相同，但需确认自己的结账日期，根据结账日期确认查询已出账单还是未出账单</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	methods: {
		doClick () {
			const target = event.target
			if (target.nodeName !== 'A') {
				return
			}
			if (target.className.indexOf('active') > -1) {
				target.className = ''
			} else {
				target.className = 'active'
			}
		}
	}
}
</script>

<style scoped>
.help{
	height: 100%;
	overflow-y: auto;
}
.help .list{
	padding-left: 30px;
	background-color: #fff;
	font-size: 26px; /*px*/
}
.help .list a{
	padding: 35px 0;
	display: inline-block;
	width: 100%;
	position: relative;
}
.help .list a:before{
	content: '';
	display: block;
	width: 15px;
	height: 30px;
	position: absolute;
	top: 50%;
	right: 70px;
	background-size: 100%;
	transform: translateY(-15px) rotate(90deg);
}
.help .list a.active:before{
	transform: translateY(-15px) rotate(-90deg);
}
[data-dpr="1"] .help .list a:before{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="2"] .help .list a:before{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="3"] .help .list a:before{
	background-image: url(../../assets/images/user/right@3x.png)
}
.help .list a:after{
	content: '';
	display: block;
	width: 100%;
	height: 2px;
	background-size: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
}
[data-dpr="1"] .help .list a:after{
	background-image: url(../../assets/images/user/line@2x.png);
}
[data-dpr="2"] .help .list a:after{
	background-image: url(../../assets/images/user/line@2x.png);
}
[data-dpr="3"] .help .list a:after{
	background-image: url(../../assets/images/user/line@3x.png);
}
.help .content{
	display: none;
	padding: 25px 30px;
	margin-left: -30px;
	background-color: rgb(238,238,238);
	font-size: 20px; /*px*/
}
.help .content p{
	line-height: 2;
}
.help .list a.active + div{
	display: block;
}
</style>
