<template>
	<div class="join">
		<div class="top"></div>
		<div class="middle">
			<p>联系我们</p>
			<div class="code"></div>
			<p class="tel">400-xxxx（招商部）</p>
		</div>
		<div class="bottom">
			<div class="row">
				<input type="text" placeholder="您的姓名" v-model.trim="name">
			</div>
			<div class="row">
				<input type="tel" placeholder="您的电话/手机" v-model.number="phone" maxlength="11">
			</div>
			<div class="row">
				<input type="text" placeholder="所在城市" v-model.trim="address">
			</div>
			<div class="row">
				<textarea placeholder="合作意向描述" rows="5" v-model="describe"></textarea>
			</div>
			<div class="btn" @click="doSubmit">
				提 交
			</div>
		</div>
	</div>
</template>

<script>
import { MessageBox, Indicator, Toast } from 'mint-ui'
import reg from '@/utils/reg'
import request from '@/utils/request'

export default {
	data () {
		return {
			name: '',
			phone: '',
			address: '',
			describe: ''
		}
	},
	beforeCreate () {
		// 优化加入我们背景图加载
		const img = new Image()
		if (this._dpr === '2') {
			img.src = require('../../assets/images/user/join-top@2x.png')
		} else {
			img.src = require('../../assets/images/user/join-top@3x.png')
		}
	},
	methods: {
		_valiudate () {
			if (!this.name) {
				MessageBox('提示', '请填写姓名')
				return false
			}
			if (!reg.mobile.test(this.phone)) {
				MessageBox('提示', '手机号格式不正确')
				return false
			}
			if (!this.address) {
				MessageBox('提示', '请填写所在城市')
				return false
			}
			return true
		},
		doSubmit () {
			const result = this._valiudate()
			if (result) {
				Indicator.open()
				request()
					.post('/business/businesCooperate', {
						openId: localStorage.getItem('$open_id'),
						name: this.name,
						phone: this.phone,
						address: this.address,
						describe: this.describe,
						status: ''
					})
					.then(res => {
						if (res.code === 200) {
							Toast({
								message: res.result,
								iconClass: 'icon icon-success'
							})
						} else {
							throw new Error(res.result)
						}
						Indicator.close()
					})
					.catch(err => {
						MessageBox('提示', err.message)
						Indicator.close()
					})
			}
		}
	}
}
</script>
<style>
html{
	background-color: #fff;
}
</style>

<style scoped>
.join .top{
	width: 750px;
	height: 377px;
	background-size: 100%;
}
[data-dpr="1"] .join .top{
	background-image: url(../../assets/images/user/join-top@2x.png);
}
[data-dpr="2"] .join .top{
	background-image: url(../../assets/images/user/join-top@2x.png);
}
[data-dpr="3"] .join .top{
	background-image: url(../../assets/images/user/join-top@3x.png);
}
.join .middle p:first-child{
	text-align: center;
	padding: 7px; /*no*/
	font-size: 30px; /*px*/
	color: rgb(240,90,0)
}
.join .middle .code{
	width: 160px;
	height: 160px;
	background-color: peachpuff;
	margin: 0 auto;
}
.join .middle .tel{
	padding: 7px;
	text-align: center;
	font-size: 30px; /*px*/
}
.join .bottom{
	margin-top: 15px; /*no*/
}
.join .bottom .row{
	text-align: center;
	margin-bottom: 12px;
}
.join .bottom .row input{
	border: 2px solid rgb(240,90,0);
	border-radius: 10px;
	padding: 12px;
	width: 500px;
	font-size: 10px; /*no*/
}
.join .bottom .row textarea{
	width: 500px;
	padding: 12px;
	border: 2px solid rgb(240,90,0);
	border-radius: 10px;
}
.join .bottom .btn{
	margin: 10px auto; /*no*/
	width: 200px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: #fff;
	background-color: rgb(240,90,0);
	border-radius: 10px;
}
</style>
