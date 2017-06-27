<template>
    <div class="header" :class="{'sidebar-mini':sidebarMini}">
        <div class="logo">
          <el-button type="primary" size="small" @click.native="toggleSidebar">
            <i class="fa fa-bars"></i>
          </el-button>
          后台管理系统
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../static/images/img.png">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
  import Session from "../utils/session";
    export default {
        data() {
            return {
                name: 'mj'
            };
        },
        computed:{
          sidebarMini(){
            return this.$store.state.sidebarMini;
          },
            username(){
                let username =Session.get('sys_username');
                return  username || this.name;
            }
        },
        methods:{
          toggleSidebar(){
            this.$store.commit("toggleSidebar");
          },
            handleCommand(command) {
                if (command === 'loginout'){
                  Session.clearAll('sys_username');
                    this.$router.push('/login');
                }
            },
            showLoading(){
              this.$store.commit("showLoading");
            }
        }
    };
</script>
<style rel="stylesheet/text" lang="scss" scoped>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: calc(100% - 220px);
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        z-index: 811;
        background-color: #3071a9;
        &.sidebar-mini {
           width: calc(100% - 70px);
         }
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
