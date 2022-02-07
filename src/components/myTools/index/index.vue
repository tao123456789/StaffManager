<template>
  <div id="homepage">
    <el-container>
      <!--  顶栏-->
      <el-header height="70px">
        <el-container direction="horizontal">
          <h1 style="height:60px;font-size: 35px;padding-top: 10px;">个人应用</h1>
        </el-container>
      </el-header>
    </el-container>
    <el-container style="background-color: #72767b;" direction="vertical">
      <div style="padding-top: 20px ">
        <el-input class="selectInput" placeholder="请输入请求地址"></el-input>
        <el-select v-model="value"  placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="width: 120px">执行</el-button>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "homepage",
  data(){
    return{
      options: [{
        value: '选项1',
        label: 'GET'
      }, {
        value: '选项2',
        label: 'POST'
      }, {
        value: '选项3',
        label: 'DELETE'
      }, {
        value: '选项4',
        label: '---'
      }],
      value: ''
    }
  }
}
</script>

<style scoped>
/*顶部样式*/
.el-header{
  background-color: dodgerblue;
  color: white;
}
.el-input{
  width: 80px;
}
.selectInput{
  padding-left: 20px;
  width: 800px;
}
.selectInput2{
  padding-left: 20px;
  width: 800px;
  height: 300px;
}
</style>
