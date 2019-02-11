import React, {Component} from 'react';
import {withRouter, NavLink} from "react-router-dom";
import {Row, Col, List, Icon, Pagination} from 'antd';
import connect from '@/store/connect';
import {parseQueryString} from "@/utils/url";

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

  // 构造函数
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     q: '',
  //     tagId: '',
  //   };
  // }

  // 获取列表数据
  getArticleList(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: {
        ...params,
      },
    });
  };

  // 页码切换
  onPageChange = (pageNumber) => {
    const params = this.getUrlQueryString();
    const pageParams = {
      ...this.getPageParams(),
      pageNum: pageNumber
    };
    this.getArticleList({...params, ...pageParams})
  };

  // 获取queryString数据
  getUrlQueryString = () => {
    const {location} = this.props;
    let searchParams = {};
    if (location.search) {
      searchParams = parseQueryString(location.search);
    }
    const q = searchParams.q ? searchParams.q : '';
    const tagId = searchParams.tagId ? searchParams.tagId : '';
    return {
      q,
      tagId,
    }
  };

  getPageParams() {
    const {pageNum, pageSize} = this.props.article.listData;
    return {
      pageNum,
      pageSize,
    }
  }

  // 生命周期，实例化 1
  // getDefaultProps(){}

  // 生命周期，实例化 2
  // getInitialState(){}

  // 生命周期，实例化 3
  componentWillMount() {
    const params = this.getUrlQueryString();
    const pageParams = this.getPageParams();
    this.getArticleList({
      ...params,
      pageSize: pageParams.pageSize,
      pageNum: 1,
    });
  }

  // 生命周期，实例化 4 render

  // 生命周期，实例化 3
  // componentDidMount() {
  //
  // }

  // 存在期
  componentWillReceiveProps(nextProps) {
    const {location} = nextProps;
    let searchParams = {};
    if (location.search) {
      searchParams = parseQueryString(location.search);
    }
    const q = searchParams.q ? searchParams.q : '';
    const tagId = searchParams.tagId ? searchParams.tagId : '';

    const preParams = this.getUrlQueryString();
    // 切换了路由参数的话，则重新拉取列表, 这里如果不加判断条件直接更改 props 则出现深度递归
    if (q !== preParams.q || tagId !== preParams.tagId) {
      this.getArticleList({
        q,
        tagId,
        ...this.getPageParams(),
      })
    }
  }

  // 存在期
  // shouldComponentUpdate()
  // {
  // }


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
            footer={<div/>}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[<IconText type="clock-circle" text={item.createdAt}/>]}
              >
                <List.Item.Meta
                  title={<NavLink to={{pathname: '/article', search: '?id=' + item.id}}>{item.title}</NavLink>}
                  description={item.sketch}
                />
                {item.content.slice(0, 100) + "..."}
              </List.Item>
            )}
          />
        </Col>

        <Col>
          <Pagination showQuickJumper defaultCurrent={currentPage} total={totalCnt} onChange={this.onPageChange}/>
        </Col>

      </Row>
    );
  }
}


export default ArticleList;