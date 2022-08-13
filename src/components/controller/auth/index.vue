<template>
  <div>
    <el-divider>首页模块权限</el-divider>
    <el-divider></el-divider>
    <el-table :data="UserModuleList" border stripe>
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
    <el-divider>物料管理后台权限</el-divider>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {getModule} from "../../../api/UserApi/User";

export default {
  name: "Auth",
  data() {
    return {
      UserModuleList:[],
      params: {}
    }
  },
  methods: {},
  created() {
    getModule().then(response => {
      console.log(response)
      this.UserModuleList=response
    })
  }
}
</script>

<style scoped>
.el-button {
  width: auto;
  height: 40px
}

.el-table {
  margin-top: 20px;
  width: 120%;
}
</style>
