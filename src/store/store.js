import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import gifReducer from '../reducers/gifReducer';
import modalReducer from '../reducers/modalReducer';

export default function buildStore() {

  const _reducers = combineReducers({
    gifs: gifReducer,
    modal: modalReducer
  });

  return createStore(
    _reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}