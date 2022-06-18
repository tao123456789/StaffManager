import http from "../../common/http";

export function getModule(){
  return http.get('/api/user/GetModule')
}
export function getModuleListByUserID(params){
  return http.get('/api/user/GetModuleByUserId',params)
}
export function register(params){
  return http.post('/api/register',params)
}

export function getUserByID(){
  return http.get('/api/user/getUserByUserId')
}

export function updateUserInfoApi(params){
  return http.post('/api/user/updateUserInfo',params)
}
