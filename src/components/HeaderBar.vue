<template>
  <div class="header-bar">
    <div class="logo-div">
      <img src="../assets/headerImage/header_logo.png" class="logo-img" />
    </div>
    <div class="header-right">
      <div class="menu">
        <router-link tag="div" class="menu-div" :to="{path:'/Home'}">首页</router-link>
        <router-link tag="div" class="menu-div" :to="{path:'/OrderInformation'}">订单信息</router-link>
        <router-link tag="div" class="menu-div" :to="{path:'/PersonalCenter'}">个人中心</router-link>
        <router-link tag="div" class="menu-div" :to="{path:'/Contactus'}">联系我们</router-link>
      </div>
      <div class="city">
        <div class="city-div">
          <el-select v-model="cityValue" placeholder="选择城市">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      cityValue: "",
      cityList: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '北京2'
        }, {
          value: '选项3',
          label: '北京3'
        }, {
          value: '选项4',
          label: '北京4'
        }, {
          value: '选项5',
          label: '北京5'
        }],     
      
    };
  }
};
</script>

<style scoped lang="less">
.header-bar {
  width: 100%;
  height: 90px;
  background: white;
  display: flex;
  justify-content: space-between;
}
.logo-div {
  display: flex;
  align-items: center;
  margin-left:10%;
}
.logo-img {
  height: 44px;
  width: 167px;
}
.header-right {
  display: flex;
}
.menu {
  display: flex;
  align-items: center;
}
.menu-div {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
  padding: 14px 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 2px;
}
.menu-div:hover {
  color: white;
  background: rgba(255, 128, 57, 1);
  border-radius: 4px;
}
.city {
  display: flex;
  align-items: center;
  margin-right: 160px;
  margin-left: 40px;
  position: relative;
}
.city-div {
  display: flex;
  align-items: center;
  width: 164px;
  height: 40px;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}
.city-text {
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  color: #bbbeca;
  margin: 0 10px;
}
.city-img {
  height: 12px;
  width: 19px;
  margin: 0 10px;
}
.city-ul {
  position: absolute;
  top: 0;
  margin: 0;
  width: 164px;
}
.city-ul li {
  width: 164px;
}

</style>
