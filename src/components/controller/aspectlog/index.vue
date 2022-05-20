<template>
  <div>
    <el-table :data="aspectLogList" border stripe style="width: 120%">
      <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
      <el-table-column label="编号" align="center" width="60px">
        <template slot-scope="scop">
          {{scop.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="UUID" prop="uuid" width="360px"></el-table-column>
      <el-table-column label="状态" prop="status" width="120px"></el-table-column>
      <el-table-column label="请求地址" prop="request_url" width="310px"></el-table-column>
      <el-table-column label="请求方法" prop="request_method" width="100px"></el-table-column>
      <el-table-column label="请求IP" prop="request_ip"></el-table-column>
      <el-table-column label="请求数据" prop="request_data" width="300px"></el-table-column>
      <el-table-column label="耗时" prop="time"></el-table-column>
      <el-table-column label="创建人" prop="create_name"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column label="完成时间" prop="finish_time"></el-table-column>
      <el-table-column label="操作" prop="">
        <el-button type="primary" style="width: 80px;height: 40px" @click="test()">查看</el-button>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageparams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getAspectLogCount, getAspectLogList} from "../../../api/controllerApi/aspectLogApi";
export default {
  name: "AspectLog",
  data(){
    return{
      aspectLogList:[],
      currentPage:1,
      count:0,
      pageparams: {
        page:1,
        size:10
      }
    }
  },
  methods:{
    handleSizeChange(val) {
      this.pageparams.size = val
      getAspectLogList(this.pageparams).then(response=>{
        this.aspectLogList=response
      })
      getAspectLogCount(this.pageparams).then(response=>{
        this.count=response
      })
    },
    handleCurrentChange(val) {
      this.pageparams.page=val
      this.$data.currentPage = val
      getAspectLogList(this.pageparams).then(response=>{
        this.aspectLogList=response
      })
      getAspectLogCount(this.pageparams).then(response=>{
        this.count=response
      })
    }
  },
  created() {
    getAspectLogList(this.pageparams).then(response=>{
      console.log(this.pageparams)
      console.log(response)
      this.aspectLogList=response
    })
    getAspectLogCount(this.pageparams).then(response=>{
      this.count=response
    })
  }
}
</script>

<style scoped>

</style>
