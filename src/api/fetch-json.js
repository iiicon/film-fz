import axios from 'axios'
import { baseParams } from 'api/config'
import { showToast } from 'common/js/dialog'
// import router from '@/router'

let instance = axios.create(baseParams)

// POST传参序列化
instance.interceptors.request.use((config) => {
  console.log(`request.config is ${JSON.stringify(config)}`)
  return config
}, (error) => {
  showToast('错误的传参')
  return Promise.reject(error)
})

// 判断？
instance.interceptors.response.use((response) => {
  console.log(`response.data is ${JSON.stringify(response.data)}`)
  if (response.data.success === true) {
    return response.data
  } else {
    if (response.data.success === false && response.data.msg === 'NOT_ALLOWED') {
      console.log('data' + JSON.stringify(response.data))
      return response.data
      // router.forward({path: '/location'})
    } else {
      return response.data
    }
  }
}, (error) => {
  console.log('err' + error) // for debug
  showToast('网络异常')
  return Promise.reject(error.response)
})

export default instance
