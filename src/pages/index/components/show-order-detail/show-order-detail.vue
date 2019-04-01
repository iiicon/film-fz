<template>
  <div class="orderdtail-wrapper">
    <m-header :title="title" class="titles"></m-header>
    <div class="head">
      <div class="showitem-wrapper" :class="`gradient${activeId}`">
        <div class="icon"><img width="110" height="160" :src="orderInfo.showPosterUrl" alt=""></div>
        <div class="desc">
          <div class="top">
            <p class="order-title">{{orderInfo.showName}}</p>
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
              <span class="info">￥{{sellPrice}}</span>
            </p>
            <p>
              <span class="lab">张数：</span>
              <span class="info">{{orderInfo.ticketCount}}张</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-info">
      <div class="order-item t">
        <div class="delivery">
          <h3 class="lab">配送方式</h3>
          <div class="info">
            <img width="46" height="46" class="express-icon" src="./express@2x.png" alt="">
            <br>
            <span>快递配送</span>
          </div>
        </div>
        <h3 class="order-title">收货信息</h3>
        <div class="order-table">
          <p>
            <span class="lab">姓名</span>
            <span class="space"></span>
            <span>{{expressUserName}}</span>
          </p>
          <p>
            <span class="lab">电话</span>
            <span class="space"></span>
            <span>{{orderInfo.mobile}}</span>
          </p>
          <p class="address-row">
            <span class="lab address-lab">地址</span>
            <span class="space"></span>
            <span class="address-detail">{{expressAddress}}</span>
          </p>
        </div>
      </div>
      <div class="order-item m">
        <h3 class="order-title">订单信息</h3>
        <div class="order-table">
          <p>
            <span class="lab">订单编号
              <span class="space"></span>{{orderInfo.orderNo}}</span>
          </p>
          <p>
            <span class="lab">下单时间
              <span class="space"></span>{{gmtCreate}}</span>
          </p>
          <p>
            <span class="lab">订单状态
              <span class="space"></span>{{orderStatus}}</span>
          </p>
        </div>
        <div class="logistics" v-if="!!orderInfo.expressOrderId">
          物流号
          <span class="space"></span>{{orderInfo.expressOrderId}}
          <div class="viewLogistics" @click="viewLogistics">查看物流</div>
        </div>
      </div>
      <div class="order-item b">
        <h3 class="order-title">订单明细</h3>
        <div class="order-detail">
          <p>商品金额
            <span>￥{{sellPrice}}</span>
          </p>
          <p>运费
            <span class="hot">+￥22.00</span>
          </p>
          <p>合计
            <span class="hot">￥{{paidFee}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import { mapGetters } from 'vuex'
import { querybyordercode } from 'api/show'
import { queryexpressinfo } from 'api/express'
import moment from 'moment'
import { showToast } from 'common/js/dialog'

export default {
  data() {
    return {
      title: '我的演出票',
      orderInfo: null,
      orderDo: null,
      expressUrl: ''
    }
  },
  created() {
    // this.returnUrl = window.location.origin + '/p/index.html?#/show-order-detail'
    this.returnUrl = window.location.origin
    this._getOrderDetail()
    this._queryexpressinfo()
  },
  computed: {
    showTime() {
      return moment(this.orderInfo.showTime)
        .locale('zh-CN')
        .format('YYYY-MM-DD dddd H:mm')
    },
    position() {
      return this.orderInfo.showCity + '·' + this.orderInfo.showVenue
    },
    sellPrice() {
      return (this.orderInfo.sellPrice / 100).toFixed(2)
    },
    paidFee() {
      return (this.orderInfo.paidFee / 100).toFixed(2)
    },
    expressAddress() {
      return this.orderInfo.expressAddress.split('@')[0]
    },
    expressUserName() {
      return this.orderInfo.expressAddress.split('@')[1]
    },
    gmtCreate() {
      return moment(this.orderDo.gmtCreate)
        .locale('zh-CN')
        .format('YYYY-MM-DD dddd H:mm')
    },
    orderStatus() {
      return this.orderInfo.orderStatus === 2 ? '已发货' : '待发货'
    },
    activeId() {
      return this.currentId % 4 + 1
    },
    ...mapGetters(['currentId', 'orderNo'])
  },
  methods: {
    viewLogistics() {
      if (this.expressUrl && this.expressUrl.length > 1) {
        window.location.href = this.expressUrl
      } else {
        showToast('物流单号不存在')
        return
      }
    },
    _queryexpressinfo() {
      queryexpressinfo(this.orderNo, this.returnUrl).then(data => {
        if (data.success) {
          this.expressUrl = data.module
        }
      })
    },
    _getOrderDetail() {
      querybyordercode(this.orderNo).then(data => {
        if (data.success) {
          this.orderInfo = Object.assign(
            {},
            data.module.showOrderDO,
            data.module.showItemsDO,
            data.module.showItemUnitsDO
          )
          this.orderDo = data.module.showOrderDO
        }
      })
      /* eslint-disable */
      // let data = {
      //   total: null,
      //   success: true,
      //   msg: null,
      //   module: {
      //     showOrderDO: {
      //       id: 31,
      //       providerOrderId: 1507864045790,
      //       providerCode: 3,
      //       orderStatus: 1,
      //       statusCode: null,
      //       userId: 122,
      //       isDeleted: 0,
      //       tradeNo: '201710131107251000000031',
      //       tradeStatus: 'PAY_SUCCESS',
      //       traderCode: 2,
      //       mobile: '15034075953',
      //       showId: 12,
      //       showItemUnitId: 83,
      //       showName: 'MR.FUTUER MUSIC FESTIVAL富秋音乐节',
      //       ticketAreaName: '看台',
      //       settlePrice: 38000,
      //       ticketCount: 1,
      //       sellPrice: 38000,
      //       paidFee: 38000,
      //       orderNo: '201710131107251000000031',
      //       gmtCreate: 1507864046000,
      //       refundFee: null,
      //       gmtModified: 1507864057000,
      //       isVoucherUsed: null,
      //       wxPrepayId: 'wx20171013110725b64b6295b60119404469',
      //       expressAddress: '山西太原市万柏林区大同路@史光伟',
      //       expressCompany: null,
      //       expressOrderId: null
      //     },
      //     showItemsDO: {
      //       id: 12,
      //       showCode: 'SI201710121202185565',
      //       showName: 'MR.FUTUER MUSIC FESTIVAL富秋音乐节',
      //       showPosterUrl:
      //         'https://yyoyu.oss-cn-shanghai.aliyuncs.com/20171012220326716587.png',
      //       showTime: 1511445828000,
      //       showProvince: '湖北省',
      //       showCity: '武汉市',
      //       showRegion: '市辖区',
      //       showAddress: '武汉体育中心-五环广场',
      //       showVenue: '武汉体育中心-五环广场',
      //       totalTicketCount: null,
      //       venueImageUrl:
      //         'https://yyoyu.oss-cn-shanghai.aliyuncs.com/20171012220428097818.jpg',
      //       showDescription: '渴望不止·航向未来',
      //       showDetail:
      //         '<p><br></p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516027410_3727_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p> 一位具有江湖范儿、有特色的嘻哈歌手，始终稳准狠加中国味的rap，展现了他的说唱实力。</p ><p>而他在演唱流行歌曲时，显示出了其稳健的唱腔、唱功，他也因此被称作为“被说唱耽误了的歌手”。</p ><p>GAI算得上是一个鬼才，他有着自己的音乐理念，作品中融合中国古典元素和音律，保留了最初的江湖气息，不论是歌词还是曲调都让人眼前一亮。</p ><p>GO$H & BRIDGE</p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516090549_4769_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p> 来自重庆的独立说唱厂牌 由重庆以及西南各地区的Rapper/Producer/Beatmaker/DJ等组成，</p ><p>前身为重庆Keep Real说唱团体 是重庆乃至西南地区最早的说唱团体之一，随着时间变迁 团队成员经历新老交替 在2012年成立GO$H厂牌。</p ><p>GO$H一直以来制造着中国西南纯正新鲜的Hiphop音乐 厂牌各成员风格多元 个性鲜明</p ><p>特别是近年全球Trap热潮来袭 团队成员将西南地区特色方言与时下流行的Trap相结合</p ><p>其强烈的风格与独特的腔调，不断的创造出炙手可热的热门单曲，成为中国说唱版图上不可或缺的重要组成部分。</p ><p>独一不二ONO&JIHU</p ><p><br></p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516162513_4124_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p> ONO MUSIC GROUP (獨壹不贰) 独立音乐厂牌于2016年9月在北京成立，ONO致力于打造融合HIP HOP、R&B、 流行电音的前沿音乐风格，音乐作品在拥有极高水准同时兼具时尚华丽的气质，给整个华语乐坛注入了一股独一不二的新鲜血液。</p ><p>MC HOT DOG 热狗</p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516184805_321_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p><br></p ><p> MC Hotdog是华语饶舌音乐的标志性人物，在对于中文嘻哈音乐的开拓上，被称为“台湾嘻哈教父”的他具有很大的奠基意义。而作为一个饶舌歌手，MC Hotdog从喷社会、喷偶像、喷教育、喷知音难寻的痞子唱上台面，签了大公司，凭《wake up》获金曲奖最 佳国语专辑，在台湾这块Hip-Hop依然非主流的土地上，做到这些事，他的故事是一部rapper的奋斗史，也是一个励志传奇。</p ><p>JONY J</p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516204048_6710_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p><br></p ><p> Jony J具有成熟精湛的舞台魅力，他在音乐上能够大胆的创新，他被称作为“嘻哈诗人”，他不仅实力出众，而且还有着扎实的说唱功底。Jony J在《中国有嘻哈》节目中，所演绎的歌曲《不用去猜》，不仅展现了流畅的flow，而且其游刃有余的表演也得到了现场观众的认可。虽然他本人很酷，但在节目里却莫名的撞脸黄渤。而在《中国有嘻哈》总决赛现场，Jony J则表现得很热血，展现了其作为年轻人的活力和态度。</p ><p>VAVA</p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516222833_323_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p><br></p ><p> VAVA是一个集作词、作曲、说唱、表演于一身的95后全能型女歌手，她有着国际范的美式说唱和性感的嗓音，她的词曲创作有着属于她这个年龄段随心所欲、狂傲不羁的气息。VAVA不只会创作，在情绪传达与舞台魅力的展现也是相当优秀，在较为阳刚的嘻哈饶舌群体中打开了女性独有的力与美。</p ><p>TY</p ><p><br></p ><p>< img src="http://static.228.cn/upload/Image/201710/1507516245725_3588_x.jpg" alt="剧照" height="337" width="600"></p ><p><br></p ><p> 说唱会馆代表人物之一，HipHop音乐文化起源早，时间久，会馆说唱歌手对于Hip Hop音乐的独特的理解和对音乐认真的态度乃至作品早已得到了全国听众以至海外知名音乐人、与广大歌迷的高度认可，音乐、视频作品目前累计点击率即将破亿。</p ><p>阵容持续升级，更有世界百大DJ加盟。持续关注我们，将为你揭晓更多撑爆你眼球的表演嘉宾</p >',
      //       showState: 2,
      //       saleStartDate: '2017-10-12',
      //       saleEndDate: '2017-11-30',
      //       refundDesc:
      //         '本项目为全国联网销售，与现场座位一一对应，具有时效性。任何退换票行为都将影响剧场方、项目主办方及其他观众的正当权益。如因个人特殊情况无法按时观看，还请自行处理，为观众带来不便，敬请谅解！',
      //       showDuration: '以演出现场为准',
      //       showEnterTime: '以场馆规定为准',
      //       orderLimitCount: '每单限购6张',
      //       childDesc: '1.2米以下儿童谢绝入场（儿童项目除外），1.2米以上儿童需持票入场。',
      //       showProvider: '友娱',
      //       createUserId: 7,
      //       isDeleted: 0,
      //       gmtCreate: '2017-10-12',
      //       gmtModified: '2017-10-13'
      //     },
      //     showItemUnitsDO: {
      //       id: 83,
      //       itemUnitsCode: 'SU201710120319628250',
      //       showItemsCode: 'SI201710121202185565',
      //       saledItemCount: 4,
      //       remainItemCount: 96,
      //       showItemPrice: 38000,
      //       ticketAreaName: '看台',
      //       isDeleted: 0,
      //       gmtCreate: 1507817333000,
      //       gmtModified: 1507864057000
      //     }
      //   }
      // }
      // this.orderInfo = Object.assign(
      //   {},
      //   data.module.showOrderDO,
      //   data.module.showItemsDO,
      //   data.module.showItemUnitsDO
      // )
    }
  },
  mounted() {
    window.addEventListener('popstate', e => {
      this.$router.replace({
        path: `/my-show`
      })
    })
  },
  components: {
    MHeader
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin';

.orderdtail-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  overflow: auto;
  background: $color-background;

  .titles {
    // margin-top: 2px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 300;
  }

  .head {
    padding: 14px;
    background: $color-background-l;
    margin-top: 52px;

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
          .order-title {
            line-height: 20px; // @include no-wrap();
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
  }

  .order-info {
    background: $color-background;
    padding: 10px 15px 15px;

    .order-item {
      overflow: hidden;
      background: $color-background-l;

      &.t {
        border-radius: 0 0 8px 8px;
        margin-bottom: 5px;
      }
      &.m {
        border-radius: 8px 8px 8px 8px;
        margin-bottom: 5px;
      }
      &.b {
        border-radius: 8px 8px 0 0;
      }

      .delivery {
        display: flex;
        padding: 15px;
        border-bottom: 1px solid $color-border;

        .lab {
          color: $color-text-d;
          font-size: $font-size-medium-x;
          padding-right: 26px;
        }

        .info {
          color: $color-text-ml;
          font-size: $font-size-small;
        }
      }

      .order-title {
        color: $color-text-d;
        font-size: $font-size-medium-x;
        padding: 17px 0 15px 15px;
        border-bottom: 1px solid $color-border;
      }

      .order-table {
        color: $color-text-ml;
        font-size: $font-size-small;
        padding: 15px 15px 17px 15px;
        border-bottom: 1px solid $color-border;

        p {
          height: 18px;
          line-height: 18px;

          &.address-row {
            display: flex;
            height: auto;

            .address-lab {
              flex: 0 0 24px;
            }

            .space {
              flex: 0 0 5px;
            }

            .address-detail {
              display: inline-block;
            }
          }
        }
      }

      .logistics {
        position: relative;
        padding: 15px 0 17px 15px;
        color: $color-text-ml;
        font-size: $font-size-small;

        .viewLogistics {
          position: absolute;
          right: -26px;
          top: 50%;
          transform: translate(-50%, -50%);
          padding: 7px 12px;
          height: 14px;
          font-size: 14px;
          @include font-gradient();
          @include border-line();
          // border: 1px solid transparent;
          // border-image-source: $color-gradient1;
          // border-image-slice: 1;
          // border-image-width: 1;
          border: 1px solid $color-theme-d;
          border-radius: 5px;
        }
      }

      .order-detail {
        padding: 15px;
        border-bottom: 1px solid $color-border;

        p {
          height: 18px;
          line-height: 18px;
          color: $color-text-ml;
          font-size: $font-size-small;

          span {
            float: right;

            &.hot {
              color: $color-theme-d;
            }
          }
        }
      }
    } // .order-title {
    //   height: 45px;
    //   line-height: 45px;
    //   font-size: $font-size-medium;
    //   color: $color-text-d;
    // }
    .space {
      padding: 0 6px;
    }
  }
}
</style>
