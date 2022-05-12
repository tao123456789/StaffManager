<template>
  <div>
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="loginInfo.userName" clearable placeholder="用户名"></el-input>
        <el-input v-model="loginInfo.userPasswd" clearable show-password placeholder="密码"></el-input>
        <div class="content_button">
          <el-button type="primary" @click="SignIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as sysTool from '../common/systemTool';

export default {
  name: 'Login',
  data() {
    return {
      loginInfo:{
        'userName': 'root',
        'userPasswd': '123456',
        'ip': '',
        'area': '',
        'brower': '',
        'os': '',
        'logintime':''
      }
    }
  },
  methods: {
    SignIn() {
      if (!this.loginInfo.userName || !this.loginInfo.userPasswd) {
        this.$notify.error({
          title: '错误',
          message: '用户名或密码不能为空'
        });
      } else {
        //登录获取token
        // 获取用户本地登录信息
        this.loginInfo.ip = sessionStorage.getItem('ip')
        this.loginInfo.area = sessionStorage.getItem('area')
        this.loginInfo.brower = sysTool.GetCurrentBrowser()
        this.loginInfo.os = sysTool.GetOs()
        //window.Date()
        let data = new Date()
        this.loginInfo.logintime = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
        this.$axios.post('/api/login', JSON.stringify(this.loginInfo), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          // 获取token，并存储在store中
            this.$store.state.Token.token = response.data
            //存储token在sessionStorage，浏览器页面签关闭即删除sessionStorage
            sessionStorage.setItem('token', response.data)
            this.$message.success("登录成功！")
            this.$router.push("/index")
        },
        error=>{
          this.$message.error("登录失败，请重试！")
        })
      }
    }
  }
}
</script>


