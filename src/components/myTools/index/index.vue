<template xmlns="http://www.w3.org/1999/html">
  <div id="homepage">
    <el-container>
      <!--  顶栏-->
      <el-header>
        <el-container direction="horizontal" >
          <h1 style="height:60px;font-size: 35px;padding-top: 10px;">个人应用</h1>
<!--          <el-input style="height:60px;width: 300px;padding-top: 17px;padding-left: 30%" placeholder="请输入内容"></el-input>-->
        </el-container>
      </el-header>
      <div style="padding-right: 20px;padding-top: 20px;padding-left: 20px">
        <el-row :gutter="20">
          <!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
          <!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
          <!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
          <!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
          <!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
          <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">常用网站</span>
              </div>
              <el-form style="height: 200px;width: 400px">
                <el-form-item>个人GIT地址：  <a href="https://github.com/tao123456789" target="_blank">https://github.com/tao123456789</a></el-form-item>
                <el-form-item>微信公众号平台：  <a href="https://mp.weixin.qq.com/cgi-bin/home" target="_blank">https://mp.weixin.qq.com/cgi-bin/home</a></el-form-item>
                <el-form-item>B站首页：  <a href="https://www.bilibili.com/" target="_blank">https://www.bilibili.com/</a></el-form-item>
                <el-form-item>虎牙直播：  <a href="https://www.huya.com/l" target="_blank">https://www.huya.com/l</a></el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">个人网盘文件</span>
              </div>
              <el-form style="height: 200px;width: 400px">
                <el-form-item v-for="(item,index) in DiskNetData" :key="index">{{item}}
                  <el-button style="float: right" type="danger">删除</el-button>
                  <el-button style="float: right;margin-right: 10px" type="primary" @click="download(item)">下载</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">每日计划</span>
                <el-button style="float: right;margin-right: 10px" type="primary" @click="getSchedule">查看</el-button>
              </div>
              <el-form style="height: 200px;width: 400px">
                <el-form-item v-for="(item,index) in SchedulesTask" :key="index">{{item.taskContent}}
                  <slot><el-button style="float: right;margin-right: 10px" type="primary" @click="">{{ item.status }}</el-button></slot>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-dialog style="width: 100%" :visible.sync="scheduleDialog" title="每日计划查看">
          <el-form style="height: 200px;width: 400px">
            <el-form-item v-for="(item,index) in Schedules" :key="index">{{item.taskContent}}</el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
import * as API from '../../../api/scheduleApi/schedule'
export default {
  name: "homepage",
  data(){
    return{
      params:[],
      DiskNetData: [],
      Schedules:[],
      SchedulesTask:[],
      value: '',
      scheduleDialog:false,
    }
  },
  methods:{
    getSchedule(){
      this.scheduleDialog=!this.scheduleDialog
      this.$axios.get('/api/DailySchedule/getScheduleList/1',{
        headers:{
          'Content-Type':'application/json',
          'token':this.$store.state.Token.token
        }
      }).then(response=>{
        this.Schedules=response.data;
        console.log(this.Schedules)
      })
    },
    getScheduleTask(){
      API.getSchedule(this.params,this.SchedulesTask).then((resp)=>{
        console.log(resp.result)
        console.log(resp.data)
        this.SchedulesTask=resp.result
      })
    },
    download(item){
      console.log(item)
      this.$axios.get('/api/XPHnetDisk/downloadFile',{
        headers:{
          'Content-Type':'application/json',
          'token':this.$store.state.Token.token,
          'responseType': 'blob'
        },
        params:{
          'url':'/user/data/upload/'+item
        }
      }).then(response=>{
        // console.log(response.data)
        // const link = document.createElement('a')
        // const blob = new Blob([response.data],{ type: 'application/octet-stream' })
        // link.href = window.URL.createObjectURL(blob)
        // link.download=item
        // link.click()
        // window.URL.revokeObjectURL(link.href)
        let url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", item);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      },error=>{
        this.$message.error(error)
      })
    }
  },
  beforeMount(){
    this.$axios.get('/api/XPHnetDisk/getFileList',{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token,
      },
      params:{
        'url':'/user/data/upload'
      }
    }).then(response=>{
      console.log("获取网盘的目录"+JSON.stringify(response.data))
      this.DiskNetData=response.data
    },error=>{
      this.$message.error(error)
    })


    this.$axios.get('/api/DailySchedule/getScheduleTaskList/1',{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token
      }
    }).then(response=>{
      this.SchedulesTask=response.data;
      console.log(this.SchedulesTask)
    })
  }
}
</script>

<style scoped>
/*顶部样式*/
.el-header{
  background-color: dodgerblue;
  color: white;
  height："70px";
  width: 100%;
}
.el-input{
  width: 80px;
}
.selectInput{
  padding-left: 20px;
  width: 800px;
}
.selectInput2{
  padding-left: 20px;
  width: 800px;
  height: 300px;
}
.box-card {
  width: 500px;
  min-height: 200px;
}
.el-card:hover{
  margin-top: -10px;
}
.el-button {
  width: 70px;
}
</style>
