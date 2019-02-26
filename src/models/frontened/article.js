// 写完的model必须导入到 models/index 中
import {getArticleList, getArticleDetail} from "@/services/api";

export default {

  namespace: 'article',

  state: {
    detail: {
      id: 0,
      articleStatus: 1,
      content: "测试的脚本信息",
      createdAt: "2019-01-01 00:00:00",
      sketch: "Shell脚本",
      tagId: 1,
      title: "Shell脚本",
      updatedAt: "2019-01-01 00:00:00",
      weight: 1,
      tag: {
        createdAt: "2019-01-01 01:16:47",
        id: 1,
        tagName: "Linux",
        tagStatus: 1,
        updatedAt: "2019-01-01 01:16:47",
        weight: 3,
      },
    },
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
    loading: false,
  },

  effects: {
    /**
     * 拉取列表数据
     * @param payload
     * @param call
     * @param put
     */
    *fetchList({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'changeArticleListData',
        payload: response,
      });
    },
    /**
     * 拉取文章详情
     * @param payload
     * @param call
     * @param put
     */
    *fetchDetail({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(getArticleDetail, payload);
      yield put({
        type: 'changeArticleDetail',
        payload: response,
      });
    },
  },

  reducers: {
    /**
     *
     * @param state
     * @param action
     * @returns {{listData: {lists: Array|*, pageNum: number|*, total: number|*|PaymentItem, pageSize: number|*}}}
     */
    changeArticleListData(state, action) {
      return {
        ...state,
        listData : {
          lists: action.payload.data.lists,
          pageNum: action.payload.data.pageNum,
          total: action.payload.data.total,
          pageSize: action.payload.data.pageSize,
        }
      };
    },
    /**
     * 获取商品详情
     * @param state
     * @param action
     * @returns {{detail}}
     */
    changeArticleDetail(state, action) {
      return {
        ...state,
        detail : action.payload.data,
      };
    }
  },

};
