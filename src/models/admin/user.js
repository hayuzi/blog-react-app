export default {

  namespace: 'user',

  state: {
    id: 0,
    username: '',
    token: '',
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    *login({payload}, {call, put}) {  // eslint-disable-line
      console.log('login start');
      const response = yield call(function (payload) {
        console.log("exec call");
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            console.log('执行完成');
            console.log(payload);
            resolve({
              id: 1,
              username: 'user1',
              token: "xxxxxxxxxxxxx",
            });
          }, 2000);
        });
      }, payload);

      console.log(response);
      yield put({
        type: 'user/changeLoginStatus',
        payload: {
          id: Math.random(),
          username: 'username2',
          token: 'token',
        },
      });
    },
    *test({payload}, {call, put}) {  // eslint-disable-line
      console.log('test start');
      const response = yield call(function (payload) {
        console.log("exec call");
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            resolve({
              id: 2,
              username: 'user2',
              token: "xxxxxxxxxxxxx",
            });
          }, 2000);
        })
      }, payload);

      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      console.log('changeLoginStatus start');
      console.log(action);
      return {...state,};
    },
    changeTestState(state, action) {
      console.log('changeTestState start');
      console.log(action);
      return {...state,};
    }
  },

};
