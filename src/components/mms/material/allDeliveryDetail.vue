<template>

  <div id="allDelivery">
    <el-form style="width: 100%">
      <el-form-item style="width: 100%">
        <el-input style="width: 250px" v-model="info"></el-input>
        <el-button @click="find">查找</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="addMaterialDialogShow" type="primary">新建物料</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="deliveryListTemp" border stripe style="width: 120%">
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="送货单号" prop="delivery_code"  width="120px"></el-table-column>
      <el-table-column label="送货时间" prop="delivery_time" width="120px"></el-table-column>
      <el-table-column label="供货方" prop="supplier_name" width="220px"></el-table-column>
      <el-table-column label="物料编码" prop="material_id"></el-table-column>
      <el-table-column label="物料名称" prop="material_name"></el-table-column>
      <el-table-column label="规格" prop="material_type"></el-table-column>
      <el-table-column label="单位" prop="material_dw"></el-table-column>
      <el-table-column label="单价" prop="material_price"></el-table-column>
      <el-table-column label="数量" prop="qty"></el-table-column>
      <el-table-column label="负责人" prop="supplier_shr"></el-table-column>
      <el-table-column label="电话" prop="supplier_tel"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" prop="" width="250px">
        <el-button type="primary" style="width: 80px;height: 40px" @click="update()">查看</el-button>
        <el-button type="danger" style="width: 80px;height: 40px" @click="del()">删除</el-button>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="addMaterialDialog">
      <el-form>
        <el-row>物料编码：<el-input class="CommonInput" placeholder="例如：FCX-43242" v-model="material_code"></el-input></el-row>
        <el-row>物料名称：<el-input class="CommonInput" placeholder="例如：纺锤纱" v-model="material_name"></el-input></el-row>
        <el-row>规格型号：<el-input class="CommonInput" placeholder="例如：446*1090" v-model="material_code"></el-input></el-row>
        <el-row>物料单位：<el-input class="CommonInput" placeholder="例如：个" v-model="material_code"></el-input></el-row>
        <el-row>物料单价：<el-input class="CommonInput" placeholder="例如：4329" v-model="material_code"></el-input></el-row>
        <el-row>供应商公司：<el-input class="CommonInput" placeholder="例如：华南东方海电供应商" v-model="material_code"></el-input></el-row>
        <el-row>责任人：<el-input class="CommonInput" placeholder="例如：张三" v-model="material_code"></el-input></el-row>
        <el-row>责任人电话：<el-input class="CommonInput" placeholder="例如：138423444329" v-model="material_code"></el-input></el-row>
        <el-button type="primary" @click="addMaterial()">添加</el-button>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { getAllDeliveryDetail,} from "../../../api/MMSApi/mmsApi";

export default {
  name: 'allDeliveryDetail',
  data(){
    return{
      current: 1, // 当前页
      limit: 3, // 每页显示记录数
      searchObj: {}, // 条件封装对象

      info:'',
      deliveryListTemp:[],
      deliveryList:[],
      selectedList:[],

      addMaterialDialog: false,

      params:{},
      material_code:'',
      material_name:'',
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
        this.deliveryListTemp=this.deliveryList
      }else{
        //执行遍历查询
        // for (i=0; i < this.materialList.length; i++) {
        //   if (this.materialList[i].material_id === this.info) {
        //     this.selectedList.push(this.materialList[i])
        //   }
        // }
        // this.materialListTemp=this.selectedList

        //使用filter查询
        this.deliveryListTemp=this.deliveryList.filter((item)=>item.delivery_code.indexOf(that.info)!==-1||
          ((item.supplier_name.indexOf(that.info)!==-1)||
            (item.material_name.indexOf(that.info)!==-1)))
      }
    },
    reset(){
      this.deliveryListTemp=this.deliveryList
      this.selectedList=[]
    },

    addMaterialDialogShow(){
      this.addMaterialDialog=true
    },
    addMaterial(){

    }
  },
  beforeCreate() {
    getAllDeliveryDetail().then(response=>{
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

