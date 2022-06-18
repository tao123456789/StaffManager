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
    <el-table :data="SubscriberList" border stripe>
      <el-table-column label="编号" align="center" width="60px">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="subscriber.id" prop="id"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="订阅者" prop="subscriber"></el-table-column>
      <el-table-column label="订阅信息" prop="message"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-button type="primary" style="width: 80px;height: 40px" @click="change(scope.row.id,scope.row.status)">
            {{scope.row.status == 1 ? "关闭" : "启用"}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getSubscriberList, changeStatus} from "../../../api/controllerApi/aspectLogApi";
import {getModule} from "../../../api/UserApi/User";

export default {
  name: "Auth",
  data() {
    return {
      SubscriberList: [],
      UserModuleList: [],
      params: {}
    }
  },
  methods: {
    change(id, status) {
      console.log(id)
      this.params.id = id
      if (status == 0) {
        this.params.status = 1
      } else {
        this.params.status = 0
      }
      changeStatus(this.params).then(response => {
        this.$message.success("操作成功！")
        //刷新列表
        getSubscriberList().then(response => {
          console.log(response)
          this.SubscriberList = response
        })
      })
    }
  },
  created() {
    getSubscriberList().then(response => {
      console.log(response)
      this.SubscriberList = response
    })
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
