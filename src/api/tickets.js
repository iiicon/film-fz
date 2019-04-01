import fetch from 'api/fetch'

export function getMyTicket() {
  return fetch({
    url: '/api/marketing/zhengzhou/myticket',
    method: 'get'
  })
}

export function exchangeTicket(mobile, code, address) {
  const data = {
    mobile,
    code,
    address
  }
  return fetch({
    url: 'api/marketing/zhengzhou/exchangeTicket',
    method: 'post',
    data
  })
}