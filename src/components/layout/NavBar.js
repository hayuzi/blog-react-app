import React, {Component} from 'react';
import {Menu} from 'antd';
import styles from './NavBar.module.less';
import {NavLink} from 'react-router-dom';
import logo from '@/logo.svg';

class NavBar extends Component {
  render() {
    return (
      <div className={styles.navBar}>
        <div className={styles.middle}>
          <div className={styles.main}>

            <div className={styles.menuInline}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: "60px"}}
              >
                <Menu.Item key="navIndex">
                  <NavLink to={{pathname: "/"}}>
                    <b style={{fontSize: "16px"}}>
                      &nbsp;&nbsp;首 页&nbsp;&nbsp;
                    </b>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="navTags">
                  <NavLink to={{pathname: "/search"}}>
                    <b style={{fontSize: "16px"}}>
                      &nbsp;&nbsp;搜 索&nbsp;&nbsp;
                    </b>
                  </NavLink>
                </Menu.Item>
              </Menu>
            </div>

          </div>
        </div>

        <div className={styles.left}>
          <div className={styles.title}>
            <div className={styles.logo}>
              <img src={logo} className={styles.logoImg} alt="logo"/>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <span>hayuzi&nbsp;的个人博客</span>
        </div>
      </div>
    );
  }
};

export default NavBar;
