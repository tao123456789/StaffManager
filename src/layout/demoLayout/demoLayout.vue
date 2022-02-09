<template>
  <el-container>
    <BaseAside />
    <el-main>
      <el-header>
        <AppTag />
      </el-header>
      <el-main class="el-main-content">
        <router-view></router-view>
      </el-main>
      <el-footer>
        <BaseFooter />
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import BaseAside from "../../components/demo/BaseAside/BaseAside";
import AppTag from "../../components/demo/BaseAside/AppTag";
export default {
  name: "demoLayout",
  components:{
    BaseAside,
    AppTag,
  }
}
</script>

<style scoped>

</style>
