import {GET_TRENDING, GET_GIFS, 
        RECEIVE_GIFS, GET_API_URL, 
        GET_MORE_GIFS, GET_LIMIT} from '../actions/actionTypes';

const initState = {
	gifs: [],
	gifsLoading: false,
	gifsLoaded: false,
	url: "",
	limit: null
};

export default function gifReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_GIFS:
    	console.log('GET_GIFS');
    	newState = Object.assign({}, state, {
          gifsLoading: true,
          limit: 25
        });
    	return action;

    case GET_TRENDING:
        console.log('GET_TRENDING');
        newState = Object.assign({}, state, {
          gifsLoading: true,
          limit: 25
        });
    	return action;

    case RECEIVE_GIFS:
        console.log('RECEIVE_GIFS');
        // concats new fetched gifs with previous gifs
        const gifsArray = state.gifs 
          ? concatGifs(state.gifs, action.payload.data) 
          : action.payload.data
    	newState = Object.assign({}, state, {
          gifs: gifsArray,
          gifsLoading: false,
          gifsLoaded: true
        });
    	break;

    case GET_API_URL:
    	newState = Object.assign({}, state, {
        	url: action.payload
        });
        break;

    case GET_LIMIT:
    	newState = Object.assign({}, state, {
        	limit: action.payload
        });
        break;

    case GET_MORE_GIFS:
    	console.log('GET_MORE_GIFS');
    	newState = Object.assign({}, state, {
          limit: action.payload,
          gifsLoading: true
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

