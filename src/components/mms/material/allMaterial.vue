<template>
<div id="allMaterial">
  <el-form style="width: 100%">
    <el-form-item style="width: 100%">
      <el-input style="width: 250px" v-model="info"></el-input>
      <el-button @click="find">查找</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="addMaterialDialogShow" type="primary">新建物料</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="materialListTemp" border stripe style="width: 120%">
    <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
    <el-table-column label="序号" prop="id" width="60px"></el-table-column>
    <el-table-column label="物料编码" prop="material_id"></el-table-column>
    <el-table-column label="物料名称" prop="material_name"></el-table-column>
    <el-table-column label="型号" prop="material_type"></el-table-column>
    <el-table-column label="单价" prop="material_price"></el-table-column>
    <el-table-column label="供应商" prop="material_gys"></el-table-column>
    <el-table-column label="负责人" prop="gys_name"></el-table-column>
    <el-table-column label="电话" prop="gys_name_tel"></el-table-column>
    <el-table-column label="备注" prop="remark"></el-table-column>
    <el-table-column label="操作" prop="" width="250px">
      <el-button type="primary" style="width: 80px;height: 40px" @click="update()">修改</el-button>
      <el-button type="danger" style="width: 80px;height: 40px" @click="del()">删除</el-button>
    </el-table-column>
  </el-table>
  <el-dialog :visible.sync="addMaterialDialog">
    <el-form>
      <el-row>物料编码：<el-input class="CommonInput" placeholder="例如：FCX-43242" v-model="params.material_id"></el-input></el-row>
      <el-row>物料名称：<el-input class="CommonInput" placeholder="例如：纺锤纱" v-model="params.material_name"></el-input></el-row>
      <el-row>规格型号：<el-input class="CommonInput" placeholder="例如：446*1090" v-model="params.material_type"></el-input></el-row>
      <el-row>物料单位：<el-input class="CommonInput" placeholder="例如：个" v-model="params.material_dw"></el-input></el-row>
      <el-row>物料单价：<el-input class="CommonInput" placeholder="例如：4329" v-model="params.material_price"></el-input></el-row>
      <el-row>供应商公司：<el-input class="CommonInput" placeholder="例如：华南东方海电供应商" v-model="params.material_gys"></el-input></el-row>
      <el-row>责任人：<el-input class="CommonInput" placeholder="例如：张三" v-model="params.gys_name"></el-input></el-row>
      <el-row>责任人电话：<el-input class="CommonInput" placeholder="例如：138423444329" v-model="params.material_name_tel"></el-input></el-row>
      <el-button type="primary" @click="addMaterial()">添加</el-button>
    </el-form>
  </el-dialog>
</div>

</template>

<script>
import {addMaterial, getAllMaterial} from "../../../api/MMSApi/mmsApi";

export default {
  name: 'allMaterial',
  data(){
    return{
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {}, // 条件封装对象

      info:'',
      materialListTemp:[],
      materialList:[],
      selectedList:[],

      addMaterialDialog: false,

      params: {
        material_id: '',
        material_name: '',
        material_type: '',
        material_dw: '',
        material_price: '',
        material_gys: '',
        gys_name: '',
        material_name_tel: '',
      }
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

    addMaterialDialogShow(){
      this.addMaterialDialog=true
    },
    addMaterial(){
      console.log(JSON.stringify(this.params))
      addMaterial(JSON.stringify(this.params)).then(response=>{

      }).catch(reason => {
        console.log(reason)
      })
    },
    update(){
      this.addMaterialDialog=true
    },
    del(){

    },
  },
  beforeCreate() {
    getAllMaterial().then(response=>{
      this.materialList=response;
      this.materialListTemp=response;
      console.log(this.materialList)
    })
  }
}
</script>

<style scoped>
.el-form-item__content {
  height: 30px;
}
.el-button{
  width: auto;
}
.CommonInput{
  width: 350px;
}
</style>

