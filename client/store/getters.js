export const pkg = state => state.pkg
export const app = state => state.app
export const isProduction = state => state.isProduction
export const device = state => state.app.device
export const sidebar = state => state.app.sidebar
export const effect = state => state.app.effect
export const menuitems = state => state.menu.items
export const authEnabled = state => true
export const loading = state => state.loading
export const working = state => state.working
export const endpoints = state => state.endpoints
export const endpointsLoaded = state => state.endpointsLoaded
export const sessionId = state => state.app.sessionId
export const datacenter = state => state.app.datacenter
// export const instance = state => state.instance
// export const instances = state => state.instances
// export const instancesLoaded = state => state.instancesLoaded
export const ldapDomain = state => state.ldapDomain
