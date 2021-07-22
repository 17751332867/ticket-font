import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register/register'
import Index from '@/components/index'
import TicketResult from '@/components/ticket/index'
import Login from '@/components/login/login'
import Pay from '@/components/pay/pay'
import Main from '@/components/info/main/main'
import MainIndex from '@/components/info/index/index'
import Orders from '@/components/info/orders/orders'
import Notice from '@/components/info/notice/notice'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/ticketResult',
      name: 'ticketResult',
      component: TicketResult
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path: 'index',
          name: 'main-index',
          component: MainIndex
        },{
          path: 'orders',
          name: 'main-orders',
          component: Orders
        },{
          path: 'notice',
          name: 'main-orders',
          component: Notice
        }
      ]
    }
  ]
})

export default router
