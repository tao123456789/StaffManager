import http from "../../common/http.js";

//client测试test方法
function testGet(){
  return http.get('/api/test')
}

export {
  testGet,
}
