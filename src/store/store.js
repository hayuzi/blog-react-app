/**
 * redux入口 简单模拟了 dva的数据处理模式
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';       // 引入redux-saga中的createSagaMiddleware函数
import * as sagaEffects from 'redux-saga/effects';
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
            result = models[key].reducers[reducer](state, action);
          }
        });

        // 异步reducer, 即effect
        Object.keys(models[key].effects).forEach(function (effect) {
          if (action.type === (models[key].namespace + '/' + effect)) {
            models[key].effects[effect](action, { call: sagaEffects.call , put: action => {
                const { type } = action;
                return sagaEffects.put({ ...action, type: models[key].namespace + '/' + type });
            }})
          }
        });
        return result;
      };

      // saga监听
      Object.keys(models[key].effects).forEach(function (reducer) {
        appSaga.takes.push({
          prefixType: models[key].namespace + '/',
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
// 一些注意点: call() 的方法必须是 一个Generator函数, 或者是一个返回Promise或任意其它值的普通函数。
function* rootSaga() {
  appSaga.watcher = [];
  appSaga.takes.forEach(function(tak) {
    appSaga.watcher.push( function* () {
      yield sagaEffects.takeLatest(tak.pattern, action => tak.saga(action, {call: sagaEffects.call, put: action => {
        const { type } = action;
        return sagaEffects.put({ ...action, type: tak.prefixType + type });
      }}))
    }());
  });

  // 监听所有effects.
  yield sagaEffects.all(appSaga.watcher);
}

// 创建store
export const store = createStore(
  combineReducers({...reducerAll}), // 合并reducer
  stateAll, // 对应reducer的默认state
  applyMiddleware(sagaMiddleware) // 中间件，加载sagaMiddleware
);
sagaMiddleware.run(rootSaga);

export default store;