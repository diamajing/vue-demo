<template>
	<div class="navbar-wrapper">
		<el-button type="primary" size="small" @click.native="toggleSidebar">
			<i class="fa fa-bars"></i>
		</el-button>
		<!--<el-button @click.native="show1">button1</el-button>-->
		<!--<el-button @click.native="show2">button2</el-button>-->
		<!--<el-button @click.native="showLoading">显示loading</el-button>-->
	</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar-wrapper {
		height:60px;
	}
</style>
<script>
	export default{
		data(){
			return {};
		},
		components: {},
		methods:{
			toggleSidebar(){
				this.$store.commit("toggleSidebar");
			},
			show1(){
				this.$taber.open({
					name:"saleItemAirDetail",
					key:"123123",
					params:{
						title:"自定义标题",
						isLocked:true
					}
				});
			},
			show2(){
				this.$taber.open({
					name:"saleItemAirDetail",
					key:"23232",
					params:{
						title:"自定义标题2222"
					}
				});
			},
			showLoading(){
				this.$store.commit("showLoading");
			}
		}
	};
</script>
