import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Row, Col, Form, Input} from 'antd';
import styles from '@/components/search/SearchForm.module.less';
import connect from "@/store/connect";

const Search = Input.Search;

@Form.create()
@withRouter
@connect(({article}) => ({
  article,
}))
class SearchForm extends Component {

  // constructor(props, context) {
  //   super(props, context);
  //   console.log(context);
  // }

  getArticleList(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: {...params},
    });
  };

  handleSearchSubmit = (value) => {
    this.getArticleList({q:value });
    this.props.history.push({pathname: "/", search: "q=" + value});
  };

  render() {

    console.log(this);

    return (
      <Row>
        <Col span={24} className={styles.searchArea}>
          <div className={styles.gradationLine}/>
          <div style={{marginTop: "10px"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                <Search
                  placeholder="input search text"
                  onSearch={this.handleSearchSubmit}
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