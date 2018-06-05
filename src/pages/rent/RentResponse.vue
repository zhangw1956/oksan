<template>
  <div class="withdraw">
    <o-state>
      <div v-if="code === '0000'">
        <div slot="des" class="wrapper">
          <p class="text">
            <span>感谢您的使用</span>
          </p>
          <p class="result">
            <span>取伞成功</span>
          </p>
        </div>
      </div>
      <div v-if="code === '0010'">
        <div slot="des">
          <p class="text">
            <span>账户余额</span>
            <span>200</span>
          </p>
          <p class="result">
            <span>应充值</span>
            <span>100</span>
          </p>
        </div>
        <div slot="icon">
          <div class="recharge-btn" @click="toRecharge"></div>
        </div>
      </div>
      <div v-if="code === '0020'">
        <div slot="des">
          <p class="text">
            <span>设备无响应</span>
          </p>
          <p class="result">
            <span>取伞失败</span>
          </p>
        </div>
        <div slot="icon">
          <div class="icon fail"></div>
        </div>
      </div>
      <div v-if="code === '0030'">
        <div slot="des">
          <p class="text">
            <span>未有效时间内取伞</span>
          </p>
          <p class="result">
            <span>取伞失败</span>
          </p>
        </div>
        <div class="icon">
          <div class="icon fail"></div>
        </div>
      </div>
      <div v-if="code === '0040'">
        <div slot="des">
          <p class="text">
            <span>10号伞已出请取伞</span>
          </p>
          <p class="result">
            <span>请取伞</span>
          </p>
        </div>
        <div slot="icon">
          <div class="icon action"></div>
        </div>
      </div>
      <div v-if="code === '0050'">
        <div slot="des">
          <p class="text">
            <span>10号伞槽</span>
          </p>
          <p class="result">
            <span>出伞中</span>
          </p>
        </div>
        <div slot="icon">
          <div class="wait">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
      </div>
      <div v-if="code === '0060'">
        <div slot="des">
          <p class="test">
            <span>账户余额</span>
            <span>3000</span>
          </p>
          <p class="result">
            <span>钱包余额充足</span>
          </p>
        </div>
        <div slot="icon">
          <div class="icon action"></div>
        </div>
      </div>
    </o-state>
  </div>
</template>

<script>
import Vue from 'vue'
import ActionState from '@/components/ActionState'
Vue.component(ActionState.name, ActionState)
export default {
  data () {
    return {
      code: '0000'
    }
  }
}
</script>

<style scoped>
.wrapper .text, .withdraw .result{
	text-align: center;
}
.wrapper .text{
	margin-top: 400px;
	font-size: 32px; /*px*/
}
.wrapper .result{
	font-size: 28px; /*px*/
	color: orange;
}
.wrapper .recharge-btn{
	margin-top: 30px;
	width: 272px;
	height: 36px;
	background-size: 100% 100%;
	margin-left: 50%;
	transform: translate(-136px);
}
[data-dpr="1"] .wrapper .recharge-btn, [data-dpr="2"] .wrapper .recharge-btn{
	background-image: url('../../assets/images/get/btn@2x.png')
}
[data-dpr="3"] .wrapper .recharge-btn{
	background-image: url('../../assets/images/get/btn@3x.png')
}
[data-dpr="1"] .wrapper .fail, [data-dpr="2"] .wrapper .fail{
	background-image: url('../../assets/images/get/fail@2x.png')
}
[data-dpr="3"] .wrapper .fail{
	background-image: url('../../assets/images/get/fail@3x.png')
}
[data-dpr="1"] .wrapper .action, [data-dpr="2"] .wrapper .action{
	background-image: url('../../assets/images/get/action@2x.png')
}
[data-dpr="3"] .wrapper .action{
	background-image: url('../../assets/images/get/action@3x.png')
}
.wrapper .wait{
	width: 72px;
	height: 24px;
	background-size: 100%;
	margin-left: 50%;
	transform: translate(-36px);
	overflow: hidden;
	margin-top: 5px;
}
.wrapper .wait .item{
	width: 12px;
	height: 12px;
	float: left;
	background-size: 100%;
	margin: 0 5px;
}
[data-dpr="1"] .wrapper .wait .item, [data-dpr="2"] .wrapper .wait .item{
	background-image: url('../assets/images/get/wait@2x.png')
}
[data-dpr="3"] .wrapper .wait .item{
	background-image: url('../assets/images/get/wait@3x.png')
}
</style>
