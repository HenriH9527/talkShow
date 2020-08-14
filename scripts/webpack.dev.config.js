const path = require('path')
const webpack = require('webpack')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackDevConfig = {
    mode: 'development',
    entry: {
      index: resolve('../src/index.js'),
      framework: ['react', 'react-dom']
    },
    output: {
      filename: 'js/[name].[hash:8].bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      open: true,
      port: PORT,
      compress: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
      }),
      new CleanWebpackPlugin()
    ]
}


module.exports = webpackDevConfig