import React, {Component} from 'react';
import {Row, Col, Form, Input} from 'antd';
import styles from '@/components/search/SearchForm.module.less';

const Search = Input.Search;

@Form.create()
class SearchForm extends Component {

  handleSubmit = () => {
  };

  render() {

    console.log(this.props.form);

    return (
      <Row>
        <Col span={24} className={styles.searchArea}>
          <div className={styles.gradationLine}/>
          <div style={{marginTop: "10px"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default SearchForm;