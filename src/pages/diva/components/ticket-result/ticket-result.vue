<template>
  <div class="result-wrapper">
    <div class="msg">
      <img width="90" height="90" src="./success.png" alt="">
      <p style="line-height:60px; height: 60px; margin-bottom: 50px;">兑换成功</p>
      <p class="info">根据您提交的收货信息，演出票将会于 11.15日左右</p>
      <p class="info">快递给以下地址:</p>
      <p class="info">{{address}}</p>
      <p class="info"></p>
      <p class="info">请耐心等待，如遇任何问题，欢迎拨打热线：</p>
      <p class="info">400-100-2071</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      expressAddress: {
        type: String,
        default: ''
      },
      mobile: {
        type: String,
        default: ''
      }
    },
    computed: {
      address() {
        return this.expressAddress.split('@')[0]
      },
      username() {
        return this.expressAddress.split('@')[1]
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";

  .result-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100vh;
    border-radius: 5px;
    overflow: hidden;
    padding: 30px 0;
    background: $color-background-l;

    .msg {
      margin: 86px auto 36px;
      text-align: center;
      color: $color-theme-d;
      font-size: $font-size-large;

      .info {
        color: $color-text-ml;
        font-size: $font-size-small;
        line-height: $font-size-small * 2;
        height: $font-size-small * 2;
      }
    }
  }
</style>

