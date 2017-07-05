/**
 * Created by test
 * test
 * flight resource
 */

module.exports = function(vm){
	let resAddrother = {
		test: {method: 'GET', url: 'Test-1-Test/info/hello'},
	};
	let resOther = vm.$resource('/Test-1-Test/info/hello', {}, resAddrother);
	return {
		test: function (params) {
			return resOther.test(params).then(function (response) {
				return response.json();
			});
		},
	};
};
