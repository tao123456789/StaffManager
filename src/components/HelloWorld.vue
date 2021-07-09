<template>
  <div id="hello" class="content">
    <div class="content_input">
      <p style="">HelloWorld!</p>
      <el-button @click="showToken=!showToken">显示token</el-button>
      <el-button @click="test2()">test接口触发</el-button>

      <div v-show="showToken">
      <h4>{{this.$store.state.Token.token}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      UserDo: {
        id:'123',
        userName: 'yt',
        userPasswd: '123'
        },
      showToken:false,
    }
  },
  methods: {
    test(){
      data.showToken=true
      },
    test2(){
      this.$axios.get('http://localhost:8087/getMessage',{headers:{
          token:this.$store.state.Token.token,
        }})
    }
  },
  beforeMount() {
    if(this.$store.state.Token.token==""){
      this.$message({
        message:'token失效，请重新登录！！！',
        type:'error'
      })
      this.$router.push("/")
    }
  }
}
</script>


