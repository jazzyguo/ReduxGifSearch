import * as types from './actionTypes';
import axios from 'axios';

const apiUrl = 'http://api.giphy.com/v1/gifs/';
const apiOffset = '&offset=';
const apiKey = '&api_key=lZnfkdDQS6wkKNENzI1SOeTbF3GURqLz';
const apiLimit = '&limit=';

const defaultLimit = 25;

export function receiveGIFS(gifs) {
  return {
    type: types.RECEIVE_GIFS, 
    payload: gifs.data
  };
}

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

export function getMoreGifs(url, limit){

  return function action(dispatch) {
    dispatch({ type: 'GET_MORE_GIFS', payload: limit })
    const request = axios({
      method: 'GET',
      url: url + apiOffset + `${limit-defaultLimit-1}`
    });

     return request.then(
      response => dispatch(receiveGIFS(response)),
    );
  }
}
