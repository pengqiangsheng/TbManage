<template>
  <div class="dashboard-container">
    <div class="dashboard-text">支付宝: 图片1</div>
    <div class="dashboard-text">微信: 图片2</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
