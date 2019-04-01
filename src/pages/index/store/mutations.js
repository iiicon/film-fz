import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_CITY](state, currentCity) {
    state.currentCity = currentCity
  },
  [types.SET_CURRENT_SHOW](state, code) {
    state.currentShow = code
  },
  [types.SET_CURRENT_ID](state, index) {
    state.currentId = index
  },
  [types.SET_TOTAL_PRICE](state, totalPrice) {
    state.totalPrice = totalPrice
  },
  [types.CLEAR_TOTAL_PRICE](state, totalPrice) {
    state.totalPrice = totalPrice
  },
  [types.SET_TICKET_COUNT](state, ticketCount) {
    state.ticketCount = ticketCount
  },
  [types.CLEAR_TICKET_COUNT](state, ticketCount) {
    state.ticketCount = ticketCount
  },
  [types.SET_EXPRESS_ADDRESS](state, expressAddress) {
    state.expressAddress = expressAddress
  },
  [types.SET_UNIT_ID](state, showItemUnitId) {
    state.showItemUnitId = showItemUnitId
  },
  [types.CLEAR_UNIT_ID](state, showItemUnitId) {
    state.showItemUnitId = showItemUnitId
  },
  [types.SET_ORDER_NO](state, orderNo) {
    state.orderNo = orderNo
  },
  [types.CLEAR_ORDER_NO](state, orderNo) {
    state.orderNo = orderNo
  }
}

export default mutations