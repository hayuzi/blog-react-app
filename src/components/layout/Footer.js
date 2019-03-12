import React, {Component} from 'react';
import styles from '@/components/layout/Footer.module.less';

class Footer extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <div className= { styles.content }>
          <div className={ styles.icp }>
            苏ICP备17049372号
          </div>
        </div>
      </div>
    );
  }
};

export default Footer;