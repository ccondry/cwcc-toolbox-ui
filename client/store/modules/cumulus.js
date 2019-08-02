import * as types from '../mutation-types'
import {Toast} from 'buefy'

const state = {
  brands: [],
  verticals: [],
  demoConfig: {}
}

const getters = {
  brands: state => state.brands,
  verticals: state => state.verticals,
  demoConfig: state => state.demoConfig
}

const mutations = {
  [types.SET_BRANDS] (state, data) {
    state.brands = data
  },
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_CONFIG] (state, data) {
    state.demoConfig = data
  }
}

const actions = {
  async loadBrands ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'brands', value: true})
    try {
      await dispatch('loadToState', {
        name: 'brands',
        endpoint: getters.endpoints.brand,
        mutation: types.SET_BRANDS,
        showNotification
      })
    } catch (e) {
      console.error('error loading brands', e)
      // notify user
      Toast.open({
        duration: 5000,
        message: `load brands failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'app', type: 'brands', value: false})
    }
  },
  async loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    try {
      await dispatch('loadToState', {
        name: 'verticals',
        endpoint: getters.endpoints.vertical,
        mutation: types.SET_VERTICALS,
        showNotification
      })
    } catch (e) {
      console.error('error loading verticals', e)
      // notify user
      Toast.open({
        duration: 5000,
        message: `load verticals failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    }
  },
  async loadDemoConfig ({getters, commit, dispatch}, showNotification = true) {
    console.log('loadDemoConfig running...')
    dispatch('setLoading', {group: 'session', type: 'config', value: true})
    try {
      await dispatch('loadToState', {
        name: 'load demo session configuration',
        endpoint: getters.endpoints.cumulus,
        mutation: types.SET_DEMO_CONFIG,
        showNotification
      })
    } catch (e) {
      console.log('error loading demo session configuration', e)
      // dispatch('errorNotification', {title: 'Failed to load demo session configuration', error: e})
      Toast.open({
        duration: 5000,
        message: `load demo session configuration failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'session', type: 'config', value: false})
    }
  },
  async saveDemoConfig ({getters, commit, dispatch}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'session', type: 'config', value: true})
    try {
      await dispatch('postData', {
        name: 'save demo session configuration',
        endpoint: getters.endpoints.cumulus,
        data,
        showNotification
      })
    } catch (e) {
      console.log('error saving demo session config', e)
      // dispatch('errorNotification', {title: 'Failed to save demo session configuration', error: e})
      Toast.open({
        duration: 5000,
        message: `save demo session configuration failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'session', type: 'config', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
