import fetch from './fetch'

export function getshowitems(pageSize, pageNum) {
  const data = {
    pageSize,
    pageNum
  }
  return fetch({
    url: '/api/show/getshowitems',
    method: 'post',
    data
  })
}

export function getshowitemsdetail(showCode) {
  const data = {
    showCode
  }
  return fetch({
    url: '/api/show/getshowitemsdetail',
    method: 'post',
    data
  })
}

export function getshowitemunits(showCode) {
  const data = {
    showCode
  }

  return fetch({
    url: '/api/show/getshowitemunits',
    method: 'post',
    data
  })
}

export function createorder(showItemUnitId, ticketCount, expressAddress, openId, mobile, orderNo) {
  const data = {
    showItemUnitId,
    ticketCount,
    expressAddress,
    openId,
    mobile,
    orderNo
  }

  return fetch({
    url: '/api/show/createorder',
    method: 'post',
    data
  })
}

export function querybyordercode(orderCode) {
  const data = {
    orderCode
  }

  return fetch({
    url: '/api/show/getshowdetails',
    method: 'post',
    data
  })
}

export function queryOrders(pageNum, pageSize) {
  const data = {
    pageNum,
    pageSize
  }
  return fetch({
    url: '/api/show/queryorders',
    method: 'post',
    data
  })
}
