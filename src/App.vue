<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <header-bar @increment="increment" :msg="cityList"></header-bar>
      </el-col>
    </el-row>
    <el-row class="bg">
      <el-scrollbar style="height:calc(100vh - 90px);">
        <el-col :span="20" class="main-con">
          <router-view></router-view>
        </el-col>
      </el-scrollbar>
    </el-row>
    <el-dialog title="" class="dialog-longin" :visible.sync="loginStatus" width="30%" :show-close="false" @close="yetClose" center>
      <el-row class="login-head">
        <el-col :span="12" class="login-t" @click="changeTab(1)"><span :class="activeTab==1?'login-active':''">普通登录</span></el-col>
        <el-col :span="12" class="login-t" @click="changeTab(2)"><span :class="activeTab==2?'login-active':''">短信验证码登录</span></el-col>
      </el-row>
      <el-row class="login-form">
        <el-col :span="24" class="login-f-i">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="loginForm.name"></el-input>
        </el-col>
        <el-col :span="24" class="login-f-i">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="loginForm.passWord"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reday">登 陆</el-button>
        <el-row class="sigin-ready">立即注册</el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  data () {
    return {
      activeTab: 1,
      loginForm: {},
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
      ]
    }
  },
  components: {
    HeaderBar
  },
  created () {
    //刷新不丢失store状态
    //在页面加载时,读取sessionStorage里的状态信息
    if (sessionStorage.getItem('userinfo')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
    }
    //在页面刷新时,将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
    });
  },
  computed: {
    loginStatus: {
      get () {
        return this.$store.state.loginStatus
      },
      set (v) {
        this.$store.dispatch('changeAppStatus', v)
      }
    }
  },
  methods: {
    //监听子组件切换城市
    increment (msg) {
      console.log(msg, '父组件')
    },
    //切换登录方式
    changeTab (v) {
      this.activeTab = v
    },
    //登录存登录信息
    reday () {
      if (!this.loginForm.name) {
        this.$message({ type: 'error', message: '请输入用户名', center: true })
        return
      }
      if (!this.loginForm.passWord) {
        this.$message({ type: 'error', message: '请输入密码', center: true })
        return
      }
      this.loginForm.loginStatus = true
      this.$store.dispatch('setLonginMaster', this.loginForm)
      this.$store.dispatch('changeAppStatus', false)

      var enterPath = this.$store.state.toRouter
      this.$router.push({
        path: enterPath
      })
    },
    //关闭弹窗自动执行进入阻塞前记录的路由
    yetClose () {
      this.$store.dispatch('changeAppStatus', false)
    }
  },
  watch: {
    $route: function (v) { }
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
  .el-dialog__body {
    padding: 50px !important;
    padding-bottom: 0px !important;
  }
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
