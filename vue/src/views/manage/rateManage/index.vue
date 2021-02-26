<template>
  <div>
    <el-row class="button-wrapper">
      <el-col><el-button type="primary" @click="open">新建汇率</el-button></el-col>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        height="500"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="平台" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.platform }}
          </template>
        </el-table-column>
        <el-table-column label="站点" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.site }}
          </template>
        </el-table-column>
        <el-table-column label="汇率" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="佣金" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.commission }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="delRate(scope.row.id)">删除</el-button>
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
    <el-dialog title="新增汇率" width="400px" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="60px">
        <el-form-item label="平台">
          <el-input v-model="form.platform" autocomplete="off" />
        </el-form-item>
        <el-form-item label="站点">
          <el-input v-model="form.site" autocomplete="off" />
        </el-form-item>
        <el-form-item label="汇率">
          <el-input v-model="form.rate" autocomplete="off" />
        </el-form-item>
        <el-form-item label="佣金">
          <el-input v-model="form.commission" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getRateList, addRate, delRate } from '@/api/rate'
import { typeHelper } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageComp
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '-1': 'gray',
        '0': 'danger'
      }
      return statusMap[status]
    },
    roleFilter(role) {
      const statusMap = {
        '0': 'success',
        '1': 'gray',
        '2': 'info'
      }
      return statusMap[role]
    }
  },
  data() {
    return {
      typeHelper: typeHelper,
      list: [],
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      totalSize: 1,
      totalPage: 1,
      form: {
        site: '',
        platform: '',
        rate: '',
        commission: ''
      },
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters(['statusList', 'roleList'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getRateList().then(res => {
        console.log(res)
        this.list = res.data.list
      })
    },
    pageNumAccept() {
      console.log('11')
    },
    pageSizeAccept() {
      console.log('11')
    },
    open() {
      this.dialogFormVisible = true
      this.form = {
        site: '',
        platform: '',
        rate: '',
        commission: ''
      }
    },
    submit() {
      this.dialogFormVisible = false
      addRate({
        platform: this.form.platform,
        site: this.form.site,
        rate: this.form.rate,
        commission: this.form.commission
      }).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.fetchData()
        }
      })
    },
    delRate(id) {
      delRate({ id }).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.fetchData()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
