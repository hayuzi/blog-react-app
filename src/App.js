import React, { Component } from 'react';
import RouterConfig from "@/router/Router";
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import '@/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterConfig />
      </div>
    );
  }
}

export default App;
