import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import MMS from "../components/homepage/homepage";
import index from "../index/index";
import allMaterial from '../components/material/allMaterial'
import allUser from "../components/user/allUser";
import test from "../components/test"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
      //   {
      //   path: '/allMaterial',
      //   name: 'allMaterial',
      //   component: allMaterial
      // },
      //   {
      //     path: '/allUser',
      //     name: 'allUser',
      //     component: allUser
      //   },
      //   {
      //     path: '/test',
      //     name: 'test',
      //     component: test
      //   },
      ]
    },
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
    }
  ]
})
