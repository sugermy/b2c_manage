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
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  data() {
    return {
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
  methods: {
    //监听子组件切换城市
    increment(msg) {
      console.log(msg, '父组件')
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
}
.el-scrollbar__view {
  width: 100%;
  height: 100%;
}
.main-con {
  width: 100%;
  height: 100%;
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
