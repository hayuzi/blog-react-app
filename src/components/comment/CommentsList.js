import React, {Component} from 'react';
import {Row, Col, List, Popover, Pagination, Comment, Form, Input, Button} from 'antd';
import styles from '@/components/comment/CommentsList.module.less';
import connect from '@/store/connect';

const TextArea = Input.TextArea;

const Editor = ({
                  onChange, onSubmit, submitting, value,
                }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const UserCard = (username, email) => {
  return (
    <div>
      <p>用户：{username}</p>
      <p>邮箱：{email}</p>
    </div>
  );
};

const TitleUser = ({username, email}) => {
  return (
    <div className={styles.userShow}>
      <Popover content={UserCard(username, email)} title="用户信息">
        <span>{username}</span>
      </Popover>
    </div>
  );
};

@connect(({comment, article}) => ({
  comment,
  article
}))
class CommentsList extends Component {

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      value: "",
    };
  }

  componentDidMount() {
    const {article} = this.props;
    const params = {};
    params.articleId = article.detail.id;
    this.getCommentList(params);
  }

  // 获取列表数据
  getCommentList(params) {
    const {dispatch} = this.props;
    dispatch({
      type: 'comment/fetchCommentsList',
      payload: {
        ...params,
      },
    });
  };

  onPageChange = (pageNumber) => {
    const pageParams = {
      ...this.getPageParams(),
      pageNum: pageNumber
    };
    this.getCommentList({...pageParams})
  };

  getPageParams() {
    const {pageNum, pageSize} = this.props.comment.listData;
    return {
      pageNum,
      pageSize,
    }
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
      });
    }, 1000);
  };

  // 写评论
  handleCommentChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };


  render() {
    const {comment} = this.props;
    const commentsList = comment.listData.lists;
    const currentPage = comment.listData.pageNum;
    const totalCnt = comment.listData.total;
    const {submitting, value} = this.state;

    return (
      <Row>
        <Col span={24} className={styles.topMargin}>
          <div className={styles.gradationLine}/>
        </Col>
        <Col span={24}>
          <div className={styles.commentTitleArea}>
            <b>评论:</b>
          </div>
          <div className={styles.commentContentArea}>

            {/*<List*/}
            {/*itemLayout="vertical"*/}
            {/*size="small"*/}
            {/*dataSource={commentsList}*/}
            {/*renderItem={item => (*/}
            {/*<List.Item key={item.id}>*/}
            {/*<List.Item.Meta*/}
            {/*title={TitleUser(item.user)}*/}
            {/*/>*/}
            {/*{item.content}*/}
            {/*</List.Item>*/}
            {/*)}*/}
            {/*/>*/}


            <List
              itemLayout="vertical"
              size="small"
              dataSource={commentsList}
              renderItem={item => (
                <Comment
                  // actions={actions}
                  author={TitleUser(item.user)}
                  content={item.content}
                  datetime={item.createdAt}
                />
              )}
            />

            <div className={styles.pageArea}>
              <Pagination
                showQuickJumper
                defaultCurrent={currentPage}
                total={totalCnt}
                onChange={this.onPageChange}
              />
            </div>

            <div className={styles.commentForm}>
              <Comment
                content={(
                  <Editor
                    onChange={this.handleCommentChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default CommentsList;