/**
 * Created by test
 * insert
 * flight resource
 */

module.exports = function(vm){
  let resAddrother = {
    test: {method: 'GET', url: 'Test-1-Test/info/addInfo'},
  };
  let resOther = vm.$resource('/Test-1-Test/info/addInfo', {}, resAddrother);
  return {
    test: function (params) {
      return resOther.test(params).then(function (response) {
        return response.json();
      });
    },
  };
};
