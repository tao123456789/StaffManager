<template>
<div id="homepage">
  <el-container>
  <!--  顶栏-->
    <el-header height="70px">
      <el-container direction="horizontal">
          <h1 style="height:60px;font-size: 35px;padding-top: 10px;color: white">物料管理后台系统</h1>
      </el-container>
    </el-header>
    <el-row :gutter="30">
      <!--        xs	<768px 响应式栅格数或者栅格属性对象	用于超小型设备-->
      <!--        sm	≥768px 响应式栅格数或者栅格属性对象	用于小屏设备-->
      <!--        md	≥992px 响应式栅格数或者栅格属性对象	用于中屏设备-->
      <!--        lg	≥1200px 响应式栅格数或者栅格属性对象	用于大屏设备-->
      <!--        xl	≥1920px 响应式栅格数或者栅格属性对象	用于超大屏设备-->
  <!--  嵌套容器-->
    <el-container>
        <el-col :xs="2" :sm="3" :md="3" :lg="3" :xl="3">
          <!--    侧边导航菜单-->
          <el-aside style="max-width: 150px">
            <div class="base-aside">
            <el-menu
              class="el-menu-vertical-demo"
              background-color="#fff"
              text-color="#666"
              active-text-color="#345ACF"
              router>
              <el-submenu
                v-for="(menu, index) in menuData"
                :key="index"
                :index="index+''">
                <template slot="title">
                  <i :class="[menu.icon]"></i>
                  <span>{{menu.name}}</span>
                </template>

                <el-menu-item
                  v-for="(item, i) in menu.children"
                  :key="index+'-'+i"
                  :index="item.url"
                  @click="clickMenu(item)">
                  <span>{{item.name}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
            </div>
          </el-aside>
        </el-col>
        <!--    内容-->
        <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
        <el-main>
              <router-view v-if="show"/>
            </el-main>
        </el-col>
    </el-container>
    </el-row>
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
      checkedKeys : [],
      //el-menu的菜单数据
      menuData: [],
      isCollapse: false
    }
  },
  //引入组件
  components:{
  },

  methods: {
    //重做左边menu栏
    // 点击菜单
    clickMenu(value) {
      //通过vuex将数据存储在store中
      this.show=true
      this.$router.push(value.url)
    }
  },
  beforeMount(){
    this.$axios.get('/api/menu/getMenu',{
      headers:{
        'Content-Type':'application/json',
        'token':this.$store.state.Token.token
      }
    }).then(response=>{
      console.log("获取用户的菜单"+JSON.stringify(response.data))
      this.menuData=response.data
    },error=>{
      this.$message.error(error)
    })
  }
}
</script>

<style>
/*顶部样式*/
.el-header{
  background-color: #0072E3;
}
/*左侧样式*/
.el-aside{
  background-color: #C4E1FF	;
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
