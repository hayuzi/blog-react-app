import { connect as con } from 'react-redux';


// 该方法实际上就是 react的connect
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps = undefined , options = undefined){
  return function(component){
    // react-redux 的 connect() 接收四个参数，它们分别是 mapStateToProps ， mapDispatchToProps， mergeProps 和 options 。
    return con(mapStateToProps, mapDispatchToProps, mergeProps, options)(component);
  }
}