import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col, Tag} from 'antd';
import CommentsList from '@/components/comment/CommentsList'
import marked from 'marked';
import hljs from 'highlight.js';
import connect from '@/store/connect';
import {parseQueryString} from "@/utils/url";
import styles from '@/pages/frontend/article/ArticleDetail.module.less';
import 'highlight.js/styles/atom-one-dark.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: code => hljs.highlightAuto(code).value,
});

@withRouter
@connect(({article}) => ({
  article,
}))
class ArticleDetail extends Component {

  // 获取列表数据
  getArticleDetail(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'article/fetchDetail',
      payload: {
        ...params,
      },
    });
  };

  // 获取queryString数据
  getUrlQueryString = () => {
    const {location} = this.props;
    let searchParams = {};
    if (location.search) {
      searchParams = parseQueryString(location.search);
    }
    const id = searchParams.id ? searchParams.id : '';
    return {
      id,
    }
  };

  // 生命周期，实例化 3
  componentWillMount() {
    const params = this.getUrlQueryString();
    this.getArticleDetail(params);
  }

  // 存在期
  componentWillReceiveProps(nextProps) {
    const {location} = nextProps;
    let searchParams = {};
    if (location.search) {
      searchParams = parseQueryString(location.search);
    }
    const id = searchParams.id ? searchParams.id : '';

    const preParams = this.getUrlQueryString();
    // 切换了路由参数的话，则重新拉取, 这里如果不加判断条件直接更改 props 则出现深度递归
    if (id !== preParams.id) {
      this.getArticleDetail({id})
    }
  }


  render() {
    const {article} = this.props;
    const detail = article.detail;
    const output = marked(detail.content);

    return (
      <Row>
        <Col span={24} className={styles.title}>
          <b>
            {detail.title}
          </b>
        </Col>
        <Col span={24} className={styles.extraInfo}>
          <Tag color="green">{detail.tag.tagName}</Tag>
        </Col>
        <Col span={24}>
          <div className={styles.extraInfo}>
            <span>发表于: {detail.createdAt}</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>更新于: {detail.createdAt}</span>
          </div>
        </Col>
        <Col span={24} className={styles.extraInfo}>
          <span>{detail.sketch}</span>
        </Col>
        <Col span={24} className={styles.extraInfo}>
          <div className={styles.gradationLine}/>
        </Col>
        <Col span={24} className={styles.contentArea}>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </Col>
        <Col span={24} className={styles.extraInfo}>
          <CommentsList/>
        </Col>
      </Row>
    );
  }
}


export default ArticleDetail;