import http from "../../common/http";

export function getFileList(url){
  return http.get('/api/XPHnetDisk/getFileList',url)
}
export function uploadFile(params){
  return http.postFile("/api/XPHnetDisk/uploadFile",params,"multipart/form-data")
}
export function addFilePath(params){
  return http.get("/api/XPHnetDisk/addFilePath",params)
}
export function download(params){
  return http.download("/api/XPHnetDisk/downloadFile",params)
}
