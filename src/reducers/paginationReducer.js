import { TOGGLE_PAGINATION } from '../actions/actionTypes';

const initState =  {
  pagination: false
};

export default function paginationReducer(state = initState, action) {
  let newState;
  switch(action.type) {
    case TOGGLE_PAGINATION:
      newState = Object.assign({}, state, {
          pagination: !state.pagination,
      });
      break;
    default:
      newState = state;
  }
  return newState;
}