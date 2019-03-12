<template>
  <div class="login">
    <el-form
      :model="formData"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      :rules="rules"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 数据
      formData: {
        username: "",
        password: ""
      },
      // 表单的验证规则
      rules: {
        username: [
          // required必须 message 提示信息 trigger 触发方式
          // min 最小 max 最大 
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          // required必须 message 提示信息 trigger 触发方式
          // min 最小 max 最大 
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$http.post("login",this.formData).then(res=>{
                console.log(res)
                if(res.data.meta.status === 400){
                   
                    this.$message.error(res.data.meta.msg);
                }else{
                    this.$message.success(res.data.meta.msg);
                    window.sessionStorage.setItem('token',res.data.data.token)
                    this.$router.push('/')
                }
            })
          } else {
            // console.log('error submit!!');
            this.$message.error('错了哦，这是一条错误消息') 
            return false;
          }
        });
      },
  },
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body >div:first-of-type {
  height: 100%;
}
.login {
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.el-form {
  width: 580px;
  height: 440px;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
}
.login-btn {
  width: 100%;
}
</style>
