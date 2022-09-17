<template>
  <div id="allDelivery">
    <el-form style="width: 100%">
      <el-form-item style="width: 100%">
        <el-input style="width: 250px" v-model="info"></el-input>
        <el-button @click="find">查找</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="deliveryDialogShow" type="primary">新建送货单</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="deliveryListTemp" border stripe style="width: 120%;" height="800px" >
      <el-table-column label="勾选" prop="" width="60px"><el-checkbox></el-checkbox></el-table-column>
      <el-table-column label="序号" prop="id" width="60px"></el-table-column>
      <el-table-column label="送货单号" prop="delivery_code"></el-table-column>
      <el-table-column label="送货时间" prop="delivery_time"></el-table-column>
      <el-table-column label="供货方" prop="supplier_name"></el-table-column>
      <el-table-column label="负责人" prop="supplier_shr"></el-table-column>
      <el-table-column label="电话" prop="supplier_tel"></el-table-column>
      <el-table-column label="创建人" prop="create_name"></el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column label="更新人" prop="update_name"></el-table-column>
      <el-table-column label="更新时间" prop="update_time"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" prop="" width="250px" fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    添加送货单-->
    <el-dialog width="80%" :visible.sync="deliveryDialog" title="送货单详情" @close="deliveryDialogClose()">
      <el-divider style="margin: 100%" content-position="left">送货单表头</el-divider>
      <div style="display: flex;margin-top: 30px;margin-left: 30px;">
        <el-form>
        <span>商家：</span>
        <el-select placeholder="必选" v-model="from_supplier_id" filterable  @change="onDeliveryTitleChange()">
          <el-option v-for="item in supplierList" :label="item.supplier_name" :value="item.id" :key="item.id">
            <span style="float: left">{{item.supplier_name}}</span>
          </el-option>
        </el-select>
          <span style="margin-left: 30px">送货单号：</span><el-input class="MinCommonInput" v-model="deliveryNo" placeholder="必填"></el-input>
          <span style="margin-left: 30px">送货时间：</span><el-date-picker v-model="delivery_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          <span style="margin-left: 30px">备注：</span><el-input class="MinCommonInput" v-model="remark" placeholder=""></el-input>
        </el-form>
        <el-button style="width: 80px;height: 40px;margin-left: 30px"  type="primary" @click="addDelivery()">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog width="80%" title="送货单详情" :visible.sync="DeliveryDetailDialog">
      <div style="margin-bottom: 30px">
        <el-button type="primary" @click="addMaterialDialogShow()">添加物料</el-button>
      </div>
      <el-table :data="deliveryDetailList" border stripe style="width: 120%">
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
          <el-button type="danger" style="width: 80px;height: 40px" @click="del()">删除</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="addMaterialDialog" width="60%">
      <div style="display: flex;margin-top: 30px;margin-left: 30px;">
        <el-form>
          <span>物料：</span>
          <el-select placeholder="必选" v-model="tempMaterialValue" filterable  @change="onMaterialTitleChange()">
            <el-option v-for="item in materialList" :label="item.material_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <span style="margin-left: 30px">数量：</span><el-input class="MinCommonInput" v-model="deliveryNo" placeholder="必填"></el-input>
          <span style="margin-left: 30px">单位：</span><el-input disabled v-model="material_dw"></el-input>
          <span style="margin-left: 30px">备注：</span><el-input class="MinCommonInput" v-model="remark" placeholder=""></el-input>
        </el-form>
        <el-button style="width: 80px;height: 40px;margin-left: 30px"  type="primary" @click="addDelivery()">添加</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  addDelivery,
  getAllDelivery,
  getDeliveryDetailBy,
  getAllMaterial,
  getAllSupplier
} from "../../../api/MMSApi/mmsApi";
import {Message} from "element-ui";

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

      deliveryDialog: false,
      DeliveryDetailDialog: false,
      addMaterialDialog:false,

      deliveryDetailList:[],

      params:{},
      material_code:'',
      material_name:'',

      deliveryNo:"",
      from_supplier_id:"",
      delivery_time:"",
      remark:"",
      material_list:[],
      supplierList:[],

      tempMaterialValue:'',
      material_dw:"",
      material_type:"",
      materialList:[],

      itemAdd:1,
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

    deliveryDialogShow(){
      this.deliveryDialog=true
      getAllMaterial().then(response=>{
        this.material_list=response;
      })
      getAllSupplier().then(response=>{
        this.supplierList=response;
      })
    },
    addDelivery(){
      this.params.from_supplier_id=this.from_supplier_id
      this.params.delivery_code=this.deliveryNo
      this.params.delivery_time=this.delivery_time
      this.params.remark=this.remark
      if(this.from_supplier_id==""){
        Message.warning("送货商为空")
      }else if(this.deliveryNo==""){
        Message.warning("送货单为空")
      }else if(this.delivery_time==""){
        Message.warning("送货时间为空")
      }else{
        addDelivery(this.params).then(response=>{
          console.log(response)
        })
      }
    },
    deliveryDialogClose(){
      getAllDelivery().then(response=>{
        this.deliveryList=response;
        this.deliveryListTemp=response;
        console.log(this.deliveryList)
      })
    },
    handleClick(id){
      this.DeliveryDetailDialog=!this.DeliveryDetailDialog
      this.params.delivery_id=id
      getDeliveryDetailBy(this.params).then(response=>{
        this.deliveryDetailList=response
      })
      console.log(id)
    },
    onDeliveryTitleChange(){
      console.log(this.from_supplier_id)
    },
    onMaterialTitleChange(){
      this.material_dw=""
    },
    addMaterialDialogShow(){
      this.addMaterialDialog=!this.addMaterialDialog
      getAllMaterial().then(response=>{
        this.materialList=response
      })
    },
    addOneitem(){
      this.itemAdd=this.itemAdd+1;
    },
    delOneitem(){
      this.itemAdd=this.itemAdd-1;
    }
  },
  beforeCreate() {
    getAllDelivery().then(response=>{
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
.MinCommonInput{
  width: 250px;
}
.maxMinCommonInput{
  width: 50px;
}
</style>

