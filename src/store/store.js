/**
 * redux入口
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';       // 引入redux-saga中的createSagaMiddleware函数
import {call, put, takeEvery} from 'redux-saga/effects';
import models from '@/models';

const sagaMiddleware = createSagaMiddleware();        // 执行

const reducerAll = {};
const stateAll = {};
const appSaga = {};
appSaga.takes = [];


/**
 * 遍历解构models, 分离默认state数据以及 reducer ( 类似于dva的简单封装 )
 *
 * @param models
 */
function parseModelData(models) {
  Object.keys(models).forEach(function (key) {
    if (models[key].namespace && models[key].namespace !== '') {

      // 命名空间的state
      stateAll[models[key].namespace] = models[key].state;

      // 命名空间下的reducer聚合
      reducerAll[models[key].namespace] = function (state, action) {
        let result = {...state};
        Object.keys(models[key].reducers).forEach(function (reducer) {
          if (action.type === (models[key].namespace + '/' + reducer)) {
            result = models[key].reducers[reducer](state, action.payload);
          }
        });

        // 异步reducer
        Object.keys(models[key].effects).forEach(function (reducer) {
          if (action.type === (models[key].namespace + '/' + reducer)) {
            console.log(action);
            models[key].effects[reducer](action, {call, put});
          }
        });
        return result;
      };

      // saga监听
      Object.keys(models[key].effects).forEach(function (reducer) {
        appSaga.takes.push({
          pattern: models[key].namespace + '/' + reducer,
          saga: models[key].effects[reducer]
        });
      });

    } else {
      // eslint-disable-next-line
      throw new Error("model: " + key + "'s namespace not defined");
    }
  });
}

parseModelData(models);


// 创建saga监听
function* rootSaga() {
  const len = appSaga.takes.length;
  console.log(appSaga.takes[0].pattern);
  console.log(action => appSaga.takes[0].saga(action, {call, put}));
  for (let i = 0; i < len; i++) {
    yield takeEvery(appSaga.takes[i].pattern, action => appSaga.takes[i].saga(action, {call, put}));
  }
}

// 创建store
export const store = createStore(
  combineReducers({...reducerAll}), // 合并reducer
  stateAll, // 对应reducer的默认state
  applyMiddleware(sagaMiddleware) // 中间件，加载sagaMiddleware
);
sagaMiddleware.run(rootSaga);

export default store;