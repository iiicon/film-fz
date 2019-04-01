<template>
  <div>
    <div class="showitem-wrapper" :class="[`gradient${(index)%4+1}`,{'filter':showEnd}]" v-for="(item, index) in showList" @click="showDetail(item.showCode, index)">
      <div class="icon"><img width="86" height="120" :src="item.showPosterUrl" alt=""></div>
      <div class="desc">
        <div class="top">
          <p class="title">{{item.showName}}</p>
          <p class="price">￥{{item.minTicketPrice/100}}-{{item.maxTicketPrice/100}}</p>
        </div>
        <div class="bottom">
          <p class="time">时间：{{showtime(item.showTime)}}</p>
          <p class="position">地点：{{item.showVenue}}</p>
          <p class="position" style="padding-left:36px">{{item.showProvince}}{{item.showCity}}{{item.showRegion}}</p>
        </div>
      </div>
      <div class="filter"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import moment from 'moment'
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    showList: {
      type: Array,
      default() {
        return []
      }
    },
    showEnd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    showtime(time) {
      return moment(time).format('YYYY-MM-DD H:mm:ss')
    },
    showDetail(code, i) {
      this.$router.push({
        path: `/show/${code}`
      })
      this.saveCurrentShow(code)
      this.saveCurrentId(i)
    },
    ...mapActions(['saveCurrentShow']),
    ...mapMutations({
      saveCurrentId: 'SET_CURRENT_ID'
    })
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin';

.showitem-wrapper {
  display: flex;
  height: 120px;
  margin-bottom: 8px;
  position: relative;

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

  &.filter {
    filter: grayscale(100%);
    background: $color-gradient-gray;
  }

  .icon {
    flex: 86px 0 0;
    font-size: 0;

    img {
    }
  }

  .desc {
    flex: 1;
    width: 0;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    color: $color-text;

    .top {
      flex: 42px 0 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      line-height: 20px;
      padding: 6px 6px 6px 0;
      border-bottom: 1px dashed $color-border-l;

      p {
        flex: 1;
        font-size: $font-size-medium;
      }
      .title {
        font-size: $font-size-medium;
        font-weight: bold;
        @include no-wrap();
      }
      .price {
        font-size: $font-size-small;
        color: $color-money;
        font-weight: bold;
      }
    }
    .bottom {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 6px 6px 6px 0;
      font-size: $font-size-small;
    }
  }
}
</style>
