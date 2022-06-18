import controller from "../../components/controller/index/index"
import logger from "../../components/controller/log/log"
import netStatus from "../../components/controller/netStatus/netStatus"
import AspectLog from "../../components/controller/aspectlog/index"
import allUser from "../../components/controller/user/allUser";
import auth from "../../components/controller/auth/index"
import setting from "../../components/controller/setting/index"
import subscriber from "../../components/controller/subscriber/index"

export default [
  {
    path: '/Controller',
    name: 'controller',
    component: controller,
    children: [
      //账号管理
      {
        path: '/allUser',
        name: 'allUser',
        component: allUser,
      },
      //权限管理
      {
        path: '/auth',
        name: 'auth',
        component: auth,
      },
      //订阅管理
      {
        path: '/subscriber',
        name: 'subscriber',
        component: subscriber,
      },
      {
        path: '/logger',
        name: 'logger',
        component: logger,
      },
      //切面日志界面路由
      {
        path: '/AspectLog',
        name: 'AspectLog',
        component: AspectLog,
      },
      {
        path: '/setting',
        name: 'setting',
        component: setting,
      },
      //网络状态
      {
        path: '/netStatus',
        name: 'netStatus',
        component: netStatus,
      }
    ],
  },
]


