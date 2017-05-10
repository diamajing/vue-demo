/**
 * 路由配置表
 */

export default {
  routes: [
    {
      path: '/', // 首页
      redirect: '/home/personal.vue'
    },
    {
      name: 'home', // 登录页
      path: '/home',
      component: function (resolve) {
        require(['./pages/home/personal.vue'], resolve);
      }
    },
    {
      path: '*', // 其他页面，强制跳转到home页面
      redirect: '/home'
    },
    {
      name: 'notFound',
      path: '/404',
      component: function (resolve) {
        require(['./pages/404.vue'], resolve);
      }
    }
  ]
};
