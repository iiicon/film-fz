<template>
  <div class="title">
    {{title}}</div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~common/scss/variable.scss";

.title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: $color-text-d;
  font-size: $font-size-medium-x;
  background: $color-background-l;
}
</style>

