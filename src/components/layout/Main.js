import React, {Component} from 'react';
import {Row, Col} from 'antd';
import styles from '@/components/layout/Main.module.less';

class Main extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Row className={styles.content}>
          <Row gutter={20}>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} >
              <div className={styles.gutterLeft}>col-6</div>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 0 }}>
              <div className={styles.gutterRight}>col-12</div>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
};

export default Main;
