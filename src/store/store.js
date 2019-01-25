/**
 * redux入口
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';       // 引入redux-saga中的createSagaMiddleware函数
import models from '@/models';

const sagaMiddleware = createSagaMiddleware();        // 执行

const reducerAll = {};
const stateAll = {};

/**
 * 遍历解构models, 分离默认state数据以及 reducer
 * @param models
 */
function parseModelData(models) {
  Object.keys(models).forEach(function (key) {
    console.log(key, models[key]);

    if (models[key].namespace && models[key].namespace !== '') {
      stateAll[(models[key].namespace + '/' + key)] = models[key].state;
      reducerAll[(models[key].namespace + '/' + key)] = models[key].reducers;
    } else {
      stateAll[key] = models[key].state;
      reducerAll[key] = models[key].reducers;
    }
  });
};
parseModelData(models);


// 创建store
export const store = createStore(
  combineReducers({...reducerAll}),               // 合并reducer
  stateAll,
  applyMiddleware(sagaMiddleware)                 // 中间件，加载sagaMiddleware
);

export default store;