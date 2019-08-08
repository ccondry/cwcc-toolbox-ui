const state = {
  session: null
}

const mutations = {
  [types.SET_DCLOUD_SESSION] (state, data) {
    state.session = data
  }
}

const getters = {
  dcloudSession: state => state.session,
  brandDemoLink (state, getters) {
    return `https://mm-brand.cxdemo.net?session=${getters.sessionId}&datacenter=${getters.datacenter}&userId=${getters.user.id}`
  },
  cumulusDemoLink (state, getters) {
    return `https://mm.cxdemo.net?session=${getters.sessionId}&datacenter=${getters.datacenter}&userId=${getters.user.id}`
  }
}

const actions = {
  async getDcloudSession ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'session', value: true})
    try {
      await dispatch('loadToState', {
        name: 'dcloud session info',
        endpoint: getters.endpoints.session,
        mutation: types.SET_DCLOUD_SESSION,
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
