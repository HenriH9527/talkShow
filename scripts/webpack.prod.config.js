const mergeUtils = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = mergeUtils.merge(webpackConfigBase, {
    mode: 'production',
    output: {
        filename: 'js/[name].[hash:8].bundle.js'
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
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: 'framework',
                    name: 'framework',
                    enforce: true
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    }
})