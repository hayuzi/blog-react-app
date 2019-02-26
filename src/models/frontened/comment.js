// 写完的model必须导入到 models/index 中
import {getCommentsList} from '@/services/api'

export default {

  namespace: 'comment',

  state: {
    listData: {
      lists: [],
    }
  },

  effects: {
    * getCommentsList({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(getCommentsList, payload);
      yield put({
        type: 'saveCommentsList',
        payload: response,
      });
    },
  },

  reducers: {
    saveCommentsList(state, action) {
      return {
        ...state,
        listData: {
          lists: action.payload.data.lists,
        }
      };
    },
  },

};
