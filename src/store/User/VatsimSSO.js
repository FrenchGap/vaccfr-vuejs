// import Axios from "axios";

import Axios from "axios";
import store from "..";

export const VatsimSSO = {
  namespaced: true,

  state: {
    access_token: null,
    code: null,
    authenticated: false,
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
    },
    SET_AUTHENTICATED(state) {
      state.authenticated = true;
    },
    DEL_AUTHENTICATED(state) {
      state.authenticated = false;
    }
  },

  getters: {
    checkAuthentication(state) {
      console.log('Checking Authentication')
      var checkThisToken = "";

      if (state.authenticated == true) {
        return true;
      }

      var localToken = localStorage.getItem('access_token');
      if (localToken !== null) {
        checkThisToken = localToken;
      } else if (state.access_token !== null) {
        checkThisToken = state.access_token;
      } else {
        return false;
      }

      Axios.get(process.env.VUE_APP_API_URL + '/checkToken', {
        params: {
          api_token: checkThisToken,
          app_auth_token: process.env.VUE_APP_FRONTEND_KEY
        }
      })
      .then(function (response) {
        console.log(response.status);
        store.dispatch('VatsimSSO/setAuthenticated');
        return true;
      })
      .catch(function (error) {
        console.log(error.response.status);
        return false;
      });

      return false;
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },

    delToken({ commit }) {
      commit('DEL_TOKEN');
    },

    setAuthenticated({ commit }) {
      commit('SET_AUTHENTICATED');
    },

    delAuthenticated({ commit }) {
      commit('DEL_AUTHENTICATED');
    },

    authenticateUser() {
      console.log('Authenticating');
      var url = process.env.VUE_APP_VATSIMSSO_URL + '?response_type=code&scope=full_name vatsim_details email&client_id=' + process.env.VUE_APP_VATSIMSSO_ID + '&redirect_uri=' + process.env.VUE_APP_ROOT_URL;
      window.location = url;
    },

    authenticateUserData({ commit }, code) {
      var params = {
        'code': code,
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      commit('SET_CODE', code)
      Axios.post(process.env.VUE_APP_API_URL + '/authenticate', params)
      .then((response) => {
        store.dispatch('VatsimSSO/setToken', response.data.token);
        store.dispatch('User/setUser', response.data.user);
      });
    },
  }
}