import { loadPosition, loadShowCode, loadTotalPrice, loadTicketCount, loadUnitId, loadOrderNo } from 'common/js/cache'

const state = {
  currentCity: loadPosition(),
  currentShow: loadShowCode(),
  currentId: 1,
  totalPrice: loadTotalPrice(),
  ticketCount: loadTicketCount(),
  expressAddress: {},
  showItemUnitId: loadUnitId(),
  orderNo: loadOrderNo()
}

export default state