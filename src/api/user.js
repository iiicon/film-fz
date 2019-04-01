import fetch from 'api/fetch'

export function getUserInfo() {
  return fetch({
    url: 'api/currentuser',
    method: 'get'
  })
}

// 获取当前登录用户信息
export function currentuser() {
  return fetch({
    url: 'api/currentuser',
    method: 'get'
  })
}