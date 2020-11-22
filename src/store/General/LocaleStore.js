import VueI18n from "@/plugins/i18n";

export const LocaleStore = {
  namespaced: true,

  state: {
    locale: 'en',
    localeList: ['en', 'fr']
  },

  mutations: {
    UPDATE_LOCALE(state, newLocale) {
      state.locale = newLocale;
      localStorage.setItem('locale', newLocale);
    }
  },

  getters: {},

  actions: {
    async changeLocale({ commit }, newLocale) {
      VueI18n.locale = newLocale;
      await commit('UPDATE_LOCALE', newLocale);
    }
  }
}