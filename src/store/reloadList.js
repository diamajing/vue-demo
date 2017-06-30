/**
 * 管理列表刷新
 */

export default {
	state:{
		saleItemAir:false
	},
	mutations:{
		reloadSaleItemAir(state){
			state.saleItemAir = true;
			setTimeout(() => {
				state.saleItemAir = false;
			},10);
		}
	}
};
