// 写完的model必须导入到 models/index 中
import {getAllTags} from '@/services/api'

export default {

  namespace: 'tag',

  state: {
    listData: {
      lists: [],
    }
  },

  effects: {
    * getAllTags({payload}, {call, put}) {  // eslint-disable-line
      const response = yield call(getAllTags, payload);
      yield put({
        type: 'gotAllTags',
        payload: response,
      });
    },
  },

  reducers: {
    gotAllTags(state, action) {
      if (action.payload.code === 200) {
        return {
          ...state,
          listData: {
            lists: action.payload.data.lists,
          }
        };
      }
      return {...state};
    },
  },

};
