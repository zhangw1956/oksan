<template>
	<div class="record">
		<ul v-if="msg === ''">
			<li v-for="item in list" :key="item.orderid">
				<div class="c-flex get-time">
					<div class="c-flex1">
						{{ item.rttm }}
					</div>
					<div class="c-flex1 status-box">
						<div class="status" :class="{'complete': item.status === 2, 'active': item.status !==2}">
							{{ item.status|f_status }}
						</div>
					</div>
				</div>
				<div class="order-id">
					<!-- 订单编号：15646416516541964196 -->
					订单编号：{{ item.orderid }}
				</div>
				<div class="time-cost">
					<span class="icon-time"></span>
					使用时间:{{ item.time }}
					<span class="icon-cost"></span>
					费用:{{ item.cost }}元
				</div>
				<div class="click-box" @click.prevent="showDetail">
					<span class="click"></span>
				</div>
				<section class="detail">
					<div class="address">
						租借地点:{{ item.rtcity }}
					</div>
					<div class="address">
						归还地点:{{ item.bwcity }}
					</div>
					<div class="take-time">
						归还时间:{{ item.bwtm }}
						<span class="take-icon" @click="doLoss(item.orderid)" v-if="item.status === 1">
							遗失登记
						</span>
						<span class="take-icon" @click="doAppeal(item.orderid)" v-if="item.status === 2">
							申诉
						</span>
					</div>
				</section>
			</li>
			<!-- <li>
				<div class="c-flex get-time">
					<div class="c-flex1">
						2071-12-30
					</div>
					<div class="c-flex1 status-box">
						<div class="status"></div>
					</div>
				</div>
				<div class="order-id">
					订单编号：15646416516541964196
				</div>
				<div class="time-cost">
					<span class="icon-time"></span>
					使用时间：30分钟
					<span class="icon-cost"></span>
					费用：100元
				</div>
				<div class="click-box" @click.prevent="showDetail">
					<span class="click"></span>
				</div>
				<section class="detail">
					<div class="address">
						租借地点：南安OKsan分部
					</div>
					<div class="address">
						租借地点：南安OKsan分部
					</div>
					<div class="take-time">
						归还时间: 2017-3-20 11:20:20
						<span class="take-icon">申请遗失</span>
					</div>
				</section>
			</li> -->
		</ul>
		<div class="nodata" v-else>
			{{ msg }}
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
	data () {
		return {
			msg: '',
			list: []
		}
	},
	filters: {
		f_status (code) {
			switch (code) {
			case 0: return '使用中'
			case 1: return '使用中'
			case 2: return '已完成'
			case 3: return '还伞失败'
			case 4: return '遗失'
			case 5: return '申请遗失'
			default: return code
			}
		}
	},
	created () {
		this.queryRecord()
	},
	methods: {
		queryRecord () {
			this.request()
				.post('/umbrella/rentlistInfo', {
					openId: localStorage.getItem('$open_id')
				})
				.then(res => {
					if (res.code === 200) {
						if (res.result.length === 0) {
							this.msg = '没有租借记录'
						} else {
							this.list = res.result
						}
					} else {
						throw new Error(res.result)
					}
				})
				.catch(err => {
					this.msg = err.message
				})
		},
		lostSign () {
			MessageBox.alert({
				title: '提示',
				message: '登记遗失完成,已扣除 30.00 元',
				confirmButtonText: 'OK'
			})
		},
		showDetail (event) {
			let target = null
			if (event.target.nodeName === 'DIV') {
				target = event.target
			} else {
				target = event.target.parentElement
			}
			if (target.className.indexOf('active') > -1) {
				target.className = 'click-box'
			} else {
				target.className = 'click-box active'
			}
		},
		doLoss (orderId) {
			this.request()
				.post('/umbrella/lostRegistration', {
					openId: localStorage.getItem('$open_id'),
					orderId: orderId
				})
				.then(res => {
					MessageBox('提示', res.result)
				})
				.catch(err => {
					MessageBox('提示', err.message)
				})
		},
		doAppeal () {}
	}
}
</script>

<style scoped>
.record{
	padding: 50px 100px 50px 50px;
	color: gray;
	background-color: #fff;
	height: 100%;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.record > ul{
	position: relative;
}
.record > ul li{
	padding-left: 40px;
	border-left: 2px solid #000; /*no*/
	position: relative;
	padding-bottom: 80px;
}
.record > ul > li:before{
	display: block;
	content: '';
	width: 16px;
	height: 16px;
	position: absolute;
	top: 9px;
	left:-10px;
	background-color: rgb(240,90,0);
	border-radius: 100%;
	z-index: 20;
}
.record > ul > li:first-child:after{
	display: block;
	content: '';
	width: 16px;
	height: 32px;
	position: absolute;
	top: 0px;
	left:-9px;
	background-color: #fff;
	z-index: 10;
}
.record > ul > li > div{
	margin-bottom: 15px;
	padding-right: 80px;
}
.record > ul > li > section{
	padding-right: 120px;
}
.record .get-time{
	font-size: 26px; /*px*/
	color: #000;
}
.record .get-time .status-box{
	display: flex;
	justify-content: flex-end;
}
.record .get-time .status{
	width: 77px;
	height: 29px;
	line-height: 29px;
	background-size: 100%;
	color: #fff;
	border-radius: 5px; /*no*/
	text-align: center;
	font-size: 10px; /*no*/
}
.record .get-time .status.complete{
	background-color: rgb(36, 167, 36)
}
.record .get-time .status.active{
	background-color: rgb(255, 90, 0)
}
[data-dpr="1"] .record .get-time .status{
	/* background-image: url(../../assets/images/record/using@2x.png) */
}
.record .time-cost .icon-time, .record .time-cost .icon-cost{
	display: inline-block;
	width: 18px;
	height: 18px;
	background-size: 100%;
	vertical-align: middle;
}

.record .time-cost .icon-cost{
	margin-left: 20px;
}
[data-dpr="1"] .record .time-cost .icon-time{
	background-image: url(../../assets/images/record/time@2x.png)
}
[data-dpr="2"] .record .time-cost .icon-time{
	background-image: url(../../assets/images/record/time@2x.png)
}
[data-dpr="3"] .record .time-cost .icon-time{
	background-image: url(../../assets/images/record/time@3x.png)
}
[data-dpr="1"] .record .time-cost .icon-cost{
	background-image: url(../../assets/images/record/money@2x.png)
}
[data-dpr="2"] .record .time-cost .icon-cost{
	background-image: url(../../assets/images/record/money@2x.png)
}
[data-dpr="3"] .record .time-cost .icon-cost{
	background-image: url(../../assets/images/record/money@3x.png)
}
.record .take-time{
	position: relative;
}
.record .take-time .take-icon{
	display: inline-block;
	width: 100px;
	height: 29px;
	background-size: 100%;
	vertical-align: middle;
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: #fff;
	border-radius: 10px; /*no*/
	border: 1px solid gray; /*no*/
	font-size: 20px; /*px*/
	text-align: center;
}
/* [data-dpr="1"] .record .take-time .take-icon{
	background-image: url(../../assets/images/record/lose@2x.png)
}
[data-dpr="2"] .record .take-time .take-icon{
	background-image: url(../../assets/images/record/lose@2x.png)
}
[data-dpr="3"] .record .take-time .take-icon{
	background-image: url(../../assets/images/record/lose@3x.png)
} */
.record .click-box{
	position: absolute;
	right: 0;
	bottom: 103px;
	width: 34px;
	height: 18px;
	margin-bottom: 0;
	padding-right: 0;
	text-align: center;
	line-height: 18px;
}
.record .click-box .click{
	display: inline-block;
	width: 17px;
	height: 9px;
	margin: auto;
	background-size: 100%;
	vertical-align: middle;
	transform: rotate(180deg);
}
.record .click-box.active .click{
	transform: rotate(0deg);
}
.record .detail{
	padding-right: 80px;
}
.record .detail div{
	margin-bottom: 0.2rem;
}
.record .click-box.active + section.detail{
	display: block;
}
.record .click-box + section.detail{
	display: none;
}
[data-dpr="1"] .record .click{
	background-image: url(../../assets/images/record/click@2x.png)
}
[data-dpr="2"] .record .click{
	background-image: url(../../assets/images/record/click@2x.png)
}
[data-dpr="3"] .record .click{
	background-image: url(../../assets/images/record/click@3x.png)
}
.record .nodata{
	text-align: center;
	padding: 30px; /*no*/
}
</style>
