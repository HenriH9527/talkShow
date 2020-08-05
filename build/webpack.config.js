'use strict'
const path = require('path')

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
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: './dist'
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
            }
        ]
    }
}