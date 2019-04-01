import fetch from 'api/fetch'

const ACTIVITYCODE = 'L201710300145248571'
// const ACTIVITYCODE = 'L201710302033383474'
const ACTIVITYNAME = '张学友演出票兑换'

export function getMyTicket() {
  const data = {
    activityCode: ACTIVITYCODE
  }
  return fetch({
    url: '/api/marketing/activity/myticket',
    method: 'get',
    params: data
  })
}

export function exchangeTicket(mobile, code, address) {
  const data = {
    mobile,
    code,
    address,
    activityCode: ACTIVITYCODE,
    showName: ACTIVITYNAME
  }
  return fetch({
    url: 'api/marketing/activity/exchangeTicket',
    method: 'post',
    data
  })
}
