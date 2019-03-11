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
      yield put({
        type: 'deleteUserData',
        payload: response,
      });
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
    deleteUserData(state, action) {
      if (action.payload.code !== 200) {
        message.error(action.payload.msg);
      }
      return {...state};
    },
  },

};
