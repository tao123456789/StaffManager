<template>
<div>
  <el-divider>基础设置</el-divider>
  <el-divider></el-divider>
  <el-table :data="SettingList" border stripe>
    <el-table-column label="编号" align="center" width="60px">
      <template slot-scope="scope">
        {{scope.$index + 1}}
      </template>
    </el-table-column>
    <el-table-column label="类型" prop="type"></el-table-column>
    <el-table-column label="设置项" prop="name"></el-table-column>
    <el-table-column label="内容" prop="code"></el-table-column>
    <el-table-column label="说明" prop="remark"></el-table-column>
    <el-table-column label="操作" prop="">
      <template slot-scope="scope">
        <el-button type="primary" @click="change(scope.row.id)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {getSettingList} from "../../../api/controllerApi/aspectLogApi";
export default {
  name: "index",
  data(){
    return{
      SettingList:[],
      params: {},
    }
  },
  methods:{

  },
  beforeCreate() {
    getSettingList(this.params).then(response=>{
      this.SettingList=response
      console.log(response)
    })
  }
}
</script>

<style scoped>

</style>
