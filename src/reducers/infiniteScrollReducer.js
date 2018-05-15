import { TOGGLE_INFINITE } from '../actions/actionTypes';

const initState =  {
  infiniteScroll: true
};

//reducers used to toggle infinite scroll state
export default function infiniteScrollReducer(state = initState, action) {
  let newState;
  switch(action.type) {
    case TOGGLE_INFINITE:
      newState = Object.assign({}, state, {
          infiniteScroll: !state.infiniteScroll,
      });
      break;
    default:
      newState = state;
  }
  return newState;
}