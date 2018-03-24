import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import { forEach, bindAll, debounce} from 'lodash';
import React from 'react';
import GifItem from './GifItem';

class GifList extends React.Component {  

  constructor(props, context) {
  	super(props);

  	bindAll(this, [
  		'_loadMoreGifs'
  	]);

  	this.limitIncrease = 25;

  	this._debouncedScroll = debounce(this._scroll, 100);
    this.viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  }

  componentWillMount() { 
     window.scrollTo(0, 0)

     this.props.actions.getTrending();

     window.onscroll = () => {
     	this._debouncedScroll();
     	let searchBar = document.getElementById("search-bar__container");

     	let fixed = searchBar.offsetTop; 

      (window.pageYOffset > fixed) 
    		? searchBar.classList.add("search-bar__container--fixed")
		    : searchBar.classList.remove("search-bar__container--fixed")
	   }
  }

  _scroll(){
	var d = document.documentElement;
  	var offset = d.scrollTop + window.innerHeight;
  	var height = d.offsetHeight;

  	if (height - offset < 500) {
		  this._loadMoreGifs();
  	}
  }

  _renderGifs() {
  	return this.props.gifs.map((gif, key) => {
      return (
      	<GifItem gif={gif} key={key} viewHeight={this.viewHeight}/>
      )
    })
  }
  
  _loadMoreGifs(){	
  	this.props.actions.getMoreGifs(this.props.url, this.props.limit + this.limitIncrease);
  }

  render() {
    return (
      <div className="gif-list gif-list__container container">

          {this.props.gifsLoaded 
          	?   
          	(this.props.gifs.length === 0) 
          		?	<div className="gif-list__no-data">
             			No Results Found
             		</div>
            	:   <ul className="gif-list__list">
         	   			{ this._renderGifs() }
         		    </ul>
            :
            <div className="gif-list__loading">
              Loading
            </div>
          }

      </div>
    );
  }
}

GifList.propTypes = {
  actions: PropTypes.object,
  gifs: PropTypes.array,
  gifsLoading: PropTypes.bool,
  gifsLoaded: PropTypes.bool,
  url: PropTypes.string,
  limit: PropTypes.number
};

function mapStateToProps(state) {
  return {
    gifs: state.gifs.gifs,
    gifsLoading: state.gifs.gifsLoading,
    gifsLoaded: state.gifs.gifsLoaded,
    url: state.gifs.url,
    limit: state.gifs.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifList);