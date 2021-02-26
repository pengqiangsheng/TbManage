<template>
  <div class="pageWrap">
    <el-pagination
      :page-sizes="[10,20,50,100]"
      :page-count="totalPage"
      :page-size="pageSize"
      :current-page="pageNum"
      :total="totalSize"
      layout="total, sizes,prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleNumChange"
    />
    <div class="page-btn">
      <el-button
        type="primary"
        size="mini"
      >跳转</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageComp',
  props: {
    'totalPage': { // 总页数
      type: Number,
      default: 0
    },
    'pageSize': { // 页面大小
      type: Number,
      default: 0
    },
    'totalSize': { // 当前页面大小
      type: Number,
      default: 0
    },
    'pageNum': { // 当前页面
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSize', val)
    },
    handleNumChange(val) {
      this.$emit('pageNum', val)
    }
  }
}
</script>

<style lang="scss">
.pageWrap {
  width: 100%;
  height: 28px;
  margin-top: 10px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  .page-btn {
    margin-top: 2px;
  }
}
</style>
