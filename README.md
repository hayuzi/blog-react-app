blog-react-app
===

这是一个使用 [Create React App](https://github.com/facebook/create-react-app) 创建的项目

## 可执行脚本

### 启动项目

### `npm start`
以开发模式启动项目，在浏览器中打开[http://localhost:3000](http://localhost:3000)页面
页面可以在你修改之后热更新， 你可以查看报错或者控制台输出

### `npm test`
启动测试脚本
可以访问 [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 查看更多信息.

### `npm run build`
打包构建生产环境的项目。
可以访问  [deployment](https://facebook.github.io/create-react-app/docs/deployment) 查看更多信息.

### `npm run eject`
这个功能允许我们弹出项目的 webpack配置
这是一个一次性脚本，不能回退， 如果没有必要，请不要使用

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


---
### 项目搭建流程

#### 创建项目（ react-create-app 2.0配置 ）
```
react-create-app blog-react-app
cd blog-react-app


```

#### 引入antd 和 ant design pro
```
yarn add antd

yarn add ant-design-pro@latest

```

#### antd 以及 ant-design-pro 组件按需加载
```
# 将webpack相关配置暴露出来
yarn run eject
# 引入一个用于按需加载组件代码和样式的 babel 插件
yarn add babel-plugin-import --save-dev
```
修改package.json
```
...
  "babel": {
    "presets": [
      "react-app"
-    ]
+    ],
+   "plugins": [
+      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }, "antd"]
+      ["import", { "libraryName": "ant-design-pro", "libraryDirectory": "lib", "style": true, "camel2DashComponentName": false }, "ant-design-pro"]
+    ]
  }
...
```

#### 路由与状态管理
```
yarn add react-router
yarn add react-redux
yarn add redux
yarn add redux-saga

```

#### webpack 配置 @ 路径别名
```
...
  alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    '@': paths.appSrc,    // 加入这一行 功能其实就是后面这个：path.resolve('src'),   src的相对路径或者绝对路径要配置正确
  },
...

```

#### 引入less, 并且需要在 webpack中配置less-loader加载
```
yarn add less less-loader --dev
```

```


// webpack.js 中找到 SASS相对应的位置， 加入如下的LESS配置
lessRegex 与 lessModuleRegex 参考 SASS的写法


// Opt-in support for LESS (using .scss or .less extensions).
// By default we support LESS Modules with the
// extensions .module.less or .module.less
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules, but using LESS
// using the extension .module.less or .module.less
// 此处按照描述，模块化CSS的用法在 less中必须给less文件使用 .module.less 后缀
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
  ),
},

```


#### 使用装饰器语法解析

```
# 安装
# yarn add babel-plugin-transform-decorators-legacy --dev
yarn add @babel/plugin-proposal-decorators --dev

# 配置 package.json 注意：babel 7.0以上版本配置与之前不同：如下
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
},
```

#### 路由配置(当前未处理路由配置)



#### 引入 axios 处理与服务器交互
```
yarn add axios
```

#### markdown编辑器 以及语法高亮显示

```
yarn add marked
yarn add highlight.js

# 或者使用
yarn add react-markdown

```

#### 自动打包并发布到 gh-pages 分支
```
yarn add gh-pages --dev
```

#### 可以使用插件直接上传到七牛或者阿里云OSS
如 aliyunoss-webpack-plugin qiniju-webpack-plugin


#### 基于react-create-app实现组件异步加载
此处的webpack配置已经默认配置了，需要在router加载处处理异步倒入
```
```



#### 发布之前需要修改 src/services/hosts.js文件 中的 api hosts 配置






