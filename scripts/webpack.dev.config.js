const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const os = require('os')
const webpackConfigBase = require('./webpack.base.config')

let selfIP

try {
    selfIP = getIpAddress()
} catch (e) {
    selfIP = 'localhost'
}

const PORT = 8080
// Get ip address in local machine
function getIpAddress () {
    const interfaces = require('os').networkInterfaces
    for (let devName in interfaces) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i += 1) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
}

const webpackConfigDev = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}


module.exports = merge(webpackConfigBase, webpackConfigDev)