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
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="站点" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.site }}
          </template>
        </el-table-column>
        <el-table-column label="店铺" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.shop }}</span>
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
            <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
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
        <el-button type="primary" @click="newTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageComp from '@/components/pageComp/PageComp.vue'
import { getList, addList, delTask } from '@/api/table'
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
    newTask() {
      this.dialogFormVisible = false
      addList({ ...this.form, status: 1 }).then(res => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrapper {
  margin-bottom: 20px;
}
</style>
