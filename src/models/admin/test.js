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
    *testEffect({ payload }, { call, put }) {  // eslint-disable-line

      console.log('test effect start');

      const response = yield call(function (payload) {
        console.log("exec call");
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            console.log('执行完成le ma ');
            console.log(payload);
            resolve({
              id: 1,
              username: 'test1',
              token: "hhehda",
            });
          }, 2000);
        }).then(function (res){
          console.log(res);
          return res;
        });
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
