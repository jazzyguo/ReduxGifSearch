import * as types from './actionTypes';
import axios from 'axios';
import { hasVerticalScroll } from '../util/helpers.js';

const apiUrl = 'https://api.giphy.com/v1/gifs/';
const apiOffset = '&offset=';
const apiKey = '&api_key=lZnfkdDQS6wkKNENzI1SOeTbF3GURqLz';
const apiLimit = '&limit=';

// 24 for even number of 2/3/4/6 item rows
const defaultLimit = 24;

/* maps the received gifs to state
 */
export function receiveGIFS(gifs) {

  return {
    type: types.RECEIVE_GIFS, 
    payload: gifs.data
  };
}

/* fetches gifs on search input
 * if query === "", then get trending
 */
export function getGifs(query = "", limit = defaultLimit){
  let encodedQuery;
  let url;

  // get trending
  if(query !== "") {
    encodedQuery = encodeURIComponent(query);
     url = `${apiUrl}search?q=${encodedQuery}${apiKey}${apiLimit}`;
  } else {
    // fetch search query
    url = `${apiUrl}trending?${apiKey}${apiLimit}`;
  }

  return function action(dispatch, getState) {
      dispatch({ 
        type: types.GET_GIFS,
        url,
        limit,
        query,
      })

      const request = axios({
       method: 'GET',
       url: url + limit
      });
    
    return request.then(
      response => dispatch(receiveGIFS(response))
    ).then( () => {
        // if no pagination and no vertical scroll bar, then get gifs
        if(!hasVerticalScroll() && !getState().pagination.pagination) {          
          dispatch(getMoreGifs(url, (defaultLimit * 2)));
        }
      }
    );
  }
}

/* fetches additional gifs
 */
export function getMoreGifs(url, limit = defaultLimit){

  return function action(dispatch) {
    dispatch({ 
      type: 'GET_MORE_GIFS', 
      payload: limit 
    })
    const request = axios({
      method: 'GET',
      // sets the offset for additional gif fetches
      url: `${url}${defaultLimit}${apiOffset}${limit-defaultLimit}`
    });
    return request.then(
      response => dispatch(receiveGIFS(response))
    );
  }
}

/* resets gifs - used for pagination toggle
 */
export function resetGifs() {
  return {
    type: 'RESET_GIFS'
  }
}

/* opens GIF modal for more info
 * @param modalCOntent - the html frag to render inside the modal
 */
export function openModal(modalContent) {
  return {
    type: 'OPEN_MODAL',
    modalContent
  }
}

// closes GIF modal
export function closeModal() {
  return {
    type: 'CLOSE_MODAL'
  }
}  

/* toggles pagination - off by default
 * infinite scrolling is used otherwise
 */ 
export function togglePagination() {

  return {
    type: 'TOGGLE_PAGINATION'
  }
}