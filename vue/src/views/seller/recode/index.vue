<template>
  <div>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        height="550"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="内容" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
      </el-table>
      <page-comp
        :total-page="totalPage"
        :page-size="pageSize"
        :total-size="totalSize"
        :page-num="pageNum"
        @pageNum="pageNumAccept"
        @pageSize="pageSizeAccept"
      />
    </el-row>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList } from '@/api/log'

export default {
  components: {
    PageComp
  },
  data() {
    return {
      list: [],
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      totalPage: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getList({
        pageObj: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          totalSize: this.totalSize,
          totalPage: this.totalPage
        }
      }).then(res => {
        const { list, pageObj } = res.data
        this.totalSize = pageObj.totalSize
        this.totalPage = pageObj.totalPage
        this.list = list
      })
    },
    pageNumAccept(val) {
      this.pageNum = val
      this.fetchData()
    },
    pageSizeAccept(val) {
      this.pageNum = 1
      this.pageSize = val
      this.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
