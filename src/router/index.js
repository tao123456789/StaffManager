import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import homepage from "../components/homepage/homepage";
import allMaterial from '../components/material/allMaterial'
import allUser from "../components/user/allUser";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      children: [{
        path: '/allMaterial',
        name: 'allMaterial',
        component: allMaterial
      },
        {
          path: '/allUser',
          name: 'allUser',
          component: allUser
        },
      ]
    },
  ]
})
