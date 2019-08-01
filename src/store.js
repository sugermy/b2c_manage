import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: { loginStatus: false },
    loginStatus: false,
    toRouter: '',
    cityID: ''
  },
  mutations: {
    //切换登录状态
    changeStatus: function(state, data) {
      state.loginStatus = data;
    },
    //设置登录信息
    setLoginIofn: function(state, data) {
      state.loginInfo = data;
    },
    //设置路由路径
    setRouterPath: function(state, data) {
      state.toRouter = data;
    },
    //设置当前选择城市
    setCity: function(state, data) {
      state.cityID = data;
    }
  },
  actions: {
    changeAppStatus({ commit }, data) {
      commit('changeStatus', data);
    },
    setLonginMaster({ commit }, data) {
      commit('setLoginIofn', data);
    },
    enterRouter({ commit }, data) {
      commit('setRouterPath', data);
    },
    toSetCity({ commit }, data) {
      commit('setCity', data);
    }
  }
});
