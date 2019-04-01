<template>
  <div>
    <top-bar></top-bar>
    <mt-swipe :auto="4000" class="banner-wrapper">
      <mt-swipe-item key="index" class="banner-item" v-for="(item, index) in bannerList" prevent="true" stopPropagation="true"><img class="banner" :src="item.posterUrl" alt=""></mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script type="text/ecmascript-6">
import TopBar from 'components/top-bar/top-bar'
import { gethotmovies, getBanners } from 'api/film'
import { mapGetters } from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui'

export default {
  data() {
    return {
      bannerList: []
    }
  },
  computed: {
    ...mapGetters([
      'currentCity'
    ])
  },
  created() {
    console.log(process.env.NODE_ENV)
    this._getBanners()
    this._getmovies(this.currentCity)
  },
  methods: {
    _getmovies(cityName) {
      gethotmovies(cityName).then((data) => {
        // console.log(data)
      })
    },
    _getBanners() {
      getBanners().then((data) => {
        if (data.success === true) {
          this.bannerList = data.module.list
        }
      })
    }
  },
  components: {
    TopBar,
    Swipe,
    SwipeItem
  }
}
</script>

<style lang="scss" scoped>
.banner-wrapper {
  width: 100%;
  height: 160px;
  positon: relative;
  overflow: hidden;
  .banner-item {
    overflow: hidden;
    .banner {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
