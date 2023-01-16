require("dotenv").config()

const { ROLLBAR_ACCESSTOKEN } = process.env

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESSTOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
})

module.exports = rollbar