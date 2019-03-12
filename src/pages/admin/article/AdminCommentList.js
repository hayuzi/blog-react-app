import React, {Component} from 'react';
import {
  Row,
  Col,
  Breadcrumb,
  Table,
  Form,
  Input,
  Button,
  Pagination,
  Divider,
  Drawer,
  Tooltip,
  Popconfirm,
} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/article/AdminCommentList.module.less';
import connect from "@/store/connect";

const FormItem = Form.Item;

// const blankCommentInfo = {
//   id: 0,
//   articleId: 1,
//   commentStatus: 1,
//   content: '',
//   user: {
//     id: 1,
//     username: '',
//     userType: 1,
//     email: ''
//   },
//   userId: 1,
//   mentionUser: {
//     id: 0,
//     username: '',
//     userType: 0,
//     email: ''
//   },
//   mentionUserId: 0,
//   createdAt: '2019-01-01 00:00:01',
//   updatedAt: '2019-01-01 00:00:01',
// };


@Form.create()
@connect(({adminComment}) => ({
  adminComment
}))
class AdminCommentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      drawVisible: false,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'adminComment/fetchCommentList',
      payload: {},
    });
  }

  /**
   * 列表搜索
   * @param e
   */
  handleSearch = (e) => {
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'adminComment/fetchCommentList',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'adminComment/fetchCommentList',
      payload: {},
    });
  };

  handlePageChange = (pageNum) => {
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    const {dispatch} = this.props;
    dispatch({
      type: 'adminComment/fetchCommentList',
      payload: {...values, ...paginationParams, pageNum},
    });
  };

  handleDeleteRow = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'adminComment/deleteComment',
      payload: {id},
    });
    setTimeout(() => {
      this.handleRefreshList();
    }, 300);
  };

  handleRefreshList = () => {
    const {dispatch} = this.props;
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    dispatch({
      type: 'adminComment/fetchCommentList',
      payload: {...values, ...paginationParams},
    });
  };

  getPaginationParams = () => {
    const {pageNum, total, pageSize} = this.props.adminComment.listData;
    return {pageNum, total, pageSize};
  };

  /**
   * 关闭详情表单
   */
  onDrawerClose = () => {
    this.setState({
      drawVisible: false,
    });
  };

  /**
   * 详情表单提交
   */
  onDrawerSubmit = () => {

  };

  /**
   * 筛选表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline" className={styles.antAdvancedSearchForm}>
        <Row gutter={{md: 8, lg: 24, xl: 24}}>
          <Col md={8} sm={24}>
            <FormItem label="用户ID" className={styles.antFormItem}>
              {getFieldDecorator('userId')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="文章ID" className={styles.antFormItem}>
              {getFieldDecorator('articleId')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderDrawerArea() {
    return (
      <Drawer
        title="查看"
        width={720}
        onClose={this.onDrawerClose}
        visible={this.state.drawVisible}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
      >
        <Row gutter={16}>
          <Col span={24}>

          </Col>
        </Row>
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
          <Button onClick={this.onDrawerClose} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={this.onDrawerSubmit} type="primary">
            保存
          </Button>
        </div>
      </Drawer>
    );
  }


  render() {
    const {listData} = this.props.adminComment;
    const tagList = listData.lists;
    const currentPage = listData.pageNum;
    const totalCnt = listData.total;
    const pageSize = listData.pageSize;

    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '文章ID',
      dataIndex: 'articleId',
      key: 'articleId',
    }, {
      title: '用户',
      key: 'user',
      render: (text, record) => {
        return (
          <div>
            <span>{record.user.id}</span>
            <Divider type="vertical"/>
            <span>{record.user.username}</span>
          </div>
        );
      }
    }, {
      title: '内容',
      key: 'content',
      render: (text, record) => {
        let show = '';
        if (record.content.length > 20) {
          show = record.content.slice(0, 20) + '...';
        } else {
          show = record.content
        }
        return (
          <Tooltip title={record.content}>
            <span>{show}</span>
          </Tooltip>
        );
      }
    }, {
      title: '被回复用户',
      key: 'mentionUser',
      render: (text, record) => {
        return (
          <div>
            <span>{record.mentionUser.id}</span>
            <Divider type="vertical"/>
            <span>{record.mentionUser.username}</span>
          </div>
        );
      }
    }, {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm title="确定要删除该条目吗?" onConfirm={() => this.handleDeleteRow(record.id)} okText="Yes" cancelText="No">
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    }];

    return (
      <Row>
        <Col span={24} className={styles.breadCrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={{pathname: '/admin/dashboard'}}>
                首页
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            <Breadcrumb.Item>评论列表</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div className={styles.layoutContent}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="small"
              rowKey="id"
              columns={columns}
              dataSource={tagList}
              pagination={false}
            />
            <div className={styles.paginationArea}>
              <Pagination
                showQuickJumper
                defaultCurrent={currentPage}
                total={totalCnt}
                pageSize={pageSize}
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </Col>

        <div>
          {this.renderDrawerArea()}
        </div>
      </Row>
    );
  }
}

export default AdminCommentList;