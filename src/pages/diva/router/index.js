import Vue from 'vue'
import Router from 'vue-router'
import Guidance from 'Dcomponents/guidance/guidance'
import GetInfoes from 'Dcomponents/get-infoes/get-infoes'

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
