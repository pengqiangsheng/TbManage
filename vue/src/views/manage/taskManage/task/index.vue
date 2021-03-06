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
        <el-table-column label="站点" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.site }}
          </template>
        </el-table-column>
        <el-table-column label="平台" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.platform }}</span>
          </template>
        </el-table-column>
        <el-table-column label="链接" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="店铺" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关键词" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.t_key }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="SKU" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="单价" width="100">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="汇率" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="佣金" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.commission }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="总金额" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="订单号" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="备注" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ typeHelper(scope.row.status, taskStatusList) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 4" type="primary" size="small" @click="openBuyerInfo(scope.row)">结算</el-button>
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
    <el-dialog title="刷手信息" width="400px" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-row>
        <el-form :model="form" label-width="80px">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.receiveName" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="银行卡号" :label-width="formLabelWidth">
            <el-input v-model="form.bankCardNo" disabled autocomplete="off" />
          </el-form-item>
          <el-form-item label="银行信息" :label-width="formLabelWidth">
            <el-input v-model="form.bankCardInfo" disabled autocomplete="off" />
          </el-form-item>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="complete">结算</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, addList, delTask, completeTask } from '@/api/task'
import { getRateList } from '@/api/rate'
import { mapGetters } from 'vuex'
import { typeHelper } from '@/utils'

export default {
  components: {
    PageComp
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      typeHelper: typeHelper,
      list: [],
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      totalPage: 0,
      form: {
        receiveName: '',
        bankCardInfo: '',
        bankCardNo: '',
        id: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      multipleSelection: [],
      rateList: [],
      disabled: true
    }
  },
  computed: {
    ...mapGetters(['statusList', 'roleList', 'name', 'taskStatusList'])
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
        },
        range: [1, 4]
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
    },
    newTask() {
      this.disabled = true
      this.dialogFormVisible = false
      const { id } = this.multipleSelection[0]
      addList({ ...this.form, username: this.name, rid: id, status: 1 }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
        console.log(res)
      })
    },
    del(id) {
      console.log(id)
      delTask({ id: id }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
        console.log(res)
      })
    },
    complete() {
      this.$confirm('确认结算完成?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        completeTask({ id: this.form.id }).then(res => {
          this.$message.success(res.msg)
          this.fetchData()
          this.dialogFormVisible = false
        })
      })
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$message.info('只能选择一个！')
        return this.clearSelection()
      }
      this.multipleSelection = val
      this.disabled = false
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.disabled = true
    },
    openBuyerInfo({ receiveName, id}) {
      this.form.receiveName = receiveName
      this.form.id = id
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
