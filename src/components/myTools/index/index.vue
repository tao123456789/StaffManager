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
          <el-col :xs="18" :sm="17" :md="24" :lg="9" :xl="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">个人信息</span>
                <el-button type="primary" style="float: right" @click="editUserInfo()">编辑</el-button>
              </div>
              <el-form>
                <el-form-item>用户名ID：{{userInfo.id}}</el-form-item>
                <el-form-item>系统名：{{userInfo.userName}}</el-form-item>
                <el-form-item>用户名：{{userInfo.realName}}</el-form-item>
                <el-form-item>电话：{{userInfo.tel}}</el-form-item>
                <el-form-item>邮箱：{{userInfo.qqmail}}</el-form-item>
                <el-form-item>登录IP：{{userInfo.ip}}</el-form-item>
                <el-form-item>登录设备：{{userInfo.os}}</el-form-item>
                <el-form-item>浏览器型号：{{userInfo.brower}}</el-form-item>
                <el-form-item>登录时间：{{userInfo.logintime}}</el-form-item>
                <el-form-item>个人邀请码：{{userInfo.inviteAuth}}</el-form-item>
                <el-form-item>来自邀请码：{{userInfo.beinviteauth}}</el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="18" :sm="17" :md="24" :lg="9" :xl="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">常用网站</span>
              </div>
              <el-form>
                <el-form-item>个人GIT地址： <a href="https://github.com/tao123456789" target="_blank">https://github.com/tao123456789</a>
                </el-form-item>
                <el-form-item>微信公众号平台： <a href="https://mp.weixin.qq.com/cgi-bin/home" target="_blank">https://mp.weixin.qq.com/cgi-bin/home</a>
                </el-form-item>
                <el-form-item>B站首页： <a href="https://www.bilibili.com/" target="_blank">https://www.bilibili.com/</a>
                </el-form-item>
                <el-form-item>虎牙直播： <a href="https://www.huya.com/l" target="_blank">https://www.huya.com/l</a>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="18" :sm="17" :md="24" :lg="9" :xl="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">个人网盘文件</span>
              </div>
              <el-form style="height: auto;width: auto">
                <el-button style="width: auto" type="primary" @click="goPath(backPath)" plain>上一级</el-button>
                <el-button style="margin-right: 10px;width: auto" type="primary" @click="showFileDialog" plain>新增文件夹</el-button>
                <el-button style="margin-right: 10px;width: auto" type="primary" @click="upload" plain>上传文件</el-button>
              </el-form>
              <span>当前路径：</span>{{this.currentPath==""?"根目录":this.currentPath}}
              <el-table :data="DiskNetData" border stripe>
                <el-table-column label="文件ID" prop="F_id"></el-table-column>
                <el-table-column label="文件名称" prop="F_namesvr"></el-table-column>
                <el-table-column label="类型" prop="F_fdTask">
                  <template slot-scope="scope">
                    <span>{{scope.row.F_fdTask ? "文件" : "路径"}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                  <template slot-scope="scope">
                    <el-button type="primary" style="float: left" @click="goPath(currentPath+'/'+scope.row.F_namesvr)"
                               v-show="!scope.row.F_fdTask">进入
                    </el-button>
                    <el-button type="success" style="float: left" @click="download(scope.row.F_id,scope.row.F_namesvr)"
                               v-show="scope.row.F_fdTask">下载
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :xs="18" :sm="17" :md="24" :lg="9" :xl="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 30px">每日计划</span>
                <el-button style="float: right;margin-right: 10px;width: 140px" type="primary" @click="getSchedule">
                  每日固定计划
                </el-button>
              </div>
              <el-table :data="SchedulesTask" border stripe>
                <el-table-column label="任务内容" prop="taskContent" width="160px"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button style="float: right;margin-right: 10px" type="primary" @click="deleteScheduleTaskStatus(scope.row.id)">删除</el-button>
                    <el-button style="float: right;margin-right: 10px" type="primary" @click="updateScheduleTaskStatus(scope.row.id)">{{scope.row.status==0?"完成":"已完成"}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
        <el-dialog style="width: 100%" :visible.sync="scheduleDialog" title="每日固定计划查看">
          <el-form style="height: auto;width: auto">
            <el-form-item v-for="(item,index) in Schedules" :key="index">
              {{item.taskContent}}
              <el-button style="float: right;margin-right: 10px;width: auto" type="primary"
                         @click="deleteSchedule(item.id)">删除
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click=showAddscheduleDialog>新增固定计划</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="addscheduleDialog" title="添加每日计划">
          <el-form style="height: 200px;width: 400px">
            <el-form-item>
              <span>任务内容：</span>
              <el-input style="max-width: 370px;" v-model='taskContent' @click="addSchedule()"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" @click="addSchedule">新增</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="addFileDialog" title="新增文件夹">
          <el-form style="height: 200px;width: 400px">
            <el-form-item>
              <span>文件名称：</span>
              <el-input style="width: auto;" v-model='addFileName' @click="addSchedule()"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addFile(addFileName)">新增</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="editUserInfoDialog" title="编辑个人信息">
          <el-form>
            <el-form-item>
              <span>用户名：</span>
              <el-input style="width: auto;" v-model='userInfo.realName'></el-input>
            </el-form-item>
            <el-form-item>
              <span>密码： </span>
              <el-input style="width: auto;" v-model='userPasswd'></el-input>
            </el-form-item>
            <el-form-item>
              <span>邮箱： </span>
              <el-input style="width: auto;" v-model='userInfo.qqmail'></el-input>
            </el-form-item>
            <el-form-item>
              <span>电话： </span>
              <el-input style="width: auto;" v-model='userInfo.tel'></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo()">修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-container>
    <!--  上传文件-->
    <el-dialog
      title="上传文件"
      :visible.sync="uploadShow"
      width="40%"
    >
      <el-form>
        <el-form-item>
          <el-upload
            ref="uploadExcel"
            :limit=limitNum
            :auto-upload="false"
            accept=".*"
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
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addFilePath, download, getFileList, uploadFile} from "../../../api/XPHnetDiskApi/XPHnetDiskApi";
import {
  addSchedule,
  deleteSchedule,
  deleteScheduleTask,
  getSchedule,
  getScheduleTask,
  updateScheduleTaskStatus
} from "../../../api/scheduleApi/schedule"
import {getUserByID, updateUserInfoApi} from "../../../api/UserApi/User";

export default {
  name: "homepage",
  data() {
    return {
      params: {},
      params2: {},
      DiskNetData: [],
      Schedules: [],
      SchedulesTask: [],
      taskContent: '请输入您的计划',
      scheduleDialog: false,
      addscheduleDialog: false,
      addFileName: "",
      addFileDialog: false,
      uploadShow: false,
      selectedList: [],
      //上传文件参数
      limitNum: 1,
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: [],
      backPath: "",
      currentPath: "",
      userInfo:'',
      userPasswd:'',
      editUserInfoDialog: false,
    }
  },
  methods: {
    // 上传文件
    upload() {
      this.uploadShow = true
    },
    uploadFile() {
      let formData = new FormData()
      formData.append('file', this.form.file)
      formData.append('url', this.currentPath)
      console.log("上传的文件：" + this.form.file)
      uploadFile(formData).then(res => {
        console.log(res)
        this.$message.success(this.form.file.name + res.data)
        this.goPath(this.currentPath)
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
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        });
      }
    },
    handleSelect() {

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
    //网盘方法
    showFileDialog() {
      this.addFileDialog = !this.addFileDialog
    },
    addFile(name) {
      this.params2.currentPath = this.currentPath
      this.params2.name = name
      addFilePath(this.params2).then(response => {
        if(response=="新建成功！"){
          this.$message.success(response)
        }else{
          this.$message.error(response)
        }
        this.goPath(this.currentPath)
      })
    },
    goPath(F_namesvr) {
      this.params.url = F_namesvr
      getFileList(this.params).then(response => {
          console.log("获取网盘的目录" + response)
          this.DiskNetData = response
          this.backPath = this.currentPath
          this.currentPath = F_namesvr
        }, error => {
          this.$message.error("路径下无文件！！")
        },
      )
    },
    getSchedule() {
      this.scheduleDialog = !this.scheduleDialog
      getSchedule().then(response => {
        this.Schedules = response;
        console.log(this.Schedules)
      })
    },
    showAddscheduleDialog() {
      this.addscheduleDialog = !this.addscheduleDialog
    },
    addSchedule() {
      this.params.taskContent = this.taskContent
      addSchedule(this.params).then(response => {
        this.$message.success("新增成功!")
        this.getSchedule()
      })
    },
    deleteSchedule(id) {
      this.params.id=id
      deleteSchedule(this.params).then(response=>{
        this.$message.success("删除成功！！！")
      })
      this.getSchedule()
    },
    deleteScheduleTaskStatus(id){
      this.params.id=id
      deleteScheduleTask(this.params).then(response=>{
        this.$message.success("删除成功！！！")
        getScheduleTask().then(response => {
          this.SchedulesTask = response;
          console.log(this.SchedulesTask)
        })
      })
    },
    updateScheduleTaskStatus(id) {
      updateScheduleTaskStatus(id).then(response => {
        if (response == true) {
          this.$message.success("恭喜你，完成任务!")
        } else {
          this.$message.error("抱歉，更新失败，请重试!")
        }
      })
      getScheduleTask()
    },
    download(fileid,F_namesvr) {
      this.params.fileID=fileid
      this.params.url=this.currentPath
      download(this.params).then(response => {
        this.$message.info("开始下载。。。")
        console.log(response)
        const link=document.createElement('a');
        const url = window.URL || window.webkitURL || window.moxURL;
        link.href=url.createObjectURL(response);
        link.download = F_namesvr;   //下载的文件名称
        link.click();
        window.URL.revokeObjectURL(url);  //  #URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL. 当你要已经用过了这个对象URL,然后要让浏览器知道这个URL已经不再需要指向对应的文件的时候,就需要调用这个方法.
      }, error => {
        this.$message.error(error)
      })
    },
    editUserInfo(){
      this.editUserInfoDialog=!this.editUserInfoDialog
    },
    updateUserInfo(){
      this.params.userName=this.userInfo.userName
      this.params.userPasswd=this.userPasswd
      this.params.qqmail=this.userInfo.qqmail
      this.params.tel=this.userInfo.tel
      updateUserInfoApi(this.params).then(response=>{
        console.log("修改成功！！！")
      })
    }
  },
  beforeMount() {
    this.params.url = this.currentPath
    getFileList(this.params).then(response => {
      console.log("获取网盘的目录" + response)
      this.DiskNetData = response
    }, error => {
      this.$message.error(error)
    })
    getScheduleTask().then(response => {
      this.SchedulesTask = response;
      console.log(this.SchedulesTask)
    })
    getUserByID().then(response => {
      this.userInfo = response;
      console.log(this.userInfo)
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
  float: left;
  margin-right: 10px;
  width: auto
}

.el-form {
  height: auto;
  width: 350px
}

.el-input__inner {
  width: 40%;
}

.el-form {
  width: auto;
}
.el-menu{
  width: 100%;
}
.el-form-item {
  width: auto;
}
</style>
