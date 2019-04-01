<template>
  <div v-if="loading">
    <m-header :title="title" class="title"></m-header>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                 @top-status-change="handleTopChange" ref="loadmore">
      <ul class="order-list">
        <li class="order-detail" v-for="(order, index) in orders" @click="toDetail(order.orderNo)">
          <div class="order-header"><span class="order-number">订单编号:{{order.orderNo}}</span><span
            class="order-state">{{getState(order.orderStatus)}}</span>
          </div>
          <div class="order-content">
            <div class="show-img"><img :src="order.posterUrl"></div>
            <div class="show-detail" :style="getBackground(index)">
              <div class="show-title">
                <div class="show-name">
                  {{order.showName}}
                </div>
              </div>
              <div class="my-order-detail">
                <div class="show-time">
                  演出时间：{{showTime(order.showTime)}}
                </div>
                <div class="show-venue">
                  演出场馆：{{order.showCity}}·{{order.showVenue}}
                </div>
                <div class="order-price">
                  总价： ￥{{(order.sellPrice / 100).toFixed(2)}}
                </div>
                <div class="order-num">
                  张数： {{order.ticketCount}}张
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import MHeader from 'components/m-header/m-header'
  import {queryOrders} from 'api/show'
  import {mapActions} from 'vuex'
  import moment from 'moment'

  export default {
    components: {
      MHeader
    },
    mounted() {
      this.loading = false
      queryOrders(this.page, this.pageSize).then((res) => {
        if (res.success && res.module) {
          this.orders = res.module
        }
        this.loading = true
      })
    },
    data() {
      return {
        title: '我的演出票',
        orders: [],
        loading: false,
        page: 1,
        pageSize: 10,
        topStatus: '',
        allLoaded: false
      }
    },
    methods: {
      loadMore() {
        this.page += 1
        queryOrders(this.page, this.pageSize).then((res) => {
          this.allLoaded = true
          if (res.success && res.module) {
            this.orders.push(...res.module)
            this.allLoaded = false
          }
        })
      },
      loadBottom() {
        this.loadMore()
        this.$refs.loadmore.onBottomLoaded()
      },
      loadTop() {
        this.page = 1
        queryOrders(this.page, this.pageSize).then((res) => {
          if (res.success && res.module) {
            this.orders = res.module
          }
        })
        this.$refs.loadmore.onTopLoaded()
      },
      handleTopChange(status) {
        this.topStatus = status
      },
      showTime(time) {
        return moment(time).locale('zh-CN').format('YYYY-MM-DD dddd H:mm')
      },
      getState(stateId) {
        switch (stateId) {
          case 1:
            return '待发货'
          case 2:
            return '已发货'
          case 13:
            return '订单取消'
          case 0:
            return '待支付'
          default:
            return ''
        }
      },
      toDetail(orderNum) {
        this.saveorderNo(orderNum)
        this.$router.push({
          path: '/show-order-detail'
        })
      },
      getBackground(index) {
        switch (index % 4) {
          case 0:
            return `background: linear-gradient(-50deg, #7561d4, #5380d5)`
          case 1:
            return `background: linear-gradient(-50deg, #d7269c, #8253cd)`
          case 2:
            return `background: linear-gradient(-50deg, #f3a04a, #fa6c4a)`
          case 3:
            return `background: linear-gradient(-50deg, #e7c484, #f9a322)`
          default:
            return `background: linear-gradient(-50deg, #7561d4, #5380d5)`
        }
      },
      ...mapActions([
        'saveorderNo'
      ])
    }
  }
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .title {
    font-size: 18px !important;
    font-weight: bold;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .order-list {
    margin-top: 52px;
    margin-bottom: 50px;
    .order-detail {
      margin-top: 8px;
      padding: 0 16px;
      background-color: $color-background-l;
      .order-content {
        padding: 12px 0;
        height: 165px;
        .show-img {
          width: 110px;
          float: left;
          img {
            width: 110px;
            height: 165px;
          }
        }
        .show-detail {
          float: right;
          width: calc(100% - 110px);
          height: 165px;
          color: white;
          .show-title {
            padding: 15px 15px 17px 0;
            margin-left: 15px;
            font-size: $font-size-medium !important;
            line-height: 18px;
            border-bottom: dashed 1px white;
            .show-name {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .my-order-detail {
            padding: 17px 15px 15px 0;
            margin-left: 15px;
            font-size: 12px !important;
            div {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 18px;
            }
          }
        }
      }
      .order-header {
        font-size: 12px;
        padding: 15px 0 12px 0;
        background-color: $color-background-l;
        border-bottom: solid 1px $color-border;
        .order-number {
          color: $color-text-l;
        }
        .order-state {
          float: right;
          background-image: linear-gradient(-50deg, #7561d4, #5380d5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

</style>
