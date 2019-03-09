import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button} from 'antd';
import styles from '@/pages/admin/user/Login.module.less';
import connect from "@/store/connect";

@Form.create()
@connect(({adminUser}) => ({
  adminUser,
}))
class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {dispatch} = this.props;
        dispatch({
          type: 'adminUser/login',
          payload: {
            ...values,
          },
        });
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    console.log(this.props.adminUser);

    return (
      <Row className={styles.contentArea}>
        <Col span={24} className={styles.loginContainer}>
          <div className={styles.title}>
            <h1>博客管理后台</h1>
            <div>请使用账户名与密码登陆</div>
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