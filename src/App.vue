<template>
  <div id="app">
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
  import resInterceptor from './resource/interceptor';
  import loading from './components/loading';
  import SessionUtil from './utils/session';
  import _ from 'lodash';
  export default {
    name: 'app',
    components: {
      loading
    },
    beforeCreate(){
      resInterceptor(this);	// 拦截器
      console.log('kkkkkkkkko');
      let accountInfo = SessionUtil.get('token');
      if (_.isEmpty(accountInfo)) {
//          LoginCommon.cleanAppData();
        console.log('kkkkkkkkko222222222');
        this.$router.push({name: "home"});
      }
    },
    route : {
      canReuse: function () {
        // 判断是否登录
      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1F2D3D;
  }
</style>
