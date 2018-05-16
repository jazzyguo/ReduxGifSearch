import { TOGGLE_PAGINATION } from '../actions/actionTypes';

const initState =  {
  pagination: false 
};

//reducers used to toggle infinite scroll state
export default function togglePaginationReducer(state = initState, action) {
  let newState;
  switch(action.type) {
    case TOGGLE_PAGINATION:
      newState = Object.assign({}, state, {
          pagination: !state.infiniteScroll,
      });
      break;
    default:
      newState = state;
  }
  return newState;
}