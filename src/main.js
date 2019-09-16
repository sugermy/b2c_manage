import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./theme/index.css";
import Ajax from "./utils/ajax.js";
import "./style/reset.less";
import "./style/ele_reset.less";
import { Notification } from "element-ui";
import scroll from "vue-seamless-scroll";
import "@babel/polyfill";
import "./utils/filters";

Vue.use(scroll);
Vue.config.productionTip = false;

let Token = "";
let MerchantCode = "S190304762"; //景区商户号
let baseAjax = new Ajax("", MerchantCode);
let BTCAjax = new Ajax(Token, MerchantCode);

refrushTokenGet();

//刷新token的方法--get
function refrushTokenGet () {
  baseAjax.get("Token", {}).then(res => {
    Token = res.Data;
    BTCAjax._axios.defaults.headers.Token = Token;
    if (!store.state.merchantInfo.B2CName) {
      //若不存在商户信息则根据当前token重新获取商户信息
      getMerchantInfo();
    }
  });
}
//获取商户信息
function getMerchantInfo () {
  BTCAjax.get("/Park/Info").then(res => {
    if (res.Code == "200") {
      store.dispatch("setMerchantData", res.Data);
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount("#app");
      router.push("/Home");
    } else {
      Notification({
        title: "商户获取失败",
        message: res.Content,
        type: "error",
        showClose: false,
        duration: 0
      });
    }
  });
}
/* 30分钟默认刷新token  为了方便使用29分钟时刷新赋值 */
setInterval(() => {
  Token = "";
  refrushTokenGet();
}, 1800000); //1800000

/* vue原型拓展ajax */
Vue.prototype.$baseAjax = baseAjax; //登录请求接口
Vue.prototype.$ajax = BTCAjax; //基于token的请求接口

//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  store.dispatch(
    "enterRouter",
    JSON.stringify({ path: to.path, query: to.query })
  );
  if (to.meta.title) {
    //跳转前动态设置当前title
    document.title = to.meta.title;
  }
  if (
    !store.state.loginInfo.loginStatus &&
    to.name != "HomeView" &&
    to.name != "Product" &&
    to.name != "Contactus" &&
    to.name != "TouristRules"
  ) {
    store.dispatch("changeAppStatus", true);
  } else {
    next();
  }
});
