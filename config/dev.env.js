var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://site-maisbartenders.test/api"',
  //API_URL: '"https://maisbartenders.com.br/api"',
  FACEBOOK_CLIENT_ID: '"262783620860879"',
  GOOGLE_CLIENT_ID: '"78576259068-946rmqo5lr86v1hekodh2v6qsjpm9p23.apps.googleusercontent.com"',
})
