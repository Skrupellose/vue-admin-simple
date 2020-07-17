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
              <el-button
                type="primary"
                class="btn"
                @click="getSms()"
                :disabled="codeStatus"
              >{{codeText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="center-box">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            :disabled="formSubmitStatus"
          >{{mode ==='login' ? '登录':'注册'}}</el-button>
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
  validateEmail,
  validateEmail2
} from '@/tools/validate'
import sha1 from 'js-sha1'
import { GetSms, register, login } from '@/api/login'
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'Login',
  setup(props, { refs, root }) {
    // composition api的入口,放置data,method,生命周期函数
    const validatePwd2 = (rule, value, callback) => {
      if (mode.value === 'login') callback()
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== ruleForm.pwd) {
        callback(new Error('两次密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    const menuTab = reactive([
      {
        name: '登录',
        current: true,
        type: 'login'
      },
      {
        name: '注册',
        current: false,
        type: 'register'
      }
    ])

    const mode = ref('login')
    const formSubmitStatus = ref(true)
    const codeStatus = ref(false)
    const timer = ref(null)
    const codeText = ref('发送验证码')
    const ruleForm = reactive({
      email: '',
      pwd: '',
      pwd2: '',
      code: ''
    })

    const rules = reactive({
      email: [{ validator: validateEmail, trigger: 'blur' }],
      pwd: [{ validator: validatePwd, trigger: 'blur' }],
      pwd2: [{ validator: validatePwd2, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }]
    })

    // methods
    const toggle = item => {
      menuTab.forEach(ele => {
        ele.current = false
      })
      item.current = true
      mode.value = item.type
      resetForm('ruleForm')
      initCountDown(false, '获取验证码')
    }
    // 验证码
    const getSms = () => {
      if (ruleForm.email === '') {
        root.$message.error('empty email')
        return
      } else if (!validateEmail2(ruleForm.email)) {
        root.$message.error(' email格式错误')
        return
      }
      GetSms({
        username: ruleForm.email,
        module: mode.value
      })
        .then(res => {
          root.$message.success(res.message)
          formSubmitStatus.value = false
          countDown(60)
          codeStatus.value = true
        })
        .catch(error => {
          console.log(error)
        })
    }
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let data = {
            username: ruleForm.email,
            password: sha1(ruleForm.pwd),
            code: ruleForm.code,
            module: mode.value
          }
          if (mode.value === 'register') {
            register(data).then(res => {
              root.$message.success(res.message)
              toggle(menuTab[0])
              initCountDown(false,'获取验证码')
              resetForm('ruleForm')
            })
          } else {
            login(data).then(res => {
              root.$message.success(res.message + '马上为您跳转')
              initCountDown(false,'获取验证码')
              resetForm('ruleForm')
              setTimeout(()=>{
                root.$router.push('/index')
              },1500)
            })
          }
        } else {
          root.$message.error(res.message)
          return false
        }
      })
    }
    const resetForm = formName => {
      refs[formName].resetFields()
    }
    // code 倒计时
    const countDown = number => {
      if (timer.value) clearInterval(timer.value)
      let time = number
      timer.value = setInterval(() => {
        time--
        if (time === 0) {
          clearInterval(timer.value)
          initCountDown(false,'再次获取')
        } else {
          codeText.value = `倒计时${time}`
        }
      }, 1000)
    }
    const initCountDown = (status,text) => {
      clearInterval(timer.value)
      codeStatus.value = status
      codeText.value = text
    }
    return {
      mode,
      menuTab,
      toggle,
      timer,
      formSubmitStatus,
      codeStatus,
      codeText,
      ruleForm,
      rules,
      submitForm,
      getSms,
      resetForm
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  background-image: url('~@/assets/bg.jpg');
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

.el-form-item {
  &::v-deep .el-form-item__error {
    color: #000;
  }
}
.el-input {
  &::v-deep .el-input__validateIcon {
    color: #000;
  }
}
::v-deep .el-form-item.is-error .el-input__inner {
  border-color: #000;
}
</style>