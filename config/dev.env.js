var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://api.endpoint.here"',
  FACEBOOK_CLIENT_ID: '"FACEBOOK_CLIENT_ID"',
  GOOGLE_CLIENT_ID: '"GOOGLE_CLIENT_ID"',
})
