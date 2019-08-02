// determine initial REST API endpoint
let endpoint
let loginEndpoint

if (process.env.NODE_ENV === 'production') {
  endpoint = '/api/v1/cwcc/endpoints'
  loginEndpoint = '/api/v1/auth/login'
} else {
  // this is on the cwcc-toolbox-api project
  endpoint = 'http://localhost:3049/api/v1/cwcc/endpoints'
  // this is on the toolbox-login-api project
  loginEndpoint = 'http://localhost:3032/api/v1/auth/login'
}

export default {
  app: {
    // endpoints list
    endpoints: {
      // initial REST API endpoints
      endpoints: endpoint,
      login: loginEndpoint
    }
  },
  lab: {
    upnDomain: 'dcloud.cisco.com'
  }
}
