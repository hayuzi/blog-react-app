import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Login from '../pages/admin/user/Login';
import DashBoard from "@/pages/admin/dashboard/Dashboard";
import AdminArticleList from "@/pages/admin/article/AdminArticleList";
import AdminTagList from "@/pages/admin/article/AdminTagList";
import AdminUserList from "@/pages/admin/user/AdminUserList";
import BasicLayout from "@/components/layout/BasicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
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

const AdminLayoutBox = ({match}) => {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path={`${match.url}/dashboard`} component={DashBoard}/>
        <Route exact path={`${match.url}/article/list`} component={AdminArticleList}/>
        <Route exact path={`${match.url}/article/tags`} component={AdminTagList}/>
        <Route exact path={`${match.url}/user/list`} component={AdminUserList}/>
        <Route exact path="/404" component={NotFound}/>
        <Route exact component={NotFound}/>
      </Switch>
    </AdminLayout>
  );
};

const LayoutBox = ({match}) => {
  if (match.url === '/') {
    match.url = '';
  }
  return (
    <BasicLayout>
      <Switch>
        <Route exact path={`${match.url}/`} component={IndexPage}/>
        <Route exact path={`${match.url}/article`} component={ArticleDetail}/>
        <Route exact path={`${match.url}/blank`} component={BlankPage}/>
        <Route exact path="/404" component={NotFound}/>
        <Route exact component={NotFound}/>
      </Switch>
    </BasicLayout>
  );
};

class RouterConfig extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={AdminLayoutBox}/>
          <Route path="/" component={LayoutBox}/>
        </Switch>
      </Router>
    );
  }
}

export default RouterConfig;