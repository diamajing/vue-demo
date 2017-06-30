/**
 * Created by liuyue on 2017/6/7.
 */
export default {
	state:{
		showModalTag:false,
		showParams:{
			isLoginShow:false
		},
		reloadTag:false,
	},
	mutations:{
		showSupplierModal:function(state,params){
			state.showParams = params;
			state.showModalTag = true;
		},
		hideSupplierModal:function(state){
			state.showModalTag = false;
		},
		reloadSupplier:function(state){
			state.reloadTag = true;
			setTimeout(() => {
				state.reloadTag = false;
			},10);
		}
	},
	getters:{},
	actions:{},
};
