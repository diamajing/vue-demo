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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="takeOffDate" label="出发日期" sortable width="150">
      </el-table-column>
      <el-table-column prop="arriveDate" label="到达日期" sortable width="150">
      </el-table-column>
      <el-table-column prop="takeOffStnName" label="出发地机场" width="120">
      </el-table-column>
      <el-table-column prop="arriveStnName" label="到达地机场">
      </el-table-column>
      <el-table-column prop="carriageAirlineFullName" label="公司名称"></el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row.routno)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change ="handleCurrentChange"
        layout="prev, pager, next"
        :total="1">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import flightRes from "../../resource/flight/flight";
  export default {
    data() {
      return {
        tableData: [],
        cur_page: 1
      };
    },
    created(){
      this.getData();
    },
    methods: {
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
        this.$router.push({
          name:"baseform",
          params:{orderId:routno}
        });
      },
      handleNew() {
        this.$router.push({
          name:"baseform",
          params:{orderId:'new'}
        });
      },
      handleDelete(index, row) {
        this.$message.error('删除第'+(index+1)+'行');
        this.tableData.remove(row);
      }
    }
  };
</script>
<style>
  .funKey{
    margin: 20px 0;
  }
</style>


