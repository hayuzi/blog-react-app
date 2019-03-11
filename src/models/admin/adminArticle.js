import {getArticleList, addArticle, editArticle} from '@/services/admin';
import { message } from 'antd';

export default {

  namespace: 'adminArticle',

  state: {
    articleDetail: {
      id: 0,
      articleStatus: 1,
      content: '',
      createdAt: '2019-01-01 00:00:01',
      sketch: '',
      tagId: 0,
      title: '',
      updatedAt: '2019-01-01 00:00:01',
      weight: 1,
      tag: {
        createdAt: '2019-01-01 00:00:01',
        id: 0,
        tagName: 'blank',
        tagStatus: 0,
        updatedAt: '2019-01-01 00:00:00',
        weight: 0,
      },
    },
    listData: {
      lists: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
    },
  },

  effects: {
    * fetchArticleList({payload}, {call, put}) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'articleListData',
        payload: response,
      });
    },
    * addArticle({payload}, {call, put}) {
      const response = yield call(addArticle, payload);
      yield put({
        type: 'addArticleData',
        payload: response,
      });
    },
    * editArticle({payload}, {call, put}) {
      const response = yield call(editArticle, payload);
      yield put({
        type: 'editArticleData',
        payload: response,
      });
    },
  },

  reducers: {
    articleListData(state, action) {
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
    addArticleData(state, action) {
      if (action.payload.code !== 200) {
        message.error(action.payload.msg);
      }
      return {...state};
    },
    editArticleData(state, action) {
      if (action.payload.code === 200) {
        message.error(action.payload.msg);
      }
      return {...state};
    },
  },

};
