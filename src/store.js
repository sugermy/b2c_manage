import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: { loginStatus: false },//登录账号信息 loginStatus---为登录状态
    merchantInfo: {},//商户信息
    showLogin: false,//登录窗口显示隐藏
    toRouter: '',//暂存路由
  },
  mutations: {
    //切换登录状态
    changeShowlogin: function (state, data) {
      state.showLogin = data;
    },
    //设置登录信息
    setLoginIofn: function (state, data) {
      state.loginInfo = data;
    },
    //设置登录信息
    setMerchantInfo: function (state, data) {
      state.merchantInfo = data;
    },
    //设置路由路径
    setRouterPath: function (state, data) {
      state.toRouter = data;
    },
  },
  actions: {
    //重置登录窗口的状态---控制显示与隐藏
    changeAppStatus ({ commit }, data) {
      commit('changeShowlogin', data);
    },
    //设置登录信息
    setLonginInfo ({ commit }, data) {
      commit('setLoginIofn', data);
    },
    //设置商户信息
    setMerchantData ({ commit }, data) {
      commit('setMerchantInfo', data);
    },
    //保存暂存路由---在中断跳转操作完成之后进入路由
    enterRouter ({ commit }, data) {
      commit('setRouterPath', data);
    },
  }
});
