// http request 请求拦截器，有token值则配置上token值
import axios from 'axios'
import Promise from 'promise'
import util from './utils';
import {store} from './../store/index';
import {Message} from "element-ui";
const service = axios.create({
  timeout: 60000, // 请求超时时间
  headers: {
    // Authorization: Authorization,
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
// http请求拦截器
service.interceptors.request.use(
  config => {
    let tokenExist = util.tokenExist();
    if (tokenExist) {
      // bus.$emit('toggleloading', true)//显示loading
      //如果token存在
      config.headers['Authorization'] = util.getToken();
      config.headers['token'] = `${util.getToken()}`;
    }
    // Toast.loading({
    //     message: '加载中...',
    //     duration: 0,
    //     forbidClick: true
    // });
    return config;
  },
  error => {
    Promise.reject(error);
  }
)
// http response 服务器响应拦截器，
// 这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      //通讯成功
      // Toast.clear();
      /*************
       * response.data.status === 0 错误
       * response.data.status === 100 成功
       * response.data.status === 401 token过期
       *
       * *************/
      // bus.$emit('toggleloading', false)//隐藏loading
      if (response.data.code === 200) {
        //如果是token过期，跳转至登录
        Message.success("请求成功："+response.data.msg);
      }
      if (response.data.code === 401) {
        //如果是token过期，跳转至登录
        Message.error("登录已过期，请重新登录！");
        store.commit('SET_TOKEN', '');
        util.goLogin();
      }
      if (response.data.code === 2001) {
        // 账号密码错误
        Message.error(response.data.msg);
        util.goLogin();
      }
      if(response.data.code === 500){
        Message.error("网络问题！");
        util.goLogin();
      }else {
        return response.data;
      }
    }
  },
  error => {
    //请求失败
    Message.error("请求失败："+error);
    return Promise.reject(error);
  }
);
export default service;
