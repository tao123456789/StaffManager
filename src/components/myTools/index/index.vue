<template xmlns="http://www.w3.org/1999/html">
  <div id="homepage">
    <el-container>
      <!--  顶栏-->
      <el-header>
          <h1 style="height:60px;font-size: 35px;padding-top: 10px;">个人应用</h1>
<!--          <el-input style="height:60px;width: 300px;padding-top: 17px;padding-left: 30%" placeholder="请输入内容"></el-input>-->
      </el-header>
      <div style="padding-right: 10px;padding-top: 20px;padding-left: 10px">
        <el-row :gutter="20">
          <!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
          <!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
          <!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
          <!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
          <!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
          <el-col :xs="24" :sm="24" :md="10" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">常用网站</span>
              </div>
              <el-form>
                <el-form-item>个人GIT地址：  <a href="https://github.com/tao123456789" target="_blank">https://github.com/tao123456789</a></el-form-item>
                <el-form-item>微信公众号平台：  <a href="https://mp.weixin.qq.com/cgi-bin/home" target="_blank">https://mp.weixin.qq.com/cgi-bin/home</a></el-form-item>
                <el-form-item>B站首页：  <a href="https://www.bilibili.com/" target="_blank">https://www.bilibili.com/</a></el-form-item>
                <el-form-item>虎牙直播：  <a href="https://www.huya.com/l" target="_blank">https://www.huya.com/l</a></el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">个人网盘文件</span>
              </div>
              <el-form>
                <el-form-item v-for="(item,index) in DiskNetData" :key="index">{{item}}
                  <el-button style="float: right;margin-right: 10px" type="danger">删除</el-button>
                  <el-button style="float: right;margin-right: 10px" type="primary" @click="download(item)">下载</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="26" :md="24" :lg="7" :xl="7">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">每日计划</span>
                <el-button style="float: right;margin-right: 10px;width: 140px" type="primary" @click="getSchedule">每日固定计划</el-button>
              </div>
              <el-form>
                <el-form-item v-for="(item,index) in SchedulesTask" :key="index">{{item.taskContent}}
                  <el-button style="float: right;margin-right: 10px" type="primary" @click="updateScheduleTaskStatus(item.id)">完成</el-button>
                  <el-button style="float: right;margin-right: 10px" type="primary" @click="">{{ item.status }}</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-dialog style="width: 100%" :visible.sync="scheduleDialog" title="每日固定计划查看">
          <el-form style="height: auto;width: auto">
            <el-form-item v-for="(item,index) in Schedules" :key="index">
              {{item.taskContent}}
            <el-button style="float: right;margin-right: 10px;width: auto" type="primary" @click="deleteSchedule(item)">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="float: left;margin-right: 10px;width: 140px" type="primary" @click=showAddscheduleDialog>新增固定计划</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="addscheduleDialog" title="添加每日计划">
          <el-form style="height: 200px;width: 400px">
            <el-form-item>
              <span>任务内容：</span>
              <el-input style="max-width: 370px;" v-model='taskContent' @click="addSchedule()"></el-input>
            </el-form-item>
<!--            <el-form-item>-->
<!--              <span>任务内容：</span><el-input style="width: 270px"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-button style="float: left;margin-right: 10px;width: 140px" type="primary" @click="addSchedule">新增</el-button>
            </el-form-item>
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
      taskContent:'请输入您的计划',
      scheduleDialog:false,
      addscheduleDialog: false,
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
    showAddscheduleDialog(){
      this.addscheduleDialog=!this.addscheduleDialog
    },
    addSchedule(){
      console.log("任务："+this.taskContent)
      this.$axios({
        method:'POST',
        url:'/api/DailySchedule/addSchedule',
        data:{
          taskContent:this.taskContent
        }
      }).then(response=>{
          this.$message.success("新增成功!")
          this.getSchedule()
      })
    },
    deleteSchedule(item){
      console.log("任务："+item)
      // this.$axios({
      //   method:'POST',
      //   url:'/api/DailySchedule/addSchedule',
      //   data:{
      //     taskContent:this.taskContent
      //   }
      // }).then(response=>{
      //     this.$message.success("新增成功!")
      //     this.getSchedule()
      // })
    },
    updateScheduleTaskStatus(id){
      this.$axios({
        method:'GET',
        url:'/api/DailySchedule/updateScheduleTaskStatus/'+id,
        data:{
          token: this.$store.state.Token.token
        }
      }).then(response=>{
        if(response.data==true){
          this.$message.success("恭喜你，完成任务!")
          this.getScheduleTask()
        }else{
          this.$message.error("抱歉，更新失败，请重试!")
        }
      })
    },
    getScheduleTask(){
      this.$axios.get('/api/DailySchedule/getScheduleTaskList/1',{
        headers:{
          'Content-Type':'application/json',
          'token':this.$store.state.Token.token
        }
      }).then(response=>{
        this.SchedulesTask=response.data;
        console.log(this.SchedulesTask)
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


    // this.$axios.get('/api/DailySchedule/getScheduleTaskList/1',{
    //   headers:{
    //     'Content-Type':'application/json',
    //     'token':this.$store.state.Token.token
    //   }
    // }).then(response=>{
    //   this.SchedulesTask=response.data;
    //   console.log(this.SchedulesTask)
    // })
    this.getScheduleTask()
  }
}
</script>

<style scoped>
/*顶部样式*/
.el-header{
  background-color: dodgerblue;
  color: white;
  height: 70px;
}
.box-card {
  min-width: 400px;
  min-height: 200px;
  margin-top: 20px;
}
/*.el-card:hover{*/
/*  margin-top: -10px;*/
/*}*/
.el-button {
  width: 70px;
}
.el-form {
  height: 200px;
  width: 350px
}
.el-input__inner{
  width: 40%;
}
</style>
