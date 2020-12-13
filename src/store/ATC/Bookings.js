export const Bookings = {
  namespaced: true,

  state: {
    ATCBookings: {},
    ATCBookingsLastUpdated: "--:--z",
  },

  mutations: {
    SET_ATCBOOKINGS(state, data) {
      state.ATCBookings = data;
    }
  },

  getters: {
    getATCBookingsList(state) {
      return state.ATCBookings;
    }
  },

  actions: {
    setATCBookings({ commit }, data) {
      commit('SET_ATCBOOKINGS', data);
    },
  },
}