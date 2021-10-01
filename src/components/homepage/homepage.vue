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
          <button type="primary" v-for="(item,i) in menu" style="width: 100%; height: 30px"  @click="handleClick(item.action_url,item.action_name)">{{item.action_name}}</button>
        </el-col>
      </el-row>
    </el-aside>

<!--    内容-->
    <el-main>
        <el-tag v-for="(item,i) in ButtonCount" closable :disable-transitions="false"  v-bind:key="item" @close="handleClose(i)">
          {{item}}
        </el-tag>
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
      functions:'',
      show:false,
      menu:[],
      ButtonCount:[],
      checkedKeys : []
    }
  },
  components:{
  },
  methods: {
    test2(i) {
      this.$message.success(this.ButtonCount[i])
    },
    quit(){
      this.$router.push('/')
    },

    //统一处理menu的按钮事件
    handleClick(url,name){
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

      if(this.$route.path===url) {
        this.$message.success("页面已开启！！！")
      }else{
        this.show=true
        this.$router.push(url)
      }
    },

    //tag标签关闭
    handleClose(i){
      if(this.ButtonCount.length===1){
        this.ButtonCount.splice(i, 1)
        this.$router.push('/homepage')
        this.show = false
      }else {
        this.ButtonCount.splice(i, 1)
        this.show = false
        this.$router.go(-1)
        this.show = true
      }
    },
  },
  beforeMount(){
    let userID=this.$store.state.Token.userID
    console.log("全局参数的userid"+this.$store.state.Token.userID)
    console.log("全局参数的token"+this.$store.state.Token.token)
    this.$axios.get('/api/menu/getMenu/'+userID,{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token
      }
    }).then(response=>{
      console.log("获取用户的菜单"+response.data)
      this.menu=response.data.actionArr
      console.log("获取赋值"+this.menu)
    },error=>{
      this.$message.error(error)
    })
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
