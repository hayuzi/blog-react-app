import {getUserList, deleteUser} from '@/services/admin';
import {message} from "antd";

export default {

  namespace: 'adminUser',

  state: {
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    * fetchUserList({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(getUserList, payload);
      yield put({
        type: 'userListData',
        payload: response,
      });
    },
    * deleteUser({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(deleteUser, payload);
      if (response.code === 200) {
        message.info('用户信息删除成功');
      }
    },
  },

  reducers: {
    userListData(state, action) {
      if (action.payload.code === 200) {
        return {
          ...state,
          listData: {
            lists: action.payload.data.lists,
            pageNum: action.payload.data.pageNum,
            total: action.payload.data.total,
            pageSize: action.payload.data.pageSize,
          }
        };
      }
      return {...state};
    },
  },

};
