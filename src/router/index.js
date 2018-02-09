import Vue from 'vue'
import Router from 'vue-router'

import Ppv from '../components/Ppv'
import UserInfo from '../components/UserInfo'
import UserLogin from '../components/UserLogin'
import Map from '../components/Map'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'ppv',      
      path: '/ppv',
      meta: {
        requireAuth: true
      },
      component: Ppv
    },
    {
      path: '/user-info',
      meta: {
        requireAuth: true
      },
      component: UserInfo
    },
    {
      path: '/user-login',
      component: UserLogin
    },
    {
      path: '/map',
      meta: {
        requireAuth: true
      },
      component: Map
    },
    {
      path: '/',
      redirect: '/user-login'
    },
    {
      path: '*',
      redirect: '/user-login'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (window.localStorage.getItem('ppvserver-token')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/user-login'
      })
    }
  } else {
    next()
  }
})

export default router;
