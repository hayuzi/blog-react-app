// 写完的model必须导入到 models/index 中
import {getCommentsList, createComment} from '@/services/api';

export default {

  namespace: 'comment',

  state: {
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 5,
    },
  },

  effects: {
    * fetchCommentsList({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(getCommentsList, payload);
      yield put({
        type: 'saveCommentsList',
        payload: response,
      });
    },
    * addComment({payload}, {call, put}) {
      const response = yield call(createComment, payload);
      yield put({
        type: 'createSuccess',
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
          pageNum: action.payload.data.pageNum,
          total: action.payload.data.total,
          pageSize: action.payload.data.pageSize,
        }
      };
    },
    createSuccess(state, action) {
      if (action.payload.code === 200) {
        return {
          ...state,
        };
      }
      return {
        ...state,
      };
    },
  },

};
