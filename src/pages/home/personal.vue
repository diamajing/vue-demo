<template><!--
	<div class="content-wrapper">
		个人home页面
	</div>-->
  <div class="wrapper">
      <v-head></v-head>
      <v-sidebar></v-sidebar>

      <div class="content">
        <transition name="move" mode="out-in"><router-view></router-view></transition>
        <!--<div style="text-align: center">-->
          <!--<a><router-link to="/404">跳转到404</router-link></a>-->
          <!--<el-button @click="loading">loading 按钮</el-button>-->
          <!--<el-button @click="getFlightList()">resouce  mock 请求</el-button>-->
          <!--<a><router-link to="/form">跳转到form页面</router-link></a>-->
        <!--</div>-->
      </div>


  </div>
</template>
  <script>
  import flightRes from "../../resource/flight/flight";
  import vHead from '../../components/Header.vue';
  import vSidebar from '../../components/Sidebar.vue';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton,vHead,vSidebar},
    methods: {
      loading(){
        this.$store.commit("show" +
          "Loading");
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
<style>
  .content{
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom:0;
    width: auto;
    padding:40px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
</style>


