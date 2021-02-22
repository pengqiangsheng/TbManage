<template>
  <div>
    <el-row class="button-wrapper">
      <el-col><el-button type="primary" >操作记录</el-button></el-col>
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
        <el-table-column label="余额" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
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
        <el-table-column class-name="status-col" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === -1" type="primary" @click="active(scope.row.id)">激活</el-button>
            <el-button v-if="scope.row.roles === 'shoper'" type="danger" @click="openTopUp(scope.row.username)">充值</el-button>
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
    <el-dialog title="充值" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号码" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, activeUser, topUp } from '@/api/user'
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
        'shoper': 'gray',
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
        username: '',
        money: '',
        order: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      loading: false
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
        username: '',
        money: '',
        order: ''
      }
    },
    openTopUp(username) {
      this.dialogFormVisible = true
      this.form = {
        username: username,
        money: 0,
        order: ''
      }
    },
    submit() {
      this.loading = true
      topUp({
        account: this.form.username,
        money: +this.form.money,
        order: this.form.order
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.$message.success('充值成功')
          this.dialogFormVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
        this.loading = false
      })
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
