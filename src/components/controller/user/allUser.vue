<template>
  <div>
    <el-table :data="userList" border stripe>
      <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="账号" prop="userName"></el-table-column>
      <el-table-column label="用户名称" prop="realName"></el-table-column>
      <el-table-column label="上次登录IP" prop="ip"></el-table-column>
      <el-table-column label="上次登录地点" prop="area"></el-table-column>
      <el-table-column label="上次登录设备" prop="brower"></el-table-column>
      <el-table-column label="上次登录系统" prop="os"></el-table-column>
      <el-table-column label="上次登录时间" prop="logintime"></el-table-column>
      <el-table-column label="邀请码" prop="inviteAuth"></el-table-column>
      <el-table-column label="邀请者" prop="beinviteauth"></el-table-column>
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
