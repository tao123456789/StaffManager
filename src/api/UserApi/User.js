import http from "../../common/http";

export function getModuleList(params){
  return http.get('/api/user/GetModuleByUserId')
}
export function register(params){
  return http.post('/api/register',params)
}
