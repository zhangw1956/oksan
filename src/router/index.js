import Vue from 'vue'
import Router from 'vue-router'
import Scan from '@/pages/scan/Scan'
import State from '@/pages/state/State'
import NotFound from '@/pages/404'
import ErrorTip from '@/pages/Error'
import rent from './rent'
import back from './back'
import user from './user'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/scan',
			name: '扫一扫',
			component: Scan
		},
		{
			path: '/state/:status',
			name: '操作状态',
			component: State
		},
		{
			path: '/error',
			name: '错误页面',
			component: ErrorTip
		},
		{
			path: '*',
			component: NotFound
		},
		...rent,
		...back,
		...user
	]
})

router.beforeEach((to, from, next) => {
	document.title = to.name
	next()
})

export default router
