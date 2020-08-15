// Webpack base config
const path = require('path')
const webpack = require('webpack')
const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
    entry: {
        index: './src/index.js',
        framework: ['react', 'react-dom']
    },
    output: {
        filename: 'js/bundle.js',
        path: resolve('../dist')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }
}


module.exports = webpackConfigBase