<template>
  <div>
    <!--    顶部导航栏-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#46A3FF"
      text-color="#FFF"
      active-text-color="#FFF"
      router>
      <el-menu-item index="/index" style="font-size: medium">首页</el-menu-item>
      <el-menu-item index="/" style="font-size: medium">退出</el-menu-item>
      <!--    <el-menu-item index="2" v-for="(item,index) in moduleList" :key="index">-->
      <!--      <template slot="title" >{{item.module_name}}</template>-->
      <!--    </el-menu-item>-->
    </el-menu>
<!--    控制网络连接状态-->
    <el-container style="padding-left: 20px;padding-top: 40px;">
      <el-row :gutter="24">
<!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
<!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
<!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
<!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
<!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
        <el-col :xs="20" :sm="19" :md="18" :lg="7" :xl="5.5" v-for="(item,index) in moduleList" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px;">{{item.module_name}}</span>
              <el-button style="float: right;width: 150px" type="primary" @click="enter(index)">点击进入</el-button>
            </div>
            <el-form :style="{backgroundImage:(moduleList[0].img_url)}">
              <el-form-item style="width: 200px">{{item.description}}</el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <div>
      <el-container style="margin-left: 40px;margin-top: 20px">
        <el-button type="primary" @click="enterJsonTool1">JSON转换1</el-button>
        <el-button type="primary" @click="enterJsonTool2">JSON转换2</el-button>
      </el-container>
    </div>
  </div>
</template>

<script>
import {getModule} from "../api/UserApi/User"
export default {
  name: "index",
  data(){
    return{
      // <!--    控制网络连接状态-->
      mask: false,
      moduleList:{},

    }
  },
  methods:{
    handleSelect(){

    },
    enter(index){
      let url=this.moduleList[index].module_url
      this.$router.push(url)
    },
    enterJsonTool1(){
      this.$router.push("/jsonTool")
    },
    enterJsonTool2(){
      this.$router.push("/jsonTool2")
    }
  },
  // 画面DOM创建时
  mounted () {
  },
  created() {
    getModule().then(response=>{
      console.log(response)
      this.moduleList=response
    })
  },
  beforeDestroy () {
  },
}
</script>

<style scoped lang="less">
.box-card {
  min-width: 400px;
  min-height: 200px;
  margin-top: 20px;
}
.el-form {
   height: 200px;
   width: 450px
 }
.el-button{
  width: auto;
}
.el-menu{
  width: 100%;
}
</style>
