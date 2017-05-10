/**
 * Created by test
 * 国内机票
 * flight resource
 */

module.exports = function(vm){
	let resAddrother = {
		// 查询国内单程航班信息
		owList: {method: 'GET', url: 'api/flight/domeOwFlight'},
	};
	let resOther = vm.$resource('../api/flight/', {}, resAddrother);
	return {
		owList: function (params) {
			return resOther.owList(params).then(function (response) {
				return response.json();
			});
		},
	};
};
