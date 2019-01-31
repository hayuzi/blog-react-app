import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RouterConfig from '@/router/Router';
import store from '@/store/store';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import '@/App.css';

class App extends Component {
  render() {

    console.log(store);

    return (
      <Provider store={store} className="App">
        <RouterConfig />
      </Provider>
    );
  }
}

export default App;
