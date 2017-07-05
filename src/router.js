/**
 * 路由配置表
 */

export default {
  routes: [
    {
      path: '/', // 首页
      redirect: '/login/login.vue'
    },
    {
      name: 'readme', // 登录页
      path: '/readme',
      component: resolve => require(['./pages/home/personal.vue'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['./pages/Readme/Readme.vue'], resolve)
        },
        {
          name:"basetable",
          path: '/basetable',
          component: resolve => require(['./pages/List/list.vue'], resolve)
        },
        {
          name:'baseform',
          path: '/baseform/:orderId',
          component: resolve => require(['./pages/form/form.vue'], resolve)
        },
        {
          name:'basecharts',
          path: '/basecharts',
          component: resolve => require(['./pages/chart/chart.vue'], resolve)
        }
      ]
    },
    {
      name: 'home', // 登录页
      path: '/home',
      component: function (resolve) {
        require(['./pages/login/login.vue'], resolve);
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
    },
    {
      name: 'form', //form
      path: '/form',
      component: function (resolve) {
        require(['./pages/form/form.vue'], resolve);
      }
    },
  ]
};
