import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    readyOne: 1,
    loginStatus: false,
    toRouter: ''
  },
  mutations: {
    changeStatus: function(state, data) {
      state.loginStatus = data;
      state.readyOne = 2;
    },
    setRouterPath: function(state, data) {
      state.toRouter = data;
    }
  },
  actions: {
    changeAppStatus({ commit }, data) {
      commit('changeStatus', data);
    },
    enterRouter({ commit }, data) {
      commit('setRouterPath', data);
    }
  }
});
