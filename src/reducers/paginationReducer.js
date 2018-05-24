import { TOGGLE_PAGINATION, GO_TO_PAGE } from '../actions/actionTypes';

const initState =  {
  pagination: false,
  perPage: 24,
  currPage: 0
};

export default function paginationReducer(state = initState, action) {
  let newState;
  switch(action.type) {
    case TOGGLE_PAGINATION:
      newState = Object.assign({}, state, {
          pagination: !state.pagination,
      });
      break;
    case GO_TO_PAGE:
      newState = Object.assign({}, state, {
          currPage: action.currPage
      });
      break;
    default:
      newState = state;
  }
  return newState;
}