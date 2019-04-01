import Vue from 'vue'
import Router from 'vue-router'
import Film from 'components/film/film'
import Show from 'components/show/show'
import Discover from 'components/discover/discover'
import Mine from 'components/mine/mine'
import MyShow from 'components/mine/my-show'
import Locations from 'components/location/location'
import ShowDetail from 'components/show-detail/show-detail'
import About from 'components/show-about/show-about'
import Login from 'components/login/login'
import BindPhone from 'components/login/bind-phone'
import BuyTicket from 'components/buy-ticket/buy-ticket'
import ShowOrder from 'components/show-order/show-order'
import Address from 'components/show-add-address/show-add-address'
import ShowOrderDetail from 'components/show-order-detail/show-order-detail'
import AgreeMent from 'components/yoyu-agreement/yoyu-agreement'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/film'
    },
    {
      path: '/film',
      component: Film
    },
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/show',
      component: Show,
      children: [
        {
          path: ':id',
          component: ShowDetail
        }
      ]
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/my-show',
      component: MyShow
    },
    {
      path: '/location',
      component: Locations
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/bind-phone',
      component: BindPhone
    },
    {
      path: '/buy-ticket',
      component: BuyTicket
    },
    {
      path: '/show-order',
      component: ShowOrder,
      children: [
        {
          path: 'address',
          component: Address
        }
      ]
    },
    {
      path: '/show-order-detail',
      component: ShowOrderDetail
    },
    {
      path: '/yoyu-agreement',
      component: AgreeMent
    }
  ]
})
