<template>
  <nav class="sidebar-wapper" :class="{'sidebar-mini sidebar-collapse':sidebarMini}">
    <div class="sidebar-scroll" ref="sidebar">
      <!--<div style="height:10000px;">-->
      <div> <!-- style="width: 220px;"-->
        <!--通栏顶部菜单 logo 位置-->
        <!--<div class="main-header">-->
        <!--<img alt="image" class="img-circle" src="~src/assets/img/logo.png"></img>-->
        <!--</div>-->
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
          <!-- sidebar: style can be found in sidebar.less -->
          <section class="sidebar" ref="sidebarbody">
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
              <li class="nav-header">
                <div class="profile-element">
									<span>
										<img alt="image" class="img-circle" src="../../static/images/img.png">
									</span>
                </div>
                <div class="logo-element">LOGO</div>
              </li>
              <!--<li class="header">MAIN NAVIGATION</li>-->
              <li v-for="num in 2" class="treeview" :class="{'active': num === 1}">
                <a href="#">
                  <i class="fa fa-dashboard"></i>
                  <span>Dashboard</span>
                  <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li v-for="id in 2" class="treeview-menu-item" :class="{'active': id === 1 && num === 1}"><a href="index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
                  <li><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-pie-chart"></i>
                  <span>Charts</span>
                  <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/charts/chartjs.html"><i class="fa fa-circle-o"></i> ChartJS</a></li>
                  <li><a href="pages/charts/morris.html"><i class="fa fa-circle-o"></i> Morris</a></li>
                  <li><a href="pages/charts/flot.html"><i class="fa fa-circle-o"></i> Flot</a></li>
                  <li><a href="pages/charts/inline.html"><i class="fa fa-circle-o"></i> Inline charts</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-laptop"></i>
                  <span>UI Elements</span>
                  <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/UI/general.html"><i class="fa fa-circle-o"></i> General</a></li>
                  <li><a href="pages/UI/icons.html"><i class="fa fa-circle-o"></i> Icons</a></li>
                  <li><a href="pages/UI/buttons.html"><i class="fa fa-circle-o"></i> Buttons</a></li>
                  <li><a href="pages/UI/sliders.html"><i class="fa fa-circle-o"></i> Sliders</a></li>
                  <li><a href="pages/UI/timeline.html"><i class="fa fa-circle-o"></i> Timeline</a></li>
                  <li><a href="pages/UI/modals.html"><i class="fa fa-circle-o"></i> Modals</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-edit"></i> <span>Forms</span>
                  <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
                  <li><a href="pages/forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
                  <li><a href="pages/forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
                </ul>
              </li>
              <!-- 菜单__菜单的title -->
              <li class="header">LABELS</li>
              <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
              <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
              <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
            </ul>
          </section>
          <!-- /.sidebar -->
        </aside>
      </div>
    </div>
  </nav>
</template>
<style  rel="stylesheet/scss" lang="scss" scoped>
  /*@import "~assets/scss/common/sidebar/sidebar";*/
  /*@import "~assets/scss/common/sidebar/sidebar-mini.scss";*/
  /*@import "~assets/scss/common/sidebar/sidebar-base.scss";*/

</style>
<script>
  export default{
    data(){
      return {
        inited: false,
        sidebarScroll:{}
      };
    },
    components: {},
    computed:{
      sidebarMini(){
        return this.$store.state.sidebarMini;
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.sidebarScroll = this.$refs.sidebar;
        this.inited = true;

        if (!this.sidebarMini) {
          $(this.sidebarScroll).slimScroll({
            height: '100%',
            railOpacity: 0.5,
            alwaysVisible: false,
            disableFadeOut : false
          });
        }

        let sidebarBody = this.$refs.sidebarbody;
        this.tree(sidebarBody);
      });
    },
    watch:{
      "sidebarMini": function (value) {
        if (this.inited && this.sidebarScroll) {
          let sidebar = this.sidebarScroll;
          if (!value) {
            $(sidebar).slimScroll({
              height: '100%',
              railOpacity: 0.5,
              alwaysVisible: false,
              disableFadeOut : false
            });
          } else {
            $(sidebar).slimScroll({
              destroy: true
            }).height("auto");
          }
          this.smoothlyMenu(value);
        }
      }
    },
    methods: {
      tree: function (menu) {
//        let that = this;
        $("li a", $(menu)).on('click',function(e){
          // Get the clicked link and the next element
          let $this = $(this);
          let checkElement = $this.next();

          // Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
            // Close the menu
            checkElement.slideUp('normal', function () {
              checkElement.removeClass('menu-open');
              // Fix the layout in case the sidebar stretches over the height of the window
              // _this.layout.fix();
            });
            checkElement.parent("li").removeClass("active");
          }
          // If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            // Get the parent menu
            let parent = $this.parents('ul').first();
            // Close all open menus within the parent
            let ul = parent.find('ul:visible').slideUp('normal');
            // Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            // Get the parent li
            let parentLi = $this.parent('li');

            // Open the target menu and add the menu-open class
            checkElement.slideDown('normal', function () {
              // Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parentLi.addClass('active');
              // Fix the layout in case the sidebar stretches over the height of the window
//							that.layout.fix();
            });
          }
          // if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      },
      smoothlyMenu: function (value) {
        if (!value) {
          $('.main-sidebar').hide();
          setTimeout(
            function () {
              $('.main-sidebar').fadeIn(500);
            },100);
        } else {
          $('.main-sidebar').hide();
          setTimeout(
            function () {
              $('.main-sidebar').fadeIn(500);
            },300);
        }
      }
    },
  };
</script>
