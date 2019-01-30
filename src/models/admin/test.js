// import {call, put, takeEvery} from 'redux-saga/effects';     // 引入相关函数

export default {

  namespace: 'test',

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
      console.log(payload);
      console.log(call, put);
      const response = yield call(function () {
        return {
          id: 10,
          username: 10,
          token: "xxxxxxxxxxxxx",
        };
      }, payload);
      console.log(123123);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log(55555);
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      console.log(action);
      console.log(state);
      return {  ...state, };
    },
  },

};
