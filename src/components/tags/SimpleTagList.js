import React, {Component} from 'react';
import {Row, Col, List} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/components/tags/SimpleTagList.module.less';


class SimpleTagList extends Component {

  render() {

    const tagsData = [
      <NavLink to="/tags/detail">PHP</NavLink>,
      <NavLink to="/tags/detail">Linux</NavLink>,
      <NavLink to="/tags/detail">Go</NavLink>,
    ];

    return (
      <Row>
        <Col span={24} className={styles.articleTags}>
          <div className={styles.gradationLine}/>
          <div style={{marginTop: "10px"}}>
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
}

export default SimpleTagList;