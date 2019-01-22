import React, {Component} from 'react';
import {Menu} from 'antd';
import styles from './NavBar.less';
import logo from '@/logo.svg';

class NavBar extends Component {
  render() {
    console.log(styles);

    return (
      <div className="navBar">
        <div className="logo">
          <img src={logo} className="logoImg" alt="logo"/>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{lineHeight: '32px'}}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    );
  }
};

export default NavBar;
