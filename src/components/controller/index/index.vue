<template>
  <div id="controller">
    <!--    顶部导航栏-->
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#46A3FF"
      text-color="#FFF"
      active-text-color="#FFF"
      router>
      <el-menu-item index="/index" style="font-size: medium">首页</el-menu-item>
      <el-menu-item index="/" style="font-size: medium">退出</el-menu-item>
<!--      <el-menu-item index="2" v-for="(item,index) in moduleList" :key="index">-->
<!--        <template slot="title">{{item.module_name}}</template>-->
<!--      </el-menu-item>-->
    </el-menu>
    <!--  嵌套容器-->
    <el-container>
        <!--    侧边导航菜单-->
        <el-aside>
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
      <!--    内容-->
        <el-main>
          <router-view v-if="show"/>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      functions: '',
      show: false,
      menu: [],
      ButtonCount: [],
      checkedKeys: [],
      //el-menu的菜单数据
      menuData: [],
      isCollapse: false
    }
  },
  created() {
    this.initMenu();
  },
  methods: {
    /**
     * 初始化菜单数据
     */
    initMenu() {
      this.menuData = [{
        icon: 'el-icon-postcard',
        name: '基础管理',
        url: "/controller",
        children: [
          {
          name: "账号管理",
          url: '/allUser',
          },
          {
            name: "权限管理",
            url: '/Auth',
          },
          {
            name: "订阅管理",
            url: '/Subscriber',
          }
        ]
      },
        {
          icon: 'el-icon-tickets',
          name: '日志管理',
          url: "/",
          children: [
            {
              name: "AOP切面日志",
              url: '/AspectLog',
            },
            {
              name: "控制台日志",
              url: '/logger',
            }
          ]
        },
        {
          icon: 'el-icon-document-checked',
          name: '配置管理',
          url: "/",
          children: [
            {
              name: "基础配置",
              url: '/setting',
            },
            {
              name: "定时任务管理",
              url: '/schedule',
            }
          ]
        },
        {
          icon: 'el-icon-document-checked',
          name: '网络管理',
          url: "/",
          children: [
            {
              name: "网络状态",
              url: '/netStatus',
            }
          ]
        },
        //省略 ...
      ];
    },

    // 点击菜单
    clickMenu(value) {
      //通过vuex将数据存储在store中
      this.show = true
      this.$router.push(value.url)
      // this.$store.commit('mutationSelectTags', value)
    },
    handleSelect(){

    }
  }
}
</script>

<style scoped>
</style>
