import React, {Component} from 'react';
import {Row, Col, Tag} from 'antd';
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

    const tagListElement = [];
    tagList.forEach(function (item) {
      tagListElement.push(
        <NavLink to={{pathname: '/', search: "?tagId=" + item.id}} key={item.id}>
          <Tag color="green" className={styles.tagListElement}>
            {item.tagName}
          </Tag>
        </NavLink>
      );
    });

    return (
      <Row>
        <Col span={24} className={styles.articleTags}>
          <div className={styles.gradationLine}/>
          <div style={{marginTop: "10px"}}>
            <b>文章标签: </b>
          </div>
          {tagListElement}
        </Col>
      </Row>
    );
  }
}

export default SimpleTagList;