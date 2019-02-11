import {adminLogin} from '@/services/admin';
import Storage from '@/storage/Storage';

export default {

  namespace: 'adminUser',

  state: {
    id: 0,
    username: '',
    token: '',
    loading: true,
  },

  effects: {
    * login({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(adminLogin, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.status === 200) {
        // 保存信息到本地存储
        Storage.set("adminUser", {...response.data});
        // 登陆之后跳转到 dashboard
      }
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      return {...state, ...action.payload.data};
    },
  },

};
