import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import homepage from "../components/homepage/homepage";

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
      component: homepage
    },
  ]
})
