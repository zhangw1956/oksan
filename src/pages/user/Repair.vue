<template>
	<div class="repair">
		<div class="input">
			<span>请输入伞桩或雨伞编码</span>
			<input type="text" v-model="umId">
		</div>
		<div class="submit">
			<div class="title">
				<span class="icon"></span>
				<span><strong>请选择故障类型</strong></span>
			</div>
			<div class="reson">
				<div class="choice">
					<div class="" v-for="(item, index) in list" :key="item.id" @click="choice(index, item.id)">
						<a href="javascript:void(0)" :data-id="item.id" v-show="item.faulttype">{{ item.faulttype }}</a>
					</div>
				</div>
				<textarea name="" id="" rows="6" class="textarea" placeholder="请描述故障信息" v-model="textarea"></textarea>
				<div class="photo">
					<div>
						<div class="title">
							<span class="photo-icon"></span>
							<span>拍照上传</span>
						</div>
					</div>
					<div class="upload-box">
						<div class="upload" v-for="(item, index) in imgList" :key="item">
							<div class="upload-imgbox" @touchstart="showDeleteButton(index)" @touchend="clearLoop(index)">
								<div :style="{backgroundImage: 'url('+item+')'}" alt="" class="img">
									<div class="del-btn" @click="deleteImage(index)" :data-id="index">
										<i class="fa fa-trash-o" aria-hidden="true"></i>
									</div>
								</div>
							</div>
						</div>
						<div class="upload">
							<input class="file-input" type="file" name="file" multiple="multiple" accept="image/*" @change="chooseImage">
						</div>
					</div>
				</div>
			</div>
			<div class="btn active" @click="doSubmit">提 交</div>
			<!-- <div class="tip">常见问题解决方法</div> -->
			<!-- 跳转到用户指南页 -->
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { MessageBox, Indicator, Toast, Button } from 'mint-ui'
import request from '@/utils/request'

Vue.component(Button.name, Button)
export default {
	data () {
		return {
			active: [],
			umId: '',
			list: [],
			textarea: '',
			imgList: [],
			formdata: null,
			Loop: null
		}
	},
	created () {
		if (typeof FileReader === 'undefined') {
			// File API
			Toast('当前手机不支持图片上传')
			return
		}
		this._getFaultType()
		this.formdata = new FormData() // 创建form对象
	},
	mounted () {
		this.choiceText = '无法还伞'
	},
	methods: {
		showDeleteButton (index) {
			clearInterval(this.Loop) // 再次清空定时器，防止重复注册定时器
			this.Loop = setTimeout(() => {
				// 显示删除按钮
				document.querySelectorAll('.del-btn')[index].style.display = 'block'
				// alert('删除')
				clearInterval(this.Loop)
			}, 1000)
		},
		clearLoop () {
			clearInterval(this.Loop)
		},
		deleteImage (index) {
			this.imgList.splice(index, 1)
		},
		_getFaultType () {
			Indicator.open()
			// 获取故障类型
			request()
				.post('/umbrella/getInfo', {
					openId: localStorage.getItem('$open_id')
				})
				.then(res => {
					if (res.code === 200) {
						let data = res.result
						const s = 3 - (data.length % 3)
						for (let i = 0; i < s; i++) {
							data.push({faulttype: '', id: (1000 + i), remark: ''})
						}
						this.list = data
					} else {
						throw new Error(res.result)
					}
					Indicator.close()
				})
				.catch(err => {
					MessageBox(err.message)
					Indicator.close()
				})
		},
		choice (index, id) {
			if (event.target.nodeName === 'A') {
				if (event.target.className) {
					event.target.className = ''
				} else {
					event.target.className = 'active'
					this.active.push(id)
				}
			}
		},
		chooseImage (e) {
			let vm = this
			const files = e.target.files || e.dataTransfer.files
			for (let i = 0; i < files.length; i++) {
				this.formdata.append('file', files[i])
				;(function (i) {
					let fileReader = new FileReader()
					console.log(files[i])
					fileReader.readAsDataURL(files[i])
					fileReader.onload = () => {
						vm.imgList.push(fileReader.result)
						console.log(vm.imgList)
					}
				})(i)
			}
		},
		doSubmit () {
			if (!this.umId) {
				MessageBox('提示', '请输入伞桩或雨伞编码')
				return
			}
			Indicator.open()
			const typeids = [...new Set(this.active)]
			this.formdata.append('openId', localStorage.getItem('$open_id'))
			this.formdata.append('address', this.umId)
			this.formdata.append('typeids', typeids)
			request({dataType: 'formdata'})
				.post('/umbrella/faultAdd', this.formdata)
				.then(res => {
					if (res.code === 200) {
						Toast('报修成功')
					} else {
						throw new Error(res.message)
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
</script>

<style scoped>
.repair{
	width: 100%;
	height: 100%;
	overflow: scroll;
}
.repair .input {
	text-align: center;
	height: 130px;
	line-height: 130px;
	border-bottom: 1px solid gray; /*no*/
}
.repair .input input{
	background-color: rgb(238,238,238);
	border-radius: 10px; /*no*/
	border: none;
	outline: none;
	padding: 5px 10px; /*no*/
}
.repair .submit{
	box-sizing: border-box;
	padding: 50px 60px;
}
.repair .submit .title{
	margin-bottom: 30px;
	display: inline-block;
	padding-bottom: 3px; /*no*/
	border-bottom: 1px solid rgb(192, 190, 190) ;
	font-size: 30px; /*px*/
}
.repair .submit .title .icon{
	width: 8px;
	height: 23px;
	display: inline-block;
	background-size: 100%;
	vertical-align: middle;
}
[data-dpr="1"] .repair .submit .title .icon{
	background-image: url(../../assets/images/user/repair/mark@2x.png);
}
[data-dpr="2"] .repair .submit .title .icon{
	background-image: url(../../assets/images/user/repair/mark@2x.png);
}
[data-dpr="3"] .repair .submit .title .icon{
	background-image: url(../../assets/images/user/repair/mark@3x.png);
}
.repair .submit .reson .choice{
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
}
.repair .submit .choice div{
	width: 30%;
	margin-bottom: 30px;
	box-sizing: border-box;
}
.repair .submit .choice div:nth-child(2){
	margin: 0 30px 30px 30px;
}
.repair .submit .choice div a{
	box-sizing: border-box;
	padding: 20px 0;
	display: inline-block;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px; /*no*/
	border: 1px solid rgb(122,122,122); /*no*/
}
.repair .submit .choice div a.active{
	border: 1px solid rgb(240,90,0); /*no*/
	background-color: rgb(240,90,0);
	color: #fff;
}
.repair .submit textarea{
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	border: 1px solid rgb(122,122,122); /*no*/
	padding: 10px; /*no*/
	outline: none;
}
.repair .submit .photo{
	margin-top: 50px;
	margin-left: -5px; /*no*/
	margin-right: -5px; /*no*/
}
.repair .submit .photo .photo-icon{
	width: 35px;
	height: 26px;
	display: inline-block;
	background-size: 100%;
}
[data-dpr="1"] .repair .submit .photo .photo-icon{
	background-image: url(../../assets/images/user/repair/photo@2x.png)
}
[data-dpr="2"] .repair .submit .photo .photo-icon{
	background-image: url(../../assets/images/user/repair/photo@2x.png)
}
[data-dpr="3"] .repair .submit .photo .photo-icon{
	background-image: url(../../assets/images/user/repair/photo@3x.png)
}
.repair .submit .photo .upload-box{
	overflow: hidden;
}
.repair .submit .photo .upload{
	width: 142px;
	height: 142px;
	line-height: 142px;
	background-size: 100%;
	overflow: hidden;
	float: left;
	margin-left: 5px; /*no*/
	margin-right: 5px; /*no*/
	margin-bottom: 10px; /*no*/
}
.repair .submit .photo .upload .upload-imgbox{
	width: 100%;
	height: 100%;
	background-color: #d3d3d3;
}
.repair .submit .photo .upload .upload-imgbox .img{
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
}
.repair .submit .photo .upload .upload-imgbox .img .del-btn{
	display: none;
	text-align: center;
	padding: 4px 0; /*no*/
	height: auto;
	background-color: red;
	line-height: 1;
	color: #fff;
	font-size: 1.4em;
}
.repair .submit .photo .upload input{
	vertical-align: middle;
}
[data-dpr="1"] .repair .submit .photo .upload{
	background-image: url(../../assets/images/user/repair/upload@2x.png);
}
[data-dpr="2"] .repair .submit .photo .upload{
	background-image: url(../../assets/images/user/repair/upload@2x.png);
}
[data-dpr="3"] .repair .submit .photo .upload{
	background-image: url(../../assets/images/user/repair/upload@3x.png);
}
.repair .submit .photo .upload .img-box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.repair .submit .btn.active{
	background-color: rgb(240,90,0);
}
.repair .submit .btn{
	width: 600px;
	height: 80px;
	margin: 0 auto;
	margin-top: 100px;
	margin-bottom: 20px;
	line-height: 80px;
	text-align: center;
	background-color: rgb(122,122,122);
	color: #fff;
	border-radius: 40px;
	font-size: 38px; /*px*/
}
.repair .submit .tip{
	text-align: center;
	color: rgb(240,90,0);
}
.file-input{
	outline: none;
	border: none;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
