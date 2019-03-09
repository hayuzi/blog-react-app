import React, {Component} from 'react';
import {Row, Col, Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/user/AdminUserList.module.less';

class AdminUserList extends Component {

  render() {
    return (
      <Row>
        <Col span={24} className={styles.breadCrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={{pathname: '/admin/dashboard'}}>
                  首页
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>

        </Col>
      </Row>
    );
  }
}

export default AdminUserList;