import * as types from '../mutation-types'
import { post, load } from '../../utils'

const state = {
  status: null
}

const getters = {
  provisionStatus: state => state.status
}

const mutations = {
  [types.SET_PROVISION_STATUS] (state, data) {
    state.status = data
  }
}

const actions = {
  async getProvisionStatus ({getters, commit, dispatch}, {showNotification = true}) {
    dispatch('setLoading', {group: 'user', type: 'provision', value: true})
    console.log('loading provision status...')
    try {
      const endpoint = getters.endpoints.provision
      const response = await load(getters.instance, getters.jwt, endpoint)
      console.log('load provision status - response:', response)
      commit(types.SET_PROVISION_STATUS, response.data)
      if (showNotification) {
        dispatch('successNotification', 'Successfully loaded provision status')
      }
    } catch (e) {
      console.log('error loading provision status', e)
      dispatch('errorNotification', {title: 'Failed to load provision status', error: e})
    } finally {
      dispatch('setLoading', {group: 'user', type: 'provision', value: false})
    }
  },
  async provisionUser ({getters, commit, dispatch}, {password, showNotification = true}) {
    dispatch('setWorking', {group: 'user', type: 'provision', value: true})
    console.log('starting provision...')
    try {
      const endpoint = getters.endpoints.provision
      const username = getters.user.username
      // console.log('endpoint =', endpoint)
      // make sure their password is right
      try {
        // don't test login credentials when user is admin using switch-user
        if (!getters.user.suJwt) {
          const auth = await post(getters.instance, getters.jwt, getters.endpoints.login, null, {username, password})
          console.log('provision - auth - response:', auth)
        }
        // now provision using their toolbox password
        const response = await post(getters.instance, getters.jwt, endpoint, null, {password})
        // register provision status with pcce-toolbox-proxy
        // TODO get that static string out of there!
        post(getters.instance, getters.jwt, getters.endpoints.instanceRegister, null, {demo: 'cwcc', version: 'v1'})
        .then(r => console.log('successfully registered provision status'))
        .catch(e => console.error('provision succeeded, but registering provision status failed:', e))
        console.log('provision status - response:', response)
        // get new status
        // dispatch('getProvisionStatus', {showNotification: false})
        // reload all demo selectors
        // dispatch('loadDemoSelectors', {showNotification: false})
        // reload call types
        // dispatch('searchCceObjects', {type: 'callType', showNotification: false})
        // reload precision queues
        // dispatch('searchCceObjects', {type: 'precisionQueue', showNotification: false})
        if (showNotification) {
          dispatch('successNotification', 'Successfully started provisioning process.')
        }
      } catch (e) {
        console.log('error during provision script', e)
        dispatch('errorNotification', {title: 'provision failed', error: e})
      }
    } catch (e) {
      console.log('error during provision script', e)
      dispatch('errorNotification', {title: 'provision script failed', error: e})
    } finally {
      dispatch('setWorking', {group: 'user', type: 'provision', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
