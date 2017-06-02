
module.exports = {

	/************** proxy *******************/
	// http://172.20.19.14:8231/
	//  地址

	"/test/hello/**": {
		type: 'proxy',
		target: 'http://172.20.19.14:8231/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/test': '/'
		}
	},
  "/hello/**": {
    type: 'proxy',
    target: 'http://172.20.19.14:8231/',
    headers : {
      'X-Real-IP' : '127.0.0.1'
    },
    pathRewrite: {
      '^': '/'
    }
  },
	"/api/admin/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8040/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/flight/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8070/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/approve/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:9090/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/train/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8091/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},
	"/api/hotel/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8007/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/insurance/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8110/',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/messagecenter/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8200',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/file/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8120',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/api/apply/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8210',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		},
		pathRewrite: {
			'^/api': '/'
		}
	},

	"/static_cdn/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:9000',
		headers : {
			'X-Real-IP' : '127.0.0.1'
		}
	},
	"/api/apply/**": {
		type: 'proxy',
		target: 'http://114.55.138.53:8210', //出差单详情
		headers : {
			'X-Real-IP' : '127.0.0.1'
		}
	}
};
