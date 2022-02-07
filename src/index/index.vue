<template>
  <div>
    <el-container style="padding-left: 20px;padding-top: 40px;">
      <div style="padding-right: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人应用系统</span>
            <el-button style="float: right;width: 150px" type="primary" @click="enterMyTools">点击进入</el-button>
          </div>
          <el-form style="background-image: url('../../static/img/img3.jpg');background-size: cover;height: 200px">
            <el-form-item label="说明：" ></el-form-item>
            <el-form-item>用于个人应用开发</el-form-item>
            <el-form-item></el-form-item>
          </el-form>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>物料后台管理系统</span>
            <el-button style="float: right;width: 150px" type="primary" @click="enterMMS">点击进入</el-button>
          </div>
          <el-form style="background-image: url('../../static/img/img2.png');background-size: cover;height: 200px">
            <el-form-item label="2022-02-07  更新说明：" ></el-form-item>
            <el-form-item style="font-size: 200%">1，加入首页的卡片界面</el-form-item>
            <el-form-item>1，更新首页信息</el-form-item>
          </el-form>
        </el-card>
      </div>
      <div style="padding-right: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>开发中......</span>
            <el-button style="float: right;width: 150px" type="primary" @click="enterTest">点击进入</el-button>
          </div>
          <el-form style="background-image: url('../../static/img/img1.jpg');background-size: cover;height: 200px">
            <el-form-item label="说明：" ></el-form-item>
            <el-form-item>通过路由控制系统入口，进行转发</el-form-item>
            <el-form-item></el-form-item>
          </el-form>
        </el-card>
      </div>

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
    }
  }
}
</script>

<style>
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
</style>
