const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const updateVersionPlugin = require('./plugin/update-version-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new updateVersionPlugin({
            name: 'versionName',
            isLog: true
        })
    ],
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'update-version-plugin.js',
        path: path.join(__dirname, './lib'),
    }
}