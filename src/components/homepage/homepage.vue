<template>
<div id="index">
<el-container>
<!--  顶栏-->
  <el-header height="70px">
    <el-container direction="horizontal">
        <h1 style="font-size: 35px">后台管理系统</h1>
    </el-container>
  </el-header>

<!--  嵌套容器-->
  <el-container>
<!--    侧边导航菜单-->
    <el-aside width="200px">
      <el-row>
        <el-col>
          <button style="width: 100%"  @click="showMaterial(aside[0])">{{aside[0]}}</button>
          <button style="width: 100%"  @click="showMaterial(aside[1])">{{aside[1]}}</button>
          <button style="width: 100%"  @click="showMaterial(aside[2])">{{aside[2]}}</button>
        </el-col>
      </el-row>
    </el-aside>

<!--    内容-->
    <el-main>
      <el-header height="20px"><button ref="button" v-for="(item,i) in ButtonCount" style="width: 50px;height: 20px" @click="test(i)">{{ButtonCount[i]}}</button></el-header>
      <el-row>
        <el-table></el-table>
      </el-row>
    </el-main>
  </el-container>
</el-container>

<!--  底栏-->
  <el-footer height="40px">
    &copy;yangtao
  </el-footer>
</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      aside:["全部物料","添加物料","人员管理"],
      ButtonCount:[
      ],
      checkedKeys : []
    }
  },
  methods: {
    test(i) {
      this.$message.success('点击了' + this.ButtonCount[i])
    },
    showMaterial(name) {
      var exit=false
      var i
      for(i=0;i<this.ButtonCount.length+1;i++){
        if(name===this.ButtonCount[i]){
          exit=true
          break
        }
      }
      if(exit===false) {
        this.ButtonCount.push(name)
      }
    }
  }
}
</script>

<style>
/*顶部样式*/
.el-header{
  background-color: dimgray;
  color: white;
}
/*左侧样式*/
.el-aside{
  background-color: #84C1FF;
  height: 866px;
}
/*底栏样式*/
.el-footer{
  background-color: #ECF5FF;
}
.el-tree{
  background-color: #84C1FF;
}
</style>
