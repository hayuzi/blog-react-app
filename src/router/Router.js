import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage';
import NotFound from '@/pages/NotFound';
import HomePage from "@/pages/layout/HomePage";
import Login from "../pages/User/Login";

class RouterConfig extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route exact path="/" component={ IndexPage } />
          <Route exact path="/index" component={ HomePage } />
          <Route exact path="/404" component={ NotFound } />
          <Route component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default RouterConfig;