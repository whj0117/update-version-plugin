const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
function resolve(name) {
    return path.join(__dirname, name)
}
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    entry: ["babel-polyfill", "./plugin/update-version-plugin.js"],
})