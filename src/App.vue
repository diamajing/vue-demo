<template>
  <div id="app">
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
  import resInterceptor from './resource/interceptor';
  import loading from './components/loading';
  export default {
    name: 'app',
    components: {
      loading
    },
    beforeCreate(){
      resInterceptor(this);	// 拦截器
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
