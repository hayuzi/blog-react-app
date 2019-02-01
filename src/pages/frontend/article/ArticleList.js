import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Row, Col, List, Icon} from 'antd';
import connect from '@/store/connect';


const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


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

  componentDidMount() {
    const {location, article} = this.props;
    const q = location.state && location.state.q ? location.state.q : '';
    this.setState((state) => {
      return { ...state, q };
    });
    const params = {
      q,
    };
    console.log(article);
    console.log(params);
    this.getArticleList(params)
  }


  render() {
    const {article} = this.props;
    console.log(article);
    return (
      <Row>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            dataSource={listData}
            footer={<div><b>ant design</b> footer part</div>}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                  <IconText type="message" text="2"/>]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>

      </Row>
    );
  }
}


export default ArticleList;