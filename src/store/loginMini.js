/**
 * Created by shelley on 2017/1/6.
 */
export default {
	state:{
		showLogin:false
	},
	mutations:{
		showLogin:function(state){
			state.showLogin = true;
		},
		hideLogin:function(state){
			state.showLogin = false;
		}
	},
	getters:{},
	actions:{},
};
