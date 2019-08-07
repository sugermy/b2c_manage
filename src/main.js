import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './theme/index.css';
import Ajax from './utils/ajax.js';
import './style/reset.less';
import './style/ele_reset.less';
import { resolve } from 'url';
import { reject } from 'q';
import { Notification } from 'element-ui';
import CryptoJS from "crypto-js";

Vue.config.productionTip = false;

const baseURL = 'http://192.168.33.154:61780/official/'; //基础服务地址

// let Token = ''; //验证标识符
let Token = localStorage.getItem('Token');

let MerchantCode = 'S190304885'; //景区商户号

let baseAjax = new Ajax(baseURL, '', MerchantCode);
let BTCAjax = new Ajax(baseURL, Token, MerchantCode);

if (Token) {
  // Decrypt 解密
  let bytes = CryptoJS.AES.decrypt(Token, "ACCESS_TOKEN");
  let decodeToken = bytes.toString(CryptoJS.enc.Utf8);
  BTCAjax._axios.defaults.headers.Token = decodeToken;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
} else {
  initToken().then(res => {
    BTCAjax._axios.defaults.headers.Token = res;
    // Encrypt 加密 
    let resToken = CryptoJS.AES.encrypt(res, "ACCESS_TOKEN").toString();
    localStorage.setItem('Token', resToken)
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }).catch(err => {
    Notification({
      title: '通行证获取失败',
      message: '请重新加载当前页面',
      type: 'error',
      showClose: false,
      duration: 0
    });
  })
}

/* vue原型拓展ajax */
Vue.prototype.$baseAjax = baseAjax; //登录请求接口
Vue.prototype.$ajax = BTCAjax; //基于token的请求接口

//请求初始化接口换取token
function initToken () {
  var p = new Promise((resolve, reject) => {
    baseAjax.get('/Token', {}).then(res => {
      Token = res.Data;
      resolve(Token)
    }).catch(err => {
      reject(err)
    })
  })
  return p
}

//刷新token的方法
function refrushToken () {
  baseAjax.post('/Token', {}).then(res => {
    Token = res.Data;
    BTCAjax._axios.defaults.headers.Token = Token;
    let resToken = CryptoJS.AES.encrypt(res.Data, "ACCESS_TOKEN").toString();
    localStorage.setItem('Token', resToken)
  });
}
/* 30分钟默认刷新token  为了方便使用29分钟时刷新赋值 */
setInterval(() => {
  refrushToken();
}, 1740000); //1740000

//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  store.dispatch('enterRouter', to.path);
  if (to.meta.title) {
    //跳转前动态设置当前title
    document.title = to.meta.title;
  }
  if (!store.state.loginInfo.loginStatus && to.name != 'HomeView' && to.name != 'Product' && to.name != 'Contactus' && to.name != 'TouristRules') {
    store.dispatch('changeAppStatus', true);
  } else {
    next();
  }
});
