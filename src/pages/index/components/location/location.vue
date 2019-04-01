<template>
  <transition name="slide">
    <div class="location-wrapper">
      <div class="location-header">
        重新定位
        <span class="icon" @click="back"></span>
      </div>
      <div class="search-wrapper">
        <search-box></search-box>
      </div>
      <div class="city-wrapper">
        <scroll class="city-view" :listenScroll="listenScroll" @scroll="scroll" :data="city" :probe-type="probeType" ref="city">
          <ul>
            <li :class="{'city-list':item.title.match(/[a-z,A-Z]/), 'current-city':!item.title.match(/[a-z,A-Z]/)}" v-for="item in city" ref="citylist">
              <div class="title">{{item.title}}</div>
              <div class="city-container">
                <div class="city-item" v-if="item.title !=='当前定位城市' " @click="select(i.name)" v-for="i in item.items">{{i.name}}</div>
                <div class="city-item" ref="currentCity" v-if="item.title ==='当前定位城市' ">{{currentCity}}</div>
                <div class="city-item right" v-if="item.title ==='当前定位城市' " @click="getLocation">重新定位</div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="list-shortcut">
        <ul>
          <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex===index}" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">{{item}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import { citylist } from 'common/js/citylist'
import { getData } from 'common/js/dom'
import { mapGetters, mapActions } from 'vuex'
import { showToast } from 'common/js/dialog'

const ANCHOR_HEIGHT = 16
const CURRENT_NAME = '当前定位城市'
const HOT_NAME = '热门城市'
const HOT_ITEMS = [
  {
    full: 'beijing',
    name: '北京',
    short: 'bj'
  },
  {
    full: 'shanghai',
    name: '上海',
    short: 'sh'
  },
  {
    full: 'guangzhou',
    name: '广州',
    short: 'gz'
  },
  {
    full: 'shenzhen',
    name: '深圳',
    short: 'sz'
  },
  {
    full: 'chengdu',
    name: '成都',
    short: 'cd'
  },
  {
    full: 'hangzhou',
    name: '杭州',
    short: 'hz'
  },
  {
    full: 'nanjing',
    name: '南京',
    short: 'nj'
  }
]

export default {
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      position: []
    }
  },
  created() {
    this.normalizeCity(citylist)
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  computed: {
    shortcutList() {
      return this.city.map((group) => {
        return group.title.substr(0, 2)
      })
    },
    ...mapGetters([
      'currentCity'
    ])
  },
  mounted() {
    this._calculateHeight()
  },
  methods: {
    getLocation() {
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
            if (rs.addressComponents && rs.addressComponents.city) {
              var addComp = rs.addressComponents
              if (addComp.city) {
                let city = addComp.city
                if (city.indexOf('市') > 0) {
                  city = city.slice(0, -1)
                }
                self.saveCurrentCity(city)
                setTimeout(() => {
                  self.$router.back()
                }, 500);
              }
            } else {
              showToast('定位失败，请手动定位！')
            }
          })
        }
        else {
          showToast('定位失败，请手动定位！')
          console.log('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
    },

    selectItem(item) {
      this.$emit('select', item)
    },
    select(name) {
      let self = this
      this.currentCity = name
      /* eslint-disable */
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(name, function(point) {
        if (point) {
          console.log(JSON.stringify(point))
          self.saveCurrentCity(name)
          showToast('定位成功')
          self.$router.back()
        } else {
          showToast('定位失败')
        }
      });
    },
    back() {
      this.$router.back()
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      this.scrollY = -this.listHeight[index]
      this.$refs.city.scrollToElement(this.$refs.citylist[index], 0)
    },
    _calculateHeight() {
      const list = this.$refs.citylist
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    normalizeCity(list) {
      let cityMap = {
        current: {
          title: CURRENT_NAME,
          items: []
        },
        hot: {
          title: HOT_NAME,
          items: HOT_ITEMS
        }
      }
      list.forEach((item, index) => {
        const key = item.prefix
        cityMap[key] = {
          title: key,
          items: item.list
        }
      })
      // 确保数组为有序列表，需要操作cityMap
      let current = []
      let hot = []
      let ret = []
      for (let key in cityMap) {
        let val = cityMap[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        } else if (val.title === CURRENT_NAME) {
          current.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      this.city = current.concat(hot).concat(ret)
    },
    ...mapActions([
      'saveCurrentCity'
    ])
  },
  watch: {
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          return
        }
      }
      // 当滚动到底部，且-newY大于元素的上限
      this.currentIndex = listHeight.length - 2
    },
    currentCity(newVal) {
      if (newVal) {
        this.city[0].items[0] = newVal
      }
    }
  },
  components: {
    Scroll,
    SearchBox
  }
}

</script>
<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.location-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(0, 100%, 0)
  }

  .location-header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: $color-background-l;
    color: $color-text-d;

    .icon {
      float: right;
      width: 16px;
      height: 44px;
      margin-right: 15px;
      @include bg-image('./icon_remove');
      @include bg-common()
    }
  }

  .city-wrapper {
    position: fixed;
    top: 94px;
    bottom: 0;
    z-index: -1;
    width: 100%;
    background: $color-background;
    .city-view {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: $color-background;
    }
    .current-city {

      .title {
        padding: 0 15px;
        height: 25px;
        line-height: 25px;
        font-size: $font-size-medium;
      }

      .city-container {
        overflow: hidden;
        padding: 15px 40px 17px 15px;
        background: $color-background-l;

        .city-item {
          float: left;
          position: relative;
          padding: 7px 12px;
          height: 14px;
          margin-right: 10px;
          margin-bottom: 10px;
          font-size: 14px;
          border: 1px solid #999999;
          border-radius: 5px;
          @include border-line();
          &.right {
            float: right;
          }
        }
      }
    }

    .city-list {

      .title {
        height: 20px;
        line-height: 20px;
        padding-left: 30px;
      }
      .city-container {
        letter-spacing: 1px;
        font-size: 14px;

        .city-item {
          padding: 8px 30px;
          background: $color-background-l;
          @include border-1px(#e5e5e5)
        }
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 15px;
    top: 66%;
    transform: translateY(-50%);
    width: 30px;
    padding: 20px 0;

    .item {
      padding: 2px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      text-align: center;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>

