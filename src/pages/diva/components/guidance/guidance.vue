<template>
  <div>
    <div class="guidance-wrapper">
      <div class="filter-wrapper" v-if="showFetch === true">
        <div class="filter">
          <img height="62%" src="./tickets.jpg" alt="">
          <div class="guidance-info">
            <ul>
              <li>
                <h3>活动时间</h3>
                <div>2017年10月25日至11月5日</div>
              </li>
              <li>
                <h3>活动对象</h3>
                <div>持有浦发信用卡的全部用户</div>
              </li>
              <li>
                <h3>活动规则</h3>
                <p>1. 点击下方按钮 → 输入兑换码 → 输入收票信息 (地址，电话，收票人姓名) → 邮寄门票</p>
                <p>2. 本次活动最终解释权归友娱所有 </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="get-btn-wrapper">
          <div class="get-button" @click="_getTickets"></div>
        </div>
      </div>
      <!-- <div class="get-btn-wrapper" v-if="showFetch === true"> -->
      <!-- <mt-button class="get-button" size="large" type="primary" @click="_getTickets">领演出票</mt-button> -->
      <!-- </div> -->
      <div class="result-wrapper" v-if="showFetch === false">
        <ticket-result :expressAddress="expressAddress" :mobile="mobile"></ticket-result>
      </div>
      <div class="loading-wapper" v-if="showFetch === '1'">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import { getUserInfo } from 'api/user'
import TicketResult from 'Dcomponents/ticket-result/ticket-result'
import { getMyTicket, exchangeTicket } from 'api/diva'
import Loading from 'base/loading/loading'
import moment from 'moment'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      userInfo: null,
      // showFetch: '1',
      showFetch: true,
      expressAddress: '',
      mobile: ''
    }
  },
  created() {
    // this._getUserInfo()
    this._getMyTicket()
  },
  methods: {
    _getTickets() {
      /* eslint-disable */
      var timer = moment().isAfter('2017-11-05 23:59:59')
      if (timer) {
        MessageBox('提示', '活动已结束，感谢您的参与')
        return
      }
      // else {
      //   MessageBox('提示', '超级DIVA-上海站还未开始，敬请期待')
      //   return
      // }
      this.$router.push({ path: '/info' })
    },
    _getMyTicket() {
      getMyTicket().then(data => {
        // alert(JSON.stringify(data))
        if (data.success === false) {
          this.showFetch = true
        } else if (data.success === true) {
          this.showFetch = false
          this.expressAddress = data.module.expressAddress
          this.mobile = data.module.mobile
        }
        return
      })
    },
    _exchangeTicket() {
      exchangeTicket()
    },
    _getUserInfo() {
      getUserInfo().then(data => {
        // alert(JSON.stringify(data))
      })
    }
  },
  components: {
    TicketResult,
    Loading
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin';

.guidance-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;
  .filter-wrapper {
    position: relative;
    height: 100%;
    background: linear-gradient(to right, #7561d4, #5380d5);
  }
  .filter {
    position: absolute;
    left: 50%;
    top: 3%;
    transform: translate3d(-50%, 0, 0);
    height: 84vh;
    width: 80vw;
    @include bg-image('./j_bg');
    @include bg-common();
    background-size: 90% 100%; // filter: blur(10px);
    font-size: 0;

    img {
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: 60vw;
    }

    .guidance-info {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      height: 22%;
      width: 60vw;
      color: $color-text-d;
      font-size: $font-size-small;
      line-height: $font-size-small * 1.2;

      h3 {
        font-weight: bold;
        margin-top: 3px;
      }
    }
  }

  .image-wrapper {
    height: 150px;
    margin: 15px 0;
    padding: 12px;
    text-align: center;
    background: #666666;
    .image-wrapper img {
      height: 180px;
      background: orange;
    }
  }

  .loading-wapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .get-btn-wrapper {
    position: absolute;
    bottom: 1%;
    left: 50%;
    transform: translate(-50%, -50%);

    .get-button {
      width: 115px;
      height: 35px;
      @include bg-image('./get-show');
      @include bg-common();
    }
  }
}
</style>
