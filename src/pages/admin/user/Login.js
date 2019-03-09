import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button} from 'antd';
import {withRouter, NavLink} from "react-router-dom";
import styles from '@/pages/admin/user/Login.module.less';
import connect from "@/store/connect";
import {USER_TYPE_ADMIN} from '@/models/common/constMap'

@withRouter
@Form.create()
@connect(({user}) => ({
  user,
}))
class Login extends Component {

  componentDidMount() {
    const {user} = this.props;
    if (user.id > 0 ) {
      this.props.history.push({pathname: "/admin/dashboard"});
    }
  }

  // 存在期
  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if (user.id > 0 && user.userType === USER_TYPE_ADMIN) {
      this.props.history.push({pathname: "/admin/dashboard"});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'user/adminLogin',
          payload: {
            ...values,
          },
        });
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row className={styles.contentArea}>
        <Col span={24} className={styles.loginContainer}>
          <div className={styles.title}>
            <h1>博客管理后台</h1>
            <div>
              <span>请使用账户名与密码登陆, 或者</span>
              <NavLink to={{pathname: "/"}}>返回前台</NavLink>
            </div>
          </div>
          <div className={styles.formArea}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入您的用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('pwd', {
                  rules: [{ required: true, message: '请输入您的登陆密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                  登&nbsp;&nbsp;陆
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;