import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import connect from '@/store/connect';

@connect(({user}) => ({
  user,
}))
class SearchPage extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Row>
        <Col span={24}>
          SearchList
        </Col>
      </Row>
    );
  }
}

export default SearchPage;