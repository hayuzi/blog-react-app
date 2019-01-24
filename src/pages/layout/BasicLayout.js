import React, {Component} from 'react';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import Footer from '@/components/layout/Footer'

class BasicLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main >
           { this.props.children }
        </Main>
        <Footer />
      </div>
    );
  }
}

export default BasicLayout;