import Axios from "axios";
import store from "..";

export const VatsimData = {
  namespaced: true,

  state: {
    onlineATC: {},
    onlineATCLastUpdated: "--:--z",
  },

  mutations: {
    SET_ONLINEATC(state, data) {
      state.onlineATC = data;
      var t = new Date();
      state.onlineATCLastUpdated = `${t.getUTCHours()}:${t.getUTCMinutes()}z`;
    }
  },

  getters: {
    getOnlineATCList(state) {
      return state.onlineATC;
    },
    getOnlineATCListUpdateTime(state) {
      return state.onlineATCLastUpdated;
    }
  },

  actions: {
    setOnlineATC({ commit }, data) {
      commit('SET_ONLINEATC', data);
    },

    async updateOnlineATC() {
      var params = {
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      return Axios.get(process.env.VUE_APP_API_URL + '/vatsimdata/onlineatc', {
        params: params
      })
      .then((response) => {
        store.dispatch('VatsimData/setOnlineATC', response.data.data);
      })
      .catch(() => {});
    }
  },
}