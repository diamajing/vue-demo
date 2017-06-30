/**
 * Created by liuyue on 2016/12/26.
 */

import loading from "./loading";
import loginmini from "./loginMini";
import editpwd from "./editPwd";
import user from "./user";
import supplier from "./supplier";
import reloadList from "./reloadList";

export default {
	modules:{
		loading,
		loginmini,
		editpwd,
		user,
		supplier,
		reloadList,
	},
	state:{
		sidebarMini:false,
		pinTabs:[{name:"baseTabel"}]
	},
	mutations:{
		toggleSidebar:function(state){
			state.sidebarMini = !state.sidebarMini;
		}
	},
	getters:{},
	actions:{},
};
