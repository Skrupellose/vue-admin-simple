<template>
  <div class="form-container">
    <div class="login-wrapper">
      <ul class="center-box">
        <li
          class="menu-tab"
          @click="toggle(item)"
          v-for="(item, index) in menuTab"
          :key="index"
          :class="item.current ? 'active' : ''"
        >{{item.name}}</li>
      </ul>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="Form">
        <el-form-item prop="email" class="form-item">
          <label class="label">邮箱：</label>
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item prop="pwd" class="form-item">
          <label class="label">密码：</label>
          <el-input type="password" show-password v-model="ruleForm.pwd" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="pwd2" class="form-item" v-if="this.mode === 'register'">
          <label class="label">确定密码：</label>
          <el-input type="password" show-password v-model="ruleForm.pwd2" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="form-item">
          <label class="label">验证码：</label>
          <el-row :gutter="6">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" class="btn">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="center-box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateCode,
  validatePwd,
  validateEmail
} from "@/tools/validate";
import obj from "@/tools/validate";
export default {
  name: "Login",
  data() {
    let validatePwd2 = (rule, value, callback) => {
      if (this.mode === "login") callback();
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      let len = value.length;
      let res = stripscript(value).length;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        {
          name: "登录",
          current: true,
          type: "login"
        },
        {
          name: "注册",
          current: false,
          type: "register"
        }
      ],
      mode: "login",
      ruleForm: {
        email: "",
        pwd: "",
        pwd2: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        pwd2: [{ validator: validatePwd2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },

  methods: {
    toggle(item) {
      this.menuTab.forEach(ele => {
        ele.current = false;
      });
      item.current = true;
      this.mode = item.type;
      this.$refs.ruleForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  background-image: url("~@/assets/bg.jpg");
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrapper {
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 1.5rem 0.8rem rgba(228, 228, 228, 0.63);
  background-color: rgba(26, 22, 22, 0.13);
}
.menu-tab {
  display: inline-block;
  margin: 1rem 2rem;
  padding: 0.5rem;
  border-radius: 15%;
  cursor: pointer;
  color: #000;
  background-color: rgba(228, 228, 228, 0.23);
  font-weight: bold;
  transition: all 0.5s ease-in-out;
}
li.active {
  transform: scale(1.1);
  animation: rotatebyY 0.5s linear;
  transition: transform 0.5s ease-in;
  box-shadow: 0 0 0.3rem 0.1rem rgba(0, 0, 0, 0.63);
  background-color: rgba(255, 255, 255, 0.75);
}
li:hover {
  background-color: rgba(255, 255, 255, 0.75);
}
.center-box {
  display: flex;
  justify-content: space-between;
}
.btn {
  display: bottom;
  width: 100%;
  text-align: center;
}
@keyframes rotatebyY {
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
