// import Axios from "axios";

import Axios from "axios";
import store from "..";

export const VatsimSSO = {
  namespaced: true,

  state: {
    access_token: null,
    code: null,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.access_token = token;
      state.authenticated = true;
      localStorage.setItem('access_token', token);
    },
    DEL_TOKEN(state) {
      state.access_token = null;
      localStorage.removeItem('access_token');
    },
    SET_CODE(state, code) {
      state.code = code;
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },

    delToken({ commit }) {
      commit('DEL_TOKEN');
    },

    authenticateUser() {
      console.log('Authenticating');
      var url = process.env.VUE_APP_VATSIMSSO_URL + '?response_type=code&scope=full_name vatsim_details email&client_id=' + process.env.VUE_APP_VATSIMSSO_ID + '&redirect_uri=' + process.env.VUE_APP_ROOT_URL;
      window.location = url;
    },

    authenticateUserData({ commit }, code) {
      var params = {
        'code': code,
        'auth': process.env.VUE_APP_FRONTEND_KEY,
      };
      commit('SET_CODE', code)
      Axios.post(process.env.VUE_APP_API_URL + '/authenticate', params)
      .then((response) => {
        store.dispatch('User/setUser', response.data.user);
      });
    },

    checkAuthentication() {
      console.log('Checking Authentication')
    }
  }
}