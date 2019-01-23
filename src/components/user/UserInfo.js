import React, {Component} from 'react';
import headPic from '@/assets/img/default-head-pic.png'
import {Row, Col, Avatar} from 'antd';

class UserInfo extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Avatar size={100} src={headPic} />
        </Col>
      </Row>
    );
  }
};

export default UserInfo;