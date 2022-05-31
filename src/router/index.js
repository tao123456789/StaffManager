import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import MMS from "../components/mms/index/index";
import index from "../index/index";
import allMaterial from '../components/mms/material/allMaterial'
import allUser from "../components/controller/user/allUser";
import menuSetting from "../components/mms/setting/menuSetting/index"
import test from "../components/test"
import myTools from "../components/myTools/index/index"
import demo from "../layout/demoLayout/demoLayout"
import jsonTool from "../components/tools/jsonTool"
import netStatus from "../components/controller/netStatus/netStatus"

import controller from "../router/controller/index"

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    //全局路由
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    ...controller,
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    //MMS系统的路由
    {
      path:'/MMS',
      name:'MMS',
      component:MMS,
      children: [
          {
          path: '/allMaterial',
          name: 'allMaterial',
          component: allMaterial
        },
          {
            path: '/allUser',
            name: 'allUser',
            component: allUser
          },
          {
            path: '/test',
            name: 'test',
            component: test
          },
        {
          path:'/menuSetting',
          name:'menuSetting',
          component:menuSetting,
        },
      ]
    },
    //myTools系统的路由
    {
      path:'/myTools',
      name:'myTools',
      component:myTools,
      children: []
    },
    //权限路由
    // controller,
    //index页的其他工具路由
    {
      path:'/jsonTool',
      name:'jsonTool',
      component:jsonTool,
      children: []
    },
    //网络状态
    {
      path:'/netStatus',
      name:'netStatus',
      component:netStatus,
      children: []
    },
    {
      path:'/demo',
      name:demo,
      component:demo,
      children:[]
    }
  ]
})

