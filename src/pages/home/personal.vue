<template><!--
	<div class="content-wrapper">
		个人home页面
	</div>-->
  <div class="wrapper">
      <v-sidebar></v-sidebar>
    <div class="page-wrapper" :class="{'sidebar-mini':sidebarMini}">
         <v-head></v-head>
      <div class="pad_7">
        <vue-tabs></vue-tabs>
      </div>

    </div>
  </div>
</template>
  <script>

  import flightRes from "../../resource/flight/flight";
  import vHead from '../../components/Header';
  import mainHead from '../../components/mainHeader';
  import vSidebar from '../../components/mainSlider';
  export default {
    components: {vHead,vSidebar,mainHead},
    computed:{
      sidebarMini(){
        return this.$store.state.sidebarMini;
      }
    },
    mounted(){
    },
    methods: {
      loading(){
        this.$store.commit("show" +
          "Loading");
      },
      getFlightList(){
//        this.$store.commit("showLoading");
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
<style rel="stylesheet/text" lang="scss" scoped>
  @import "../../assets/scss/common/variables.scss";
  @import "../../assets/scss/common/mixin.scss";
  .page-wrapper {
    margin: 0 0 0 220px;
    &.sidebar-mini {
      margin-left:70px;
    }

    $transition-rule: $transition-speed $transition-fn,
    margin $transition-speed $transition-fn;
    @include transition-transform($transition-rule);
  }
  .content{
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 250px;
    right: 0;
    top: 130px;
    bottom:0;
    width: auto;
    padding:40px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .pad_7{
    padding-top: 70px;
  }
</style>


