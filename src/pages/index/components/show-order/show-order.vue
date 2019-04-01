<template>
  <div class="order-wrapper">
    <div class="scroll">
      <div class="showitem-wrapper" :class="`gradient${activeId}`">
        <div class="icon"><img width="110" height="160" :src="detailInfo.showPosterUrl" alt=""></div>
        <div class="desc">
          <div class="top">
            <p class="title">{{detailInfo.showName}}</p>
          </div>
          <div class="bottom">
            <p>
              <span class="lab">演出时间：</span>
              <span class="info">{{showTime}}</span>
            </p>
            <p>
              <span class="lab">演出场馆：</span>
              <span class="info">{{position}}</span>
            </p>
            <p>
              <span class="lab">总价：</span>
              <span class="info">￥{{totalPrice}}</span>
            </p>
            <p>
              <span class="lab">张数：</span>
              <span class="info">{{ticketCount}}张</span>
            </p>
          </div>
        </div>
      </div>
      <div class="spacek"></div>
      <div class="showInfo-wrapper">
        <h3 class="title">配送方式</h3>
        <div class="icon" v-if="!expressAddress.userInfo">
          <img width="50" height="50" src="./express@2x.png" alt="">
          <p class="info">快递配送</p>
        </div>
        <div class="icon-small" v-if="expressAddress.userInfo">
          <img width="38" height="38" src="./express-icon-small@2x.png" alt="">
          <p class="info">快递配送</p>
        </div>
        <!-- <div class="content">{{expressAddress.userInfo}}</div> -->
        <!-- <div class="content">{{expressAddress.phone}}</div> -->
        <div class="expressInfo" @click="addAddress" v-if="expressAddress.userInfo">
          <div class="left">
            <p>
              <span>{{expressName}}</span>
              <span class="space"></span>
              <span>{{expressPhone}}</span>
            </p>
            <p>{{expressaddress}}</p>
          </div>
          <div class="right">
            <img width="16" height="16" src="./next-arrow@2x.png" alt="">
          </div>
        </div>
        <div class="detail" @click="addAddress" v-if="!expressAddress.userInfo">
          <span>点击添加收货地址</span>
          <img class="arrow" width="16" height="16" src="./next-arrow@2x.png" alt="">
        </div>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">订单明细</h3>
        <div class="detail-row first">
          <div class="left">商品金额</div>
          <div class="right">￥{{totalPrice.toFixed(2)}}</div>
        </div>
        <div class="detail-row">
          <div class="left">运费</div>
          <div class="right freight">+￥{{freight.toFixed(2)}}</div>
        </div>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">支付方式</h3>
        <div class="detail-row">
          <div class="left">
            <img width="18" height="18" src="./wechat-pay@2x.png" alt="">
            <span> 微信支付</span>
          </div>
          <div class="right icon"><img width="18" height="18" src="./right@2x.png" alt=""></div>
        </div>
      </div>
      <div style="height: 132px"></div>
      <div class="footer-wrapper">
        <div class="order-protocal">
          <p class="protocal">
            温馨提示：请您仔细核对订单信息，因演出票的唯一性、时效性，购买后无法退票或更换。 <br><span style="color:#373737">我已阅读</span>
            <span><router-link style="color:#5b78d0" to="/yoyu-agreement">《友娱票务用户服务协议》</router-link></span>
          </p>
        </div>
        <div class="order-footer">
          <div class="total">合计：
            <span class="font">￥{{delivery}} </span>
          </div>
          <div class="submit" @click="submitOrder">同意以上协议并提交订单</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { getshowitemsdetail, createorder } from 'api/show'
import ShowAddAddress from 'components/show-add-address/show-add-address'
import { currentuser } from 'api/user'
import { showToast } from 'common/js/dialog'
import moment from 'moment'

export default {
  data() {
    return {
      detailInfo: {},
      freight: 22
    }
  },
  created() {
    this._getshowitemsdetail()
  },
  mounted() {
    console.log(this.expressAddress)
  },
  computed: {
    delivery() {
      return (parseInt(this.freight) + parseInt(this.totalPrice)).toFixed(2)
    },
    showTime() {
      return moment(this.detailInfo.showTime).locale('zh-CN').format('YYYY-MM-DD dddd H:mm')
    },
    position() {
      return this.detailInfo.showCity + '·' + this.detailInfo.showVenue
    },
    sellPrice() {
      return (this.detailInfo.sellPrice / 100).toFixed(2)
    },
    expressaddress() {
      return this.expressAddress.userInfo && this.expressAddress.userInfo.split('@')[0]
    },
    expressName() {
      return this.expressAddress.userInfo && this.expressAddress.userInfo.split('@')[1]
    },
    expressPhone() {
      return this.expressAddress.phone
    },
    activeId() {
      return this.currentId % 4 + 1
    },
    ...mapGetters([
      'currentShow',
      'totalPrice',
      'ticketCount',
      'expressAddress',
      'showItemUnitId',
      'orderNo',
      'currentId'
    ])
  },
  methods: {
    _getshowitemsdetail() {
      getshowitemsdetail(this.currentShow).then((data) => {
        if (data.success) {
          this.detailInfo = data.module
          // this.showItemUnitId = data.module.id
        }
      })
    },
    addAddress() {
      this.$router.push({
        path: `/show-order/address`
      })
    },
    submitOrder() {
      let self = this
      currentuser().then((data) => {
        if (data.success) {
          if (data.module.phone == null) {
            this.$router.push({
              path: `/bind-phone`
            })
          } else {
            let openId = data.module.openId
            if (!self.expressAddress.userInfo || !self.expressAddress.phone) {
              showToast('请填写收货地址')
              return
            }
            /* eslint-disable */
            createorder(self.showItemUnitId, self.ticketCount, self.expressAddress.userInfo, openId, self.expressAddress.phone).then((data) => {
              if (data.success) {
                let p = 'prepay_id=' + data.module.prepayId;
                let orderNo = data.module.orderCode;
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": data.module.appId, //公众号名称，由商户传入
                    "timeStamp": data.module.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": data.module.nonceStr, //随机串
                    "package": p,
                    "signType": data.module.signType, //微信签名方式：
                    "paySign": data.module.paySign //微信签名
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      // app.switchPage('./wechat_pay.html?orderNo=' + orderNo);
                      console.log(`orderNo${orderNo}`)
                      self.saveorderNo(orderNo)
                      self.cleartotalprice()
                      self.clearticketCount()
                      self.clearShowItemUnitId()
                      self.$router.push({
                        path: `/show-order-detail`
                      })
                    } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                      showToast("用户取消支付！");
                    } else {
                      showToast("支付发生错误！");
                    }
                  }
                )
              } else {
                showToast(data.msg)
              }
            })
          }
        }
      })
    },
    ...mapActions([
      'cleartotalprice',
      'clearticketCount',
      'clearShowItemUnitId',
      'saveorderNo'
    ])
  },
  components: {
    ShowAddAddress
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.order-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: auto;
  background: $color-background;

  .scroll {
    overflow: auto;

    .spacek {
      height: 8px;
    }
  }

  .showitem-wrapper {
    display: flex;
    height: 160px;

    &.gradient1 {
      background: $color-gradient1;
    }
    &.gradient2 {
      background: $color-gradient2;
    }
    &.gradient3 {
      background: $color-gradient3;
    }
    &.gradient4 {
      background: $color-gradient4;
    }
    .icon {
      flex: 0 0 110px;
    }

    .desc {
      flex: 1;
      width: 0;
      padding-left: 14px;
      display: flex;
      flex-direction: column;
      color: $color-text;

      .top {
        flex: 0 0 65px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px 0 0;
        border-bottom: 1px dashed $color-border-l;

        p {
          font-size: $font-size-medium;
        }
        .title {
          line-height: 20px;
          // @include no-wrap();
        }
      }
      .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 16px 6px 6px 0;
        font-size: $font-size-medium;

        p {
          display: flex;
          font-size: $font-size-small;
          @include no-wrap();

          .lab {
            flex: 0 0 60px;
            align-items: center;
            font-weight: 200;
          }
        }
      }
    }
  }


  .showInfo-wrapper {
    background: $color-background-l;
    padding: 0 10px;
    margin-bottom: 2px;
    font-size: $font-size-medium;

    .item {
      display: flex;
      height: 50px;
      line-height: 50px;
      @include border-1px($color-border-d);

      &:last-child {
        @include border-none()
      }

      .lab {
        flex: 70px 0 0;
        color: $color-text-ml;
        align-items: center;
      }

      .info {
        flex: 1 0 auto;
        text-align: left;
      }
    }

    .title {
      height: 36px;
      line-height: 36px;
      padding-top: 8px;
      padding-left: 10px;
      font-size: $font-size-medium-x;
      color: $color-text-d;
    }

    .icon {
      text-align: center;
      padding-bottom: 30px;
      margin-top: -6px;

      &.had {
        @include border-1px($color-background);
      }

      .info {
        margin-top: -5px;
        font-size: $font-size-small;
        color: $color-theme-d;
      }
    }

    .icon-small {
      text-align: center;
      padding-bottom: 10px;
      margin-top: -14px;
      font-size: 10px;
      @include border-1px($color-background);

      .info {
        margin-top: -5px;
        font-size: 9px;
        color: $color-theme-d;
      }
    }

    .expressInfo {
      height: 48px;
      display: flex;
      color: $color-text-d;
      font-size: $font-size-small;

      .left {
        flex: 1;
        width: 0;
        padding: 4px 0;

        p {
          margin-left: 12px;
          height: 20px;
          line-height: 20px;

          &:last-child {
            @include no-wrap()
          }

          .space {
            padding: 0 15px;
          }
        }
      }

      .right {
        flex: 0 0 50px;
        text-align: center;
        line-height: 48px;
      }
    }

    .content {
      line-height: 24px;
      padding: 0 0 5px;
      color: $color-text-ml;
      @include border-1px($color-border-d);
    }

    .detail {
      position: relative;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-ll;

      .arrow {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .detail-row {
      display: flex;
      height: 34px;
      line-height: 34px;
      align-items: center;
      flex-direction: row;

      &.first {
        @include border-1px($color-background);
      }

      .left {
        flex: 1;
        padding: 0 10px;

        img {
          vertical-align: top;
          margin-top: 8px;
          line-height: 34px;
        }

        span {
          height: 34px;
          line-height: 34px;
        }
      }

      .right {
        flex: 1;
        text-align: right;
        margin-top: 8px;
        padding: 0 10px;

        &.icon {
          padding-right: 30px;
        }

        &.freight {
          color: $color-theme-d;
        }
      }
    }

    .table li {
      display: flex;

      .k {
        flex: 74px 0 0;
        height: 28px;
        line-height: 28px;
        color: $color-text-l;
      }

      .v {
        flex: 1;
        min-height: 23px;
        padding-top: 5px;
        &:last-of-type {
          line-height: 20px;
        }
      }
    }
  }

  .footer-wrapper {
    position: fixed;
    bottom: 0;
    height: 132px;
    width: 100%;
    z-index: 150;
    background: $color-background-l;
  }
  .order-protocal {
    padding: 15px 10px;

    .protocal {
      line-height: 16px;
      font-size: $font-size-small;
      color: $color-text-ml;

      span {
        color: $color-theme-d;
      }
    }
  }

  .order-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 4px solid $color-background;

    .total {
      flex: 0 0 160px;
      text-align: center;

      .font {
        color: $color-theme-d;
      }
    }

    .submit {
      flex: 1;
      height: 100%;
      line-height: 50px;
      text-align: center;
      color: $color-text;
      font-size: 0;
      @include bg-image('./submit');
      background-size: 190px 35px;
      background-repeat: no-repeat;
      background-position: center center;
      border-left: 2px solid $color-background;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
