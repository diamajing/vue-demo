/**
 * Created by test
 * test
 * flight resource
 */

module.exports = function(vm){
	let resAddrother = {
		test: {method: 'GET', url: 'FBdemo/hello'},
	};
	let resOther = vm.$resource('/FBdemo/hello/', {}, resAddrother);
	return {
		test: function (params) {
			return resOther.test(params).then(function (response) {
				return response.json();
			});
		},
	};
};
