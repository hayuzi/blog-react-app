import {getCommentList, deleteComment} from '@/services/admin';
import {message} from 'antd';

export default {

  namespace: 'adminComment',

  state: {
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    * fetchCommentList({payload}, {call, put}) {
      const response = yield call(getCommentList, payload);
      yield put({
        type: 'commentListData',
        payload: response,
      });
    },
    * deleteComment({payload}, {call, put}) {
      const response = yield call(deleteComment, payload);
      if (response.code === 200) {
        message.info("操作成功，已为您删除选中的标签");
      }
    },
  },

  reducers: {
    commentListData(state, action) {
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
