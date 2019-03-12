import {getTagList, addTag, editTag} from '@/services/admin';
import { message } from 'antd';

export default {

  namespace: 'adminTag',

  state: {
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    * fetchTagList({payload}, {call, put}) {
      const response = yield call(getTagList, payload);
      yield put({
        type: 'tagListData',
        payload: response,
      });
    },
    * addTag({payload}, {call, put}) {
      const response = yield call(addTag, payload);
      if (response.code === 200) {
        message.info('标签添加成功！');
      }
    },
    * editTag({payload}, {call, put}) {
      const response = yield call(editTag, payload);
      if (response.code === 200) {
        message.info('标签更新成功！');
      }
    },
  },

  reducers: {
    tagListData(state, action) {
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
