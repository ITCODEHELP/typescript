
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jupita-sdk.cjs.production.min.js')
} else {
  module.exports = require('./jupita-sdk.cjs.development.js')
}
