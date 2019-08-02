const getters = {
  brandDemoLink (state, getters) {
    return `https://mm-brand.cxdemo.net?session=${getters.sessionId}&datacenter=${getters.datacenter}&userId=${getters.user.id}`
  },
  cumulusDemoLink (state, getters) {
    return `https://mm.cxdemo.net?session=${getters.sessionId}&datacenter=${getters.datacenter}&userId=${getters.user.id}`
  }
}

export default {
  getters
}
