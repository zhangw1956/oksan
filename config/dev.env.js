'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://192.168.1.46:8080/wxoksan"',
  APP_ID: '"wx865043fcaff01798"'
})
