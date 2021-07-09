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
        'id':'1',
        'userName': '请输入账号',
        'userPasswd': '请输入密码',
        'RealName'  :'yt',
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
        return;
      } else if (password==null) {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
        return;
      } else {
        try{
          this.$axios.post('http://localhost:8087/getToken',JSON.stringify(this.user),{
            headers:{
              'Content-Type':'application/json'
            }}).then(
              function (res){
                if(res.data=="") {
                  that.$message({
                    message:'获取token失败！！！    请检查账号和密码是否有误！！！',
                    type:'error'
                  })
                } else{
                  console.log(res.data)
                  that.$store.state.Token.token = res.data
                  that.$message({
                    message: '恭喜你，通过了！',
                    type: 'success'
                  });
                  that.$router.push("/HelloWorld")
                }
              },
            function (err){
                console.log("登录失败："+err.message)
            }
          )
        }catch (e) {
          console.log("推送失败："+e)
        }

        setTimeout(() => {
          this.$notify({
            title: '没得办法就这一页',
            message: '自己点 “X” 吧！',
            position: 'top-left'
          });
        }, 2000)
      }
    }
  }
}
</script>


