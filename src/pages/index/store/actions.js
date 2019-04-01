import * as types from './mutation-types'
import { savePosition, saveShowCode, saveTotalPrice, saveTicketCount, saveUnitId, clearTotalPrice, clearTicketCount, clearUnitId, saveOrderNo, clearOrderNo } from 'common/js/cache'

export const saveCurrentCity = function ({ commit }, pos) {
  commit(types.SET_CURRENT_CITY, savePosition(pos))
}

export const saveCurrentShow = function ({ commit }, code) {
  commit(types.SET_CURRENT_SHOW, saveShowCode(code))
}

export const savetotalPrice = function ({ commit }, totalPrice) {
  commit(types.SET_TOTAL_PRICE, saveTotalPrice(totalPrice))
}

export const cleartotalprice = function({commit}) {
  commit(types.CLEAR_TOTAL_PRICE, clearTotalPrice())
}

export const saveticketCount = function({commit}, ticketCount) {
  commit(types.SET_TICKET_COUNT, saveTicketCount(ticketCount))
}

export const clearticketCount = function({commit}) {
  commit(types.CLEAR_TICKET_COUNT, clearTicketCount())
}

// export const saveAddress = function({commit}, expressAddress) {
//   commit(types.SET_EXPRESS_ADDRESS, saveExpressAddress(expressAddress))
// }

export const saveShowItemUnitId = function({commit}, showItemUnitId) {
  commit(types.SET_UNIT_ID, saveUnitId(showItemUnitId))
}

export const clearShowItemUnitId = function({commit}) {
  commit(types.CLEAR_UNIT_ID, clearUnitId())
}

export const saveorderNo = function({commit}, orderNo) {
  commit(types.SET_ORDER_NO, saveOrderNo(orderNo))
}

export const clearorderNo = function({commit}) {
  commit(types.CLEAR_ORDER_NO, clearOrderNo())
}