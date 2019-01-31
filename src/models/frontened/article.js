// 写完的model必须导入到 models/index 中

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

      const response = yield call(function (payload) {
        return {list: []}
      });

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
