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
    ATCHours: null,
    PilotHours: null,
    LastCallsign: null,
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
    },
    SET_USER_QUICK_STATS(state, stats) {
      state.ATCHours = stats.atc;
      state.PilotHours = stats.pilot;
      state.LastCallsign = stats.callsign;
    },
    DEL_USER_QUICK_STATS(state) {
      state.ATCHours = null;
      state.PilotHours = null;
      state.LastCallsign = null;
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
      if (localStorage.getItem('token') || store.state.VatsimSSO.token) {
        var params = {
          'api_token': (localStorage.getItem('token')) ? localStorage.getItem('token') : store.state.VatsimSSO.token,
          'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        };
        var resultingState = await Axios.get(process.env.VUE_APP_API_URL + '/user', {
          params: params
        })
        .then((response) => {
          store.dispatch('User/setUser', response.data.user);
          return true;
        })
        .catch(() => {
          console.log('User is NOT authenticated');
          store.dispatch('VatsimSSO/logoutUser');
          return false;
        });
        return resultingState;
      } else {
        return false;
      }
    },

    async fetchUserQuickStats() {
      if (localStorage.getItem('token') || store.state.VatsimSSO.token) {
        var params = {
          'api_token': (localStorage.getItem('token')) ? localStorage.getItem('token') : store.state.VatsimSSO.token,
          'app_auth_token': process.env.VUE_APP_FRONTEND_KEY,
        };
        var resultingState = await Axios.get(process.env.VUE_APP_API_URL + '/user/quickStats', {
          params: params
        })
        .then((response) => {
          store.dispatch('User/setUserQuickStats', response.data);
          return true;
        })
        .catch(() => {
          console.log('User is NOT authenticated');
          store.dispatch('VatsimSSO/logoutUser');
          return false;
        });
        return resultingState;
      } else {
        return false;
      }
    }
  },

  actions: {
    setUser({ commit }, userdata) {
      commit('SET_USER', userdata);
    },

    delUser({ commit }) {
      commit('DEL_USER');
      commit('DEL_USER_QUICK_STATS');
    },

    setUserQuickStats({ commit }, stats) {
      commit('SET_USER_QUICK_STATS', stats);
    },
    
    delUserQuickStats({ commit }) {
      commit('DEL_USER_QUICK_STATS');
    }
  }
}