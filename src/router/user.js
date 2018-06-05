import Wallet from '@/pages/wallet/Wallet'
import Withdraw from '@/pages/wallet/Withdraw'
import Detail from '@/pages/wallet/Detail'
import User from '@/pages/user/User'
import Buy from '@/pages/user/Buy'
import BuyDetail from '@/pages/user/BuyDetail'
import BuyConfirm from '@/pages/user/BuyConfirm'
import Join from '@/pages/user/join'
import Activity from '@/pages/user/Activity'
import Agreement from '@/pages/user/Agreement'
import AgreementUser from '@/pages/user/Agreement/Agreement.user.vue'
import AgreementRecharge from '@/pages/user/Agreement/Agreement.recharge'
import AgreementDepsoit from '@/pages/user/Agreement/Agreement.deposit.vue'
import AgreementShare from '@/pages/user/Agreement/Agreement.share.vue'
import AgreementShareSecret from '@/pages/user/Agreement/Agreement.share.secret.vue'
import Help from '@/pages/user/Help'
import Repair from '@/pages/user/Repair'
import Record from '@/pages/record/Record'

export default [
	{
		path: '/user',
		name: '用户中心',
		component: User
	},
	{
		path: '/user/wallet',
		name: '我的钱包',
		component: Wallet
	},
	{
		path: '/user/wallet/withdraw',
		name: '提现',
		component: Withdraw
	},
	{
		path: '/user/wallet/detail',
		name: '明细',
		component: Detail
	},
	{
		path: '/user/buy',
		name: '购买主题伞',
		component: Buy
	},
	{
		path: '/user/buy/detail',
		name: '商品详情',
		component: BuyDetail
	},
	{
		path: '/user/buy/confirm',
		name: '确认购买',
		component: BuyConfirm
	},
	{
		path: '/user/join',
		name: '商务合作',
		component: Join
	},
	{
		path: '/user/activity',
		name: '夏尔巴人',
		component: Activity
	},
	{
		path: '/user/agreement',
		name: '相关协议',
		component: Agreement
	},
	{
		path: '/user/agreement/users',
		name: 'OKsan用户协议',
		component: AgreementUser
	},
	{
		path: '/user/agreement/recharge',
		name: '充值协议',
		component: AgreementRecharge
	},
	{
		path: '/user/agreement/deposit',
		name: '押金协议',
		component: AgreementDepsoit
	},
	{
		path: '/user/agreement/share',
		name: 'OKSan伞共享使用协议',
		component: AgreementShare
	},
	{
		path: '/user/agreement/share/secret',
		name: 'OKSan伞共享隐私规则',
		component: AgreementShareSecret
	},
	{
		path: '/user/help',
		name: '用户指南',
		component: Help
	},
	{
		path: '/user/repair',
		name: '故障报修',
		component: Repair
	},
	{
		path: '/user/record',
		name: '租借记录',
		component: Record
	}
]
