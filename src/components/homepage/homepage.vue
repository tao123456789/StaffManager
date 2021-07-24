<template>
<div id="homepage">
<el-container>
<!--  顶栏-->
  <el-header height="70px">
    <el-container direction="horizontal">
        <h1 style="font-size: 35px">后台管理系统</h1>
      <p @click="quit()" style="margin-right: 10px;float:right">退出</p>
    </el-container>
  </el-header>

<!--  嵌套容器-->
  <el-container>
<!--    侧边导航菜单-->
    <el-aside width="200px">
      <el-row>
        <el-col>
          <button style="width: 100%; height: 30px"  @click="showMaterial(tag[0])">{{tag[0]}}</button>
          <button style="width: 100%; height: 30px"  @click="showUser(tag[1])">{{tag[1]}}</button>
        </el-col>
      </el-row>
    </el-aside>

<!--    内容-->
    <el-main>
      <el-header height="auto"  style="background-color: #FFFFFF;">
        <el-tag ref="button" v-for="(item,i) in ButtonCount" style="width: 90px;height: 25px" v-bind:key="item.i">
          <span>
          <p style="height:15px;width:60px;text-align:center;display:inline-block" @click="test2(i)">{{ButtonCount[i]}}</p><img alt="" src="../../../static/common/tips.png" height="10px" width="20" @click="test(i)"/>
          </span>
        </el-tag>
      </el-header>
      <el-main>
        <router-view v-if="show"/>
      </el-main>
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
  name: "homepage",
  data(){
    return{
      show:false,
      tag:["全部物料","人员管理"],
      ButtonCount:[],
      checkedKeys : []
    }
  },
  components:{
  },
  methods: {
    test(i) {
      this.$message.success(this.ButtonCount[i])
      this.ButtonCount.splice(i,1)
      this.show=false
      this.$router.go(-1)
      this.show=true
    },
    test2(i) {
      this.$message.success(this.ButtonCount[i])
    },
    quit(){
      this.$router.push('/')
    },

    //查询物料
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
      if(this.$route.path==="/allMaterial") {
        this.$message.success("页面已开启！！！")
      }else{
        this.show=true
        this.$router.push('/allMaterial')
      }
    },
    //查询用户
    showUser(name){
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
      if(this.$route.path==="/allUser"){
        this.$message.success("页面已开启！！！")
      }else {
        this.show=true
        this.$router.push('/allUser')
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
