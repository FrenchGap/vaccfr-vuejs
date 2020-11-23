import Axios from "axios";
import store from "..";

export const News = {
  namespaced: true,

  state: {
    news: {}
  },

  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },

    DEL_NEWS(state) {
      state.news = {};
    }
  },

  getters: {
    async fetchNews() {
      var params = {
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      var resultingState = await Axios.get(process.env.VUE_APP_API_URL + '/news', {
        params: params
      })
      .then((response) => {
        store.dispatch('News/setNews', response.data.news);
        return true;
      })
      .catch(() => {
        console.log('User is NOT authenticated');
        store.dispatch('VatsimSSO/logoutUser');
        return false;
      });
      return resultingState;
    }
  },

  actions: {
    setNews({ commit }, news) {
      commit('SET_NEWS', news);
    },
    
    delNews({ commit }) {
      commit('DEL_NEWS');
    }
  }
}