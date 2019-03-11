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
  Drawer,
  Tag,
} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/article/AdminTagList.module.less';
import connect from "@/store/connect";

const FormItem = Form.Item;

const blankTagInfo = {
  id: 0,
  articleId: 1,
  commentStatus: 1,
  content: '',
  user: {
    id: 1,
    username: "hayuzi",
    userType: 1,
    email: "hayuzi@163.com"
  },
  userId: 1,
  mentionUser: {
    id: 0,
    username: "",
    userType: 0,
    email: ""
  },
  mentionUserId: 0,
  createdAt: '2019-01-01 00:00:01',
  updatedAt: '2019-01-01 00:00:01',
};


@Form.create()
@connect(({adminTag}) => ({
  adminTag
}))
class AdminTagList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      drawVisible: false,
      commentDetailFields: {...blankTagInfo}
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'adminTag/fetchTagList',
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
        type: 'adminTag/fetchTagList',
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
      type: 'adminTag/fetchTagList',
      payload: {},
    });
  };

  handlePageChange = (pageNum) => {
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    const {dispatch} = this.props;
    dispatch({
      type: 'adminTag/fetchTagList',
      payload: {...values, ...paginationParams, pageNum},
    });
  };

  handleRefreshList = () => {
    const {dispatch} = this.props;
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    dispatch({
      type: 'adminTag/fetchTagList',
      payload: {...values, ...paginationParams},
    });
  };

  getPaginationParams = () => {
    const {pageNum, total, pageSize} = this.props.adminTag.listData;
    return {pageNum, total, pageSize};
  };

  /**
   * 打开详情表单抽屉
   * @param text
   * @param record
   */
  showDrawer = (text, record) => {
    this.setState({
      drawVisible: true,
      commentDetailFields: {
        ...record,
      }
    });
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
    const data = {...this.state.commentDetailFields};
    delete data.tag;
    console.log(data);
    const {dispatch} = this.props;
    if (data.id > 0) {
      dispatch({
        type: 'adminTag/editTag',
        payload: {...data},
      });
    } else {
      dispatch({
        type: 'adminTag/addTag',
        payload: {...data},
      });
    }
    setTimeout(() => {
      this.handleRefreshList();
    }, 500);
    this.onDrawerClose();
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
            <FormItem label="标签ID" className={styles.antFormItem}>
              {getFieldDecorator('id')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="标签名称" className={styles.antFormItem}>
              {getFieldDecorator('tagName')(<Input placeholder="请输入"/>)}
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
              <Button style={{marginLeft: 8}} icon="plus" type="primary"
                      onClick={() => this.showDrawer({}, {...blankTagInfo})}>
                新建
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
    const {listData} = this.props.adminTag;
    const tagList = listData.lists;
    const currentPage = listData.pageNum;
    const totalCnt = listData.total;
    const pageSize = listData.pageSize;

    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '标签名称',
      dataIndex: 'tagName',
      key: 'tagName',
    }, {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    }, {
      title: '状态',
      key: 'tagStatus',
      render: (text, record) => {
        const color = record.tagStatus === 1 ? 'blue' : 'gold';
        const show = record.tagStatus === 1 ? '正常' : '隐藏';
        return <Tag color={color}>{show}</Tag>;
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.showDrawer(text, record)}>详情</Button>
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
            <Breadcrumb.Item>标签列表</Breadcrumb.Item>
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

export default AdminTagList;