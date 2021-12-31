let app = document.getElementById('app');
let sVersion = UPDATEVERSIONNAME ? require('../package.json')[UPDATEVERSIONNAME] : require('../package.json').version;
app.innerHTML = `当前版本为：<span style="color:red">${sVersion}</span >，生产环境右键项目点击查看网页源码,&ltbody&gt标签后面的input标签的value属性。`