import React, {Component} from 'react';
import {Row, Col, Breadcrumb} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/dashboard/Dashboard.module.less';

class Dashboard extends Component {

  render() {
    return (
      <Row>
        <Col span={24} className={styles.breadCrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div className={styles.layoutContent}>
            <NavLink to={{pathname:"/"}}>回前台</NavLink>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;