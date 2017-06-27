/**
 * Created by Administrator on 2017/6/27.
 */
/**
 * Created by test
 * del
 * flight resource
 */

module.exports = function(vm){
  let resAddrother = {
    test: {method: 'GET', url: 'Test-1-Test/checkInfo'},
  };
  let resOther = vm.$resource('/Test-1-Test/checkInfo', {}, resAddrother);
  return {
    test: function (params) {
      return resOther.test(params).then(function (response) {
        return response.json();
      });
    },
  };
};
