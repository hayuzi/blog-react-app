import React, {Component} from 'react';
import {Row, Col, List, Popover, Pagination} from 'antd';
import styles from '@/components/comment/CommentsList.module.less';
import connect from '@/store/connect';


@connect(({comment}) => ({
  comment,
}))
class CommentsList extends Component {

  componentWillMount() {
    this.getCommentList();
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



  render() {
    const {comment} = this.props;
    const commentsList = comment.listData.lists;
    const currentPage = comment.listData.pageNum;
    const totalCnt = comment.listData.total;

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
          <Popover content={UserCard(username, email)} title="用户卡片">
            <span>{username}</span>
          </Popover>
        </div>
      );
    };

    return (
      <Row>
        <Col span={24} className={styles.topMargin}>
          <div className={styles.gradationLine}/>
        </Col>
        <Col span={24} className={styles.titleArea}>
          <div className={styles.title}>
            <b>评论:</b>
          </div>
        </Col>

        <Col>
        </Col>

        <Col span={24}>
          <List
            itemLayout="vertical"
            size="small"
            dataSource={commentsList}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={TitleUser(item.user)}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>

        <Col span={24}>
          <Pagination showQuickJumper defaultCurrent={currentPage} total={totalCnt} onChange={this.onPageChange}/>
        </Col>


      </Row>
    );
  }
}

export default CommentsList;