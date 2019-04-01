<template>
  <transition name="slide">
    <div class="info-wrapper" ref="wrapper" style="overflow:scroll">
      <div class="info" ref="info">
        <div class="head">
          <div class="icon"></div>
          <div class="desc">
            <div class="title">
              <p>超级 DIVA 演唱会</p>
              <p>深圳站</p>
            </div>
            <div class="disc">
              <p>演出时间：12月16日 周六 19：30</p>
              <p>演出场馆：深圳市体育场</p>
              <p>地址：广东省深圳市福田区笋岗西路2006号</p>
            </div>
          </div>
        </div>
        <div class="convert-wrapper">
          <div class="convert">
            <span class="tip">兑换码：</span>
            <input class="convert-input" type="text" v-model="code" placeholder="请输入兑换码">
          </div>
        </div>
        <div class="delivery-info" id="deliveryInfo" ref="deliveryInfo" v-on:focusin.stop="scrollFormToTop" v-on:focusout.stop="cancelScrollTop">
          <mt-cell title="配送方式：快递"></mt-cell>
          <div class="info-item">
            <div class="left">
              <span>姓名：</span>
            </div>
            <div class="right">
              <input type="text" placeholder="请输入姓名" v-model="username">
            </div>
          </div>
          <div class="info-item" id="view">
            <div class="left">
              <span>电话：</span>
            </div>
            <div class="right">
              <input type="tel" placeholder="请输入手机号" v-model="phone" maxlength="11">
            </div>
          </div>
          <div class="info-item">
            <div class="left">
              <span>所在区域：</span>
            </div>
            <div class="right" @click="showAddressPicker">
              <input type="text" placeholder="请选择所在区域" readonly v-model="tempAddress">
            </div>
          </div>
          <div class="info-item">
            <div class="left">
              <span>地址</span>
            </div>
            <div class="right">
              <input type="text" placeholder="请输入地址" v-model="detailAddr">
            </div>
          </div>
        </div>
        <div class="message">
          票品为不记名实物，请妥善保管，遗失不补
        </div>
        <div class="submit-btn">
          <div class="sub" @click="_exchangeTicket"></div>
        </div>
      </div>
      <div class="pick-mark" v-show="showAddress" v-on:touchend.stop>
        <div class="btn-wrap">
          <a class="btn-cancel" @click="showAddress = !showAddress">取消</a>
          <a class="btn-sure" @click="fillAddress">确定</a>
        </div>
        <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { address, slots } from 'common/js/address'
// import { prefixStyle } from 'common/js/dom'
import { validatePhoneNumber } from 'common/js/validate'
import { showToast } from 'common/js/dialog'
import { exchangeTicket } from 'api/shenzhen'
import { MessageBox } from 'mint-ui'

// const transforms = prefixStyle('transform')

export default {
  data() {
    return {
      showAddress: false,
      slots: slots,
      username: '',
      phone: '',
      address: '',
      area: '',
      tempAddress: '',
      detailAddr: '',
      code: ''
    }
  },
  created() {
  },
  computed: {
    userInfo() {
      return this.tempAddress + this.detailAddr + '@' + this.username
    }
  },
  mounted() {
    var self = this
    self.initAddress()
  },
  methods: {
    fillAddress() {
      this.address = this.tempAddress
      this.showAddress = !this.showAddress
    },
    initAddress() {
      this.slots[0].values = address.filter((item, index) => {
        if (item.apid === 0) {
          return item
        }
      })
    },
    onValuesChange(picker, values) {
      if (values[0]) {
        this.slots[1].values = address.filter((item) => {
          if (item.apid === values[0].aid) {
            return item
          }
        })
      }

      if (values[1]) {
        this.slots[2].values = address.filter((item) => {
          if (item.apid === values[1].aid) {
            return item
          }
        })
      }

      if (values[2]) {
        this.tempAddress = values[0].aname + values[1].aname + values[2].aname
      }
    },
    showAddressPicker() {
      let self = this
      setTimeout(() => {
        self.showAddress = !self.showAddress
      }, 100)
    },
    scrollFormToTop() {
      // 1 better-scroll 有bug
      // this.$refs.infoWrapper.scrollToElement(this.$refs.deliveryInfo, 0)

      // 2 transform 页面不能滚动
      // this.$refs.info.style[transforms] = `translate3d(0,-250px,0)`

      // 3 scrollIntoView 可以很好得解决
      let deliveryInfo = document.getElementById('deliveryInfo')
      deliveryInfo.scrollIntoView(true)
    },
    cancelScrollTop() {
      // this.$refs.infoWrapper.scrollTo(0, 0)
      // this.$refs.info.style[transforms] = `translate3d(0,0,0)`
    },
    refresh() {
      this.$refs.infoWrapper.refresh()
    },
    _exchangeTicket() {
      if (!this.code) {
        showToast('请输入兑换码')
        return
      }
      if (!validatePhoneNumber(this.phone)) {
        showToast('请重新输入手机号')
        return
      }
      if (!this.username) {
        showToast('请输入姓名')
        return
      }
      if (!this.detailAddr) {
        showToast('请输入详细地址')
        return
      }
      var self = this
      MessageBox.confirm(`<div style="text-align:left; padding-left: 20px"><p>姓  名：${self.username}</p><p>手  机：${self.phone}</p><p>地  区：${self.tempAddress}</p><p>地  址：${self.detailAddr}</p></div>`, '确认收货信息'
      ).then((action) => {
        exchangeTicket(self.phone, self.code, self.userInfo).then((data) => {
          if (data.success === true) {
            MessageBox.alert('兑换成功').then(action => {
              self.$router.back()
            })
          } else {
            MessageBox.alert('兑换失败').then(action => {
              // self.$router.back()
            })
          }
        })
      })
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .info-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background-l;
    .infoview {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .info {
      height: 130%;
    }
    .head {
      height: 160px;
      display: flex;

      .icon {
        flex: 110px 0 0;
        height: 160px;
        @include bg-image('./ui-header');
        background-size: contain;
        background-repeat: no-repeat;
      }

      .desc {
        display: flex;
        flex-direction: column;
        padding-left: 14px;
        flex: 1;
        height: 100%;
        background: linear-gradient(to bottom right, #7561d4, #5380d5);
        color: $color-text;

        .title {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 16px;
          border-bottom: 1px dashed #ffffff;

          & p {
            line-height: 28px
          }
        }

        .disc {
          flex: 1;
          padding-top: 18px;
          font-size: 12px;

          & p {
            line-height: 18px;
          }
        }
      }
    }

    .convert-wrapper {
      padding: 24px 14px;
      background: $color-background;

      .convert {
        display: flex;
        align-items: center;
        position: relative;
        height: 44px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(to right, #7561d4, #5380d5);

        .tip {
          flex: 1 1 50px;
          height: 100%;
          line-height: 44px;
          color: $color-text;
          font-size: 14px;
          padding-left: 20px;
        }

        .convert-input {
          flex: 1;
          height: 100%;
          padding: 0 22px;
          box-sizing: border-box;
          text-align: right;
          background: transparent;
          color: $color-text;

          &::placeholder {
            color: $color-text
          }
        }
      }
    }

    .delivery-info {
      padding: 0 15px;
      background: $color-background-l;
      .mt-cell {
        border-bottom:1px solid $color-border-d ;
      }
      .info-item {
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
        justify-content: center;
        padding: 0 15px;

        &.border-bottom {
          border-bottom: 1px solid $color-border-d;
        }

        .left {
          flex: 0 0 80px;
        }
        .right {
          flex: 1;
          height: 30px;
          text-align: right;

          input {
            width: 100%;
            height: 100%;
            text-align: right;
          }
        }
      }
    }
  }

  .submit-btn {
    padding: 15px 0 100px; // background: $color-background-l;
    .sub {
      margin: 0 auto;
      width: 115px;
      height: 35px;
      @include bg-image('./submit-btn');
      @include bg-common();
    }
  }

  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .5);
    .btn-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      background: #fff;
      .btn-cancel {
        color: #55f;
      }
      .btn-sure {
        color: #e5004d;
      }
    }
    .select {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: $color-background-l;
    }
    .picker-items {
      background: #eee;
      .picker-slot {
        font-size: 14px;
      }
      .picker-item {
        &.picker-selected {
          color: #535353;
        }
      }
      .picker-center-highlight {
        &:after,
        &:before {
          background: #fff;
        }
      }
    }
  }

  .location-picker {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 999;
    background: $color-background-l;
    border-top: 1px solid $color-border-d;
  }

  .message {
    height: 40px;
    background: $color-background;
    text-align: center;
    line-height: 40px;
    color: $color-text-d;
    font-size: $font-size-small;
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
