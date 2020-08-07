'use strict'
const path = require('path')
const less = require('less')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// resolve path
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

console.log(path.join('./src/index.js'))
console.log(path.join('./dist'))
console.log(path.resolve(__dirname, '../'))

module.exports = {
    context: path.resolve(__dirname, '../'),
    // The entry of the Application
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve('dist'),
        publicPath: '/',
        filename: 'js/[name]-[hash]' + '.js',
        chunkFilename: 'js/[name]-[hash]' + 'js'
    },
    devServer:{
        contentBase: false,
        clientLogLevel: 'warning',
        publicPath: '/',
        hot: true,
        progress: true,
        overlay: { warning: false, errors:true },
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/', 'index.html') }
            ]
        },
        compress: true,
        inline: true,
        port: 8080,
        host: '127.0.0.1',
        watchOptions:{
            poll: false
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env', 'react']
                        }
                    }, {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter'),
                            emitWarning: false
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: /src/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                importLoaders: 2,
                                localIdentName: '[name]-[local]-[hash:base64:5]',
                                modules:true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {      
                                plugins: (loader) => [
                                    require('autoprefixer')(), 
                                ]
                            }
                        },{
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                            }
                        },
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('src/assets/icons')],
                options: {
                  limit: 10000,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
              }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name]-[hash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            from: path.resolve(__dirname, './src/static'),
            to: 'static',
            ignore: ['.*']
        })
    ],
    optimization: {
        runtimeChunks: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
}