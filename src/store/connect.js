import { connect } from 'react-redux';

export default function connect(mapStateAndDispatch){
  return function(target){
    // react-redux 的 connect() 接收四个参数，它们分别是 mapStateToProps ， mapDispatchToProps， mergeProps 和 options 。
    return connect(mapStateAndDispatch)(target);
  }
}