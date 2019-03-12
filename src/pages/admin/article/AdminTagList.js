import React, {Component} from 'react';
import {
  Row,
  Col,
  Breadcrumb,
  Table,
  Form,
  Input,
  Select,
  Button,
  Pagination,
  Drawer,
  Tag,
} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/article/AdminTagList.module.less';
import connect from "@/store/connect";

const FormItem = Form.Item;
const {Option} = Select;


const blankTagInfo = {
  id: 0,
  tagStatus: 1,
  tagName: '',
  createdAt: '2019-01-01 00:00:01',
  updatedAt: '2019-01-01 00:00:01',
  weight: 1,
};


const TagInfoForm = Form.create({
  name: '详情表单',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      id: Form.createFormField({value: props.id,}),
      tagName: Form.createFormField({value: props.tagName,}),
      weight: Form.createFormField({value: props.weight,}),
      tagStatus: Form.createFormField({value: props.tagStatus,}),
    };
  },
  onValuesChange(_, values) {
    // console.log(values);
  },
})((props) => {
  const {getFieldDecorator} = props.form;
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="ID">
            {getFieldDecorator('id', {
              rules: [{required: false, message: 'ID'}],
            })(<Input readOnly placeholder="ID"/>)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="名称">
            {getFieldDecorator('tagName', {
              rules: [{required: true, message: '请输入名称'}],
            })(<Input placeholder="请输入名称"/>)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="权重">
            {getFieldDecorator('weight', {
              rules: [{required: true, message: '请输入权重值'}],
            })(<Input type="number" placeholder="请输入权重值"/>)}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="状态">
            {getFieldDecorator('tagStatus', {
              rules: [{required: true, message: '请选择状态'}],
            })(
              <Select placeholder="请选择状态">
                <Option value={1}>1 启用</Option>
                <Option value={2}>2 禁用</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});


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
      tagDetailFields:{...blankTagInfo}
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

  handleTagInfoFormChange = (changedFields) => {
    this.setState(({ tagDetailFields }) => {
      let dataObj = {};
      for (let key in changedFields) {
        dataObj[key] = changedFields[key].value;
      }
      return {
        tagDetailFields: { ...tagDetailFields, ...dataObj},
      }
    });
  };

  /**
   * 打开详情表单抽屉
   * @param text
   * @param record
   */
  showDrawer = (text, record) => {
    this.setState({
      drawVisible: true,
      tagDetailFields: {
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
    const data = {...this.state.tagDetailFields};
    delete data.tag;
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
              <Button style={{marginLeft: 8}} icon="plus" type="primary" onClick={() => this.showDrawer({}, {...blankTagInfo})}>
                新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderDrawerForm() {
    const { tagDetailFields } = this.state;
    return (
      <Drawer
        title="查看/编辑"
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
            <TagInfoForm {...tagDetailFields} onChange={this.handleTagInfoFormChange}/>
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
          {this.renderDrawerForm()}
        </div>
      </Row>
    );
  }
}

export default AdminTagList;