import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
import config from '../config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    isProduction: process.env.NODE_ENV === 'production',
    ldapDomain: config.lab.upnDomain,
    endpointsLoaded: false,
    endpoints: config.app.endpoints,
    pkg,
    working: {
      app: {},
      images: {},
      cce: {},
      cvp: {},
      duo: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {},
      user: {},
      session: {},
      upstream: {}
    },
    loading: {
      app: {},
      images: {},
      cce: {},
      cvp: {},
      duo: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {},
      user: {},
      session: {},
      upstream: {}
    }
  },
  mutations
})

export default store
