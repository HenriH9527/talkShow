const path = require('path')
const webpack = require('webpack')
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，
// 支持按需加载css和sourceMap
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 通js的多进程来实现打包加速
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = require('happypack/lib/HappyThreadPool')
const happyTreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const devMode = process.env.NODE_ENV !== 'production'

function resolve (relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js')
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunk/[name].[contenthash].js'
  },
  resolve: {  // 减少后缀
    extensions: ['.js', '.jsx', '.json'],
    alias: {  // 减少使用别名提高编译速度
      '@app': path.join(__dirname, '../app')
    }
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunk: 'all',  // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1,  // 模块被引用 >= 1次，便分割
      name: true,  // 默认由模块名 +hash命名， 名称相同时多个模块合并为1个，可以设置为 function
      automaticNameDelimiter: '~',  // 命名分隔符
      cacheGroups: {
        default: {  // 模块缓存规则，设置为 false, 默认缓存组件将禁用
          minChunks: 2,
          priority: -20, // 优先级
          reuseExistChunk: true // 默认使用已有的模块
        },
        vendor: {
          // 过滤需要打入的模块
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10, // 确定模块打入的优先级
          reuseExistingChunk: true,  // 使用复用已经存在的模块
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../app')],
        // loader: 'babel',
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: devMode,
            },
          },
          'happypack/loader?id=happyStyle',
        ]
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
      }
    ]
  },
  performance: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/style.css' : 'css/style.[contenthash].css',
      chunkFilename: devMode ? 'css/style.[id].css' : 'css/style.[contenthash].[id].css'
    }),

    new HappyPack({
      // 用 id 来标识 happypack 处理哪类文件
      id: 'happyBabel',
      // 如何处理 用法和 loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true  // 启用缓存
        }
      }],
      // 代表共享进程池， 即多个 Happypack 实例都使用同一个共享进程池中的子进程去处理任务,
      // 以防止资源占用过多
      threadPool: HappyThreadPool,
      // 允许 Happypack 输出日志
      verbose: false
    }),

    new HappyPack({
      id: 'happyStyle',
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true  // 为true,在样式追溯时，显示的是编写时的样式，为false，则为编译后的样式
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      // 代表共享进程池， 即多个 Happypack 实例都使用同一个共享进程池中的子进程去处理任务,
      // 以防止资源占用过多
      threadPool: HappyThreadPool,
      // 允许 Happypack 输出日志
      verbose: false
    }),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}


module.exports = webpackConfigBase