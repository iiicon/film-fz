<template>
  <div v-if="!!content" class="about-wrapper" ref="insert" v-html="content">
    演出票图文详情页
  </div>
</template>
<script type="text/ecmascript-6">
  import {getshowitemsdetail} from 'api/show'
  import {contentCss, detailHead} from './detailConfig'

  export default {
    async mounted() {
      this.content = await this._getshowitemsdetail()
    },
    data() {
      return {
        content: ''
      }
    },
    methods: {
      async _getshowitemsdetail() {
        const res = await getshowitemsdetail(this.$store.getters.currentShow)
        return this.addCss(this.addHead(res.module.showDetail))
      },
      addCss(detail) {
        return `${contentCss}${detail}`
      },
      addHead(detail) {
        return `${detailHead}${detail}`
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .about-wrapper {
    position: fixed;
    top: 52px;
    bottom: 0;
    width: 100%;
    z-index: 50;
    overflow: auto;
    background: white;
    padding-bottom: 30px;
  }
</style>
