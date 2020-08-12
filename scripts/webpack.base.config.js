// Webpack base config
const path = require('path')
const webpack = require('webpack')
const os = require('os')
const devMode = process.env.NODE_ENV !== 'production'

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
    entry: {
        client: resolve('../app/index.js')
    },
    output: {
        path: resolve('../dist'),
        filename: devMode ?'js/[name].[hash].js' : 'js/[name].[contenthash].js',
        chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'chunks/[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { 'legacy': true }]
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [resolve('../app/images')],
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: '[name].[hash:4].[ext]',
                  outputPath: '/img'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'font/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}


module.exports = webpackConfigBase