// import {call, put, takeEvery} from 'redux-saga/effects';     // 引入相关函数

export default {

  namespace: 'user',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(function () {
        setTimeout('',1000);
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
    changeLoginStatus(state, action) {
      return {  ...state,
        status: action.payload.id,
        type: action.payload.username,
        token: action.payload.token,
      };
    },
  },

};
