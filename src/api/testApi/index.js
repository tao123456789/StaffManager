import http from "../http.js";

//client测试test方法
function testGet(){
  return http.get('/api/test')
}

export {
  testGet,
}
