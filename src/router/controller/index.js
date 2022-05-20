import controller from "../../components/controller/index/index"
import logger from "../../components/controller/log/log"
import netStatus from "../../components/controller/netStatus/netStatus"
import AspectLog from "../../components/controller/aspectlog/index"

export default [
  {
    path: '/Controller',
    name: 'controller',
    component: controller,
    children: [
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
      //网络状态
      {
        path: '/netStatus',
        name: 'netStatus',
        component: netStatus,
      }
    ],
  },
]


