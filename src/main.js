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
Vue.prototype.$ajax = Ajax.$ajax;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//路由跳转守卫判断是否是登录态
router.beforeEach((to, from, next) => {
  store.dispatch('enterRouter', to.path);
  if (to.meta.title) {
    //跳转前动态设置当前title
    document.title = to.meta.title;
  }
  if (store.state.readyOne == 1) {
    store.dispatch('changeAppStatus', true);
  } else {
    next();
  }
});
