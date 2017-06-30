/**
 * Created by shelley on 2017/1/10.
 */
export default {
	state:{
		showEditPwd:false
	},
	mutations:{
		showEditPwd:function(state){
			state.showEditPwd = true;
		},
		hideEditPwd:function(state){
			state.showEditPwd = false;
		}
	},
	getters:{},
	actions:{},
};
