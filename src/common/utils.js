import {store} from '../store/index';
let util = {
  //获取token
  getToken() {
    return store.state.Token.token;
    // return store.getters.token;
  },
  //判断token是否存在
  tokenExist() {
    let flag;
    let token = store.state.Token.token;
    if (token && token !== '') {
      flag = true;
    } else {
      console.log("store的token不存在")
      flag = false;
    }
    return flag;
  },
  goLogin(){
    this.$router.push('/')
  },
  goIndex(){
    this.$router.push('/index')
  }
}
export default util
