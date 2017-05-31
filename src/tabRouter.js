/**
 * tab路由配置表
 * @author:liuyue@travelsky.com
 */

export default [{
	name: 'baseTabel',
	title: '基础表格',
	component: function(resolve){
		require(['./pages/form/form'], resolve);
	}
}, {
	name: 'home',
	title: '首页',
	component: function(resolve){
		require(['./pages/home/personal'], resolve);
	}
}];
