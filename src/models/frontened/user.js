import {userRegister, userLogin} from '@/services/api'
import Storage from '@/storage/Storage'

let userInfo = Storage.get("userInfo");
if (userInfo == null) {
  userInfo = {}
}

export default {

  namespace: 'user',

  state: {
    id: userInfo.id ? userInfo.id : 0,
    username: userInfo.username ? userInfo.username : '匿名用户',
    email: userInfo.email ? userInfo.email : '',
    token: userInfo.token ? userInfo.token : '',
  },

  effects: {
    * login({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // 缓存用户信息
    },
    * register({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(userRegister, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // 缓存用户信息
    },
    * logout({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(function (payload) {
        return new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            resolve({
              id: 0,
              username: '匿名用户',
              token: '',
              email: '',
            });
          }, 100);
        });
      }, payload);
      yield put({
        type: 'clearLoginData',
        payload: response,
      });
      // 缓存用户信息
    },
  },
  reducers: {
    changeLoginStatus(state, action) {
      if (action.payload.code !== 200) {
        return {...state};
      } else {
        Storage.set("userInfo", action.payload.data);
        return {...state, ...action.payload.data};
      }
    },
    clearLoginData(state, action){
      Storage.delete("userInfo");
      return {...state, ...action.payload};
    }
  },

};
