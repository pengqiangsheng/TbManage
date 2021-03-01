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
        <el-table-column label="站点" min-width="120" align="center">
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
          <template slot="header">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              content="单价为当地货币"
            >
              <span slot="reference"><span>单价</span><i class="el-icon-warning-outline" /></span>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column class-name="status-col" label="汇率" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column> -->
        <el-table-column class-name="status-col" label="佣金 RMB" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.commission }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="总金额 RMB" width="110" align="center">
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
        <el-table-column class-name="status-col" fixed="right" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 2" type="primary" size="small" @click="open(scope.row.id)">完成</el-button>
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
    <el-dialog title="订单信息" width="600px" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单号" :label-width="formLabelWidth" prop="orderNumber">
          <el-input v-model="form.orderNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="completeOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, completeTask } from '@/api/task'
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
        orderNumber: '',
        remark: ''
      },
      rules: {
        orderNumber: [{ required: true, message: '请输入订单号', trigger: 'blur' }]
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      multipleSelection: [],
      rateList: []
    }
  },
  computed: {
    ...mapGetters(['taskStatusList', 'name'])
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
        range: [2, 4]
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
    open(id) {
      this.dialogFormVisible = true
      this.form = {
        orderNumber: '',
        remark: '',
        id: id
      }
    },
    completeOrder() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          completeTask({
            id: this.form.id,
            remark: this.form.remark,
            orderNumber: this.form.orderNumber
          }).then(res => {
            this.$message.success(res.msg)
            this.dialogFormVisible = false
            this.fetchData()
          })
        } else {
          console.log('error submit!!')
          return false
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
