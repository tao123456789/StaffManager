<template>
<div id="allMaterial">
  <el-input style="width: 200px" v-model="info"></el-input>
  <el-button @click="find">查找</el-button>
  <el-button @click="reset()">重置</el-button>
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
    }
  },
  beforeCreate() {
    this.$axios.get('http://localhost:8087/material/getAllMaterial',{
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

