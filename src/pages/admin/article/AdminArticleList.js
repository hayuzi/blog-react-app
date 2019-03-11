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
  Drawer,
} from 'antd';
import {NavLink} from 'react-router-dom';
import marked from 'marked';
import hljs from 'highlight.js';
import styles from '@/pages/admin/article/AdminArticleList.module.less';
import connect from "@/store/connect";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  smartypants: false,
  highlight: code => hljs.highlightAuto(code).value,
});

const FormItem = Form.Item;
const {Option} = Select;


const blankArticleInfo = {
  id: 0,
  articleStatus: 2,
  content: '',
  createdAt: '2019-01-01 00:00:01',
  sketch: '',
  tagId: 1,
  title: '',
  updatedAt: '2019-01-01 00:00:01',
  weight: 1,
  tag: {
    createdAt: '2019-01-01 00:00:01',
    id: 0,
    tagName: 'blank',
    tagStatus: 0,
    updatedAt: '2019-01-01 00:00:00',
    weight: 0,
  },
};


const ArticleInfoForm = Form.create({
  name: '文章信息表单',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      id: Form.createFormField({value: props.id,}),
      title: Form.createFormField({value: props.title,}),
      sketch: Form.createFormField({value: props.sketch,}),
      content: Form.createFormField({value: props.content,}),
      weight: Form.createFormField({value: props.weight,}),
      tagId: Form.createFormField({value: props.tagId,}),
      articleStatus: Form.createFormField({value: props.articleStatus,}),
    };
  },
  onValuesChange(_, values) {
    // console.log(values);
  },
})((props) => {
  const {getFieldDecorator} = props.form;
  const output = marked(props.content);
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="ID">
            {getFieldDecorator('id', {
              rules: [{required: false, message: 'ID'}],
            })(<Input readOnly placeholder="ID"/>)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              rules: [{required: true, message: '请输入标题'}],
            })(<Input placeholder="请输入标题"/>)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="简介">
            {getFieldDecorator('sketch', {
              rules: [{required: true, message: '请输入简介'}],
            })(<Input placeholder="请输入简介"/>)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="标签">
            {getFieldDecorator('tagId', {
              rules: [{required: true, message: '请选择标签'}],
            })(
              <Select placeholder="请选择">
                {props.tagOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="权重">
            {getFieldDecorator('weight', {
              rules: [{required: true, message: '请输入权重值'}],
            })(<Input type="number" placeholder="请输入权重值"/>)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="状态">
            {getFieldDecorator('articleStatus', {
              rules: [{required: true, message: '请选择状态'}],
            })(
              <Select placeholder="请选择状态">
                <Option value={1}>1 草稿</Option>
                <Option value={2}>2 发布</Option>
              </Select>
            )}
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="内容 (使用Markdown语法)">
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入内容',
                },
              ],
            })(<Input.TextArea rows={20} placeholder="请输入内容"/>)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <div className={styles.contentHeader}>
            <b>内容预览</b>
          </div>
          <div className={styles.contentContainer}>
            <div dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        </Col>
      </Row>
    </Form>
  );
});


@Form.create()
@connect(({adminArticle, tag}) => ({
  adminArticle, tag
}))
class AdminArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      drawVisible: false,
      articleDetailFields:{...blankArticleInfo}
    };
  }

  /**
   * 打开文章详情表单抽屉
   * @param text
   * @param record
   */
  showDrawer = (text, record) => {
    this.setState({
      drawVisible: true,
      articleDetailFields: {
        ...record,
      }
    });
  };

  /**
   * 关闭文章详情表单
   */
  onDrawerClose = () => {
    this.setState({
      drawVisible: false,
    });
  };

  /**
   * 文章详情表单提交
   */
  onDrawerSubmit = () => {
    const data = {...this.state.articleDetailFields};
    delete data.tag;
    delete data.tagOptions;
    console.log(data);
    const {dispatch} = this.props;
    if (data.id > 0) {
      dispatch({
        type: 'adminArticle/editArticle',
        payload: {...data},
      });
    } else {
      dispatch({
        type: 'adminArticle/addArticle',
        payload: {...data},
      });
    }
    const values = this.state.formValues;
    const paginationParams = this.getPaginationParams();
    setTimeout(function () {
      console.log('teteatrata');
      dispatch({
        type: 'adminArticle/fetchArticleList',
        payload: {...values, ...paginationParams},
      });
    }, 1000);

    this.onDrawerClose();
  };


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
        type: 'adminArticle/fetchArticleList',
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

  handleArticleInfoFormChange = (changedFields) => {
    this.setState(({ articleDetailFields }) => {
      let dataObj = {};
      for (let key in changedFields) {
        dataObj[key] = changedFields[key].value;
      }
      return {
        articleDetailFields: { ...articleDetailFields, ...dataObj},
      }
    });
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
              <Button style={{marginLeft: 8}} icon="plus" type="primary" onClick={() => this.showDrawer({}, {...blankArticleInfo})}>
                新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderDrawerForm() {
    const articleInfoFields = this.state.articleDetailFields;
    const tagList = this.props.tag.listData.lists;
    const tagOptions = [];
    tagList.forEach(function (item) {
      tagOptions.push(
        <Option value={item.id} key={item.id}>
          {item.tagName}
        </Option>
      );
    });
    articleInfoFields.tagOptions = tagOptions;

    return (
      <Drawer
        title="查看/编辑文章"
        width={1000}
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
            <ArticleInfoForm {...articleInfoFields} onChange={this.handleArticleInfoFormChange}/>
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
    const {listData} = this.props.adminArticle;
    const articleList = listData.lists;
    const currentPage = listData.pageNum;
    const totalCnt = listData.total;
    const pageSize = listData.pageSize;

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
    }, {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.showDrawer(text, record)}>详情</Button>
          <Divider type="vertical"/>
          <Button type="danger">删除</Button>
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

        <div>
          {this.renderDrawerForm()}
        </div>
      </Row>
    );
  }
}

export default AdminArticleList;