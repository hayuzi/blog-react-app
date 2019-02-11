import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import connect from '@/store/connect';

@connect((state) => ({
  ...state,
}))
class BlankPage extends Component {

  changeUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: {},
    });
  };

  render() {
    const {user} = this.props;
    return (
      <Row>
        <Col span={24}>
          <div>SearchList</div>
          <div>{ user.id }</div>
          <div>{ user.username }</div>
          <div>{ user.token }</div>
        </Col>
        <Col span={24}>
        <Button onClick={this.changeUserInfo}>更改用户数据</Button>
      </Col>
      </Row>
    );
  }
}

export default BlankPage;