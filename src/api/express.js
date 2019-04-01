import fetch from './fetch-json'

// 物流
export function queryexpressinfo(orderNo, returnUrl) {
  const data = {
    orderNo,
    returnUrl
  }
  return fetch({
    url: '/api/show/queryexpressinfo',
    method: 'post',
    data
  })
}
