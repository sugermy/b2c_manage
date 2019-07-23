<template>
  <div class="header-nav">
    <div class="logo">
      <img src="../assets/headerImage/header_logo.png" class="logo-img" />
    </div>
    <div class="header-right">
      <ul class="menu">
        <router-link
          tag="li"
          v-for="(item,index) in menuList"
          :key="index"
          class="menu-item"
          :to="{ path: item.path }"
        >{{item.name}}</router-link>
      </ul>
      <el-select v-model="cityID" placeholder="请选择城市" @change="changeCity">
        <el-option v-for="item in msg" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    msg: Array
  },
  data() {
    return {
      cityID: "",
      cityValue: "",
      cityList: [
        {
          value: "选项1",
          label: "北京"
        },
        {
          value: "选项2",
          label: "北京2"
        },
        {
          value: "选项3",
          label: "北京3"
        },
        {
          value: "选项4",
          label: "北京4"
        },
        {
          value: "选项5",
          label: "北京5"
        }
      ],
      menuList: [
        {
          name: "首页",
          path: "/Home/HomeView"
        },
        {
          name: "订单信息",
          path: "/OrderInformation"
        },
        {
          name: "个人中心",
          path: "/PersonalCenter"
        },
        {
          name: "联系我们",
          path: "/Contactus"
        }
      ]
    };
  },
  created() {
    this.cityID = this.msg[0].value;
  },
  methods: {
    changeCity(city) {
      this.$emit("increment", city);
    }
  }
};
</script>

<style scoped lang="less">
.header-nav {
  width: 100%;
  height: 90px;
  background: white;
  display: flex;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
}
.logo-img {
  height: 44px;
  width: 167px;
}
.header-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu {
  display: flex;
  align-items: center;
}
.menu-item {
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
  height: 40px;
  line-height: 40px;
  width: 140px;
  text-align: center;
  cursor: pointer;
  margin: 0 10px;
}
.menu-item:hover,
.menu-item.router-link-active {
  color: white;
  background: rgba(255, 128, 57, 1);
  border-radius: 4px;
}
</style>
