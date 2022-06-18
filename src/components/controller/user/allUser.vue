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
    <el-dialog :visible.sync="authDialodShow" title="首页模块权限">
      <el-button type="primary" @click="insetUserModule()">新增</el-button>
      <el-table :data="moduleList" border stripe>
        <el-table-column label="编号" align="center" width="60px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用戶ID" prop="userid"></el-table-column>
        <el-table-column label="用戶名" prop="username"></el-table-column>
        <el-table-column label="真实名称" prop="realname"></el-table-column>
        <el-table-column label="模块ID" prop="moduleid"></el-table-column>
        <el-table-column label="模块名称" prop="module_name"></el-table-column>
        <el-table-column label="URL" prop="module_url"></el-table-column>
        <el-table-column label="描述" prop="description" width="160%"></el-table-column>
        <el-table-column label="描述" prop="">
          <template slot-scope="scope">
            <el-button type="danger" @click="removeModule(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="insetUserModuleDialog" title="新增权限">
      <el-select v-model="selectedValue" placeholder="请选择">
        <el-option
          v-for="item in moduleLists"
          :key="item.id"
          :value="item.id"
          :label="item.module_name"
          />
      </el-select>
      <el-button type="primary" @click="selectChange">添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {addModuleAPI, getAllModuleList, getModuleListByUserID, removeModuleAPI} from "../../../api/UserApi/User";

export default {
  name: "allUser",
  data(){
    return{
      userList: [],
      moduleList: [],
      moduleLists: [],
      authDialodShow: false,
      insetUserModuleDialog:false,
      params: {},
      selectedValue:"",
    }
  },
  methods:{
    getModuleList(id){
      console.log(id)
      this.authDialodShow=!this.authDialodShow
      this.params.userid=id
      getModuleListByUserID(this.params).then(response=>{
        this.moduleList=response
      })
    },
    removeModule(id){
      this.params.id=id
      removeModuleAPI(this.params).then(response=>{
        getModuleListByUserID(this.params).then(response=>{
          this.moduleList=response
        })
      })
    },
    insetUserModule() {
      this.insetUserModuleDialog=!this.insetUserModuleDialog
    },
    selectChange(){
      this.params.moduleid=this.selectedValue
      addModuleAPI(this.params).then(response => {
        console.log("操作成功")
        getModuleListByUserID(this.params).then(response=>{
          this.moduleList=response
        })
        this.insetUserModuleDialog=!this.insetUserModuleDialog
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
    getAllModuleList().then(response => {
      console.log(response)
      this.moduleLists=response
    })
  }
}
</script>

<style scoped>
.el-button{
  width: auto;
  margin-bottom: 10px;
}
</style>
