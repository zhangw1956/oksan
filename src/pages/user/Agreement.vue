<template>
	<div class="agreement">
		<ul>
			<li class="list">
        <router-link to="/user/agreement/users">OKsan用户协议</router-link>
      </li>
			<li class="list">
				<router-link to="/user/agreement/deposit">押金协议</router-link>
			</li>
			<li class="list">
				<router-link to="/user/agreement/recharge">充值协议</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.agreement .list{
	padding: 25px 0;
	margin-left: 30px;
	position: relative;
}
.agreement .list:after{
	content: '';
	display: block;
	width: 100%;
	height: 2px;
	position: absolute;
	left: 0;
	bottom: 0;
}
[data-dpr="1"] .agreement .list:after{
	background-image: url(../../assets/images/user/line@2x.png);
}
</style>
