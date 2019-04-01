<template>
  <div class="tab">
    <a tag="div" class="tab-item" :href="`${baseURL}/index.html#film`">
      <div class="tab-img movie"></div>
      <span class="tab-link">电影</span>
    </a>
    <router-link tag="div" class="tab-item" to="/show">
      <div class="tab-img show"></div>
      <span class="tab-link">演出</span>
    </router-link>
    <a tag="div" class="tab-item" :href="`${baseURL}/index.html#discover`">
      <div class="tab-img discover"></div>
      <span class="tab-link">发现</span>
    </a>
    <a tag="div" class="tab-item" :href="`${baseURL}/index.html#mine`">
      <div class="tab-img mine"></div>
      <span class="tab-link">我的</span>
    </a>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  created() {
  },
  computed: {
    baseURL() {
      return window.location.origin
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.tab {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  margin-bottom: -1px;
  line-height: 50px;
  font-size: $font-size-small;
  background: $color-background-l;
  z-index: 50;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      display: block;
      height: 26px;
      line-height: 26px;
      color: $color-text-ml;
    }

    .tab-img {
      font-size: 0;
      height: 24px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;

      &.movie {
        @include bg-image("./film-normal");
      }
      &.show {
        @include bg-image("./show-normal");
      }
      &.discover {
        @include bg-image("./discover-normal");
      }
      &.mine {
        @include bg-image("./my-normal");
      }
    }

    &.router-link-active {
      .tab-link {
        color: $color-theme;
      }
      .movie {
        @include bg-image("./film-active");
      }
      .show {
        @include bg-image("./show-active");
      }
      .discover {
        @include bg-image("./discover-active");
      }
      .mine {
        @include bg-image("./my-active");
      }
    }
  }
}
</style>
