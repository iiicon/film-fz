<template>
  <div class="detail-content">
    <div v-if="detailInfo.showCity">
      <div class="head-wrapper">
        <div class="showitem-wrapper heads" :class="[{'end':showEnd}, `gradient${activeId}`]">
          <div class="icon"><img width="86" height="120" :src="detailInfo.showPosterUrl" alt=""></div>
          <div class="desc">
            <div class="top">
              <p class="title">{{detailInfo.showName}}</p>
              <p class="price">￥{{detailInfo.minTicketPrice/100 || 0}}-{{detailInfo.maxTicketPrice/100 || 0}}</p>
            </div>
            <div class="middle">
              <span class="line"></span>
              <div class="state">
                <span>{{state}}</span>
              </div>
            </div>
            <div class="bottom">
              <div class="item">
                <div class="lab">演出时间：</div>
                <div class="info">{{showTime || ''}}</div>
              </div>
              <div class="item">
                <div class="lab">演出场馆：</div>
                <div class="info">{{position || ''}}</div>
              </div>
              <div class="item">
                <div class="lab"> </div>
                <div class="info">{{showaddress || ''}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">介绍</h3>
        <p class="content introduction">{{detailInfo.showDescription}}</p>
        <div class="detail" @click="getAbout">更多图文详情 ＞</div>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">购票须知</h3>
        <ul class="table">
          <li>
            <div class="k">演出时长</div>
            <div class="v">{{detailInfo.showDuration}}</div>
          </li>
          <li>
            <div class="k">入场时间</div>
            <div class="v">{{detailInfo.showEnterTime}}</div>
          </li>
          <li>
            <div class="k">限购说明</div>
            <div class="v">每单限{{detailInfo.orderLimitCount}}张</div>
          </li>
          <li style="padding-bottom:10px">
            <div class="k">儿童说明</div>
            <div class="v">1.2米以下儿童谢绝入场（儿童项目除外），1.2米以上的需持票入场</div>
          </li>
        </ul>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">关于退款</h3>
        <p class="content noline">{{detailInfo.refundDesc}}</p>
      </div>
      <div class="showInfo-wrapper">
        <h3 class="title">演唱会场区效果图</h3>
        <div class="content noline" :class="{'end':showEnd}"><img width="100%" :src="detailInfo.venueImageUrl" alt=""></div>
      </div>
      <div class="foot-wrapper">
        <div class="tel">
          <a href="tel:4001002071" :class="{'end':showEnd}">
            <img src="./custom@2x.png" width="26" height="26" alt="">
            <p class="info">客服热线</p>
          </a>
        </div>
        <div class="get-btn" :class="{'end':showEnd}" @click="getTicket"> </div>
      </div>
      <div style="height: 50px"></div>
    </div>
    <div class="loading-container">
      <loading v-if="!detailInfo.showCity"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment'
import { currentuser } from 'api/user'
import { getshowitemsdetail } from 'api/show'
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'

export default {
  data() {
    return {
      detailInfo: {},
      showEnd: false
    }
  },
  created() {
    this._getshowitemsdetail()
  },
  computed: {
    state() {
      if (this.detailInfo.showState === 2) {
        return '售票中'
      } else {
        return '已结束'
      }
    },
    activeId() {
      return this.currentId % 4 + 1
    },
    showTime() {
      return moment(this.detailInfo.showTime).format('YYYY-MM-DD H:mm:ss')
    },
    position() {
      return this.detailInfo.showCity + '·' + this.detailInfo.showVenue
    },
    showaddress() {
      return this.detailInfo.showProvince + this.detailInfo.showCity + this.detailInfo.showRegion
    },
    isShowEnd() {
      this.showEnd = true
    },
    ...mapGetters([
      'currentShow',
      'currentId'
    ])
  },
  methods: {
    getAbout() {
      this.$router.push({
        path: `/about`
      })
    },
    getTicket() {
      if (this.showEnd) {
        return
      }
      currentuser().then((data) => {
        if (data.success) {
          if (data.module.phone == null) {
            this.$router.push({
              path: `/bind-phone`
            })
          } else {
            this.$router.push({
              path: `/buy-ticket`
            })
          }
        }
        //  else {
        //   this.$router.push({
        //     path: `/login`
        //   })
        // }
      })
    },
    _getshowitemsdetail() {
      getshowitemsdetail(this.currentShow).then((data) => {
        if (data.success) {
          console.log(data.module)
          this.detailInfo = data.module
          if (data.module.showState === 2) {
            this.showEnd = false
          } else {
            this.showEnd = true
          }
        }
      })
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.detail-content {
  position: fixed;
  z-index: 200;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  background: $color-background;

  .head-wrapper {
    padding: 8px 14px;
    background: $color-background;

    .head {
      background: $color-gradient2
    }
    .showitem-wrapper {
      display: flex;
      height: 120px;
      margin-bottom: 8px;

      &.end {
        filter: grayscale(100%);

        &.heads {
          background: $color-gradient-gray;
        }
      }

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
        flex: 86px 0 0;
      }

      .desc {
        flex: 1;
        width: 0;
        padding-left: 14px;
        display: flex;
        flex-direction: column;
        color: $color-text;

        .top {
          flex: 0 0 34px;
          display: flex;
          flex-direction: column;
          padding: 10px 6px 0 0;

          p {
            flex: 1;
            font-size: $font-size-medium;
          }
          .title {
            @include no-wrap();
            font-weight: bold;
          }
          .price {
            padding-top: 4px;
            font-size: $font-size-medium;
            color: $color-money;
            font-weight: bold;
          }
        }
        .middle {
          flex: 0 0 20px;
          display: flex;
          flex-direction: row;
          justify-content: center;

          .line {
            flex: 1;
            height: 10px;
            border-bottom: 1px dotted $color-border-l;
          }

          .state {
            flex: 0 0 68px;
            display: inline-block;
            line-height: 19px;
            @include bg-image('./path');
            @include bg-common();
            text-align: center;

            span {
              position: relative;
              font-size: $font-size-small;
            }
          }
        }
        .bottom {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0px 6px 6px 0;
          font-size: $font-size-medium;

          .item {
            display: flex;
            font-size: $font-size-small;

            .lab {
              flex: 0 0 60px;
              align-items: center;
            }

            .info {
              @include no-wrap();
            }

            &:last-child {
              @include border-none()
            }
          }
        }
      }
    }
  }

  .showInfo-wrapper {
    background: $color-background-l;
    padding: 0 15px;
    margin-bottom: 10px;
    font-size: $font-size-medium; // @include border-1px($color-border-d);
    .item {
      display: flex;
      height: 50px;
      line-height: 50px;
      @include border-1px($color-border-d);

      &:last-child {
        @include border-none()
      }

      .lab {
        flex: 0 0 70px;
        color: $color-text-ml;
        align-items: center;
      }

      .info {
        flex: 1 0 auto;
        text-align: left;
      }
    }

    .title {
      height: 40px;
      line-height: 40px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }

    .content {
      line-height: 17px;
      padding: 0 0 5px;
      color: $color-text-d;
      font-size: $font-size-small;
      @include border-1px($color-background);

      &.introduction {
        padding-bottom: 15px;
      }

      &.noline {
        padding-bottom: 10px;
        @include border-none();
      }
      &.end {
        filter: grayscale(100%);
      }
    }

    .detail {
      height: 37px;
      line-height: 37px;
      text-align: center;
      font-size: $font-size-small-s;
      color: $color-text-d;
    }

    .table li {
      display: flex;
      font-size: $font-size-small;

      .k {
        flex: 0 0 70px;
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

  .foot-wrapper {
    position: fixed;
    z-index: 1;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: $color-background-l;

    .tel {
      flex: 0 0 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $font-size-medium;
      color: $color-text-ml;
      border-right: 2px solid $color-background;

      a {
        display: block;
        text-align: center;
        width: 100%;
        color: $color-text-d;
        font-size: $font-size-small-s;
        letter-spacing: 1px;

        &.end {
          filter: grayscale(100%);
        }
      }
    }

    .get-btn {
      flex: 1;
      display: flex;
      width: 136px;
      height: 36px;
      justify-content: center;
      align-items: center;
      margin-top: 7px;
      color: $color-text;
      @include bg-image('./buyticket');
      @include bg-common();

      &.end {
        @include bg-image('./buyticket-over');
      }
    }
  }

  .loading-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
