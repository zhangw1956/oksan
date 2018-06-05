<template>
	<div class="user">
		<div class="top">
			<div class="head-photo">
				<img :src="headImgUrl" alt="">
			</div>
			<p class="user-name">{{ nickname }}</p>
		</div>
		<div class="menu">
			<ul>
				<li class="c-flex" @click="toWallet">
					<div class="c-flex1">
						<span class="icon wallet"></span>
						<span class="text">我的钱包</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toRecord">
					<div class="c-flex1">
						<span class="icon record"></span>
						<span class="text">租借记录</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toHelp">
					<div class="c-flex1">
						<span class="icon help"></span>
						<span class="text">用户指南</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toBuy">
					<div class="c-flex1">
						<span class="icon buy"></span>
						<span class="text">购买主题伞</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toAgreement">
					<div class="c-flex1">
						<span class="icon agreement"></span>
						<span class="text">OKsan使用协议</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toJoin">
					<div class="c-flex1">
						<span class="icon join"></span>
						<span class="text">商务合作</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
				<li class="c-flex" @click="toActivity">
					<div class="c-flex1">
						<span class="icon xiaerba"></span>
						<span class="text">夏尔巴合作</span>
					</div>
					<div class="c-flex1">
						<div class="icon-right"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import request from '@/utils/request'

export default {
	data () {
		return {
			headImgUrl: '',
			balance: '',
			nickname: ''
		}
	},
	beforeCreate () {
		const userImage = new Image()
		if (this._dpr === '2') {
			userImage.src = require('../../assets/images/user/top@2x.png')
		} else {
			userImage.src = require('../../assets/images/user/top@3x.png')
		}
	},
	created () {
		this._getWalletInfo()
	},
	mounted () {
		// 优化夏尔巴活动背景图
		const img2 = new Image()
		img2.src = require('../../assets/images/user/activity/bg@2x.png')
		const img3 = new Image()
		img3.src = require('../../assets/images/user/activity/bg@3x.png')
	},
	methods: {
		toAgreement () {
			this.$router.push('/user/agreement')
		},
		toActivity () {
			this.$router.push('/user/activity')
		},
		toJoin () {
			this.$router.push('/user/join')
		},
		toBuy () {
			this.$router.push('/user/buy')
		},
		toHelp () {
			this.$router.push('/user/help')
		},
		toRecord () {
			this.$router.push('/user/record')
		},
		toWallet () {
			this.$router.push('/user/wallet')
		},
		_getWalletInfo () {
			request()
				.post('/wx/getWxUserInfo', {
					openId: localStorage.getItem('$open_id')
				})
				.then(res => {
					if (res.code === 200) {
						this.headImgUrl = res.result.headImgUrl
						this.nickname = res.result.nickname
						this.balance = res.result.balance
					} else {
						throw new Error(res.result)
					}
				})
				.catch(err => {
					MessageBox('提示', err.message)
				})
		}
	}
}
</script>

<style scoped>
.user{
	width: 100%;
	height: 100;
}
.user .top{
	background-size: 100%;
	overflow: hidden;
}
[data-dpr="1"] .user .top{
	width: 750px;
	height: 350px;
	background-image: url(../../assets/images/user/top@2x.png)
}
[data-dpr="2"] .user .top{
	background-image: url(../../assets/images/user/top@2x.png)
}
[data-dpr="3"] .user .top{
	background-image: url(../../assets/images/user/top@3x.png)
}
.user .top .head-photo{
	width: 150px;
	height: 150px;
	background-color: orchid;
	margin-top: 70px;
	margin-left: 85px;
	border-radius: 100%;
	overflow: hidden;
	border: 2px solid #fff; /*no*/
}.user .top .user-name{
	color: #fff;
	margin-top: 10px;
	width: 320px;
	text-align: center;
	font-size: 28px; /*px*/
}
.user .menu {
	padding-top: 50px;
	padding-left: 70px;
}
.user .menu li{
	padding: 20px 0;
}
.user .menu li > div:first-child{
	display: flex;
	align-items: center;
}
.user .menu .icon{
	display: inline-block;
	margin-right: 20px;
	background-size: 100%;
}
.user .menu .icon{
	width: 47px;
	height: 46px;
}
[data-dpr="1"] .user .menu .wallet{
	background-image: url(../../assets/images/user/wallet@2x.png)
}
[data-dpr="2"] .user .menu .wallet{
	background-image: url(../../assets/images/user/wallet@2x.png)
}
[data-dpr="3"] .user .menu .wallet{
	background-image: url(../../assets/images/user/wallet@3x.png)
}
[data-dpr="1"] .user .menu .record{
	background-image: url(../../assets/images/user/record@2x.png)
}
[data-dpr="2"] .user .menu .record{
	background-image: url(../../assets/images/user/record@2x.png)
}
[data-dpr="3"] .user .menu .record{
	background-image: url(../../assets/images/user/record@3x.png)
}
[data-dpr="1"] .user .menu .help{
	background-image: url(../../assets/images/user/help@2x.png)
}
[data-dpr="2"] .user .menu .help{
	background-image: url(../../assets/images/user/help@2x.png)
}
[data-dpr="3"] .user .menu .help{
	background-image: url(../../assets/images/user/help@3x.png)
}
[data-dpr="1"] .user .menu .buy{
	background-image: url(../../assets/images/user/buy@2x.png)
}
[data-dpr="2"] .user .menu .buy{
	background-image: url(../../assets/images/user/buy@2x.png)
}
[data-dpr="3"] .user .menu .buy{
	background-image: url(../../assets/images/user/buy@3x.png)
}
[data-dpr="1"] .user .menu .agreement{
	background-image: url(../../assets/images/user/agreement@2x.png)
}
[data-dpr="2"] .user .menu .agreement{
	background-image: url(../../assets/images/user/agreement@2x.png)
}
[data-dpr="3"] .user .menu .agreement{
	background-image: url(../../assets/images/user/agreement@3x.png)
}
[data-dpr="1"] .user .menu .join{
	background-image: url(../../assets/images/user/join@2x.png)
}
[data-dpr="2"] .user .menu .join{
	background-image: url(../../assets/images/user/join@2x.png)
}
[data-dpr="3"] .user .menu .join{
	background-image: url(../../assets/images/user/join@3x.png)
}
[data-dpr="1"] .user .menu .xiaerba{
	background-image: url(../../assets/images/user/xiaerba@2x.png)
}
[data-dpr="2"] .user .menu .xiaerba{
	background-image: url(../../assets/images/user/xiaerba@2x.png)
}
[data-dpr="3"] .user .menu .xiaerba{
	background-image: url(../../assets/images/user/xiaerba@3x.png)
}
.user .menu > ul > li > div:last-child{
	text-align: right;
	padding-right: 70px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.user .menu .icon-right{
	width: 15px;
	height: 30px;
	background-size: 100%;
}
[data-dpr="1"] .user .menu .icon-right{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="2"] .user .menu .icon-right{
	background-image: url(../../assets/images/user/right@2x.png)
}
[data-dpr="3"] .user .menu .icon-right{
	background-image: url(../../assets/images/user/right@3x.png)
}
</style>
