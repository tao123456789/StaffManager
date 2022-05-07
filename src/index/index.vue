<template>
  <div>
    <el-container style="padding-left: 20px;padding-top: 40px;">
      <el-row :gutter="20">
<!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
<!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
<!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
<!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
<!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">个人应用系统</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterMyTools">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img3.jpg');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item style="width: 200px">用于个人应用开发，包括常用的地址记录，个人的网盘的功能等</el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">后台管理系统</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterMMS">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img2.png');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item style="width: 200px">对物料信息进行管理的一个系统，功能暂未完全实现，慢慢做，不着急</el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">日志系统</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterLog">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img5.jpg');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item style="width: 200px">用于查看所有日志的系统入口，暂未实现，目标是将该系统的日志文件都纳入管理</el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">前端组件Demo库</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterDemo">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img4.png');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item>用于记录前端的组件应用</el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <div>
      <el-container style="margin-left: 40px;margin-top: 20px">
        <el-form>
          <el-form-item>
            <a href="#/jsonTool">JSON转换</a>
          </el-form-item>
        </el-form>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
    }
  },
  methods:{
    enterMMS(){
      this.$router.push("/MMS")
    },
    enterTest(){
      this.$message.success("开发中！！！")
    },
    enterMyTools(){
      this.$router.push("/myTools")
    },
    enterDemo(){
      this.$router.push("/demo")
    },
    enterLog(){
      this.$router.push("/log")
    },
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
/*.el-card:hover{*/
/*  margin-top: -10px;*/
/*}*/
.box-card {
  min-width: 400px;
  min-height: 200px;
  margin-top: 20px;
}
.el-form {
   height: 200px;
   width: 450px
 }

</style>
