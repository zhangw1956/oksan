<template>
	<div class="buy">
		<ul>
			<li class="c-flex" v-for="item in list" :key="item.id">
				<div class="image">
					<mt-swipe :auto="0">
						<mt-swipe-item v-for="i in item.imgList" :key="i">
							<div class="swipe-item">
								<img :src="i" alt="" class="img">
							</div>
						</mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="other">
					<p class="pro-name">
						{{ item.name }}
					</p>
					<div class="price">
						<span class="now"><strong>&yen; {{ item.price }}</strong></span>
						<!-- <span class="past">&yen; 50.00</span> -->
					</div>
					<div class="des">
						<dl>
							<dt>商品详情</dt>
							<dd>{{ item.describe }}</dd>
						</dl>
					</div>
					<div class="buy" @click="toBuy(item)"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, MessageBox } from 'mint-ui'
import request from '@/utils/request'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
	data () {
		return {
			list: []
		}
	},
	created () {
		request()
			.post('/umbrella/umthemeList', {
				openId: localStorage.getItem('$open_id'),
				name: ''
			})
			.then(res => {
				if (res.code === 200) {
					let list = res.result
					list.forEach(element => {
						let list = element.images.split(',')
						list[list.length - 1] || list.pop()
						element.imgList = list
					})
					this.list = list
				} else {
					throw new Error(res.result)
				}
			})
			.catch(err => {
				MessageBox('提示', err.message)
			})
	},
	methods: {
		toBuy (item) {
			// 开始创建订单
			const order = {
				info: {
					id: item.id,
					name: item.name,
					price: item.price,
					image: item.imgList[0]
				}
			}
			localStorage.setItem('$order', JSON.stringify(order))
			this.$router.push('/user/buy/detail')
		}
	}
}
</script>

<style scoped>
.buy{
	background-color: #fff;
}
.buy ul li{
	overflow: hidden;
	margin-bottom: 20px;
}
.buy ul li .image{
	flex: 4;
}
.buy ul li .other{
	flex: 3;
	padding-top: 15px;
	padding-left: 15px;
	padding-right: 15px;
}
.buy ul li .other .pro-name{
	font-size: 28px; /*px*/
}
.buy ul li .other .price{
	margin: 8px 0;
}
.buy ul li .other .price .now{
	font-size: 32px; /*px*/
}
.buy ul li .other .price .past{
	font-size: 26px; /*px*/
	margin-left: 10px; /*no*/
	text-decoration: line-through;
	color: gray;
}
.buy ul li .other .des dt{
	font-size: 10px; /*no*/
	color: gray;
}
.buy ul li .other .des dt{
	font-size: 8px; /*no*/
	color: gray;
}
.buy ul li .other .buy{
	width: 125px;
	height: 38px;
	margin-top: 10px; /*no*/
	background-size: 100%;
}
[data-dpr="1"] .buy ul li .other .buy{
	background-image: url(../../assets/images/user/btn@2x.png)
}
[data-dpr="1"] .buy ul li .other .buy{
	background-image: url(../../assets/images/user/btn@2x.png)
}
[data-dpr="1"] .buy ul li .other .buy{
	background-image: url(../../assets/images/user/btn@3x.png)
}
.image .swipe-item:first-child{
	height: 100%;
	background-color: palevioletred;
}
.buy .img{
	width: 100%;
}
</style>
<style>
.mint-swipe-indicators{
	left: 85%;
}
.mint-swipe-indicator{
	background: rgb(255,90,0)
}
</style>
