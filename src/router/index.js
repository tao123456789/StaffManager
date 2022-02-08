import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import MMS from "../components/mms/index/index";
import index from "../index/index";
import allMaterial from '../components/mms/material/allMaterial'
import allUser from "../components/mms/user/allUser";
import test from "../components/test"
import myTools from "../components/myTools/index/index"
import demo from "../components/demo/index/index"

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
      ]
    },
    //myTools系统的路由
    {
      path:'/myTools',
      name:'myTools',
      component:myTools,
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

