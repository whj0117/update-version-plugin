const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ["babel-polyfill", "./src/index.js"],
    devServer: {
        port: 3000,
        hot: true,
        open: true
    },
})