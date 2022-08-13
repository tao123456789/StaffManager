<template>
  <div>
    <el-divider>邮件消息订阅</el-divider>
    <el-divider></el-divider>
    <el-button type="primary">新增</el-button>
    <el-button type="warning">修改</el-button>
    <el-button type="danger">删除</el-button>
    <el-table :data="SubscriberList" border stripe>
      <el-table-column label="编号" align="center" width="60px">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="subscriber.id" prop="id"></el-table-column>
      <el-table-column label="类型" prop="code"></el-table-column>
      <el-table-column label="订阅者" prop="name"></el-table-column>
      <el-table-column label="订阅信息" prop="remark"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-button type="primary" @click="change(scope.row.id,scope.row.status)">
            {{scope.row.status == 1 ? "关闭" : "启用"}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {changeStatus, getSubscriberList} from "../../../api/controllerApi/aspectLogApi";
import {getAllModuleList} from "../../../api/UserApi/User";

export default {
  name: "index",
  data() {
    return {
      SubscriberList: [],
      params: {}
    }
  },
  methods:{
    change(id, status) {
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
          this.SubscriberList = response
        })
      })
    }
  },
  created() {
    getSubscriberList().then(response => {
      this.SubscriberList = response
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
