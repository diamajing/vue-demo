<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
        <el-breadcrumb-item>基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="funKey">
      <el-button type="primary" @click="handleNew()">新建</el-button>
    </div>
    <el-table :data="dataInfo" border style="width: 100%">
      <el-table-column prop="userName" label="用户名"sortable >
      </el-table-column>
      <el-table-column prop="info" label="用户信息">
      </el-table-column>
      <!--<el-table-column prop="arriveDate" label="到达日期" sortable width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="takeOffStnName" label="出发地机场" width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="arriveStnName" label="到达地机场">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="carriageAirlineFullName" label="公司名称"></el-table-column>-->
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.row.id,scope.row.routno)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="pagination">
      <el-pagination
        @current-change ="handleCurrentChange"
        layout="prev, pager, next"
        :total="1">
      </el-pagination>
    </div>-->
  </div>
</template>

<script>
  import flightRes from "../../resource/flight/flight";
  import testRes from "../../resource/test/getInfo";
  import delRes from "../../resource/test/del";

  export default {
    data() {
      return {
        tableData: [],
        cur_page: 1,
        delId:'1',
        dataInfo:[]
      };
    },
    created(){},
    mounted(){
      this.submitTest();
    },
    methods: {
      submitTest:function () {
        testRes(this).test()
          .then(function (data) {
           this.dataInfo = data.List;
            this.$store.commit("hideLoading");
          }).bind(this)
          .catch((err) => {
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      },
      submitDEl:function () {
      },
      handleCurrentChange(val){
        this.cur_page = val;
        this.getData();
      },
      getData(){
        let self = this;
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
            this.$store.commit("hideLoading");
            self.tableData = data.flightList;
          }).bind(this)
          .catch((err) => {
            console.log(err);
              this.$store.commit("hideLoading");
          });
      },
      handleEdit(routno) {
          this.$taber.open({
            name: 'tabelModify',
            key: routno,
            title:`修改(${routno})`,
            data:{
              routno
            }
          });
      },
      handleNew() {
        this.$taber.open('baseTabel');
      },
      handleDelete(index, id) {
        this.$store.commit("showLoading");
        delRes(this).test({'id':id})
          .then(function (data) {
            this.dataInfo.splice(index, 1);
            this.$store.commit("hideLoading");
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }).bind(this)
          .catch((err) => {
            this.$message.error('删除失败');
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      }
    }
  };
</script>
<style>
  .funKey{
    margin: 20px 0;
  }
</style>


