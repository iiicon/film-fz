import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import fastclick from 'fastclick'
import 'nprogress/nprogress.css' // Progress 进度条 样式
import NProgress from 'nprogress' // Progress 进度条

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
Vue.use(MintUI)

fastclick.attach(document.body)

Vue.config.productionTip = false
import 'common/scss/index.scss'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
