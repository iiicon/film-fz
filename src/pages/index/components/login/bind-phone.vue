<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-content">
        <div class="logtext-field">
          <div class="phone-label">手机号:</div>
          <input class="phone-input" v-model="phone" placeholder="请输入您的手机号" type="tel" maxlength="11">
        </div>
        <div class="passtext-field">
          <div class="left">
            <div class="phone-label">验证码:</div>
            <input class="pass-input" v-model="verifyCode" placeholder="请输入验证码" type="tel">
          </div>
          <div class="right" @click="getVerifyCode">
            {{text}}
          </div>
        </div>
        <div class="bind-field" @click="_bindphone">
          <div class="bind">绑定手机</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmacript-6">
import { validatePhoneNumber } from 'common/js/validate'
import { showToast } from 'common/js/dialog'
import { getcode, bindphone } from 'api/login'

export default {
  data() {
    return {
      phone: '',
      verifyCode: '',
      text: '发送验证码',
      isgetcode: true
    }
  },
  methods: {
    timer(wait) {
      let self = this
      if (wait === 0) {
        self.text = "获取验证码"
        wait = 60
        this.isgetcode = true
      } else {
        self.text = wait
        wait--
        clearTimeout(t)
        let t = setTimeout(function() {
          self.timer(wait)
        }, 1000)
      }
    },
    getVerifyCode() {
      if (!this.isgetcode) { return }
      this.isgetcode = false;
      if (!validatePhoneNumber(this.phone)) {
        showToast('请重新输入手机号')
        return
      }
      this.timer(60)
      getcode(this.phone).then((data) => {
        if (data.success) {
          showToast(data.msg)
        } else {
          showToast(data.msg)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    _bindphone() {
      if (!this.phone && !this.verifyCode) {
        showToast('请输入手机号或验证码')
        return
      }
      bindphone(this.phone, this.verifyCode).then((data) => {
        console.log(data)
        if (data.success) {
          showToast(data.msg)
          this.$router.push({
            path: `/buy-ticket`
          })
        } else {
          showToast('绑定手机失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";

.login-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-background-dialog;

  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    box-sizing: border-box;
    width: 90%;
    max-width: 640px;
    border-radius: 5px;
    padding: 20px 30px;
    background: $color-background-l;

    .login-content {

      .logtext-field {
        height: 58px;
        line-height: 58px;
        margin-bottom: 10px;
        padding: 0 15px;
        border: 1px solid $color-border-d;

        .phone-label {
          padding-top: 10px;
          line-height: 12px;
          font-size: $font-size-small;
          color: $color-text-l;
        }

        .phone-input {
          display: block;
          margin-top: 10px;
          height: 18px;
          line-height: 18px;
          color: $color-text-ml;
        }
      }

      .passtext-field {
        height: 60px;
        line-height: 60px;
        margin-bottom: 10px;

        .left {
          float: left;
          box-sizing: border-box;
          height: 100%;
          width: 60%;
          padding: 0 15px;
          border: 1px solid $color-border-d;

          .phone-label {
            padding-top: 10px;
            line-height: 12px;
            font-size: $font-size-small;
            color: $color-text-l;
          }

          .pass-input {
            display: block;
            width: 100%;
            margin-top: 10px;
            height: 18px;
            line-height: 18px;
            color: $color-text-ml;
          }
        }

        .right {
          float: right;
          height: 100%;
          width: 35%;
          border: 1px solid $color-warn;
          color: $color-warn;
          text-align: center;
          font-size: $font-size-medium;
        }
      }

      .bind-field {
        height: 50px;
        line-height: 50px;

        .bind {
          height: 100%;
          background: #999999;
          text-align: center;
          line-height: 50px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }
    }
  }
}
</style>

