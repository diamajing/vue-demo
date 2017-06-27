/**
 * Created by test
 * del
 * flight resource
 */

module.exports = function(vm){
  let resAddrother = {
    test: {method: 'GET', url: 'Test-1-Test/deleteInfo'},
  };
  let resOther = vm.$resource('/Test-1-Test/deleteInfo', {}, resAddrother);
  return {
    test: function (params) {
      return resOther.test(params).then(function (response) {
        return response.json();
      });
    },
  };
};
