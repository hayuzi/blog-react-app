// 写完的model必须导入到 models/index 中

import {getArticleList} from "@/services/api";

export default {

  namespace: 'article',

  state: {
    detail: {},
    listData: {
      lists: [],
    },
    loading: false,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(getArticleList(payload));
      yield put({
        type: 'saveListData',
        payload: response,
      });
    },
  },

  reducers: {
    saveListData(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
