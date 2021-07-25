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
    }
  },
  methods: {
    SignIn() {
      let username = this.user.userName;
      let password = this.user.userPasswd;
      let that=this;
      if (username==null) {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空'
        });
      } else if (password==null) {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
      } else {
          this.$axios.post('/api/getToken',JSON.stringify(this.user),{
            headers:{
              'Content-Type':'application/json'
            }}).then(response=>{
                  this.$store.state.Token.token = response.data
                  this.$axios.get('/api/user/getUser/'+username).then(response=>{
                    console.log(response.data)
                    this.$store.state.Token.userID=response.data.id
                    console.log(this.$store.state.Token.userID)
                  })
                  this.$message({
                    message: '欢迎',
                    type: 'success'
                  });
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


