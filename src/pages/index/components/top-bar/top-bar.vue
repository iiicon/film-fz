<template>
  <div>
    <div class="topbar-wrapper">
      <router-link tag="div" class="location-wrapper" to="/location">
        <span class="font" ref="currentCity">{{currentCity}}</span>
        <span class="icon"></span>
      </router-link>
      <div class="switches-wrapper">
        <div class="swith-item border-radius-right" :class="{'active': disTag === 'film'}" @click="switches('film')">影片</div>
        <div class="swith-item border-radius-left" :class="{'active': disTag === 'cinema'}" @click="switches('cinema')">影院</div>
      </div>
      <div class="icon-wrapper">
        <span class="filter-icon" v-show="disTag === 'cinema'"></span>
        <span class="search-icon"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { showToast } from 'common/js/dialog'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      disTag: 'film'
    }
  },
  computed: {
    ...mapGetters([
      'currentCity'
    ])
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    switches(tag) {
      if (tag === 'film') {
        this.disTag = 'film'
      }
      if (tag === 'cinema') {
        this.disTag = 'cinema'
      }
    },
    getLocation() {
      if (this.currentCity && this.currentCity !== null) {
        return
      }
      let self = this
      self.saveCurrentCity('定位中...')
      /* eslint-disable */
      var geolocation = new BMap.Geolocation()

      // 获取定位坐标
      geolocation.getCurrentPosition(function(r) {
        /* eslint-disable */
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          console.log('经度：' + r.point.lng + '纬度：' + r.point.lat)
          showToast('定位成功')

          // 通过坐标获取对应城市信息
          var geoc = new BMap.Geocoder()
          var pos = this.position
          geoc.getLocation(r.point, (rs) => {
            var addComp = rs.addressComponents
            if (addComp.city) {
              let city = addComp.city
              if (city.indexOf('市') > 0) {
                city = city.slice(0, -1)
              }
              self.saveCurrentCity(city)
            }
          })
        }
        else {
          showToast('定位失败，请手动定位！')
          console.log('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
    },
    ...mapActions([
      'saveCurrentCity'
    ])
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.topbar-wrapper {
  position: relative;
  padding: 9px 15px;
  height: 26px;

  .location-wrapper {
    position: absolute;
    left: 15px;
    top: 9px;

    .font {
      display: inline-block;
      vertical-align: top;
      margin: 0 5px 0 0;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      color: $color-text-l;
    }

    .icon {
      display: inline-block;
      vertical-align: top;
      width: 10px;
      height: 26px;
      line-height: 26px;
      @include bg-image("./icon_more1");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }
  .switches-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 9px;
    height: 26px;
    font-size: 0;

    .swith-item {
      display: inline-block;
      width: 70px;
      height: 100%;
      line-height: 26px;
      background: $color-background-l;
      font-size: $font-size-medium-x;
      color: $color-text-d;
      text-align: center;
      letter-spacing: 5px;

      &.active {
        background: linear-gradient(to right, #8156dd, #5381de);
        color: $color-text;
      }
    }
  }

  .icon-wrapper {
    position: absolute;
    right: 15px;
    top: 9px;
    height: 26px;

    .filter-icon {
      display: inline-block;
      width: 17px;
      height: 26px;
      margin-right: 15px;
      background: url('./filter@2-normal.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }

    .search-icon {
      display: inline-block;
      width: 17px;
      height: 26px;
      background: url('./search.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }
}
</style>

