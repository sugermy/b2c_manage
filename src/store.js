import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: false
  },
  mutations: {
    changeStatus: function(state, data) {
      state.loginStatus = data;
    }
  },
  actions: {
    changeAppStatus({ commit }, data) {
      commit("changeStatus", data);
    }
  }
});
