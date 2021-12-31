# update-version-plugin
在日常项目开发中，大家经常遇到本地修改完bug，部署上线，但是线上没有修复的问题，排查本地也没找到根本原因，最终导致问题的原因可能是线上缓存或者部署失败，这个plugin主要是用于build的之后会在<body>后面注入一个隐藏的input，value值是最新版本，可以通过这个版本来查看线上项目是否为最新版本。

## 计算规则
例：1.20211231.32

1：固定不变
20211231：今天的年月日
32：今天build次数，如果匹配当前日期跟20211231不一致，从0开始计算

## 安装
```
npm安装
npm install update-version-plugin

yarn安装
yarn add update-version-plugin
```

## 使用
```
vue.config.js/webpack.config.js

const updateVersionPlugin = require('update-version-plugin')
plugins:[
    {
        new updateVersionPlugin({
            name:'version',
            isLog:false
        })
    }
]
```

## 配置
```
{   
    /**
    * @description 注入到package.json的枚举值，不传默认为version
    * @type {String}
    * @default version
    */
    name: 'version',
    /**
    * @description 本地控制台是否打印成功/失败提示
    * @type {Bealoon}
    * @default false
    */
    isLog: false,
}
```
