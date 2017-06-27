<template>
  <div class="form-test">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <el-col :span="18">
          <el-form-item label="公司名称" required prop="companyName">
            <el-input class="wid_60" type="text" placeholder="公司名称" v-model="ruleForm.companyName"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="10">
          <el-form-item label="出发日期" prop="takeOffDate">
            <div class="block">
              <el-date-picker
                v-model="ruleForm.takeOffDate"
                placeholder="选择出发日期"
                type="date"
                :picker-options="takeOffOptions">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="10">
        <el-form-item label="到达日期" prop="arrivalDate">
          <div class="block">
            <el-date-picker
              v-model="ruleForm.arrivalDate"
              type="date"
              placeholder="选择到达日期"
              :picker-options="arrivalOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="10">
          <el-form-item label="出发机场" required prop="name1">
            <el-input type="text" class="wid_60" placeholder="出发机场" v-model="ruleForm.takeOffStnName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="到达机场" required prop="name2">
            <el-input type="text" class="wid_60" placeholder="到达机场" v-model="ruleForm.arriveStnName"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="24">
          <el-form-item label="即时配送" prop="delivery">
            <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="24">
        <el-form-item label="配置开关" required>
          <el-radio-group v-model="ruleForm.configBtn">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-button @click="addSubmit()">增加测试</el-button>
      <el-button @click="getInfo()">增加测试</el-button>
    </el-form>
  </div>
</template>
<script>
  import moment from "moment";
//  import testRes from "../../resource/test/add";
  import updateRes from "../../resource/test/Update";
  import detailRes from "../../resource/test/getdetail";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    data() {
        let self = this;
      return {
        takeOffOptions: {
          disabledDate(time) {
              let bool1= time.getTime()>moment(self.ruleForm.arrivalDate);
              let bool2=  time.getTime() < Date.now() - 8.64e7;
            return bool1 || bool2;
          },
        },
        arrivalOptions: {
          disabledDate(time) {
            let bool1= time.getTime()<moment(self.ruleForm.takeOffDate);
            let bool2=  time.getTime() < Date.now() - 8.64e7;
            return bool1 || bool2;
          },
        },
        ruleForm: {
          companyName:'',
          takeOffStnName:'',
          takeOffDate:'',
          arriveStnName:'',
          arrivalDate:'',
          name: '',
          delivery: false,
          type: [],
          configBtn: '1',
        },
        rules: {
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          takeOffDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          arrivalDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramsId = this.$route.params.orderId === 'new'?'':this.$route.params.orderId;
            console.log(paramsId);
            //保存数据
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getDate(){
          //获取修改的数据
      },
      getInfo(){
        let addList = {"id":33};
        detailRes(this).test(addList)
          .then(function () {
            this.$store.commit("hideLoading");
            this.$message.succeed('删除成功');
          }).bind(this)
          .catch((err) => {
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addSubmit(){
          let addList = {"id":33,"passWord":"3333333","info":"阿西吧","userName":"hehe2"};
        updateRes(this).test(addList)
          .then(function (data) {
            this.$store.commit("hideLoading");
            this.$message.succeed('删除成功');
          }).bind(this)
          .catch((err) => {
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      }
    },
    mounted(){
        let params = this.$route.params.orderId;
        if (params==='new'){
           return;
        } else {
          this.getData(params);
        }
    },
  };
</script>
<style lang="scss" scoped>
  .el-form-item .el-form-item .el-form-item__content {
    margin-left: 0!important;
  }
  .form-test{
    width: 70%;

    .wid_60{
      width: 60%;
    }
  }

</style>
