<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" />
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入城市名、拼音或者字母查询'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  },
  created() {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.search-box {
  display: flex;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 15px 10px;
  height: 50px;
  background: $color-background-l;
  .icon-search {
    position: absolute;
    left: 34px;
    top: 55%;
    transform: translate3d(0, -50%, 0);
    display: inline-block;
    width: 14px;
    height: 14px;
    @include bg-image('./icon_search2');
    @include bg-common();
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 25px;
    border-radius: 12px;
    padding-left: 40px;
    background: $color-background;
    color: $color-text-d;
    font-size: $font-size-medium;
    outline: none;
    &::placeholder {
      color: $color-text-l;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>