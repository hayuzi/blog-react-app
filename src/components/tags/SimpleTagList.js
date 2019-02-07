import React, {Component} from 'react';
import {Row, Col, List} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/components/tags/SimpleTagList.module.less';
import connect from '@/store/connect';


@connect(({tag}) => ({
  tag,
}))
class SimpleTagList extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'tag/getAllTags',
      payload: {},
    });
  }


  render() {
    const tagList = this.props.tag.listData.lists;
    const tagListElement = (list) => {
      const elList = [];
      list.forEach(function (item) {
        elList.push(<NavLink to={{pathname: '/articles', search: "?tagId=" + item.id}}>{item.tagName}</NavLink>,);
      });
      return elList;
    };

    return (
      <Row>
        <Col span={24} className={styles.articleTags}>
          <div className={styles.gradationLine}/>
          <div style={{marginTop: "10px"}}>
            <b>文章标签: </b>
          </div>
          <List
            size="small"
            dataSource={tagListElement(tagList)}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Col>
      </Row>
    );
  }
}

export default SimpleTagList;