import http from "../../common/http";

export function getFileList(params){
  return http.get('/api/XPHnetDisk/getFileList?url=/user/data/upload',params)
}
