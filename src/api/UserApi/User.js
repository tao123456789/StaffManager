import http from "../../common/http";

export function getModule(){
  return http.get('/api/user/GetModule')
}

export function getAllModuleList(){
  return http.get('/api/user/GetAllModuleList')
}

export function getModuleListByUserID(params){
  return http.get('/api/user/GetModuleByUserId',params)
}

export function addModuleAPI(params){
  return http.get('/api/user/insertUserModule',params)
}

export function removeModuleAPI(params){
  return http.get('/api/user/removeModule',params)
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
