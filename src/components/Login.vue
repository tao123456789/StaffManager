<template>
  <div>
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>管理员登录</p>
        </div>
        <el-input v-model="UserName" clearable placeholder="用户名"></el-input>
        <el-input v-model="PassWord" clearable show-password placeholder="密码"></el-input>
        <div class="content_button">
          <el-button type="primary" @click="SignIn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {testGet} from '../api/testApi'

export default {
  name: 'Login',
  data() {
    return {
      UserName: '',
      PassWord: ''
    }
  },
  methods: {
    SignIn() {
      let that = this;
      let username = that.UserName;
      let password = that.PassWord;
      if (username!=="123") {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空'
        });
        return;
      } else if (password!=="123") {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
        return;
      } else {

        this.$message({
          message: '恭喜你，通过了！',
          type: 'success'
        });

        this.$router.push("/HelloWorld")
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


