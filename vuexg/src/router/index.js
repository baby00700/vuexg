import Vue from 'vue'
import Router from 'vue-router'
import xiaoxi from '@/components/pages/xiaoxi'
import daiban from '@/components/pages/daiban'
import zhuye from '@/components/pages/zhuye'
import lianxiren from '@/components/pages/lianxiren'
import wode from '@/components/pages/wode'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dist/xiaoxi',
      name: 'xiaoxi',
      component: xiaoxi,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/daiban',
      name: 'daiban',
      component: daiban,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/zhuye',
      name: 'zhuye',
      component: zhuye,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/lianxiren',
      name: 'lianxiren',
      component: lianxiren,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/wode',
      name: 'wode',
      component: wode,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
