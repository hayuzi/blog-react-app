import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RouterConfig from '@/router/Router';
import store from '@/store/store';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
// import '@/App.css';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class App extends Component {
  render() {

    console.log(store);

    return (
      <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <RouterConfig />
        </Provider>
      </LocaleProvider>
    );
  }
}

export default App;
