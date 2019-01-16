import React, { Component } from 'react';
import { MemoryRouter as Router, Route } from 'react-router';
import IndexPage from './routes/IndexPage';

class RouterConfig extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={IndexPage}>
        </Route>
      </Router>
    );
  }
}

export default RouterConfig;