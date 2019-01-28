/**
 * redux入口
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';       // 引入redux-saga中的createSagaMiddleware函数
import models from '@/models';

const sagaMiddleware = createSagaMiddleware();        // 执行

const reducerAll = {};
const stateAll = {};
export const effectsAll = {};

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
      reducerAll[models[key].namespace] = function(state, action){
        let result = { ...state };
        Object.keys(models[key].reducers).forEach(function (reducer) {
          if (action.type === reducer) {
            result = models[key].reducers[reducer](state,action.payload);
          }
        });
        return result;
      };

      // 异步reducer, Actions
      Object.keys(models[key].effects).forEach(function (effect) {
        effectsAll[models[key].namespace + '/' + effect] = models[key].effects[effect];
      });

    } else {
      // eslint-disable-next-line
      throw {
        message: 'model: ' + key + "'s namespace not defined",
        name: 'namespacenotfound'
      };
    }
  });
}
parseModelData(models);

// console.log(reducerAll);
// console.log(stateAll);

// 创建store
export const store = createStore(
  combineReducers({...reducerAll}), // 合并reducer
  stateAll, // 对应reducer的默认state
  applyMiddleware(sagaMiddleware) // 中间件，加载sagaMiddleware
);

export default store;