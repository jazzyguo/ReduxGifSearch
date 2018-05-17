import { TOGGLE_PAGINATION } from '../actions/actionTypes';

const initState =  {
  pagination: true,
  perPage: 24,
};

//reducers used to toggle infinite scroll state
export default function togglePaginationReducer(state = initState, action) {
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