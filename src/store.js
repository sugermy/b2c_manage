import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: { loginStatus: false },
    loginStatus: false,
    toRouter: ''
  },
  mutations: {
    changeStatus: function(state, data) {
      state.loginStatus = data;
    },
    setLoginIofn: function(state, data) {
      state.loginInfo = data;
    },
    setRouterPath: function(state, data) {
      state.toRouter = data;
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
    }
  }
});
