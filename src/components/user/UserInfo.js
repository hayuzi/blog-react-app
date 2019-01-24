import React, {Component} from 'react';
import headPic from '@/assets/img/default-head-pic.png';
import {Row, Col, Avatar, List, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/components/user/UserInfo.module.less';


class UserInfo extends Component {

  getIconTextListItem(iconType, info, link) {
    const ItemInfo = function (props) {
      if (props.link !== undefined) {
        return <a href={props.link} target="_blank" rel="noopener noreferrer"><span>{props.info}</span></a>;
      } else {
        return <span>{props.info}</span>;
      }
    };
    return (
      <span>
        <Icon type={iconType}/>
        <span>&nbsp;&nbsp;</span>
        <ItemInfo info={info} link={link}/>
      </span>
    );
  }

  render() {

    const listData = [
      this.getIconTextListItem('user', 'hayuzi'),
      this.getIconTextListItem('link', 'https://github.com/hayuzi', 'https://github.com/hayuzi'),
      this.getIconTextListItem('environment', '上海'),
      this.getIconTextListItem('cluster', '后端研发'),
    ];

    const tagsData = [
      <NavLink to="/tags/detail">PHP</NavLink>,
      <NavLink to="/tags/detail">Linux</NavLink>,
      <NavLink to="/tags/detail">PHP</NavLink>,
    ];

    return (
      <Row>
        <Col span={24} className={styles.avatarArea}>
          <Avatar size={80} src={headPic}/>
        </Col>
        <Col span={24} className={styles.infoArea}>
          <List
            size="small"
            dataSource={listData}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Col>
        <Col span={24} className={styles.articleTags}>
          <div className={styles.gradationLine} />
          <div style={{ marginTop: "10px" }}>
            <b>文章标签: </b>
          </div>
          <List
            size="small"
            dataSource={tagsData}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Col>
      </Row>
    );
  }
};

export default UserInfo;