<template xmlns="http://www.w3.org/1999/html">
  <div id="homepage">
    <!--    顶部导航栏-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#46A3FF"
      text-color="#FFF"
      active-text-color="#409EFF"
      router>
      <el-menu-item index="/index" style="font-size: medium">首页</el-menu-item>
      <!--    <el-menu-item index="2" v-for="(item,index) in moduleList" :key="index">-->
      <!--      <template slot="title" >{{item.module_name}}</template>-->
      <!--    </el-menu-item>-->
    </el-menu>
    <el-container style="width: auto">
      <div style="padding-right: 10px;padding-top: 20px;padding-left: 10px">
        <el-row :gutter="24">
          <!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
          <!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
          <!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
          <!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
          <!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
          <el-col :xs="24" :sm="24" :md="11" :lg="9" :xl="8">
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
          <el-col :xs="24" :sm="24" :md="11" :lg="9" :xl="9">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">个人网盘文件</span>
                <el-button style="float: right;margin-right: 10px;width: 140px" type="primary" @click="upload" plain>上传文件</el-button>
              </div>
              <el-form>
                <el-form-item v-for="(item,index) in DiskNetData" :key="index">
                  {{item}}
                  <el-button style="float: right;margin-right: 10px" type="danger">删除</el-button>
                  <el-button style="float: right;margin-right: 10px" type="primary" @click="download(item)">下载</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="11" :lg="9" :xl="6">
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
    <!--  上传文件-->
    <el-dialog
      title="上传文件"
      :visible="uploadShow"
      width="40%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item>
          <el-upload
            ref="uploadExcel"
            action=""
            :limit=limitNum
            :auto-upload="false"
            accept=".xlsx"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList">
            <el-button size="small" plain>选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx(Excel2007)文件，且不超过10M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadFile">立即上传</el-button>
          <el-button >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getFileList} from "../../../api/XPHnetDiskApi/XPHnetDiskApi";
import {addSchedule, getSchedule, getScheduleTask} from "../../../api/scheduleApi/schedule"
export default {
  name: "homepage",
  data(){
    return{
      params:{},
      DiskNetData: [],
      Schedules:[],
      SchedulesTask:[],
      taskContent:'请输入您的计划',
      scheduleDialog:false,
      addscheduleDialog: false,
      uploadShow: false,
      selectedList:[],
      //上传文件参数
      limitNum: 1,
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: []
    }
  },
  methods:{
    // 上传文件
    upload(){
      this.uploadShow=true
    },
    uploadFile() {
      // this.$refs.uploadExcel.submit()
      let formData = new FormData()
      formData.append('file', this.form.file)
      console.log("上传的文件："+formData)
      this.$axios.post('/api/material/uploadFile',
        formData,
        {
          headers:{'Content-Type': 'multipart/form-data' }
        }
      )
        .then(res => {
          console.log(res)
          this.$message.success(this.form.file.name+res.data)
        })
        .catch(err => {

        })
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change')
      console.log(file)
      this.form.file = file.raw
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      let size = file.size / 1024 / 1024
      if(extension !== 'xlsx') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      if(size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: '错误',
        message: `文件上传失败`
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.uploadShow=false
        })
        .catch(_ => {});
    },

    getSchedule(){
      this.scheduleDialog=!this.scheduleDialog
      getSchedule().then(response=>{
        this.Schedules=response;
        console.log(this.Schedules)
      })
    },
    showAddscheduleDialog(){
      this.addscheduleDialog=!this.addscheduleDialog
    },
    addSchedule(){
      this.params.taskContent=this.taskContent
      addSchedule(this.params).then(response=>{
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
    getFileList().then(response=>{
      console.log("获取网盘的目录"+response)
      this.DiskNetData=response
    },error=>{
      this.$message.error(error)
    })
    getScheduleTask().then(response=>{
      this.SchedulesTask=response;
      console.log(this.SchedulesTask)
    })
  }
}
</script>

<style scoped>
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
.el-form{
  width: auto;
}
.el-form-item{
  width: auto;
}
</style>
