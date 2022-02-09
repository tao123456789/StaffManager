// BaseAside.vue
<template>
  <div class="base-aside">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#666"
      active-text-color="#345ACF"
      router>
      <el-submenu
        v-for="(menu, index) in menuData"
        :key="index"
        :index="index">
        <template slot="title">
          <i :class="[menu.icon]"></i>
          <span>{{menu.name}}</span>
        </template>

        <el-menu-item
          v-for="(item, i) in menu.children"
          :key="index+'-'+i"
          :index="item.url"
          @click="clickMenu(item)">
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: 'base-aside',
  data() {
    return {
      menuData: [],
      isCollapse: false
    }
  },
  created() {
    this.initMenu();
  },
  methods: {
    /**
     * 初始化菜单数据
     */
    initMenu() {
      this.menuData = [{
        icon: 'el-icon-postcard',
        name: '授信管理',
        url: "/",
        children: [{
          name: "授信审核",
          url: '/risk/riskCredit',
        }]
      },
        {
          icon: 'el-icon-tickets',
          name: '订单管理',
          url: "/",
          children: [
            {
              name: "订单管理",
              url: '/stock/coreStockList',
            }
          ]
        },
        {
          icon: 'el-icon-document-checked',
          name: '合同管理',
          url: "/",
          children: [
            {
              name: "订单合同",
              url: '/contract/coreContractList',
            }
          ]
        },
        //省略 ...
      ];
    },

    // 点击菜单
    clickMenu(value) {
      //通过vuex将数据存储在store中
      this.$store.commit('mutationSelectTags', value)
    }

  }
}

</script>

