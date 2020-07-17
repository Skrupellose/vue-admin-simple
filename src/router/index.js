import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    },
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    meta: '登录',
    hidden: true,
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/index',
    name: 'Index',
    meta: '首页',
    icon:'menu',
    component: Layout,
    children: [
      {
        path: '/index1',
        name: 'Index1',
        meta: '子页',
        icon:'menu',
        component: () => import('@/views/Index/index.vue'),
      }
    ]
  },
  {
    path: '/info',
    name: 'Info',
    meta: '信息',
    icon:'menu',
    component: Layout,
    children: [
      {
        path: '/infoManage',
        name: 'InfoManage',
        meta: '信息管理',
        icon:'menu',
        component: () => import(/* webpackChunkName: "main" */ '@/views/InfoManage/index.vue'),
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        meta: '信息管理',
        icon:'menu',
        component: () => import(/* webpackChunkName: "main" */ '@/views/InfoCategory/index.vue'),
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
