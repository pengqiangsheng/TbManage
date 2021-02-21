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
        <el-table-column label="用户" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="余额" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.country }}
          </template>
        </el-table-column>
        <el-table-column label="金额" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.country }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ typeHelper(scope.row.status, statusList) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === -1" type="primary">按钮</el-button>
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
    <el-dialog title="汇率信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="60px">
        <el-form-item label="站点">
          <el-input v-model="form.shop" autocomplete="off" />
        </el-form-item>
        <el-form-item label="汇率">
          <el-input v-model="form.site" autocomplete="off" />
        </el-form-item>
        <el-form-item label="佣金">
          <el-input v-model="form.t_key" autocomplete="off" />
        </el-form-item>
        <el-form-item label="平台">
          <el-input v-model="form.sku" autocomplete="off" />
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
import { getList } from '@/api/user'
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
        shop: '',
        t_key: '',
        sku: '',
        price: '',
        rate: '',
        commission: '',
        total: '',
        status: ''
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
      getList().then(res => {
        console.log(res)
        this.list = res.data
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
        shop: '',
        t_key: '',
        sku: '',
        price: '',
        rate: '',
        commission: '',
        total: '',
        status: ''
      }
    },
    submit() {
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
