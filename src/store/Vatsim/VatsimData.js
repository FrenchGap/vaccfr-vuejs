import Axios from "axios";
import store from "..";

export const VatsimData = {
  namespaced: true,

  state: {
    onlineATC: {},
    onlineATCLastUpdated: 0,
  },

  mutations: {
    SET_ONLINEATC(state, data) {
      state.onlineATC = data;
      state.onlineATCLastUpdated = new Date().getTime();
    }
  },

  getters: {
    
  },

  actions: {
    setOnlineATC({ commit }, data) {
      commit('SET_ONLINEATC', data);
    },

    updateOnlineATC() {
      store.dispatch('AppState/setLoading', true);
      var params = {
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      Axios.get(process.env.VUE_APP_API_URL + '/vatsimdata/onlineatc', {
        params: params
      })
      .then((response) => {
        store.dispatch('VatsimData/setOnlineATC', response.data.data);
        store.dispatch('AppState/setLoading', false);
        return response.data.data;
      })
      .catch(() => {
        store.dispatch('AppState/setLoading', false);
        return {};
      });
    }
  },
}