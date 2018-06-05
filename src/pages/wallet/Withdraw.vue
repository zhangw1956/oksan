<template>
	<div class="withdraw">
		<o-state>
      <div slot="des">
        <p class="text">
          <span>感谢您的使用</span>
        </p>
        <p class="result">
          <span>提现成功</span>
        </p>
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
			result: ''
		}
	}
}
</script>

<style scoped>
.withdraw .text, .withdraw .result{
	text-align: center;
}
.withdraw .text{
	margin-top: 400px;
	font-size: 32px; /*px*/
}
.withdraw .result{
	font-size: 28px; /*px*/
	color: orange;
}
</style>
