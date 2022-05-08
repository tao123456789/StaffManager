<template>
  <div id="app">
    <div class="layout">
      <el-input type="textarea" v-model="json"></el-input>
        <el-button @click="ggg" type="primary">转换</el-button>
      <el-input type="textarea" v-model="newjson"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json:'',
      newjson:''
    }
  },
  methods:{
    ggg(){
      let temp=JSON.parse(this.json)
      this.newjson=JSON.stringify(temp,null,4)
    }
  },
}
</script>

<style scoped lang="less">
.el-textarea{
  width: 40vw;
  margin-top: 20px;
  margin-left: 20px;
}
.el-button{
  margin-left: 20px;
  width:auto
}
</style>
