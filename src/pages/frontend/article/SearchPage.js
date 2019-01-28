import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import connect from '@/store/connect';

@connect((state) => ({
  ...state,
}))
class SearchPage extends Component {

  changeUserInfo = () => {
    console.log(this.props);
    const { dispatch } = this.props;
    // console.log(dispatch);
    dispatch({
      type: 'user',
      payload: {},
    });
  };

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <Row>
        <Col span={24}>
          <div>SearchList</div>
          <div>{ user.id } -- { user.username } -- { user.token }</div>
        </Col>
        <Col span={24}>
          <Button onClick={this.changeUserInfo}>更改用户数据</Button>
        </Col>
      </Row>
    );
  }
}

export default SearchPage;