import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Login from '../pages/User/Login';
import BasicLayout from "@/components/layout/BasicLayout";
import IndexPage from "@/pages/IndexPage";
import SearchPage from "@/pages/frontend/article/SearchPage";


const LayoutBox = ({ match }) => {
  if (match.url === '/') {
    match.url = '';
  }
  return (
    <BasicLayout>
      <Switch>
        <Route exact path={`${match.url}/`} component={ IndexPage }/>
        <Route exact path={`${match.url}/index`} component={ IndexPage }/>
        <Route exact path={`${match.url}/search`} component={ SearchPage }/>
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