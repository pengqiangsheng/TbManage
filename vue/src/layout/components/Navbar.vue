<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="openModify">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="openAdmin">联系管理员</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="ruleForm.oldPwd" maxlength="20" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="ruleForm.newPwd" maxlength="20" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="ruleForm.confirmPwd" maxlength="20" type="password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPwd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="联系管理员"
      :visible.sync="showAdmin"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form label-width="100px">
        <el-form-item label="微信">
          <span>{{ adminInfo.wechat }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ adminInfo.email }}</span>
        </el-form-item>
        <el-form-item label="qq">
          <span>{{ adminInfo.qq }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { modifyPwd } from '@/api/user'
import { getAdminInfo } from '@/api/config'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const checkNewPwd = (rule, value, callback) => {
      if (value === this.ruleForm.oldPwd) {
        return callback(new Error('新密码不能与原密码一样'))
      } else {
        callback()
      }
    }
    const checkConfirmPwd = (rule, value, callback) => {
      if (value !== this.ruleForm.newPwd) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      showAdmin: false,
      options: 'www.inner.ink',
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      adminInfo: {
        email: '',
        wechat: '',
        qq: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { validator: checkNewPwd, trigger: 'change' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入', trigger: 'change' },
          { validator: checkConfirmPwd, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    openModify() {
      this.dialogVisible = true
      this.ruleForm = {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
    },
    modifyPwd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          modifyPwd({
            newPwd: this.ruleForm.newPwd
          }).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.logout()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openAdmin() {
      this.showAdmin = true
      getAdminInfo().then(res => {
        this.adminInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
