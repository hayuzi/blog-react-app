import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Login from '../pages/User/Login';
import BasicLayout from "@/components/layout/BasicLayout";
import IndexPage from "@/pages/IndexPage";
import BlankPage from "@/pages/frontend/article/BlankPage";
import ArticleDetail from "@/pages/frontend/article/ArticleDetail";
// import asyncComponent from "@/router/asyncComponent";
// // react 按照路由异步加载组件
// const IndexPage=asyncComponent(()=>import(/* webpackChunkName: "index-page" */"@/pages/IndexPage"));
// const BlankPage=asyncComponent(()=>import(/* webpackChunkName: "blank-page" */"@/pages/frontend/article/BlankPage"));
// const ArticleDetail=asyncComponent(()=>import(/* webpackChunkName: "article-detail" */"@/pages/frontend/article/ArticleDetail"));
// const NotFound=asyncComponent(()=>import(/* webpackChunkName: "not-found" */"@/pages/NotFound"));
// const Login=asyncComponent(()=>import(/* webpackChunkName: "user-login" */"@/pages/User/Login"));
// const BasicLayout=asyncComponent(()=>import(/* webpackChunkName: "basic-layout" */"@/components/layout/BasicLayout"));

const LayoutBox = ({ match }) => {
  if (match.url === '/') {
    match.url = '';
  }
  return (
    <BasicLayout>
      <Switch>
        <Route exact path={`${match.url}/`} component={ IndexPage }/>
        <Route exact path={`${match.url}/article`} component={ ArticleDetail }/>
        <Route exact path={`${match.url}/blank`} component={ BlankPage }/>
        <Route exact path={`${match.url}/sample`} component={ BlankPage }/>
        <Route exact path="/404" component={ NotFound } />
        <Route exact component={ NotFound } />
      </Switch>
    </BasicLayout>
  );
};


class RouterConfig extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth">
            <Switch>
              <Route exact path="/auth/login" component={ Login }/>
              <Route exact component={ NotFound }/>
            </Switch>
          </Route>
          <Route path="/admin">
            <Switch>
              <Route exact path="/admin/login" component={ Login }/>
              <Route exact component={ NotFound }/>
            </Switch>
          </Route>
          <Route path="/" component={ LayoutBox } />
        </Switch>
      </Router>
    );
  }
}

export default RouterConfig;