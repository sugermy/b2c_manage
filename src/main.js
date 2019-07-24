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

Vue.config.productionTip = false;
Vue.prototype.$ajax = Ajax.$ajax;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  if (to.name == "ProductDetail") {
    store.dispatch("changeAppStatus", false);
  } else {
    store.dispatch("changeAppStatus", false);
  }
  next();
});
