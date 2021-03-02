<template>
  <div>
    <el-row>
      <el-form :model="form" label-width="80px">
        <el-col :span="12">
          <div class="card-wrapper">
            <el-form-item label="银行卡号" :label-width="formLabelWidth">
              <el-input v-model="form.bankCardNo" autocomplete="off" @focus="showBtn = true" />
            </el-form-item>
            <el-form-item label="银行信息" :label-width="formLabelWidth">
              <el-input v-model="form.bankCardInfo" autocomplete="off" @focus="showBtn = true" />
            </el-form-item>
            <!-- <el-form-item label="头像url" :label-width="formLabelWidth">
              <el-input v-model="form.avatar" autocomplete="off" />
            </el-form-item> -->
            <div v-if="showBtn" class="btn-wrapper">
              <el-button type="primary" :disabled="btnDisabled" :loading="loading" @click="submit">提交</el-button>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInfo, updateBankInfo } from '@/api/user'

export default {
  data() {
    return {
      form: {
        bankCardNo: '',
        bankCardInfo: '',
        avatar: ''
      },
      formLabelWidth: '80px',
      disabled: true,
      btnDisabled: false,
      showBtn: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userObj'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getInfo().then(res => {
        this.form = res.data
      })
    },
    submit() {
      this.loading = true
      setTimeout(() => {
        updateBankInfo({
          bankCardNo: this.form.bankCardNo,
          bankCardInfo: this.form.bankCardInfo
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 1500)
    }
  }
}
</script>
<style lang="scss" scoped>
.card-wrapper {
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .btn-wrapper {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
