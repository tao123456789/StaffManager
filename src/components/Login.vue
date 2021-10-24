<template>
  <div>
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="user.userName" clearable placeholder="用户名"></el-input>
        <el-input v-model="user.userPasswd" clearable show-password placeholder="密码"></el-input>
        <div class="content_button">
          <el-button type="primary" @click="SignIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as sysTool from '../assets/systemTool';
export default {
  name: 'Login',
  data() {
    return {
      user:{
        // 'id':'',
        'userName': 'root',
        'userPasswd': '123456',
        // 'RealName'  :'',
      },
      getUseInfo:{
        'ip': '',
        'area': '北京市',
        'brower': 'chrome',
        'os': 'windows7'
      },
    }
  },
  methods: {
    SignIn() {
      let user = this.user;
      if (user.username) {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空'
        });
      } else if (user.password) {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
      } else {
        //登录获取token
          this.$axios.post('/api/getToken',JSON.stringify(this.user),{
            headers:{
              'Content-Type':'application/json'
            }}).then(response=>{
              // 获取登录信息
              this.$store.state.Token.token = response.data
              this.$axios.get('/api/user/getUser/'+this.user.userName).then(response=>{
                this.$store.state.Token.userID=response.data.id
                console.log("获取用户ID："+this.$store.state.Token.userID)
              })
              // 获取用户登录信息
              this.getUseInfo.ip= sessionStorage.getItem('ip')
              this.getUseInfo.area = sessionStorage.getItem('area')
              this.getUseInfo.brower = sysTool.GetCurrentBrowser()
              this.getUseInfo.os = sysTool.GetOs()
              console.log('ip地址：',  this.getUseInfo.ip, '地区：',this.getUseInfo.area,'浏览器：',this.getUseInfo.brower,'操作系统：' ,this.getUseInfo.os)
              this.$axios.post('/api/user/postLoginInfo'+this.getUseInfo).then(response=>{
                console.log("同步登录信息成功！")
              },
              error=>{
                console.log("同步登录信息失败！")
              })
              // 登录成功提示
              this.$message({
                message: '欢迎',
                type: 'success'
              });
              // 登录成功跳转
              this.$router.push("/homepage")
            },
            error=>{
              this.$message({
                message:error,
                type:'error'
              })
            }
          )
        }

        // 前端定时任务
        // setTimeout(() => {
        //   this.$notify({
        //     title: '没得办法就这一页',
        //     message: '自己点 “X” 吧！',
        //     position: 'top-left'
        //   });
        // }, 2000)
    }
  }
}
</script>


