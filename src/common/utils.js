import {store} from '../store/index';
let util = {
  //获取token
  getToken() {
    return store.getters.token;
  },
  //判断token是否存在
  tokenExist() {
    let flag;
    let token = store.getters.getToken;
    if (token && token !== '') {
      flag = true;
    } else {
      flag = false;
    }
    return token;
  },
  goLogin(){
    this.$router.push('/')
  }
}
export default util
