<template>
  <div id="app" @click="recordLogin">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <header-bar :msg="cityList" ref="headerBar"></header-bar>
      </el-col>
    </el-row>
    <el-row class="bg">
      <el-scrollbar style="height:calc(100vh - 90px);">
        <el-col :span="20" class="main-con">
          <router-view></router-view>
        </el-col>
      </el-scrollbar>
    </el-row>
    <el-dialog title="" class="dialog-longin" :visible.sync="loginStatus" width="25%" :show-close="false" @close="yetClose" center>
      <el-row class="login-head">
        <el-col :span="12" class="login-t">
          <div @click="changeTab(1)"><span :class="activeTab==1?'login-active':''">普通登录</span></div>
        </el-col>
        <el-col :span="12" class="login-t">
          <div @click="changeTab(2)"><span :class="activeTab==2?'login-active':''">短信验证码登录</span></div>
        </el-col>
      </el-row>
      <el-row class="login-form">
        <el-form :model="loginForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="name">
            <el-input type="text" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="loginForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="postWord">
            <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="loginForm.postWord" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="ormemery-pass">
            <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="dialog-footer">
            <el-button type="primary" @click="reday('ruleForm')">登 陆</el-button>
          </el-form-item>
          <el-row class="sigin-ready">立即注册</el-row>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      recordTime: 1, //记录当前时间
      activeTab: 1,
      loginForm: { name: '', postWord: '', checked: true },
      cityList: [
        {
          value: '选项1',
          label: '北京1'
        },
        {
          value: '选项2',
          label: '北京2'
        },
        {
          value: '选项3',
          label: '北京3'
        },
        {
          value: '选项4',
          label: '北京4'
        },
        {
          value: '选项5',
          label: '北京5'
        }
      ],
      rules: {
        name: [{ validator: checkName, trigger: 'blur' }],
        postWord: [{ validator: checkPass, trigger: 'blur' }]
      },
      cityID: ''
    }
  },
  components: {
    HeaderBar
  },
  created() {
    //刷新不丢失store状态
    //在页面加载时,读取sessionStorage里的状态信息
    if (sessionStorage.getItem('userinfo')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('userinfo'))
        )
      )
    }
    //在页面刷新时,将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state))
    })
    this.setTimer() //加载定时器
  },
  mounted() {
    this.cityID = this.$refs.headerBar.cityID
    this.$nextTick(() => {
      this.$ajax.get('/Park/Info').then(res => {
        console.log(res)
      })
    })
  },
  computed: {
    loginStatus: {
      //根据登录状态改变弹出层是否显示
      get() {
        return this.$store.state.loginStatus
      },
      set(v) {
        this.$store.dispatch('changeAppStatus', v)
      }
    }
  },
  methods: {
    //定时器记录当前是否点击dom  点击重置
    setTimer() {
      setInterval(() => {
        this.recordTime++
      }, 1000)
    },
    //记录点击事件  超时半小时退出登录
    recordLogin() {
      this.recordTime = 1
    },
    //切换登录方式
    changeTab(v) {
      this.activeTab = v
    },
    //登录存登录信息
    reday(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //保存实体
          this.loginForm.loginStatus = true
          this.$store.dispatch('setLonginMaster', this.loginForm)
          this.$store.dispatch('changeAppStatus', false)
          var enterPath = this.$store.state.toRouter
          this.$router.push({
            path: enterPath
          })
        } else {
          return false
        }
      })
    },
    //关闭弹窗自动执行进入阻塞前记录的路由
    yetClose() {
      this.$store.dispatch('changeAppStatus', false)
    }
  },

  watch: {
    recordTime(v) {
      //监听当前记录时间 超过30分钟未执行js操作退出登录
      if (v == 1800) {
        this.$notify({
          title: '提醒',
          message: '登陆态已超时，请重新登陆',
          showClose: false,
          type: 'warning'
        })
        let nologin = { loginStatus: false }
        this.$store.dispatch('setLonginMaster', nologin)
      }
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1280px;
}
.el-scrollbar__view {
  width: 100%;
  height: 100%;
}
.main-con {
  width: 100%;
  height: calc(100% - 100px);
}
.dialog-longin {
  .login-head {
    .login-t {
      text-align: center;
      cursor: pointer;
      span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
    }
    .login-t:nth-of-type(1) {
      border-right: 1px solid #dddddd;
    }
  }
  .login-form {
    margin-top: 20px;
    .login-f-i {
      margin-bottom: 20px;
    }
    .ormemery-pass {
      height: 20px;
      line-height: 20px;
      margin-bottom: 10px;
      .el-form-item__content {
        line-height: 20px !important;
      }
    }
  }
  .sigin-ready {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(44, 151, 222, 1);
    text-align: right;
    margin-top: 20px;
    cursor: pointer;
  }
  .login-active {
    color: rgba(255, 128, 57, 1);
    border-bottom: 1px solid #ff8039;
  }
}
.bg {
  width: 100%;
  background: url(./assets/home_bg.png) no-repeat center;
  .el-scrollbar__view {
    display: flex;
    justify-content: center;
  }
}
</style>
