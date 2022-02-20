<template xmlns="http://www.w3.org/1999/html">
  <div id="homepage">
    <el-container>
      <!--  顶栏-->
      <el-header height="70px">
        <el-container direction="horizontal" >
          <h1 style="height:60px;font-size: 35px;padding-top: 10px;">个人应用</h1>
<!--          <el-input style="height:60px;width: 300px;padding-top: 17px;padding-left: 30%" placeholder="请输入内容"></el-input>-->
        </el-container>
      </el-header>
      <div style="padding-right: 20px;padding-top: 20px;padding-left: 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 30px">常用网站</span>
          </div>
          <el-form style="height: 200px;width: 600px">
            <el-form-item>个人GIT地址：  <a href="https://github.com/tao123456789" target="_blank">https://github.com/tao123456789</a></el-form-item>
            <el-form-item>微信公众号平台：  <a href="https://mp.weixin.qq.com/cgi-bin/home" target="_blank">https://mp.weixin.qq.com/cgi-bin/home</a></el-form-item>
            <el-form-item>B站首页：  <a href="https://www.bilibili.com/" target="_blank">https://www.bilibili.com/</a></el-form-item>
            <el-form-item>虎牙直播：  <a href="https://www.huya.com/l" target="_blank">https://www.huya.com/l</a></el-form-item>
            <el-form-item></el-form-item>
          </el-form>
        </el-card>
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
.box-card {
  width: 650px;
  min-height: 200px;
}
.el-card:hover{
  margin-top: -10px;
}
</style>
