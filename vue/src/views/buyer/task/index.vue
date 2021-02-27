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
        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="receiveOrder(scope.row.id)">接单</el-button>
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
        <el-form :model="form" label-width="80px">
          <el-col :span="12">
            <el-form-item label="店铺" :label-width="formLabelWidth">
              <el-input v-model="form.shopName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="网址" :label-width="formLabelWidth">
              <el-input v-model="form.link" autocomplete="off" />
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
            <el-form-item label="优惠券" :label-width="formLabelWidth">
              <el-input v-model="form.coupon" autocomplete="off" />
            </el-form-item>
            <el-form-item label="总金额" :label-width="formLabelWidth">
              <el-input v-model="form.total" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-table
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
                width="120"
              >
                <template slot-scope="scope">{{ scope.row.platform }}</template>
              </el-table-column>
              <el-table-column
                label="站点"
                width="120"
              >
                <template slot-scope="scope">{{ scope.row.site }}</template>
              </el-table-column>
              <el-table-column
                label="汇率"
                show-overflow-tooltip
              >
                <template slot-scope="scope">{{ scope.row.rate }}</template>
              </el-table-column>
              <el-table-column
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
import { getList, addList, delTask } from '@/api/task'
import { getRateList } from '@/api/rate'
import { mapGetters } from 'vuex'

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
      list: [
        {
          site: 'http://inner.ink',
          shop: '好吃点',
          key: '1',
          sku: 'sku',
          price: '99',
          rate: '1:2',
          commission: '3',
          total: '102',
          status: '1'
        }
      ],
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      totalSize: 1,
      totalPage: 1,
      form: {
        shopName: '',
        link: '',
        t_key: '',
        sku: '',
        price: '',
        total: '',
        coupon: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      multipleSelection: [],
      rateList: [],
      disabled: true
    }
  },
  computed: {
    ...mapGetters(['statusList', 'roleList', 'name'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('fetch', this.name)
      this.listLoading = false
      getList({
        username: this.name
      }).then(res => {
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
        shopName: '',
        link: '',
        t_key: '',
        sku: '',
        price: '',
        total: '',
        coupon: ''
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
      this.disabled = true
      this.dialogFormVisible = false
      const { id } = this.multipleSelection[0]
      addList({ ...this.form, username: this.name, rid: id, status: 1 }).then(res => {
        this.$message.success('操作成功')
        this.fetchData()
        console.log(res)
      })
    },
    receiveOrder(id) {
      console.log(id)
      delTask({ id: id }).then(res => {
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
      this.multipleSelection = val
      this.disabled = false
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.disabled = true
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
