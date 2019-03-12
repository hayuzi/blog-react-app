import React, {Component} from 'react';
import {Row, Col, Breadcrumb, Typography, Divider} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/dashboard/Dashboard.module.less';

const { Title, Paragraph, Text } = Typography;

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
            <Typography>
              <Title level={4}>快速链接</Title>
              <Paragraph>
                <ul>
                  <li><NavLink to={{pathname:"/"}}>前台首页</NavLink></li>
                  <li><NavLink to={{pathname:"/admin/article/list"}}>文章列表</NavLink></li>
                  <li><NavLink to={{pathname:"/admin/article/comments"}}>评论列表</NavLink></li>
                  <li><NavLink to={{pathname:"/admin/article/tags"}}>标签列表</NavLink></li>
                  <li><NavLink to={{pathname:"/admin/user/list"}}>用户列表</NavLink></li>
                </ul>
              </Paragraph>
            </Typography>
            <Divider orientation="right">分割线</Divider>
            <div>
              <Typography>
                <Title>介绍</Title>
                <Paragraph>
                  基于 <Text mark>『ant design』和『ant design pro』</Text> 开发的简单博客系统。
                </Paragraph>
                <Paragraph>
                  前端页面展示文章列表以及详情, 并提供文章标题搜索功能。管理后台提供文章管理，用户简单管控功能，便于做一些基础的操作 。
                </Paragraph>
                <Title level={2}>账户管控</Title>
                <Paragraph>
                  可以在前台页面右上角登陆，并且提供注册功能，<Text strong>目前没有个人信息修改的选项，只有密码修改功能</Text>。
                </Paragraph>
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;