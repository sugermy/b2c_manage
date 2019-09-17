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
import { Notification, Message } from "element-ui";
import scroll from "vue-seamless-scroll";
import "@babel/polyfill";
import "./utils/filters";

Vue.use(scroll);
Vue.config.productionTip = false;

let Token = "";
let MerchantCode = window.SYSTEM_CONFIG.MerchantCode; //景区商户号
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
  let code = getQuery('code');
  if (code && code != '') {
    // BTCAjax.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${window.SYSTEM_CONFIG.AppId}&secret=${window.SYSTEM_CONFIG.AppSecret}&code=${code}&grant_type=authorization_code`).then(data => {
    //   if (!data.errcode) {
    //     BTCAjax.post('User/LoginByWechate', { ReqParam: JSON.stringify(data) }).then(res => {
    //       if (res.Code == 200) {
    //         Message({ type: res.Type.toLowerCase(), message: res.Content, center: true, duration: 2000 })
    //         let accountForm = res.Data
    //         accountForm.loginStatus = true
    //         store.dispatch('setLonginInfo', accountForm)
    //       } else {
    //         Message({ type: res.Type.toLowerCase(), message: res.Content, center: true, duration: 2000 })
    //       }
    //     })
    //   }
    // })
    BTCAjax.get('GetAccessToken', { code: code }).then(res => {
      console.log(res);

    })
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
/* 获取url中的参数 */
function getQuery (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
