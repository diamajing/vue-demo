
module.exports = {

	/************** proxy *******************/
  //http://172.20.19.14:8524/FBdemo/hello
	//  地址
  "/FBdemo/**": {
    type: 'proxy',
    target: 'http://172.20.19.14:8524/',
    headers : {
      'X-Real-IP' : '127.0.0.1'
    },
  },
};
