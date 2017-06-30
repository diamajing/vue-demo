<template>
  <div class="form-test">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <el-col :span="18">
          <el-form-item label="用户名称" required prop="userName">
            <el-input class="wid_60" type="text" placeholder="用户名称" v-model="ruleForm.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="18">
          <el-form-item label="用户信息" required prop="userInfo">
            <el-input class="wid_60" type="text" placeholder="用户信息" v-model="ruleForm.userInfo"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <el-form-item>
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
       </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  //  import moment from "moment";
  //  import testRes from "../../resource/test/add";
  import updateRes from "../../resource/test/Update";
  import detailRes from "../../resource/test/getdetail";
  export default {
    components: {},
    data() {
//        let self = this;
      return {
//          开始结束时间的控制
//        takeOffOptions: {
//          disabledDate(time) {
//              let bool1= time.getTime()>moment(self.ruleForm.arrivalDate);
//              let bool2=  time.getTime() < Date.now() - 8.64e7;
//            return bool1 || bool2;
//          },
//        },
//        arrivalOptions: {
//          disabledDate(time) {
//            let bool1= time.getTime()<moment(self.ruleForm.takeOffDate);
//            let bool2=  time.getTime() < Date.now() - 8.64e7;
//            return bool1 || bool2;
//          },
//        },
//        ruleForm: {
//          companyName:'',
//          takeOffStnName:'',
//          takeOffDate:'',
//          arriveStnName:'',
//          arrivalDate:'',
//          name: '',
//          delivery: false,
//          type: [],
//          configBtn: '1',
//        },
//        rules: {
//          companyName: [
//            { required: true, message: '请输入公司名称', trigger: 'blur' },
//            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
//          ],
//          takeOffDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//          arrivalDate: [
//            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//          ],
//          type: [
//            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
//          ]
//        }
        ruleForm: {
          'userName':'',
          'userInfo':''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ],
          userInfo: [
            { required: true, message: '请输入用户信息', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramsId = this.$route.params.orderId === 'new' ? '' : this.$route.params.orderId;
            if (paramsId === 'new') {
//            console.log(paramsId);
              //保存数据
            } else {
              console.log('error submit!!');
              this.modifySubmit(paramsId);
            }
          }
        });
      },
      getInfo(params){
        let addList = {"id":params};
        this.$store.commit("showLoading");
        detailRes(this).test(addList)
          .then(function (data) {
            this.$store.commit("hideLoading");
            this.ruleForm.userName = data.username;
            this.ruleForm.userInfo = data.info;
          }).bind(this)
          .catch((err) => {
            console.log(err);
//              this.$store.commit("hideLoading");
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      modifySubmit(paramsId){
        let addList = {"id":paramsId,"passWord":"3333333","info":"阿西吧","userName":"hehe2"};
        this.$store.commit("showLoading");
        updateRes(this).test(addList)
          .then(function (data) {
            this.$store.commit("hideLoading");
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }).bind(this)
          .catch((err) => {
            console.log(err);
            this.$message.error('修改失败');
//              this.$store.commit("hideLoading");
          });
      }
    },
    mounted(){
        console.log(333);
        console.log("444",this.$taber);
//      this.getInfo(params);
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
