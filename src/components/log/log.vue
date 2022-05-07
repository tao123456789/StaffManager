<template>
  <div>
    <el-button type="primary" @click="getLog"></el-button>
    <el-input v-model="log" type="textarea"></el-input>
  </div>
</template>

<script>
export default {
  name: "log",
  data(){
    return{
      log:"暂无日志",
    }
  },
  methods:{
    getLog(){
      this.$axios.get('/api/logger/getLog',{
        headers:{
          'token':this.$store.state.Token.token
        }
      }).then(response=>{
        this.log=response.data;
        console.log(this.log)
      })
    }
  }
}
</script>

<style scoped>
.el-textarea{
  width: 90%;
  height: 100vh;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
