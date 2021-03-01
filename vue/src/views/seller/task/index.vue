<template>
  <div>
    <el-row class="button-wrapper">
      <el-col>
        <el-button type="primary" @click="open">新建任务</el-button>
        <el-button type="danger" @click="handleMutilDel">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="delMultipleTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        height="550"
        border
        fit
        highlight-current-row
        @selection-change="handleMutilDelSelection"
      >
        <el-table-column
          fixed="left"
          type="selection"
          width="55"
          align="center"
        />
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
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="汇率" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
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
            <el-button v-if="scope.row.status === 1" type="primary" size="small" @click="del(scope.row)">删除</el-button>
            <el-button v-if="scope.row.status === 3" type="primary" size="small" @click="complete(scope.row.id)">确认完成</el-button>
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
    <el-dialog title="任务信息" width="600px" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-row>
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
          <el-col :span="11">
            <el-form-item label="店铺" :label-width="formLabelWidth">
              <el-input v-model="form.shopName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="key" :label-width="formLabelWidth">
              <el-input v-model="form.t_key" autocomplete="off" />
            </el-form-item>
            <el-form-item label="sku" :label-width="formLabelWidth">
              <el-input v-model="form.sku" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
              <el-row>
                <el-col :span="3">
                  <el-popover
                    placement="top-start"
                    width="220"
                    trigger="hover"
                    content="单价的货币为当地货币，总金额会自动计算为人民币"
                  >
                    <i slot="reference" class="el-icon-warning-outline" />
                  </el-popover>
                </el-col>
                <el-col :span="21">
                  <el-input v-model="form.price" autocomplete="off" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth" prop="number">
              <el-input-number v-model="form.number" :min="1" :max="10" @change="handleChange" />
            </el-form-item>
            <el-form-item label="优惠券" :label-width="formLabelWidth">
              <el-input v-model="form.coupon" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="网址" :label-width="'120px'" prop="link">
              <el-input v-model="form.link" autocomplete="off" />
            </el-form-item>
            <el-form-item label="单任务总金额" :label-width="'120px'">
              <el-input v-model="form.total" disabled autocomplete="off" />
            </el-form-item>
            <el-form-item label="总共扣费" :label-width="'120px'">
              <el-input v-model="form.allTotal" disabled autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-table
              v-if="showTable"
              ref="multipleTable"
              :data="rateList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                label="平台"
                min-width="120"
              >
                <template slot-scope="scope">{{ scope.row.platform }}</template>
              </el-table-column>
              <el-table-column
                label="站点"
                min-width="120"
              >
                <template slot-scope="scope">{{ scope.row.site }}</template>
              </el-table-column>
              <el-table-column
                min-width="120"
                label="汇率"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.rate }}</template>
              </el-table-column>
              <el-table-column
                min-width="120"
                label="佣金"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.commission }}</template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="disabled" @click="newTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, addList, delTask, completeTask, mutilDelTask } from '@/api/task'
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
      rules: {
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        link: [{ required: true, message: '请输入网址', trigger: 'blur' }],
        number: [{ required: true, message: '请输入网址', trigger: 'blur' }]
      },
      list: [],
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      totalPage: 0,
      form: {
        shopName: '',
        link: '',
        t_key: '',
        sku: '',
        price: 0,
        total: 0,
        coupon: '',
        number: 1,
        allTotal: 0
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      multipleSelection: [],
      mutiDelSelection: [],
      rateList: [],
      disabled: true,
      showTable: true
    }
  },
  computed: {
    ...mapGetters(['statusList', 'roleList', 'name', 'taskStatusList'])
  },
  watch: {
    'form.price': function(val) {
      // this.showTable = val ? 1 : 0
      // if (!val) {
      //   this.disabled = true
      // }
      this.calculate(val)
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
        },
        range: [1, 1]
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
    open() {
      this.disabled = true
      this.dialogFormVisible = true
      this.form = {
        shopName: '',
        link: '',
        t_key: '',
        sku: '',
        price: '',
        total: '',
        coupon: '',
        number: 1,
        allTotal: 0
      }
      getRateList().then(res => {
        if (res.code === 200) {
          this.rateList = res.data.list
        } else {
          this.$message.error('系统出错')
        }
      })
    },
    newTask() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { id: rid } = this.multipleSelection[0]
          addList({
            taskInfo: {
              coupon: this.form.coupon,
              link: this.form.link,
              price: this.form.price,
              shopName: this.form.shopName,
              sku: this.form.sku,
              t_key: this.form.t_key,
              total: this.form.total,
              username: this.name,
              rid: rid,
              status: 1
            },
            taskNumber: this.form.number
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
    },
    del({ id, total }) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTask({ id: id, total: total }).then(res => {
          this.$message.success(res.msg)
          this.fetchData()
        })
      })
    },
    complete(id) {
      completeTask({ id: id }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
        console.log(res)
      })
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$message.info('只能选择一个！')
        return this.clearSelection()
      }
      if (!val.length) {
        return this.clearSelection()
      }
      this.multipleSelection = val
      if (val.length) {
        this.disabled = false
        this.calculate(this.form.price)
      }
    },
    calculate(val) {
      if (!val) {
        this.$refs.multipleTable && this.clearSelection()
        return
      }
      if (!this.multipleSelection.length) {
        this.$refs.multipleTable && this.clearSelection()
        return
      }
      this.form.singlePrice = (parseFloat(val) / parseFloat(this.multipleSelection[0].rate) +
        parseFloat(this.multipleSelection[0].commission)).toFixed(6)
      this.form.allTotal = this.form.singlePrice * this.form.number
      this.form.total = this.form.singlePrice
    },
    handleChange(value) {
      this.form.total = this.form.singlePrice
      this.form.allTotal = this.form.singlePrice * value
    },
    clearSelection() {
      this.disabled = true
      this.form.singlePrice = 0
      this.form.total = 0
      this.form.allTotal = 0
      this.multipleSelection = []
      this.$refs.multipleTable.clearSelection()
    },
    handleMutilDelSelection(val) {
      this.mutiDelSelection = val
      console.log(val)
    },
    handleMutilDel() {
      if (!this.mutiDelSelection.length) {
        return this.$message.info('至少选择一个')
      }
      const ids = []
      const totals = []
      this.mutiDelSelection.forEach(row => {
        ids.push(row.id)
        totals.push(row.total)
      })
      mutilDelTask({
        ids: ids,
        totals: totals
      }).then(res => {
        if (res.code === 200) {
          const { length } = res.data
          if (ids.length === length) {
            this.$message.success('批量删除操作成功')
          } else {
            this.$message.success(`成功批量删除${length}条任务，有${ids.length - length}条任务删除失败，失败原因：已被接单`)
          }
          this.mutiDelSelection = []
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
.el-input-number {
  width: 100%;
}
</style>
