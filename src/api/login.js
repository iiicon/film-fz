import fetch from 'api/fetch'

export function getcode(phone) {
  const data = {
    phone
  }
  return fetch({
    url: '/api/wechat/getcode',
    method: 'post',
    data
  })
}

export function bindphone(phone, passwd) {
  const data = {
    phone,
    passwd
  }
  return fetch({
    url: '/api/wechat/bindphone',
    method: 'post',
    data
  })
}

export function getLoginCode(phone) {
  const data = {
    phone
  }
  return fetch({
    url: '/api/getcode',
    method: 'post',
    data
  })
}

export function dologin(phone, passwd) {
  const data = {
    phone,
    passwd
  }
  return fetch({
    url: '/api/dologin',
    method: 'post',
    data
  })
}