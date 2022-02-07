<template>
  <div>
    <el-table :data="userList" border stripe>
      <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="账号" prop="userName"></el-table-column>
      <el-table-column label="用户名称" prop="realName"></el-table-column>
      <el-table-column label="密码" prop="userPasswd"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "allUser",
  data(){
    return{
      userList:[],
    }
  },
  beforeMount() {
    this.$axios.get('/api/user/getAllUser',{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token
      }
    }).then(response=>{
      this.userList=response.data;
      console.log(this.userList)
    })
  }
}
</script>

<style scoped>

</style>
