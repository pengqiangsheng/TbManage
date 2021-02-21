<template>
  <div>
    <el-row class="button-wrapper">
      <el-col><el-button type="primary" @click="open">新建任务</el-button></el-col>
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
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="密码" min-width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="国家" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.country }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="角色" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.roles | roleFilter">{{ typeHelper(scope.row.roles, roleList) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ typeHelper(scope.row.status, statusList) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === -1" type="primary" @click="active(scope.row.id)">激活</el-button>
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
    <el-dialog title="任务信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-row>
        <el-form :model="form" label-width="80px">
          <el-col :span="12">
            <el-form-item label="店铺" :label-width="formLabelWidth">
              <el-input v-model="form.shop" autocomplete="off" />
            </el-form-item>
            <el-form-item label="网址" :label-width="formLabelWidth">
              <el-input v-model="form.site" autocomplete="off" />
            </el-form-item>
            <el-form-item label="key" :label-width="formLabelWidth">
              <el-input v-model="form.t_key" autocomplete="off" />
            </el-form-item>
            <el-form-item label="sku" :label-width="formLabelWidth">
              <el-input v-model="form.sku" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="汇率" :label-width="formLabelWidth">
              <el-input v-model="form.rate" autocomplete="off" />
            </el-form-item>
            <el-form-item label="佣金" :label-width="formLabelWidth">
              <el-input v-model="form.commission" autocomplete="off" />
            </el-form-item>
            <el-form-item label="总金额" :label-width="formLabelWidth">
              <el-input v-model="form.total" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, activeUser } from '@/api/user'
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
        'admin': 'success',
        'shop': 'gray',
        'buyer': 'info'
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
      formLabelWidth: '80px',
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
    },
    active(id) {
      console.log(id)
      activeUser({ id: id }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
        console.log(res)
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
