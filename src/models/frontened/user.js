import {userRegister, userLogin} from '@/services/api'
import {adminLogin} from '@/services/admin'
import Storage from '@/storage/Storage'
import {USER_TYPE_NORAML} from "@/models/common/constMap";

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
    userType: userInfo.userType ? userInfo.userType : USER_TYPE_NORAML,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
    * adminLogin({payload}, {call, put}) {
      const response = yield call(adminLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
    * register({payload}, {call, put}) {
      const response = yield call(userRegister, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
    * logout({payload}, {call, put}) {
      const response = yield call(function (payload) {
        return new Promise(function (resolve, reject) {
          //做一些异步操作
          setTimeout(function () {
            resolve({
              id: 0,
              username: '匿名用户',
              token: '',
              email: '',
              userType: 2,
            });
          }, 100);
        });
      }, payload);
      yield put({
        type: 'clearLoginData',
        payload: response,
      });
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
    clearLoginData(state, action) {
      Storage.delete("userInfo");
      return {...state, ...action.payload};
    }
  },

};
