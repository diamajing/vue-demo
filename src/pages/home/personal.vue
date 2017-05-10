<template><!--
	<div class="content-wrapper">
		个人型首页
	</div>-->
	<div class="layout-book-search">
		<div class="layout-banner">
			<div class="content-wrapper-narrow" style="position:relative;">
				<div class="content-title">
					<h1 class="main-title">为您提供</h1>
					<h3 class="sub-title">最便捷的差旅预订管理服务</h3>
           <el-button><router-link to="/404">跳转到404</router-link></el-button>
           <el-button @click="loading">loading 按钮</el-button>
           <el-button @click="getFlightList()">resouce  mock 请求</el-button>
           <el-button>显示测试</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
  <script>
  import flightRes from "../../resource/flight/flight.js";
  import ElAlert from "../../../node_modules/element-ui/packages/alert/src/main";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElAlert},
    methods: {
      loading(){
        this.$store.commit("showLoading");
      },
      getFlightList(){
        this.$store.commit("showLoading");
          let searchInfo = {
            searchType: "ow",
            takeOffStn: "PEK",
            arriveStn: "SHA",
            takeOffDate: "2016-09-30",
            takeOffTimeFrom: "1100",
            takeOffTimeTo: "1700",
          };
          flightRes(this).owList(searchInfo)
          .then(function (data) {
              console.log(data);
            this.$store.commit("hideLoading");
          }).bind(this)
          .catch((err) => {
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      }
    }
  };
</script>

