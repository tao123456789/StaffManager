import http from "../../common/http";

export function getAspectLogList(params) {
  return http.get('/api/logger/getAspectLog',params)
}export function getAspectLogCount(params) {
  return http.post('/api/logger/getAspectLogPage',params)
}
