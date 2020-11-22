import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './General/AppState'
import { LocaleStore } from './General/LocaleStore'
import { UserData } from './User/UserData'
import { VatsimSSO } from './User/VatsimSSO'
import { VatsimData } from './Vatsim/VatsimData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    AppState: AppState,
    LocaleStore: LocaleStore,
    User: UserData,
    VatsimSSO: VatsimSSO,
    VatsimData: VatsimData,
  }
})
