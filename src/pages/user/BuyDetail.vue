<template>
	<div class="buy-detail">
		<div class="pro c-flex">
			<div class="c-flex1 img-box">
				<img :src="image" alt="">
			</div>
			<div class="c-flex3 des">
				<p>{{ name }}</p>
				<div class="price">
					&yen; <strong>{{ price }}</strong>
				</div>
			</div>
		</div>
		<div class="num">
			<p>数量:</p>
			<div class="c-flex input">
				<div class="c-flex1" @click="doSub">
					<strong>-</strong>
				</div>
				<div class="c-flex1">
					{{ num }}
				</div>
				<div class="c-flex1" @click="doAdd">
					<strong>+</strong>
				</div>
			</div>
		</div>
		<div class="button" @click="toPay">
			<button type="button">
				购买
			</button>
		</div>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import request from '@/utils/request'
export default {
	data () {
		return {
			info: null,
			name: '',
			id: '',
			image: '',
			price: 0,
			num: 1
		}
	},
	created () {
		// this._queryInfo()
		// 读取商品信息
		const order = JSON.parse(localStorage.getItem('$order'))
		this.info = order.info
		this.name = order.info.name
		this.id = order.info.id
		this.price = order.info.price
		this.image = order.info.image
	},
	methods: {
		_queryInfo () {
			request()
				.post('/umbrella/umthemeList', {
					openId: localStorage.getItem('$open_id'),
					name: '伞'
				})
				.then(res => {
					if (res.code === 200) {
						// 获取主题伞详情
						this.name = res.result[0].name
						this.images = res.result[0].images
						this.price = res.result[0].price
						this.id = res.result[0].id
					} else {
						throw new Error(res.result)
					}
				})
				.catch(err => {
					MessageBox('提示', err.messge)
				})
		},
		doSub () {
			let _num = parseInt(this.num)
			if (_num > 1) {
				this.num = --_num
			}
		},
		doAdd () {
			let _num = parseInt(this.num)
			this.num = ++_num
		},
		toPay () {
			// 更新订单
			localStorage.setItem('$order', JSON.stringify({
				info: this.info,
				order: {
					num: this.num
				}
			}))
			this.$router.push(`/user/buy/confirm`)
		}
	}
}
</script>

<style scoped>
.buy-detail .pro{
	border-bottom: 1px solid rgb(166, 166, 166); /*no*/
}
.buy-detail .img-box{
	padding: 10px; /*no*/
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	position: relative;
	overflow: hidden;
}
.buy-detail .img-box:after{
	display: block;
	content: '';
	padding-top: 100%;
	background-color: grey;
}
.buy-detail .img-box img{
  margin: 10px; /*no*/
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.buy-detail .des p{
	padding: 15px 0; /*no*/
	color: gray;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	font-size: 1.3em;
}
.buy-detail .des .price{
	font-size: 2em;
}
.buy-detail .num{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	padding: 10px; /*no*/
}
.buy-detail .num p{
	color: grey;
	padding: 10px 0; /*no*/
}
.buy-detail .num .input{
	width: 250px;
	border: 1px solid rgb(166, 166, 166); /*no*/
	border-radius: 5px; /*no*/
}
.buy-detail .num .input strong{
	color: rgb(166, 166, 166);
}
.buy-detail .num .input>div{
	font-size: 2em;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px; /*no*/
}
.buy-detail .num .input>div:nth-child(1),
.buy-detail .num .input>div:nth-child(3){
	font-weight: 900;
}
.buy-detail .num .input>div:nth-child(2){
	border-left: 1px solid rgb(166, 166, 166); /*no*/
	border-right: 1px solid rgb(166, 166, 166); /*no*/
}
.buy-detail .button{
	padding: 10px; /*no*/
	margin-top: 30px; /*no*/
}
.buy-detail .button button{
	width: 100%;
	padding: 10px; /*no*/
	color: #fff;
	background-color: rgb(3, 189, 0);
	border: none;
	outline: none;
	border-radius: 10px;
	font-size: 1.5em;
}
</style>
