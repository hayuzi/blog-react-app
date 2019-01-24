import React, {Component} from 'react';
import headPic from '@/assets/img/default-head-pic.png'
import {Row, Col, Avatar, List, Icon} from 'antd';
import styles from '@/components/user/UserInfo.module.less'

class UserInfo extends Component {


  getIconTextListItem(iconType, info) {
    return (
      <span>
        <Icon type={iconType} theme="twoTone"/>
        <span>{info}</span>
      </span>
    );
  }

  render() {

    const listData = [
      this.getIconTextListItem('link', 'https://github.com/hayuzi')
    ];

    return (
      <Row>
        <Col span={24} className={styles.infoArea}>
          <Avatar size={80} src={headPic}/>
        </Col>
        <Col span={24}>
          <List
            size="small"
            dataSource={listData}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Col>
      </Row>
    );
  }
};

export default UserInfo;