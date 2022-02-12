<template>
  <div id="allMaterial">
    <el-form>
      <el-form-item>
        <el-input style="width: 200px" v-model="info"></el-input>
        <el-button @click="find">查找</el-button>
        <el-button @click="reset()">重置</el-button>
        <el-button @click="upload()" plain>选择文件</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="materialListTemp" border stripe>
      <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="物料编码" prop="material_id"></el-table-column>
      <el-table-column label="物料名称" prop="material_name"></el-table-column>
      <el-table-column label="型号" prop="material_type"></el-table-column>
      <el-table-column label="价格" prop="material_price"></el-table-column>
      <el-table-column label="供应商" prop="material_gys"></el-table-column>
      <el-table-column label="负责人" prop="gys_name"></el-table-column>
      <el-table-column label="电话" prop="gys_name_tel"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" prop="">
        <el-button type="primary" style="width: 80px;height: 40px" @click="test()">修改</el-button>
      </el-table-column>
    </el-table>

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
export default {
  name: 'allMaterial',
  data(){
    return{
      info:'',
      materialListTemp:[],
      materialList:[],
      selectedList:[],
      //上传文件参数
      uploadShow:false,
      limitNum: 1,
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: []
    }
  },
  methods:{
    test(){
      this.$message.error("暂未实现！！！")
    },
    find(){
      var i;
      var that=this;
      if(this.info==='') {
        this.materialListTemp=this.materialList
      }else{
        //执行遍历查询
        // for (i=0; i < this.materialList.length; i++) {
        //   if (this.materialList[i].material_id === this.info) {
        //     this.selectedList.push(this.materialList[i])
        //   }
        // }
        // this.materialListTemp=this.selectedList

        //使用filter查询
        this.materialListTemp=this.materialList.filter((item)=>item.material_id.indexOf(that.info)!==-1||
          ((item.material_name.indexOf(that.info)!==-1)||
            (item.material_gys.indexOf(that.info)!==-1)||item.gys_name.indexOf(that.info)!==-1))
      }
    },
    reset(){
      this.materialListTemp=this.materialList
      this.selectedList=[]
    },

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
    }
  },
  beforeCreate() {
    this.$axios.get('/api/material/getAllMaterial',{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token
      }
    }).then(response=>{
      this.materialList=response.data;
      this.materialListTemp=response.data;
      console.log(this.materialList)
    })
  }
}
</script>

