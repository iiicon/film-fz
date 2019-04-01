import storage from 'good-storage'

const CURRENT_POS = '__position__'

const CURRENT_SHOW = '__showCode__'

const TOTAL_PRICE = '__totalPrice__'

const TICKET_COUNT = '__ticketCount__'

const EXPRESS_ADDRESS = '__expressAddress__'

const SHOW_ITEMUNITID = '__showItemUnitId__'

const ORDER_NO = '__orderNo__'

export function savePosition(position) {
  let pos = storage.get(CURRENT_POS, '')
  if (pos !== position) {
    storage.set(CURRENT_POS, position)
  }
  return position
}

export function loadPosition() {
  return storage.get(CURRENT_POS, '')
}

export function saveShowCode(showCode) {
  let code = storage.get(CURRENT_SHOW, '')
  if (code !== showCode) {
    storage.set(CURRENT_SHOW, showCode)
  }
  return showCode
}

export function loadShowCode() {
  return storage.get(CURRENT_SHOW, '')
}

export function saveTotalPrice(totalPrice) {
  let total = storage.get(TOTAL_PRICE, '')
  if (total !== totalPrice) {
    storage.set(TOTAL_PRICE, totalPrice)
  }
  return totalPrice
}

export function loadTotalPrice() {
  return storage.get(TOTAL_PRICE, '')
}

export function clearTotalPrice() {
  storage.remove(TOTAL_PRICE)
  return 0
}

export function saveTicketCount(ticketCount) {
  let count = storage.get(TICKET_COUNT, '')
  if (count !== ticketCount) {
    storage.set(TICKET_COUNT, ticketCount)
  }
  return ticketCount
}

export function loadTicketCount() {
  return storage.get(TICKET_COUNT, '')
}

export function clearTicketCount() {
  storage.remove(TICKET_COUNT)
  return 0
}

export function saveExpressAddress(expressAddress) {
  let address = storage.get(EXPRESS_ADDRESS, {})
  if (address !== expressAddress) {
    storage.set(EXPRESS_ADDRESS, expressAddress)
  }
  return expressAddress
}

export function loadExpressAddress() {
  return storage.get(EXPRESS_ADDRESS, {})
}

export function saveUnitId(showItemUnitId) {
  let unitId = storage.get(SHOW_ITEMUNITID, 0)
  if (unitId !== showItemUnitId) {
    storage.set(SHOW_ITEMUNITID, showItemUnitId)
  }
  return showItemUnitId
}

export function loadUnitId() {
  return storage.get(SHOW_ITEMUNITID, 0)
}

export function clearUnitId() {
  storage.remove(SHOW_ITEMUNITID)
  return 0
}

export function saveOrderNo(orderNo) {
  let order = storage.get(ORDER_NO, '')
  if (order !== orderNo) {
    storage.set(ORDER_NO, orderNo)
  }
  return orderNo
}

export function loadOrderNo() {
  return storage.get(ORDER_NO, '')
}

export function clearOrderNo() {
  storage.remove(ORDER_NO)
  return ''
}