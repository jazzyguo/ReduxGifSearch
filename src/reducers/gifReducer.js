import { GET_GIFS, RECEIVE_GIFS, GET_MORE_GIFS, 
         RESET_GIFS, GET_PAGE } from '../actions/actionTypes';

const initState = {
	gifs: [],
	gifsLoading: false,
	gifsLoaded: false,
	url: "",
	limit: null,
  paginationData: null,
  query: "",
  infiniteScroll: true
};

export default function gifReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_GIFS:
    	console.log('GET_GIFS');
    	newState = Object.assign({}, state, {
          gifsLoading: true,
          url: action.url,
          limit: action.limit,
          query: action.query
      });
    	return action;

    case RECEIVE_GIFS:
        console.log('RECEIVE_GIFS');
        // concats new fetched gifs with previous gifs
        // only if infinite scroll is on, else paginate to new page
        const gifsArray = (state.gifs && state.infiniteScroll)  
          ? concatGifs(state.gifs, action.payload.data) 
          : action.payload.data
    	newState = Object.assign({}, state, {
          gifs: gifsArray,
          gifsLoading: false,
          gifsLoaded: true,
          paginationData: action.payload.pagination
        });
    	break;

    case GET_MORE_GIFS:
    	console.log('GET_MORE_GIFS');
    	newState = Object.assign({}, state, {
          limit: action.payload,
          gifsLoading: true,
          infiniteScroll: !action.pagination   
      });
      break;

    case RESET_GIFS:
      newState = Object.assign({}, state, {
          gifs: [],
      });
      break;

    case GET_PAGE:
      console.log('GET_PAGE');
      newState = Object.assign({}, state, {
          gifsLoading: true,
          infiniteScroll: !action.pagination   
      });
      break;

    default:
      newState = state;
  }
  return newState;
}

function concatGifs(arr1, arr2){
	const resultArr = arr1.concat(arr2);
	return resultArr;
}

