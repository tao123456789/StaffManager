import http from "../../common/http";

export function getAspectLogList(params) {
  return http.get('/api/logger/getAspectLog',params)
}
export function getAspectLogCount(params) {
  return http.post('/api/logger/getAspectLogPage',params)
}
export function getAspectLogInfoByUuid(params) {
  return http.get('/api/logger/getAspectLogInfoByUuid',params)
}
export function getSubscriberList(params) {
  return http.get('/api/subscriber/getSubscriberList',params)
}
export function changeStatus(params) {
  return http.get('/api/subscriber/changeStatus',params)
}
export function getSettingList(params) {
  return http.post('/api/setting/getSettingList',params)
}


