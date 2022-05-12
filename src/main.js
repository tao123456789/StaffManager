// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {store} from './store/index'
import jsonView from 'vue-json-views'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueAxios,axios);
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem('token')
  if(to.path==='/'){
    return next()
  }else{
    if(!token){
      console.log('Token已失效！请重新登录！')
      Message.error('Token已失效！请重新登录！')
      return next('/')
    }else{
      return next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  jsonView,
  store,
  components: { App },
  template: '<App/>'
})
