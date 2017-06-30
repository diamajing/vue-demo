// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import vuexStore from './store/store';
import Taber from './plugin/vue-tabs/VueTaber';
import tabRouterMap from './tabRouter';

// 引入vue-router
import Router from 'vue-router';
// 引入路由表
import routerMap from './router';
// 声明使用vue-router
Vue.use(Router);
// 路由表引入
const router = new Router(routerMap);



/* tab路由配置 */
Vue.use(Taber);
const taber = new Taber({
  tabs:tabRouterMap,
  persist:true
});

Vue.config.productionTip = false;
import VueResource from 'vue-resource';// 引入vue-resource
Vue.use(VueResource);
// 引入vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store(vuexStore);


// 引入vue-validator
import VueValidator from 'vue-validator';
import customValidator from './validator';
Vue.use(VueValidator);
customValidator(Vue);
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
window.vueApp = new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router,
  taber,
  store
});
