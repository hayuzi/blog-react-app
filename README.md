blog-react-app
===

这是一个使用 create-react-app 创建的项目

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### 启动项目

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
yarn add babel-plugin-transform-decorators-legacy --dev

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

```





