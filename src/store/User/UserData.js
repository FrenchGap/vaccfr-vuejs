import Axios from "axios";
import store from "..";

export const UserData = {
  namespaced: true,

  state: {
    fname: null,
    lname: null,
    vatsim_id: null,
    ATCrank_short: null,
    ATCrank_long: null,
    PilotRank: null,
    user: {},
  },

  mutations: {
    SET_USER(state, user) {
      state.fname = user.fname;
      state.lname = user.lname;
      state.vatsim_id = user.vatsim_id;
      state.ATCrank_short = user.atc_rating_short;
      state.ATCrank_long = user.atc_rating_long;
      state.PilotRank = `P${user.pilot_rating}`;
      state.user = user.user;
    },
    DEL_USER(state) {
      state.fname = null;
      state.lname = null;
      state.vatsim_id = null;
      state.ATCrank_short = null;
      state.ATCrank_long = null;
      state.PilotRank = null;
      state.user = {};
    }
  },

  getters: {
    async getFullName() {
      if (store.state.fname == null) {
        store.getters['User/fetchUserData']
        .then(() => {
          return store.state.fname + " " + store.state.lname;
        });
      } else {
        return null;
      }
    },

    async fetchUserData() {
      store.dispatch('AppState/setLoading', true);
      var params = {
        'api_token': localStorage.getItem('token'),
        'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
      };
      return Axios.get(process.env.VUE_APP_API_URL + '/user', {
        params: params
      })
      .then((response) => {
        store.dispatch('User/setUser', response.data.user);
        store.dispatch('AppState/setLoading', false);
        return true;
      })
      .catch(() => {
        console.log('User is NOT authenticated');
        store.dispatch('VatsimSSO/logoutUser');
        store.dispatch('AppState/setLoading', false);
        return false;
      });
    }
  },

  actions: {
    setUser({ commit }, userdata) {
      commit('SET_USER', userdata);
    },

    delUser({ commit }) {
      commit('DEL_USER');
    }
  }
}