import Vue from 'vue'
import Router from 'vue-router'
import Guidance from 'Zcomponents/guidance/guidance'
import GetInfoes from 'Zcomponents/get-infoes/get-infoes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/guidance'
    },
    {
      path: '/guidance',
      component: Guidance
    },
    {
      path: '/info',
      component: GetInfoes
    }
  ]
})
