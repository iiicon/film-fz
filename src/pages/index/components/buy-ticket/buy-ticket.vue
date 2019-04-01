<template>
  <div class="ticket-wrapper">
    <div class="space"></div>
    <div class="units-wrapper">
      <h3 class="subtitle">票价金额</h3>
      <div class="container">
        <button class="unit" :class="{'active': activeId===index, 'disable': item.remainItemCount===0}" v-for="(item, index) in unitsList" @click="select(item, index, item.id)">
          <div class="unit-info">
            <p>{{item.ticketAreaName}}</p>
            <p>&nbsp;
              <span style="font-size:15px">{{item.showItemPrice/100}}</span>元</p>
          </div>
          <div class="unit-tips" v-show="item.remainItemCount===0">（售完）</div>
        </button>
      </div>
      <h3 class="subtitle2">购买数量</h3>
      <div class="counts">
        <button @click="less" v-html="lessHTML"></button>
        <div class="ticket-count">{{ticketCount}}</div>
        <button @click="add">+</button>
      </div>
    </div>
    <div class="info">
      <!-- <div class="count">
                <button @click="less">－</button>
                <div class="ticket-count">{{ticketCount}}</div>
                <button @click="add">+</button>
                <div class="ticket-count">=</div>
                <div class="ticket-count">
                  <span class="gradient1">{{totalPrice}} 元</span>
                </div>
              </div> -->
      <div class="total">
        <div class="total-price">合计
          <span>￥{{totalPrice}}</span>
        </div>
        <div class="next" @click="next">下一步</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getshowitemunits } from 'api/show'
import { mapGetters, mapActions } from 'vuex'

const MAX_COUNT = 10
// 新增适配活动的相关delta，以前的delta注释，以下类同
// const MIN_COUNT = 1
const MIN_COUNT = 2

export default {
  data() {
    return {
      unitPrice: 0,
      ticketCount: 2,
      unitsList: [],
      activeId: 0,
      maxTicketCount: 0
    }
  },
  created() {
    this._getshowitemunits()
  },
  computed: {
    lessHTML() {
      if (this.ticketCount === 2) {
        return ''
      } else {
        return '-'
      }
    },
    totalPrice() {
      return this.unitPrice * this.ticketCount || 0
    },
    ...mapGetters([
      'currentShow',
      'showItemUnitId'
    ])
  },
  methods: {
    add() {
      let maxCount = Math.min(MAX_COUNT, this.maxTicketCount)
      if (this.ticketCount === maxCount) {
        return
      }
      if (this.ticketCount === MAX_COUNT) {
        return
      }
      this.ticketCount += 2
    },
    less() {
      if (this.ticketCount === MIN_COUNT) { return }
      this.ticketCount -= 2
    },
    next() {
      if (this.unitPrice === 0) { return }
      this.$router.push({
        path: `/show-order`
      })
      this.savetotalPrice(this.totalPrice)
      this.saveticketCount(this.ticketCount)
    },
    _getshowitemunits() {
      getshowitemunits(this.currentShow).then((data) => {
        if (data.success) {
          console.log(data.module)
          this.unitsList = data.module
          this.initActive(data.module)
        }
      })
    },
    initActive(data) {
      const i = data.findIndex((item) => {
        return item.remainItemCount !== 0
      })
      this.activeId = i
      data.forEach((item, index) => {
        if (index === i) {
          this.unitPrice = item.showItemPrice / 100
          this.saveShowItemUnitId(item.id)
          this.maxTicketCount = item.remainItemCount
        }
        return
      })
    },
    select(item, index, id) {
      if (item.remainItemCount === 0) { return }
      if (this.activeId === index) { return }
      this.unitPrice = item.showItemPrice / 100
      this.activeId = index
      this.saveShowItemUnitId(id)
      this.maxTicketCount = item.remainItemCount
      this.ticketCount = 2
    },
    ...mapActions([
      'savetotalPrice',
      'saveticketCount',
      'saveShowItemUnitId'
    ])
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.ticket-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 200;
  width: 100%;
  overflow: auto;
  background: $color-background-l;
  .header {}

  .space {
    height: 8px;
    background: $color-background;
  }

  .units-wrapper {
    padding: 10px;

    .subtitle {
      margin-left: 5px;
      height: 34px;
      line-height: 34px;
      font-weight: normal;
      font-size: $font-size-medium;
    }
    .subtitle2 {
      margin-left: 5px;
      margin-top: 6px;
      height: 40px;
      line-height: 40px;
      font-weight: normal;
      font-size: $font-size-medium;
    }

    .counts {
      width: 110px;
      display: flex;
      align-items: center;
      padding-left: 5px;

      button {
        flex: 0 0 30px;
        height: 30px;
        border: none;
        color: $color-text-d;
        font-size: $font-size-medium-x;
        background: $color-background-fffffffffffff;
      }

      .ticket-count {
        flex: 1;
        display: inline-block;
        width: 50px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-top: 1px solid $color-background-fffffffffffff;
        border-bottom: 1px solid $color-background-fffffffffffff;

        .gradient1 {
          color: $color-theme-d;
        }
      }
    }

    .container {
      overflow: auto;
      width: 100%;
      padding-bottom: 15px;
      @include border-1px($color-background);

      .unit {
        float: left;
        display: flex;
        width: 30%;
        height: 41px;
        margin: 8px 5px;
        padding: 0!important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: $font-size-small;
        color: $color-text-d;
        background: $color-background-fffffffffffff;
        border: 1px solid transparent;

        .unit-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }

        .unit-tips {
          flex: 1;
        }

        &.active {
          color: $color-text;
          background: $color-gradient1;
        }

        &.disable {
          color: $color-text-ll;
        }
      }
    }
  }

  .info {
    position: fixed;
    bottom: 0;
    height: 64px;
    width: 100%;
    background: $color-background-l;

    .count {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 30px 15px;

      button {
        flex: 0 0 40px;
        height: 40px;
        border: none;
        color: $color-text-d;
        font-size: $font-size-medium-x;
        background: $color-background-fffffffffffff;
      }

      .ticket-count {
        flex: 1;
        display: inline-block;
        width: 50px;
        text-align: center;

        .gradient1 {
          color: $color-theme-d;
        }
      }
    }

    .total {
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 57px;
      border-top: 7px solid $color-background;

      .next {
        flex: 0 0 145px;
        font-size: 0;
        height: 36px;
        margin: 11px 31px 11px 40px;
        @include bg-image('./next');
        @include bg-common();
        color: $color-text;
      }

      .total-price {
        flex: 1;
        border-right: 2px solid $color-background;
        font-size: $font-size-medium;

        span {
          color: $color-theme-d;
          font-size: $font-size-medium-x;
        }
      }
    }
  }
}
</style>
