<template>
<div id="index">
<el-container>
<!--  顶栏-->
  <el-header height="70px">
    <el-container direction="horizontal">
        <img src="../../../build/logo.png" height="50px" width="50px">
        <h1 style="font-size: 35px">后台管理系统</h1>
    </el-container>
  </el-header>

<!--  嵌套容器-->
  <el-container>
<!--    侧边导航菜单-->
    <el-aside width="30px"></el-aside>
    <el-aside width="200px">
      <el-row>
        <el-col>
          <h3>首页</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <h3>常用工具</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tree
            ref="tree"
            show-checkbox
            accordion
            :load="handleLoad"
            lazy
            node-key="id"
            :default-expanded-keys="[rootNode.id]"
            :default-checked-keys="[]"
            :props="defaultProps"
            :expand-on-click-node="true"
            :highlight-current="true"
            :default-expand-all="false">
          </el-tree>
        </el-col>
      </el-row>
    </el-aside>

<!--    内容-->
    <el-main>
<!--      第一列栅格布局-->
      <el-row>
        <el-table></el-table>
      </el-row>
    </el-main>
  </el-container>
</el-container>

<!--  底栏-->
  <el-footer height="40px">
    &copy;yangtao
  </el-footer>
</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      content:'',
      treeData:[],
      rootKey:'00000002',
      rootNode : {
        id : "00000002",
        label : "父节点"
      },
      checkedKeys : []
    }
  },
  methods:{
    /**
     * 根节点写死子节点懒加载
     */
    handleLoad(node, resolve) {
      // 懒加载先保存当前选中的节点key, 展开后再设置一遍解决展开某选中节点后选中被取消的问题
      if(this.$refs.tree!=undefined) this.checkedKeys = this.$refs.tree.getCheckedKeys();
      if (node.level == 0) {
        return resolve([this.rootNode]);
      } else {
        var children = [
          {
            id : "00000003",
            label : "子节点1"
          },
          {
            id : "00000004",
            label : "子节点2"
          },
          {
            id : "00000005",
            label : "子节点3"
          }
        ];
        resolve(children);
      }
      if(this.$refs.tree!=undefined) this.$refs.tree.setCheckedKeys(this.checkedKeys);
    },
    test() {
      var checkedKeys = this.$refs.tree.getCheckedKeys();
      console.log(checkedKeys);
    }
  },
}
</script>

<style>
/*顶部样式*/
.el-header{
  background-color: dimgray;
  color: white;
}
/*左侧样式*/
.el-aside{
  background-color: #84C1FF;
  height: 866px;
}
/*底栏样式*/
.el-footer{
  background-color: #ECF5FF;
}
.el-tree{
  background-color: #84C1FF;
}
</style>
