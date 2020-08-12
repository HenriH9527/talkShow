// Webpack base config
const path = require('path')
const webpack = require('webpack')
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            template: resolve('../app/index.html'),
            dlls: []
        })
    ],
    devServer: {
        contentBase: resolve('../app'),
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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