import { Toast } from 'mint-ui'

export function showToast(msg) {
  Toast({
    message: msg,
    position: 'middle',
    duration: 2000
  })
}