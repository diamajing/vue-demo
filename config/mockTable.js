
var _ = require("lodash");
var flight = require("./mock/flight.js");


/**
 * local : 本地
 * proxy : 代理
 * all   : 所有
 */

module.exports = {
	mockType : 'local',
	table :   _.extend({},
    flight
  )
	};
