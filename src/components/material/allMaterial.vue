<template>
<div id="allMaterial">
  在这显示所有物料
  <el-row :gutter="20"  class="el-row" type="flex" >
    <el-col :span="1">
      <el-checkbox></el-checkbox>
    </el-col>
    <el-col :span="2">序号</el-col>
    <el-col :span="4">物料编码</el-col>
    <el-col :span="4">物料名称</el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'allMaterial',
}
</script>

