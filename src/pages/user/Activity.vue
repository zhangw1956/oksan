<template>
	<div class="activity">
		<header>
			夏尔巴人报名
		</header>
		<div class="row">
			<label>* 您的姓名：</label>
			<input type="text" placeholder="" v-model="name">
		</div>
		<div class="row">
			<label>* 您的手机：</label>
			<input type="text" placeholder="" v-model="phone" maxlength="11">
		</div>
		<div class="row">
			<label>* 常驻景区：</label>
			<textarea name="" id="" cols="35" rows="3" v-model="scenicSpots"></textarea>
		</div>
		<div class="row">
			<label>* 您的证件 <span class="photo"></span>（需本人手持证件的照片）</label>
			<div class="upload" v-if="imgSrc">
				<div class="img-box">
					<img :src="imgSrc" alt="">
				</div>
			</div>
			<div class="upload">
				<input class="file-input" type="file" name="file" accept="image/*" @change="chooseImage">
			</div>
		</div>
		<!-- <div class="row">
			<label>* IC卡收卡地址（导游绑定IC的收卡地址）</label>
			<textarea name="" id="" cols="35" rows="3" v-model="address"></textarea>
		</div> -->
		<div class="button" @click="doSubmit">提 交</div>
	</div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import reg from '@/utils/reg'
import request from '@/utils/request'

export default {
	data () {
		return {
			name: '',
			phone: '',
			scenicSpots: '',
			imgSrc: '',
			formdata: null
		}
	},
	created () {
		this.formdata = new FormData() // 创建form对象
	},
	methods: {
		chooseImage (e) {
			const files = e.target.files || e.dataTransfer.files
			this.formdata.append('file', files[0])
			const fileReader = new FileReader()
			fileReader.readAsDataURL(files[0])
			fileReader.onload = () => {
				this.imgSrc = fileReader.result
			}
		},
		doSubmit () {
			if (!this.name) {
				MessageBox('提示', '请填写姓名')
				return
			}
			if (!reg.mobile.test(this.phone)) {
				MessageBox('提示', '手机号码格式不正确')
				return
			}
			if (!this.scenicSpots) {
				MessageBox('提示', '请填写常驻景区')
				return
			}
			if (!this.imgSrc) {
				MessageBox('提示', '请上传证件照')
				return
			}

			let formdata = new FormData()
			formdata.append('openId', localStorage.getItem('$open_id'))
			formdata.append('name', this.name)
			formdata.append('phone', this.phone)
			formdata.append('scenicSpots', this.scenicSpots)
			formdata.append('files', this.imgList)

			request({dataType: 'formdata'})
				.post('/business/xebCooperate', formdata)
				.then(res => {
					if (res.code === 200) {
						Toast({
							message: '报名成功',
							iconClass: 'icon icon-success'
						})
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

<style>
.activity{
	width: 750px;
	height: 1334px;
	padding: 100px;
	background-size: 100%;
	box-sizing: border-box;
	background-repeat: no-repeat;
	-webkit-box-sizing: border-box;
}
.activity header{
	padding-top: 6px;
	text-align: center;
	margin-bottom: 80px;
}
[data-dpr="1"] .activity{
	background-image: url(../../assets/images/user/activity/bg@2x.png)
}
[data-dpr="2"] .activity{
	background-image: url(../../assets/images/user/activity/bg@2x.png)
}
[data-dpr="3"] .activity{
	background-image: url(../../assets/images/user/activity/bg@3x.png)
}
.activity .row{
	margin-bottom: 20px;
	color: rgb(240, 90, 0);
	overflow: hidden;
}
.activity .row input{
	width: 160px;
	border-radius: 5px;
	border:1px solid rgb(240,90,0); /*no*/
	outline: rgb(240,90,0);
}
.activity .row textarea{
	margin-left: 10px; /*no*/
	margin-top: 10px; /*no*/
	border:1px solid rgb(240,90,0); /*no*/
	border-radius: 7px;
}
.activity .row .photo{
	display: inline-block;
	width: 35px;
	height: 26px;
	margin-left: 5px; /*no*/
	background-size: 100%;
	vertical-align: middle;
}
[data-dpr="1"] .activity .row .photo{
	background-image: url(../../assets/images/user/activity/photo@2x.png);
}
[data-dpr="2"] .activity .row .photo{
	background-image: url(../../assets/images/user/activity/photo@2x.png);
}
[data-dpr="3"] .activity .row .photo{
	background-image: url(../../assets/images/user/activity/photo@3x.png);
}
.activity .row .upload{
	float: left;
	width: 106px;
	height: 106px;
	line-height: 106px;
	margin-right: 10px; /*no*/
	background-size: 100%;
	margin-left: 10px; /*no*/
	margin-top: 10px; /*no*/
}
.activity .row .upload .img-box{
	width: 100%;
	background-color: #d3d3d3;
}
.activity .row .upload img{
	width: 100%;
	vertical-align: middle;
}
[data-dpr="1"] .activity .row .upload{
	background-image: url(../../assets/images/user/activity/upload@2x.png);
}
[data-dpr="2"] .activity .row .upload{
	background-image: url(../../assets/images/user/activity/upload@2x.png);
}
[data-dpr="3"] .activity .row .upload{
	background-image: url(../../assets/images/user/activity/upload@3x.png);
}
.activity .button{
	width: 210px;
	height: 52px;
	line-height: 54px;
	background-color: rgb(240, 90, 0);
	text-align: center;
	color: #fff;
	border-radius: 6px; /*no*/
	margin: 70px auto;
}
.file-input{
	outline: none;
	border: none;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>

<style>
.activity{
	background-color: rgb(224,224,224)
}
</style>
