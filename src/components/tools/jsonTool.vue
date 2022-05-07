<template>
  <div>
    <el-input type='text' v-model='value'></el-input>
    <el-input></el-input>
  </div>
</template>

<script>
export default {
  name: "jsonTool",
  data(){
    return{
      value:"默认值"
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 40%;
  height: 100vh;
  margin-top: 20px;
  margin-left: 5%;
}
.el-input__inner{
   width: 50px;
  min-height: 500px;
 }
</style>
