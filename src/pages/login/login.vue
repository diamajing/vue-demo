<template>
  <div class="login-wrap">
    <div class="sys-title">后台管理系统</div>
    <div class="sys-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px">
        <el-form-item label="用户名" prop="username">
          <el-input  v-model="ruleForm.username" placeholder="用户名" @keyup.enter.native="submitLogin('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password"  v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="submitLogin('ruleForm')"></el-input>
        </el-form-item>
        <el-row class="row-btn">
          <el-button type="primary" class="" @click="submitLogin('ruleForm')">登录</el-button>
          <el-button type="danger" native-type="reset" @click="submitReset('ruleForm')">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Session from "../../utils/session";
  export default {
    data(){
          return {
            ruleForm: {
              username: '',
              password: ''
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
            }
          };
      },
    methods: {
        submitLogin(name) {
          let self = this;
          this.$refs[name].validate((valid) => {
            if (valid) {
              Session.set('sys_username',self.ruleForm.username);
//              后台接口验证
//              成功跳页，不成功弹提示信息，返回一个token ，本地缓存token
//              _Session.set('token',token);
              self.$router.push('/readme');
            }  else {
             console.log('error submit!!');
              return false;
            }
          });
        },
        submitReset(name){
            this.$refs[name].resetFields();
        }
      }
  };
</script>

<style lang="scss" scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-color:#324057;
     .sys-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

      }
      .sys-login{
        position: absolute;
        left:50%;
        top:50%;
        width:400px;
        height:220px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
      }
    .row-btn{
      padding-left: 185px;
    }

  }
</style>

