// import Axios from "axios";

import Axios from "axios";
import store from "..";

export const VatsimSSO = {
  namespaced: true,

  state: {
    token: null,
    authenticated: false,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      state.authenticated = true;
      localStorage.setItem('token', token);
    },
    DEL_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    SET_AUTHENTICATED(state) {
      state.authenticated = true;
    },
    DEL_AUTHENTICATED(state) {
      state.authenticated = false;
    }
  },

  getters: {
    getAuthenticationState() {
      if (store.state.authenticated == true) {
        return true;
      } else if (localStorage.getItem('token')) {
        var tokenToCheck = localStorage.getItem('token');
        store.dispatch('AppState/setLoading', true);
        console.log('There is a token');
        var params = {
          'api_token': tokenToCheck,
          'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        };
        Axios.post(process.env.VUE_APP_API_URL + '/checkToken', params)
        .then((response) => {
          store.dispatch('AppState/setLoading', false);
          if (response.status == 200) {
            console.log('User is authenticated');
            store.dispatch('VatsimSSO/setToken', tokenToCheck);
            store.dispatch('VatsimSSO/setAuthenticated');
            store.dispatch('AppState/setLoading', false);
            return true;
          }
        })
        .catch(() => {
          console.log('User is NOT authenticated');
          store.dispatch('AppState/setLoading', false);
          return false;
        });
      } else {
        return false;
      }
    }
  },

  actions: {
    authenticateUser() {
      store.dispatch('AppState/setLoading', true);
      var url = `${process.env.VUE_APP_VATSIMSSO_URL}?response_type=code&scope=full_name vatsim_details email&client_id=${process.env.VUE_APP_VATSIMSSO_ID}&redirect_uri=${process.env.VUE_APP_BASEURL}/ssologin`;
      window.location = url;
    },

    authenticateData({ commit }, code) {
      store.dispatch('AppState/setLoading', true);
      var params = {
        'code': code,
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      Axios.post(process.env.VUE_APP_API_URL + '/authenticate', params)
      .then((response) => {
        console.log(response.data)
        commit('SET_TOKEN', response.data.token)
        store.dispatch('User/setUser', response.data.user);
        store.dispatch('AppState/setLoading', false);
      });
    },

    setToken({ commit }, value) {
      commit('SET_TOKEN', value);
    },

    setAuthenticated({ commit }) {
      commit('SET_AUTHENTICATED');
    },

    logoutUser({ commit }) {
      store.dispatch('AppState/setLoading', true);
      // add route here to invalidate the token server-side
      commit('DEL_TOKEN');
      commit('DEL_AUTHENTICATED');
      store.dispatch('User/delUser');
      store.dispatch('AppState/setLoading', false);
    }
  }
}