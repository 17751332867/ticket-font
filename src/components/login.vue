<template>
    <div class="login_container">
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png">
        </div>
        <el-form label-width="0px" class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btns" @click="login">登录</el-button>
            <el-button type="info" class="btns"  @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名在3到10位之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 15, message: '用户名在6到15位之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const result = await this.$http.post('login', this.loginForm)
        if (result.data.meta.status !== 200) return this.$message.error('登录错误')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', result.data.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  .avatar_box{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 130px;
    width: 130px;
    border: solid 1px #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: inline-flex;
  justify-content: flex-end;
}
</style>
