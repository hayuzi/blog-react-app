import {getArticleList} from '@/services/admin';

export default {

  namespace: 'adminComment',

  state: {
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    * fetchArticleList({payload}, {call, put}) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'articleListData',
        payload: response,
      });
    },
  },

  reducers: {
    articleListData(state, action) {
      return {...state, ...action.payload.data};
    },
  },

};
