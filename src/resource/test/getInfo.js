/**
 * Created by test
 * getInfo
 * flight resource
 */

module.exports = function(vm){
  let resAddrother = {
    test: {method: 'GET', url: 'Test-1-Test/info/getAllInfo'},
  };
  let resOther = vm.$resource('/Test-1-Test/info/getAllInfo', {}, resAddrother);
  return {
    test: function (params) {
      return resOther.test(params).then(function (response) {
        return response.json();
      });
    },
  };
};
