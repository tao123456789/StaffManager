<template>
  <div>
    <div>
      <p style="">HelloWorld</p>
      <el-button @click="test()">getToken</el-button>
      <el-button @click="test2()">test接口触发</el-button>
    </div>
  </div>
</template>

<script>
import {testGet} from '../api/testApi'
import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {
      UserDo: {
        id:'123',
        userName: 'yt',
        userPasswd: '123'
        }
    }
  },
  methods: {
    test(){
      this.$axios.post('http://localhost:8087/user/getToken',{'UserDo1':'UserDo'},{headers:{'Content-Type':'application/json;charset=UTF-8'}})
      },
    test2(){
      this.$axios.get('http://localhost:8087/user/getMessage',{headers:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjMifQ.aGFldwhacqQqHt4w6ZvOXvLnWt-RvrteKTLNTleUWcQ',
        }})
    }
  }
}
</script>


