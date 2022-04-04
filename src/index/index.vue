<template>
  <div>
    <el-container style="padding-left: 20px;padding-top: 40px;">
      <el-row :gutter="20">
<!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
<!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
<!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
<!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
<!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
        <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">个人应用系统</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterMyTools">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img3.jpg');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item>用于个人应用开发</el-form-item>
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
              <el-form-item label="2022-02-07  更新说明：" ></el-form-item>
              <el-form-item style="font-size: 200%">1，加入首页的卡片界面</el-form-item>
              <el-form-item>1，更新首页信息</el-form-item>
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
        <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px">开发中......</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enterTest">点击进入</el-button>
            </div>
            <el-form style="background-image: url('../../static/img/img1.jpg');background-size: cover;height: 200px">
              <el-form-item label="说明：" ></el-form-item>
              <el-form-item>通过路由控制系统入口，进行转发</el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </el-card>
        </el-col>
        </el-row>
    </el-container>
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
    }
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
.box-card {
  width: 450px;
}
.el-card:hover{
  margin-top: -10px;
}
</style>
