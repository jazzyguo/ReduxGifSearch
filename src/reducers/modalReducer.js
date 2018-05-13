import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes';

const initState =  {
  modalContent: null,
  modalIsOpen: false
};

//reducers used to open or close the selected gif's modal
export default function modalReducer(state = initState, action) {
  let newState;
  switch(action.type) {
    case OPEN_MODAL:
      console.log('OPEN_MODAL');
      newState = Object.assign({}, state, {
        modalIsOpen: true,
        modalContent: action.modalContent
      });
      break;
    case CLOSE_MODAL:
      console.log('CLOSE_MODAL');
      newState = Object.assign({}, state, {
        modalIsOpen: false,
        modalContent: null
      });
      break;
    default:
      newState = state;
  }
  return newState;
}