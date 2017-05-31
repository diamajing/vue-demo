

import loading from "./loading";

export default {
  modules:{
    loading
  },
  state:{
    sidebarMini:false
  },
  mutations:{
    toggleSidebar:function(state){
      state.sidebarMini = !state.sidebarMini;
    }
  },
  getters:{},
  actions:{},
};
