/**
 * tab路由配置表
 * @author:liuyue@travelsky.com
 */

export default [{
  name: 'list',
  locked:true,
  title: '数据展示',
  component: function(resolve){
    require(['./pages/List/list.vue'], resolve);
  }
},{
	name: 'baseTabel',
	title: ' 新建用户',
	component: function(resolve){
		require(['./pages/form/form.vue'], resolve);
	}
}, {
	name: 'home',
	title: '首页',
	component: function(resolve){
		require(['./pages/home/personal.vue'], resolve);
	},
},{
  name: 'readme',
  title: '自述',
  component: function(resolve){
    require(['./pages/Readme/Readme.vue'], resolve);
  }
},{
  name: 'chart',
  title: '图表',
  component: function(resolve){
    require(['./pages/chart/chart.vue'], resolve);
  }
},{
  name: 'tabelModify',
  title: '修改信息',
  component: function(resolve){
    require(['./pages/form/modifyForm.vue'], resolve);
  }
}];
