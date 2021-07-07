<template>
  <div id="hello">
    <div>
      <p style="">HelloWorld!</p>
      <h2>this.$store</h2>
      <el-button @click="test()">getToken</el-button>
      <el-button @click="test2()">test接口触发</el-button>
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
        }
    }
  },
  methods: {
    test(){
      let that=this;
      this.$axios.post('http://localhost:8087/getToken',{'UserDo1':'UserDo'},{headers:{'Content-Type':'application/json;charset=UTF-8'}})
        .then(
          function (res){
            console.log('成功获取到token：'+res.data)
            that.$store.commit('setToken',res.data)
          })
      },
    test2(){
      this.$axios.get('http://localhost:8087/getMessage',{headers:{
          token:this.$store.state.Token.token,
        }})
    }
  }
}
</script>


