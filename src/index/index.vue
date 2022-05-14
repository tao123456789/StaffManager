<template>
  <div>
<!--    控制网络连接状态-->
    <div v-if="mask" class="offline-mask">
      <h2 class="offline-mask-title"> {{ offlineTitle }} </h2>
    </div>
<!--    控制网络连接状态-->
<!--    顶部导航栏-->
<!--    <el-menu-->
<!--      :default-active="$route.path"-->
<!--      class="el-menu-demo"-->
<!--      mode="horizontal"-->
<!--      @select="handleSelect"-->
<!--      background-color="#fff"-->
<!--      text-color="#909399"-->
<!--      active-text-color="#409EFF"-->
<!--      router>-->
<!--      <el-menu-item index="/index">首页</el-menu-item>-->
<!--      <el-menu-item index="2" v-for="(item,index) in moduleList" :key="index">-->
<!--        <template slot="title" >{{item.module_name}}</template>-->
<!--      </el-menu-item>-->
<!--    </el-menu>-->
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
        <el-button type="primary" @click="">JSON转换1</el-button>
        <el-button type="primary" @click="enterJsonTool2">JSON转换2</el-button>
        <el-button type="primary" @click="netStatus">网络状态</el-button>
      </el-container>
    </div>
  </div>
</template>

<script>
import {getModuleList} from "../api/UserApi/User"
export default {
  name: "index",
  // <!--    控制网络连接状态-->
  props: {
    offlineTitle: {
      type: String,
      default: '网络已断开，请检查网络'
    },
    onlineTitle: {
      type: String,
      default: '网络已连接'
    }
  },

  data(){
    return{
      // <!--    控制网络连接状态-->
      mask: false,
      moduleList:{},

    }
  },
  methods:{
    getModuleList(){
      getModuleList().then(response=>{
        console.log(response)
        this.moduleList=response
      })
    },
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
    },
    netStatus(){
      this.$router.push("/netStatus")
    },
    // <!--    控制网络连接状态-->
    eventHandler (event) {
      let { offlineTitle, onlineTitle } = this
      const type = event.type === 'offline' ? 'error' : 'success'
      const title = type === 'error' ? offlineTitle : onlineTitle
      // element 的提示， UI不同这里换下
      this.$message({
        message: title,
        type: type
      })
      setTimeout(() => {
        this.mask = event.type === 'offline'
      }, 1500)
    }
  },
  // 画面DOM创建时
  mounted () {
    //检查网络情况
    window.addEventListener('offline', this.eventHandler)
    window.addEventListener('online', this.eventHandler)
    this.getModuleList()
  },
  beforeDestroy () {
    window.removeEventListener('offline', this.eventHandler)
    window.removeEventListener('online', this.eventHandler)
  },
}
</script>

<style scoped lang="less">
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
.el-button{
  width: auto;
}
.offline-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  z-index: 999;
  transition: position 2s;
  display: flex;
  align-items: center;
  justify-content: center;

.offline-mask-title {
  color: rgba(0, 0, 0, .8);
}
}
</style>
