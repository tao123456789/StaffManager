import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{//设置属性，用来存储数据
    Token: {
      token:''
    }
  },
  getter:{//对应方法，用来获取属性的状态
    getToken: state=>state.Token.token,
  },
  mutations:{//更改属性的状态，相当于set方法
    setToken(state,token){
      // console.log('mutation中的state:  '+state.toString());
      // console.log('mutation中的token：'+token)
      state.Token.token=token
    }
  },
  action:{//应用mutation

  },
  modules:{//给全局变量分组

  }
})
