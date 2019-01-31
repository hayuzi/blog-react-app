// import {call, put, takeEvery} from 'redux-saga/effects';     // 引入相关函数

export default {

  namespace: 'user',

  state: {
    id: 0,
    username: '',
    token: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(function () {
        return {
          id: 10,
          username: 10,
          token: "xxxxxxxxxxxxx",
        };
      }, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, payload) {
      return {
        ...state,
        id: payload.id,
        username: payload.username,
        token: payload.token,
      };
    },
  },

};
