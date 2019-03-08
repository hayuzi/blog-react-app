// 写完的model必须导入到 models/index 中
import {getArticleList, getArticleDetail} from "@/services/api";

export default {

  namespace: 'article',

  state: {
    detail: {
      id: 0,
      articleStatus: 1,
      content: "暂无数据",
      createdAt: "2019-01-01 00:00:00",
      sketch: "",
      tagId: 0,
      title: "空白标题",
      updatedAt: "2019-01-01 00:00:00",
      weight: 1,
      tag: {
        createdAt: "2019-01-01 01:16:47",
        id: 0,
        tagName: "blank",
        tagStatus: 0,
        updatedAt: "2019-01-01 01:16:47",
        weight: 0,
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
      if (action.payload.code === 200) {
        return {
          ...state,
          detail : action.payload.data,
        };
      }
      return {
        ...state,
      };
    }
  },

};
