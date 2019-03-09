import React, {Component} from 'react';
import {
  Row,
  Col,
  Breadcrumb,
  Table,
  Divider,
  Form,
  Input,
  Select,
  Button,
  Pagination,
} from 'antd';
import {NavLink} from 'react-router-dom';
import styles from '@/pages/admin/article/AdminArticleList.module.less';
import connect from "@/store/connect";

const FormItem = Form.Item;
// const { TextArea } = Input;
const {Option} = Select;

@Form.create()
@connect(({adminArticle,tag}) => ({
  adminArticle,tag
}))
class AdminArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'tag/getAllTags',
      payload: {},
    });
    dispatch({
      type: 'adminArticle/fetchArticleList',
      payload: {},
    });
  }

  /**
   * 列表搜索
   * @param e
   */
  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'adminArticle/fetchArticleList',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'adminArticle/fetchArticleList',
      payload: {},
    });
  };

  handleModalVisible = (value) => {

  };

  handlePageChange = (pageNum) => {
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    const {dispatch} = this.props;
    dispatch({
      type: 'adminArticle/fetchArticleList',
      payload: {...values, ...paginationParams, pageNum},
    });
  };

  getPaginationParams = () => {
    const {pageNum, total, pageSize} = this.props.adminArticle.listData;
    return {pageNum, total, pageSize};
  };



  /**
   * 筛选表单
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    const tagList = this.props.tag.listData.lists;

    const tagOptions = [];
    tagList.forEach(function (item) {
      tagOptions.push(
        <Option value={item.id} key={item.id}>
          {item.tagName}
        </Option>
      );
    });

    return (
      <Form onSubmit={this.handleSearch} layout="inline" className={styles.antAdvancedSearchForm}>
        <Row gutter={{md: 8, lg: 24, xl: 24}}>
          <Col md={8} sm={24}>
            <FormItem label="文章标题" className={styles.antFormItem}>
              {getFieldDecorator('q')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="文章标签" className={styles.antFormItem}>
              {getFieldDecorator('tagId')(
                <Select placeholder="请选择" className={styles.formItemSelect}>
                  {tagOptions}
                </Select>
              )}
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
              <Button style={{marginLeft: 8}} icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {listData} = this.props.adminArticle;
    const articleList = listData.lists;
    const currentPage = listData.pageNum;
    const totalCnt = listData.total;
    const pageSize = listData.pageSize;

    console.log(articleList);

    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '标签名称',
      dataIndex: 'tag.tagName',
      key: 'tagName',
    }, {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    },{
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
      <Button>查看 {record.name}</Button>
      <Divider type="vertical"/>
      <Button type="primary">编辑</Button>
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
            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div className={styles.layoutContent}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="small"
              rowKey="id"
              columns={columns}
              dataSource={articleList}
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
      </Row>
    );
  }
}

export default AdminArticleList;