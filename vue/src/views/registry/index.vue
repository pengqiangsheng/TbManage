<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          type="text"
          tabindex="1"
          autocomplete="new-password"
          maxlength="11"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          tabindex="2"
          maxlength="20"
          autocomplete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.confirmPwd"
          :type="passwordType"
          placeholder="请确认密码"
          tabindex="2"
          maxlength="20"
          autocomplete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="role">
        <el-select v-model="loginForm.role" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="loginForm.role === 2" prop="country">
        <el-select v-model="loginForm.country" placeholder="请选择国家">
          <el-option
            v-for="item in countryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-button :loading="loading" :disabled="disabled" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">立即注册</el-button>

      <div class="tips">
        <div>
          <span> 已有账号？</span>
          <span @click="goBack"><a>返回登录</a></span>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import { registry } from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validateConfirmPwd = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('与密码不一致'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        confirmPwd: '',
        roles: 'buyer',
        country: 1
      },
      options: [
        {
          value: 1,
          label: '卖家'
        },
        {
          value: 2,
          label: '买家'
        }
      ],
      countryOptions: [
        {
          value: 1,
          label: '中国'
        },
        {
          value: 2,
          label: '外国'
        }
      ],
      loginRules: {
        country: [{ required: true, trigger: 'change' }],
        role: [{ required: true, trigger: 'change' }],
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPwd: [{ required: true, trigger: 'change', validator: validateConfirmPwd }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      disabled: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    goBack() {
      this.$router.push('/login')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const { username, password, roles, country } = this.loginForm
          registry({ username: username.trim(), password: password, roles, country }).then(res => {
            if (res.code === 200) {
              this.$message.success('注册成功, 正在跳转登陆页面')
              setTimeout(() => {
                this.loading = false
                this.$router.push({ path: '/login' })
              }, 1000)
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.loading = false
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-select {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 120px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // span {
    //   &:first-of-type {
    //     margin-right: 16px;
    //   }
    // }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
