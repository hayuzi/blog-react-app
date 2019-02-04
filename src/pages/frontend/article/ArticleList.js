import React, {Component} from 'react';
import {withRouter, NavLink} from "react-router-dom";
import {Row, Col, List, Icon, Pagination} from 'antd';
import connect from '@/store/connect';

const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

@withRouter
@connect(({article}) => ({
  article,
}))
class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };
  }

  getArticleList(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: {...params},
    });
  };

  onPageChange = (pageNumber) =>
  {
    const q = this.state.q;
    const params = {
      q,
      pageNum: pageNumber,
    };
    this.getArticleList(params)
  }

  componentDidMount() {
    const {location} = this.props;
    const q = location.state && location.state.q ? location.state.q : '';
    this.setState((state) => {
      return { ...state, q };
    });
    console.log(this.state);
    const params = {
      q,
    };
    this.getArticleList(params)
  }


  render() {
    const {article} = this.props;
    const articleLists = article.listData.lists;
    const currentPage = article.listData.pageNum;
    const totalCnt = article.listData.total;
    return (
      <Row>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={articleLists}
            footer={<div><b>ant design</b> footer part</div>}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                  <IconText type="message" text="2"/>]}
              >
                <List.Item.Meta
                  title={<NavLink to={{pathname: '/article/detail', state: { id: item.id }}}>{item.title}</NavLink>}
                  description={item.sketch}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>

        <Col>
          <Pagination showQuickJumper defaultCurrent={currentPage} total={totalCnt} onChange={this.onPageChange} />
        </Col>

      </Row>
    );
  }
}


export default ArticleList;