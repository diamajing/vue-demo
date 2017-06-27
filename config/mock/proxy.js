
module.exports = {

	/************** proxy *******************/
  // http://172.20.19.14:8524/Test-1-Test/hello
	//  地址
  "/Test-1-Test/**": {
    type: 'proxy',
    target: 'http://172.20.19.14:8524/',
    headers : {
      'X-Real-IP' : '127.0.0.1'
    },
  },
};
