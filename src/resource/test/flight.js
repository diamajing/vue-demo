/**
 * Created by test
 * test
 * flight resource
 */

module.exports = function(vm){
	let resAddrother = {
		// 查询国内单程航班信息
		owList: {method: 'GET', url: 'test/hello/'},
	};
	let resOther = vm.$resource('../test/hello/', {}, resAddrother);
	return {
		test: function (params) {
			return resOther.owList(params).then(function (response) {
				return response.json();
			});
		},
	};
};
