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
          <el-link type="primary" @click="registerDialog=!registerDialog">注册（已开放）</el-link>&nbsp;&nbsp;
          <el-link type="primary" :href="href">找回密码（关闭）</el-link>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="registerDialog" title="网站内测阶段">
      <div class="title">
        <p>注册</p>
      </div>
      用户名：<el-input v-model="registerUser" clearable placeholder="用户名"></el-input>
      密码：<el-input v-model="registerPassword" disabled clearable placeholder="系统生成"></el-input>
      邀请码：<el-input v-model="userAuth" clearable placeholder="邀请码"></el-input>
      <el-button @click="register()">注册</el-button>
    </el-dialog>
  </div>
</template>

<script>
import * as sysTool from '../common/systemTool';
import {register} from "../api/UserApi/User";

export default {
  name: 'Login',
  data() {
    return {
      href:'',
      loginInfo:{
        'userName': 'root',
        'userPasswd': '',
        'ip': '',
        'area': '',
        'brower': '',
        'os': '',
        'logintime':''
      },
      registerDialog:false,
      registerUser:"",
      registerPassword:"",
      userAuth:"",
      params: {},
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
          if(response.data!="false") {
            // 获取token，并存储在store中
            this.$store.state.Token.token = response.data
            //存储token在sessionStorage，浏览器页面签关闭即删除sessionStorage
            sessionStorage.setItem('token', response.data)
            this.$message.success("登录成功！")
            this.$router.push("/index")
          }else{
            this.$message.error("登录失败，请重试！")
          }
        },
        error=>{
          this.$message.error("登录失败，请重试！")
        })
      }
    },
    register(){
      if(!this.registerUser){
        this.$message.error("用户名为空！！！")
      }else if (!this.userAuth) {
        this.$message.error("邀请码为空！！！")
        }else{
        this.params.userName=this.registerUser
        this.params.beinviteauth=this.userAuth
        this.params.area=sessionStorage.getItem('area')
        let data = new Date()
        this.params.logintime=data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
        register(this.params).then(res=>{
          if(res.code===500) {
            this.$message.error(res.data)
          }
          if(res.code===200) {
            this.registerPassword=res.data
            console.log(res.data)
            this.$message.success("注册成功！！！")
          }
        })
      }
    }
  }
}
</script>


