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
      path: '/xiaoxi',
      name: 'xiaoxi',
      component: xiaoxi
    },
    {
      path: '/daiban',
      name: 'daiban',
      component: daiban
    },
    {
      path: '/zhuye',
      name: 'zhuye',
      component: zhuye
    },
    {
      path: '/lianxiren',
      name: 'lianxiren',
      component: lianxiren
    },
    {
      path: '/wode',
      name: 'wode',
      component: wode
    }
  ]
})
