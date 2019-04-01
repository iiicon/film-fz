<template>
  <div>
    <m-header :title="title" class="title"></m-header>
    <div class="show-item-wrapper">
      <!-- <show-item v-for="n in arr" class="item" :class="gradient(n)" @click="showDetail"></show-item> -->
      <show-item :showList="showActiveList" class="item"></show-item>
      <show-item :showList="showEndList" :showEnd="showEnd" class="item"></show-item>
      <div class="space"></div>
      <!-- <div class="login" @click="_dologin">登录测试</div> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import ShowItem from 'components/show-item/show-item'
import { getshowitems } from 'api/show'

export default {
  data() {
    return {
      title: '演出',
      showList: [],
      showActiveList: [],
      showEndList: [],
      pageSize: 50,
      pageNum: 1,
      showEnd: true
    }
  },
  computed: {
  },
  created() {
    this._getshowitems()
  },
  methods: {
    gradient(n) {
      return `gradient${n}`
    },
    _getshowitems() {
      getshowitems(this.pageSize, this.pageNum).then((data) => {
        if (data.success) {
          console.log(data.module)
          this.showList = data.module
          this._normalize(this.showList)
        }
      })
    },
    _normalize(showlist) {
      showlist.forEach((item) => {
        if (item.showState === 2) {
          this.showActiveList.push(item)
        } else {
          this.showEndList.push(item)
        }
      })
    },
    _dologin() {
      this.$router.push({
        path: `/login`
      })
    }
  },
  components: {
    MHeader,
    ShowItem
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.show-item-wrapper {
  margin-top: 44px;
  padding: 10px 16px;
  background: $color-background;

  .space {
    height: 50px;
  }
}

.title {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}

.login {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: $color-theme;
  background: $color-background-l;
  margin: 20px;
}
</style>
