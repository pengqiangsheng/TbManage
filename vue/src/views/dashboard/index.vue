<template>
  <div class="dashboard-container">
    <div class="dashboard-text">账号: {{ name }}</div>
    <div class="dashboard-text">余额: {{ userObj.money }}</div>
    <div class="dashboard-text">角色: {{ userObj.roles }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'userObj'
    ])
  },
  mounted() {
    this.$store.dispatch('user/getInfo')
  }
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
