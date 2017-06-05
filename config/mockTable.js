
var _ = require("lodash");
var flight = require("./mock/flight.js");
var proxy = require("./mock/proxy.js");


/**
 * local : 本地
 * proxy : 代理
 * all   : 所有
 */

module.exports = {
	mockType : 'proxy',
	table :   _.extend({},
    flight,proxy
  )
	};
