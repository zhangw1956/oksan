import Rent from '@/pages/rent/Rent'
import RentSubmit from '@/pages/rent/RentSubmit'
import Scan from '@/pages/scan/Scan'

export default [
	{
		path: '/rent',
		alias: '/',
		name: 'OKsan',
		component: Rent
	},
	{
		path: '/rent/submit/:uniqueCode',
		name: '借伞',
		component: RentSubmit
	},
	{
		path: '/rent/scan',
		name: '扫码借伞',
		component: Scan
	}
]
