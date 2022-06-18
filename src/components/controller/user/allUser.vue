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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" style="width: 80px;height: 40px" @click="getModuleList(scope.row.id)">权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="authDialodShow">
      <el-table :data="moduleList" border stripe>
        <el-table-column label="编号" align="center" width="60px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用戶ID" prop="userid"></el-table-column>
        <el-table-column label="用戶名" prop="username"></el-table-column>
        <el-table-column label="模块ID" prop="moduleid"></el-table-column>
        <el-table-column label="模块名称" prop="module_name"></el-table-column>
        <el-table-column label="URL" prop="module_url"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="描述" prop="">
          <template slot-scope="scope">
            <el-button type="primary" @click="change(scope.row.id,scope.row.status)">
              {{scope.row.status == 1 ? "关闭" : "启用"}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getModuleListByUserID} from "../../../api/UserApi/User";

export default {
  name: "allUser",
  data(){
    return{
      userList: [],
      moduleList: [],
      authDialodShow: false,
      params: {},
    }
  },
  methods:{
    getModuleList(id){
      console.log(id)
      this.authDialodShow=!this.authDialodShow
      this.params.userid=id
      getModuleListByUserID(this.params).then(response=>{
        console.log(response)
        this.moduleList=response
      })
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
