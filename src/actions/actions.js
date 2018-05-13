import * as types from './actionTypes';
import axios from 'axios';

const apiUrl = 'https://api.giphy.com/v1/gifs/';
const apiOffset = '&offset=';
const apiKey = '&api_key=lZnfkdDQS6wkKNENzI1SOeTbF3GURqLz';
const apiLimit = '&limit=';

const defaultLimit = 25;

// maps the received gifs to state
export function receiveGIFS(gifs) {

  return {
    type: types.RECEIVE_GIFS, 
    payload: gifs.data
  };
}

// fetches gifs on search input
export function getGifs(query, limit = defaultLimit){

  const encodedQuery = encodeURIComponent(query);
  const url = `${apiUrl}search?q=${encodedQuery}${apiKey}${apiLimit}`;

  return function action(dispatch) {
      dispatch({ type: types.GET_GIFS })

      const request = axios({
       method: 'GET',
       url: url + limit
      });
    
    return request.then(
      response => dispatch(receiveGIFS(response)),

    ).then(() => {
        dispatch({ type: 'GET_API_URL', payload: url });
    }).then(() => {
        dispatch({ type: 'GET_LIMIT', payload: limit });
    });
  }
}

// fetches trending gifs
export function getTrending(limit = defaultLimit) {

  const url = `${apiUrl}trending?${apiKey}${apiLimit}`;

  return function action(dispatch) {
    dispatch({ type: types.GET_TRENDING })

    const request = axios({
      method: 'GET',
      url: url + limit
    });
    
    return request.then(
      response => dispatch(receiveGIFS(response)),

    ).then(() => {
        dispatch({ type: 'GET_API_URL', payload: url });
    }).then(() => {
        dispatch({ type: 'GET_LIMIT', payload: limit });
    });
  }
}

// fetches additional gifs
export function getMoreGifs(url, limit){

  return function action(dispatch) {
    dispatch({ type: 'GET_MORE_GIFS', payload: limit })
    const request = axios({
      method: 'GET',
      // sets the offset for additional gif fetches
      url: url + apiOffset + `${limit-defaultLimit-1}`
    });

     return request.then(
      response => dispatch(receiveGIFS(response)),
    );
  }
}

// opens GIF modal for more info
export function openModal(gif) {
  return {
    type: 'OPEN_MODAL',
    gif
  }
}

// closes GIF modal
export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  }
}  