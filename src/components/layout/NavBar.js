import React, {Component} from 'react';
import {Menu, Button, Form, Input, Row, Col, Icon, Drawer} from 'antd';
import styles from './NavBar.module.less';
import {NavLink} from 'react-router-dom';
import logo from '@/logo.svg';
import connect from "@/store/connect";

@Form.create()
@connect(({user}) => ({
  user,
}))
class NavBar extends Component {

  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  onRegisterSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'user/register',
          payload: {
            ...values,
          },
        });
        console.log('Received values of form: ', values);
        this.onClose();
      }
    });
  };

  onLoginSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'user/login',
          payload: {
            ...values,
          },
        });
        console.log('Received values of form: ', values);
        this.onClose();
      }
    });

  };

  onLogout = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/logout',
      payload: {},
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const user = this.props.user;

    return (
      <div className={styles.navBar}>
        <div className={styles.middle}>
          <div className={styles.main}>

            <div className={styles.menuInline}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: "60px"}}
              >
                <Menu.Item key="navIndex">
                  <NavLink to={{pathname: "/"}}>
                    <b style={{fontSize: "16px"}}>
                      &nbsp;&nbsp;首 页&nbsp;&nbsp;
                    </b>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="navTags">
                  <NavLink to={{pathname: "/admin/dashboard"}}>
                    <b style={{fontSize: "16px"}}>
                      &nbsp;&nbsp;后 台&nbsp;&nbsp;
                    </b>
                  </NavLink>
                </Menu.Item>
              </Menu>
            </div>

          </div>
        </div>

        <div className={styles.left}>
          <div className={styles.title}>
            <div className={styles.logo}>
              <img src={logo} className={styles.logoImg} alt="logo"/>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.userInfo}>
            {user.id > 0 && <span style={{marginRight:"8px"}}>{user.username}</span>}
            {user.id > 0 && <Button type="danger"  onClick={this.onLogout}>注销</Button>}
            {user.id === 0 && <Button type="dashed" onClick={this.showDrawer}>注册/登陆</Button>}
            <Drawer
              title="注册／登陆"
              width={375}
              onClose={this.onClose}
              visible={this.state.visible}
              style={{
                overflow: 'auto',
                height: 'calc(100% - 108px)',
                paddingBottom: '108px',
              }}
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Username">
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Email">
                      {getFieldDecorator('email', {
                        rules: [{ required: false, message: '请输入您的邮箱' }],
                      })(<Input placeholder="邮箱" />)}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Password">
                      {getFieldDecorator('pwd', {
                        rules: [{ required: true, message: '请输入密码!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e9e9e9',
                  padding: '10px 16px',
                  background: '#fff',
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  取消
                </Button>
                <Button onClick={this.onRegisterSubmit} type="dashed" style={{ marginRight: 8 }}>
                  注册
                </Button>
                <Button onClick={this.onLoginSubmit} type="primary">
                  登陆
                </Button>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
};

export default NavBar;
