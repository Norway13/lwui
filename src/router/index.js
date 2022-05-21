import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Comp from '@/views/comp'
import Form from '@/views/comp/form'
import Echart from '@/views/comp/echart'
import Flow from '@/views/comp/flow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home,
      children:[
        {
          path: '/home', 
          component: Comp,
          children:[
            {
              path: '/home/form', 
              component: Form,
            },
            {
              path: '/home/echart', 
              component: Echart,
            },
            {
              path: '/home/flow', 
              component: Flow,
            }
          ]
        }
      ]
    }
  ]
})
