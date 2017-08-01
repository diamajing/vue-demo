<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
          <template slot="title"><i class="el-icon-menu"></i>{{ item.title }}</template>
          <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i class="el-icon-setting"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {},
    data() {
      return {
        items: [
          {
            index: 'readme',
            title: '自述'
          },
          {
            index: '2',
            title: '表格数据',
            subs: [
              {
                index: 'basetable',
                title: '基础表格'
              }
            ]
          },
          {
            index: '3',
            title: '图表',
            subs: [
              {
                index: 'basecharts',
                title: '基础图表'
              }
            ]
          },
          {
            index: '4',
            title: '系统管理'
          }
        ]
      };
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('/','');
      }
    }
  };
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
