import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import fastclick from 'fastclick'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(MintUI)

Vue.config.productionTip = false
import 'common/scss/index.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
