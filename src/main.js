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
Vue.config.productionTip = false;

const baseURL = 'http://192.168.33.154:8025/official/'; //基础服务地址

let Token = ''; //验证标识符
let MerchantCode = 'S1450545354'; //景区商户号

let baseAjax = new Ajax(baseURL, '', MerchantCode);
let BTCAjax = new Ajax(baseURL, Token, MerchantCode);

/* vue原型拓展ajax */
Vue.prototype.$baseAjax = baseAjax; //登录请求接口
Vue.prototype.$ajax = BTCAjax; //基于token的请求接口

//获取token方法
(function initToken() {
  //若不存在token  请求初始化接口换取token
  baseAjax.get('/Token', {}).then(res => {
    Token = res.Data;
    BTCAjax._axios.defaults.headers.Token = Token;
    new Vue({
      router,
      store,
      render: h => {
        return h(App);
      }
    }).$mount('#app');
  });
})();
function refrushToken() {
  baseAjax.post('/Token', {}).then(res => {
    Token = res.Data;
    BTCAjax._axios.defaults.headers.Token = Token;
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
