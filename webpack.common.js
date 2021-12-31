const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const updateVersionPlugin = require('./plugin/update-version-plugin')

module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new updateVersionPlugin({
            name: '',
            isLog: true
        })
    ],
    module: {
        rules: [
            {
                test: '/\.js$/',
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'updateVersionPlugin.js',
        path: path.join(__dirname, './lib')
    }
}