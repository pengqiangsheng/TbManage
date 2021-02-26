<template>
  <div>
    <el-row class="button-wrapper">
      <el-col>
        <el-button type="primary" @click="open">充值申请</el-button>
      </el-col>
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
        <el-table-column label="订单号" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.order }}
          </template>
        </el-table-column>
        <el-table-column label="平台" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.platform }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rechargeMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isCheck | statusFilter">{{ typeHelper(scope.row.isCheck, checkList) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="到账时间" min-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.updateTime | timeFilter }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="appeal(scope.row.id)">申诉</el-button>
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
    <el-dialog title="充值申请" :width="'400px'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="充值金额" :label-width="formLabelWidth">
          <el-input v-model="form.rechargeMoney" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号码" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off" />
        </el-form-item>
        <el-form-item label="充值平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择充值平台">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { getBillList, billApply } from '@/api/bill'
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
        '0': 'gray'
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
      totalSize: 1,
      totalPage: 1,
      form: {
        rechargeMoney: '',
        order: '',
        platform: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      loading: false,
      checkList: {
        1: '通过',
        0: '审核中'
      },
      options: [
        {
          value: 'alipay',
          label: '支付宝'
        },
        {
          value: 'wechat',
          label: '微信'
        }
      ]
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
      this.listLoading = false
      getBillList({
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
        rechargeMoney: '',
        order: '',
        platform: ''
      }
    },
    submit() {
      this.loading = true
      billApply({
        username: this.name,
        rechargeMoney: +this.form.rechargeMoney,
        order: this.form.order,
        platform: this.form.platform
      }).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.$message.success('操作成功')
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
    appeal(id) {
      console.log(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
