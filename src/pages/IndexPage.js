import React, {Component} from 'react';
import ArticleList from '@/pages/frontend/article/ArticleList'
import '@/App.css';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <ArticleList/>
      </div>
    );
  }
}

export default IndexPage;