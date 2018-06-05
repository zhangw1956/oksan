<template>
	<div class="error">{{ message }}</div>
</template>

<script>
export default {
	data () {
		return {
			message: '应用出错啦~~~'
		}
	},
	created () {
		this.message = this.$route.params.error
	}
}
</script>
<style scoped>
.error{
	text-align: center;
	padding: 50px;
}
</style>
