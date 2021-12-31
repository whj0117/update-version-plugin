const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const MyPlugin = 'updateVersionPlugin'
const AddZero = time => {
    return time.toString().padStart(2, '0')
}

class updateVersionPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        try {
            let packageTxt = fs.readFileSync('./package.json', 'utf8')
            let versionData = packageTxt.split('\n')
            let packageJson = JSON.parse(packageTxt)
            let VersionArr
            let date = new Date()
            let today = date.getFullYear() + '' + AddZero(date.getMonth() + 1) + '' + AddZero(date.getDate())
            if (this.options.name) {
                if (JSON.parse(packageTxt).hasOwnProperty(`${this.options.name}`)) {
                    // package本身才在name枚举，更改版本
                    VersionArr = packageJson[this.options.name].split('.')
                } else {
                    // 不存在添加默认值
                    VersionArr = [1, today, 0]
                }
            } else {
                // name不存在，用version作为枚举
                VersionArr = packageJson.version.split('.')
            }

            if (today == VersionArr[1]) {
                VersionArr[2] = parseInt(VersionArr[2]) + 1
            } else {
                VersionArr[1] = today
                VersionArr[2] = 1
            }
            let versionLine = VersionArr.join('.')
            for (let i = 0; i < versionData.length; i++) {
                if (this.options.name) {
                    console.log('第一步')
                    // name不存在直接用version
                    if (JSON.parse(packageTxt).hasOwnProperty(`${this.options.name}`)) {
                        if (versionData[i].indexOf(`"${this.options.name}":`) != -1) {
                            versionData.splice(i, 1, `  "${this.options.name}": "${versionLine}",`);
                            break;
                        }
                    } else {
                        console.log('第二部', versionData)
                        if (versionData[i].indexOf('{') !== -1) {
                            versionData.splice(i + 1, 0, `  "${this.options.name}": "${versionLine}",`);
                            break;
                        }
                    }
                } else {
                    if (JSON.parse(packageTxt).hasOwnProperty("version")) {
                        if (versionData[i].indexOf('"version":') != -1) {
                            versionData.splice(i, 1, '  "version": "' + versionLine + '",');
                            break;
                        }
                    } else {
                        if (versionData[i] === '{') {
                            versionData.splice(i + 1, 0, `  "version": "${versionLine}",`);
                            break;
                        }
                    }
                }
            }
            fs.writeFileSync('./package.json', versionData.join('\n'), 'utf8')
            if (this.options.isLog) {
                console.log(chalk.green.bold('更新版本号成功！当前最新版本号为：' + versionLine))
            }
            let plugins = compiler.options.plugins
            plugins.push(new webpack.DefinePlugin({
                UPDATEVERSIONNAME: JSON.stringify(this.options.name)
            }))
            compiler.hooks.compilation.tap(MyPlugin, (compilation, options) => {
                compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('aaa', (htmlPluginData, cb) => {
                    let sVersion = require('../package.json').version
                    let sDomRelease = `<input type="hidden" id="release" value=${sVersion} />`
                    let head = htmlPluginData.html.indexOf('<body>') + 6
                    htmlPluginData.html = htmlPluginData.html.slice(0, head) + sDomRelease + htmlPluginData.html.slice(head)
                    cb()
                })
            })

        } catch (e) {
            if (this.options.isLog) {
                console.log(chalk.red.bold('读取文件修改版本号出错:', e.toString()))
            }
        }
    }
}

module.exports = updateVersionPlugin;