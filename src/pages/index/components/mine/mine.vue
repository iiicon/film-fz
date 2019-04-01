<template>
  <div>
    <m-header :title="title" class="title"></m-header>
    <div id="frame_cinema" class="full discover">
      <div class="ul-list">
        <div id="item_my_film" @click="turnTo('my_film')"
             class="item_my_film mine-ul-list-item mine-ul-list-item-bottom">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_mymovie.png"/>
            <div class="mine-ul-list-item-middle">我的电影票</div>
          </div>
        </div>
        <div id="item_my_show" @click="turnTo('my_show')"
             class="item_my_show mine-ul-list-item mine-ul-list-item-bottom">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_show.png"/>
            <div class="mine-ul-list-item-middle">我的演出票</div>
          </div>
        </div>
        <div id="item_collect_film" @click="turnTo('collect_film')" class="mine-ul-list-item mine-ul-list-item-bottom">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_likemovie.png"/>
            <div class="mine-ul-list-item-middle">我收藏的电影</div>
          </div>
        </div>
        <div id="item_collect_cinema" @click="turnTo('collect_cinema')" class="mine-ul-list-item">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_likecimema.png"/>
            <div class="mine-ul-list-item-middle">我收藏的影院</div>
          </div>
        </div>
        <div style="clear:both"></div>
        <div id="item_collect_voucher" @click="turnTo('my_vouchers')" class="item_collect_voucher mine-ul-list-item">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_voucher.png"/>
            <div class="mine-ul-list-item-middle">我的优惠券</div>
          </div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="ul-list">
        <a id="item_kefu" class="item_kefu mine-ul-list-item" href=" tel:4001002071">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_customer.png"/>
            <div class="mine-ul-list-item-middle">客服</div>
          </div>
        </a>
        <div id="item_help" @click="turnTo('help')" class="item_help mine-ul-list-item">
          <div class="item-content">
            <img class="mine-ul-list-item-left" src="./mine_icon_help.png"/>
            <div class="mine-ul-list-item-middle">帮助中心</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'

  export default {
    components: {
      MHeader
    },
    data() {
      return {
        title: '我的'
      }
    },
    methods: {
      turnTo(type) {
        switch (type) {
          case 'my_show':
            this.$router.push({
              path: '/mine/show'
            })
            return
          default:
            window.location.href = `https://maxyoyu.com/html/${type}.html`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .title {
    font-size: 22px !important;
    font-weight: bold !important;
  }

  .ul-list {
    width: 100%;
    height: auto;
    .item_kefu, .item_help, .item_my_film, .item_my_show {
      margin-top: 8px;
    }
    .mine-ul-list-item-bottom {
      border-bottom: 1px solid #e5e5e5;
    }
    .mine-ul-list-item:nth-child(odd) {
      border-right: 1px solid #e5e5e5;
    }

    .mine-ul-list-item {
      box-sizing: border-box;
      width: 50%;
      background-color: white;
      padding: 27px 0;
      text-align: center;
      float: left;
      .item-content {
      }
      img {
        width: 51px;
        height: 51px;
        margin-bottom: 10px;
      }
    }
    .item_collect_voucher {
      border-right: 1px solid #e5e5e5;
    }
  }

</style>
