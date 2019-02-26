import React, {Component} from 'react';
import {Row, Col, List, Button, Pagination} from 'antd';
import styles from '@/components/tags/SimpleTagList.module.less';
import connect from '@/store/connect';


@connect(({comment}) => ({
  comment,
}))
class CommentsList extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'tag/getCommentsList',
      payload: {},
    });
  }


  render() {
    const {comment} = this.props;
    console.log(comment);
    const commentsList = comment.listData.lists;
    const currentPage = comment.listData.pageNum;
    const totalCnt = comment.listData.total;

    const TitleUser = ({id, username, email}) => {
      return (
        <div>
          <span>{{ username }}</span>
          <span> &nbsp;|&nbsp; </span>
          <span>{{ email }}</span>
        </div>
      );
    };

    return (
      <Row>
        <Col span={24} className={styles.articleTags}>
          <div className={styles.gradationLine}/>
        </Col>
        <Col span={24} className={styles.articleTags}>
          <div>评论列表:</div>
        </Col>

        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={commentsList}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[<Button>回复</Button>]}
              >
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