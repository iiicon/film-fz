<template>
  <div id="app">
    <!-- <m-header></m-header> -->
    <tab-footer class="tab"></tab-footer>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import MHeader from 'components/m-header/m-header'
import TabFooter from 'components/tab-footer/tab-footer'
export default {
  name: 'app',
  components: {
    // MHeader,
    TabFooter
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~common/scss/variable.scss";

#app {
  color: $color-text-d;
  background: $color-background;
}

.vc-switch {
  bottom: 100px!important;
}
</style>

