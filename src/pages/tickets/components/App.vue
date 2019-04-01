<template>
  <div id="app">
    <guidance></guidance>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'Tcomponents/m-header/m-header'
import Guidance from 'Tcomponents/guidance/guidance'

export default {
  name: 'app',
  components: {
    MHeader,
    Guidance
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~common/scss/variable.scss";

#app {
  color: $color-text-d;
}
</style>

