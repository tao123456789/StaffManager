import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import MMS from "../components/mms/index/index";
import index from "../index/index";
import allMaterial from '../components/mms/material/allMaterial'
import allUser from "../components/mms/user/allUser";
import menuSetting from "../components/mms/setting/menuSetting/index"
import test from "../components/test"
import myTools from "../components/myTools/index/index"
import demo from "../layout/demoLayout/demoLayout"
import jsonTool from "../components/tools/jsonTool"
import log from "../components/log/log"


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
    //日志系统的路由
    {
      path:'/log',
      name:'log',
      component:log,
      children: []
    },
    //index页的其他工具路由
    {
      path:'/jsonTool',
      name:'jsonTool',
      component:jsonTool,
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

