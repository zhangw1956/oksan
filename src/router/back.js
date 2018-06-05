import Back from '@/pages/back/Back'
import Walk from '@/pages/back/Walk'

export default [
	{
		path: '/back',
		name: '附近网点',
		component: Back
	},
	{
		path: '/back/walk/:longitude/:latitude',
		name: 'OKsan',
		component: Walk
	}
]
