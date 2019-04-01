import fetch from 'api/fetch'

const ACTIVITYCODE = 'L201711130855651461'
// const ACTIVITYCODE = 'L201710302033383474'
const ACTIVITYNAME = '免费领取超级DIVA演出票'

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
