<template>
  <div id="allDelivery">
    <el-form style="width: 100%">
      <el-form-item style="width: 100%">
        <el-input style="width: 250px" v-model="info"></el-input>
        <el-button @click="find">查找</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="addMaterialDialogShow" type="primary">新建供应商</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="deliveryListTemp" border stripe style="width: 120%">
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="编码" prop="supplier_code" width="160px"></el-table-column>
      <el-table-column label="供应商名称" prop="supplier_name"></el-table-column>
      <el-table-column label="地址" prop="supplier_address"></el-table-column>
      <el-table-column label="负责人" prop="supplier_shr"></el-table-column>
      <el-table-column label="电话" prop="supplier_tel"></el-table-column>
      <el-table-column label="操作" prop="" width="250px">
        <el-button type="primary" style="width: 80px;height: 40px" @click="update()">查看</el-button>
        <el-button type="danger" style="width: 80px;height: 40px" @click="del()">删除</el-button>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="addSupplierDialog">
      <el-form>
        <el-row>供应商编码：<el-input class="CommonInput" placeholder="例如：FCX-43242" v-model="supplier_code"></el-input></el-row>
        <el-row>供应商名称：<el-input class="CommonInput" placeholder="例如：华南科技有限公司" v-model="supplier_name"></el-input></el-row>
        <el-row>地址：<el-input class="CommonInput" placeholder="例如：446*1090" v-model="supplier_address"></el-input></el-row>
        <el-row>负责人：<el-input class="CommonInput" placeholder="例如：个" v-model="supplier_shr"></el-input></el-row>
        <el-row>电话：<el-input class="CommonInput" placeholder="例如：4329" v-model="supplier_tel"></el-input></el-row>
        <el-button type="primary" @click="addSupplier()">添加</el-button>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import {addSupplier, getAllDelivery, getAllMaterial, getAllSupplier} from "../../../api/MMSApi/mmsApi";

export default {
  name: 'allDelivery',
  data(){
    return{
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {}, // 条件封装对象

      info:'',
      deliveryListTemp:[],
      deliveryList:[],
      selectedList:[],

      addSupplierDialog: false,

      params:{},
      supplier_code:'',
      supplier_name:'',
      supplier_shr:'',
      supplier_tel:'',
      supplier_address:'',
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
        this.deliveryListTemp=this.deliveryList.filter((item)=>item.supplier_code.indexOf(that.info)!==-1||
          ((item.supplier_name.indexOf(that.info)!==-1)||
            (item.supplier_address.indexOf(that.info)!==-1)||item.supplier_shr.indexOf(that.info)!==-1))
      }
    },
    reset(){
      this.deliveryListTemp=this.deliveryList
      this.selectedList=[]
    },

    addMaterialDialogShow(){
      this.addSupplierDialog=true
    },
    addSupplier(){
      addSupplier().then(response=>{

      })
    }
  },
  beforeCreate() {
    getAllSupplier().then(response=>{
      this.deliveryList=response;
      this.deliveryListTemp=response;
      console.log(this.deliveryList)
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

