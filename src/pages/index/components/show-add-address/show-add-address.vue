<template>
  <transition name="slide">
    <div>
      <div class="info-wrapper" ref="info">
        <div class="main">
          <div class="express-icon">
            <img width="50" height="50" src="./express@2x.png" alt="">
            <p>快递配送</p>
          </div>
          <div class="delivery-info" id="deliveryInfo" ref="deliveryInfo">
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
                <span>地址：</span>
              </div>
              <div class="right">
                <input type="text" placeholder="请输入收货人详细信息" v-model="detailAddr">
              </div>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <div class="sub" @click="save"> </div>
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
import { mapMutations } from 'vuex'
import { validatePhoneNumber } from 'common/js/validate'
import { showToast } from 'common/js/dialog'

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
    save() {
      let self = this
      if (!self.username) {
        showToast('请输入姓名')
        return
      }
      if (!self.phone) {
        showToast('请输入手机号')
        return
      }
      if (!self.detailAddr) {
        showToast('请输入详细地址')
        return
      }
      if (!validatePhoneNumber(self.phone)) {
        showToast('请重新输入手机号')
        return
      }
      let addr = {
        userInfo: self.userInfo,
        phone: self.phone
      }
      self.saveAddress(addr)
      showToast('保存成功')
      self.$router.back()
    },
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
    ...mapMutations({
      saveAddress: 'SET_EXPRESS_ADDRESS'
    })
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
  z-index: 300;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background: $color-background;

  .main {
    flex: 1 0 450px;
  }

  .footer {
    flex: 0 0 50px;
    margin: 0 auto
  }
  .submit-btn {
    flex: 0 0 51px;
    width: 100%;

    .sub {
      width: 190px;
      height: 36px;
      line-height: 36px;
      margin: 0 auto;
      color: $color-text;
      font-size: $font-size-medium;
      border-radius: 3px;
      @include bg-image('./save-address');
      @include bg-common();
    }
  }

  .express-icon {
    text-align: center;
    padding: 27px 0 6px;

    p {
      margin-top: -6px;
      text-align: center;
      font-size: 11px;
      color: $color-theme-d;
    }
  }

  .infoview {
    position: relative;
    width: 100%;
    height: 100%;
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
    margin: 15px 10px 0;
    background: $color-background-l;
    font-size: $font-size-medium;
    border-radius: 6px;
    overflow: hidden;

    .info-item {
      display: flex;
      flex-direction: row;
      height: 50px;
      align-items: center;
      justify-content: center;
      padding: 0 15px;
      border-bottom: 1px solid $color-border-d;

      &:last-child {
        border: none;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
