import React, {Component} from 'react';
import NavBar from '@/components/layout/NavBar';
import styles from '@/components/layout/MiddleHeader.module.less';

class Header extends Component {
  render() {
    return (
      <div className={ styles.headerContainer }>
        <div className= { styles.headerContent }>
            <NavBar />
        </div>
        <div className={ styles.gradationLine}/>
      </div>
    );
  }
};

export default Header;
