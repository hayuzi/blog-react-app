export default {

  namespace: 'user',

  state: {
    id: 0,
    username: '',
    token: '',
    loading: true,
  },

  effects: {
    *login({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(function (payload) {
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            resolve({
              id: 1,
              username: 'user1',
              token: "xxxxxxxxxxxxx",
            });
          }, 1000);
        });
      }, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // 登陆之后跳转
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      return {...state, ...action.payload};
    },
  },

};
