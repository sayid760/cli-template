const { promisify } = require('util') 
const webpack = require('webpack') 

const webpackWithPromise = promisify(webpack)

module.exports = {
    webpackWithPromise
}
