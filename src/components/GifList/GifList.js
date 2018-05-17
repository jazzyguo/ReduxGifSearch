import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTrending, getMoreGifs } from '../../actions/actions';
import PropTypes from 'prop-types';
import { forEach, bindAll, debounce} from 'lodash';
import GifItem from './GifItem';
import './GifList.css';

class GifList extends PureComponent {  

  constructor(props, context) {
  	super(props);

  	bindAll(this, [
  		'_loadMoreGifs',
      '_renderLoader'
  	]);

  	this.limitIncrease = 25;
    this.viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

  	this._debouncedScroll = debounce(this._scroll, 125);
  }

  componentWillMount() { 
    const { actions } = this.props;

    window.scrollTo(0, 0);

    // gets trending gifs default
    actions.getTrending();

    window.onscroll = () => {
     	this._debouncedScroll();
	  }
  }

  // allows more gifs to load as the user scrolls near the bottom
  _scroll(){
    // infinite scroll is on if pagination is off
    if(!this.props.pagination) {
  	  const d = document.documentElement;
    	const offset = d.scrollTop + window.innerHeight;
    	const height = d.offsetHeight;

      // check for height diff or if there is no scrollbar
    	if (height - offset < 250 || height-offset === 0) {
  		  this._loadMoreGifs();
    	}
    }
  }

  _renderGifs() {
    // Call scroll for screen sizes which 
    // will not render a vertical scrollbar
    this._debouncedScroll();
    
  	return this.props.gifs.map((gif, key) => {
      return (
      	<GifItem gif={gif} key={key} 
                 viewHeight={ this.viewHeight }/>
      )
    })
  }

  _renderLoader(type) {
    return (
      <div className={`gif-list__loader${type}`}>
        <div className="gif-loader">
          <div className="loader__1"></div>
          <div className="loader__2"></div>
          <div className="loader__3"></div>
        </div>
      </div>
    )
  }

  _loadMoreGifs(){	
  	this.props.actions.getMoreGifs(this.props.url, this.props.limit + this.limitIncrease);
  }

  render() {
    const { gifsLoaded, gifsLoading, gifs, 
            query, paginationData, pagination } = this.props;
    
    return (
      <div className="gif-list gif-list__container container">

          {gifsLoaded ?   
            (gifs.length === 0) 
            ?	<div className="gif-list__no-data">
                No Results Found
              </div>
            :   
            <ul className="gif-list__list">
              {paginationData &&
                <div className="results">
                  {paginationData.total_count} Results in 
                    {(query) ? ` "${query}"` : ' Trending'}
                </div>
              }
              { this._renderGifs() }
            </ul>
            : undefined
          }

          {!gifsLoaded &&
            this._renderLoader(2)
          }

          {gifsLoading &&
            this._renderLoader(1)
          }
      </div>
    );
  }
}
/*
 * @ {actions} 
 * @ {gifs} - array of gifs to load
 * @ {gifsLoading} - checks if gifs are loading
 * @ {gifsLoaded} - boolean to check if gifs are loaded
 * @ {url} - the current url being used 
 * @ {limit} - the set limit for fetched gifs
 * @ {paginationData} - object containing pagination info
 * @ {query} - the current search query
 * @ {infiniteScroll} - toggle for infinite scrolling
 * @ {pagination} - boolean flag for pagination on/off
 */
GifList.propTypes = {
  actions: PropTypes.object,
  gifs: PropTypes.array,
  gifsLoading: PropTypes.bool,
  gifsLoaded: PropTypes.bool,
  url: PropTypes.string,
  limit: PropTypes.number,
  paginationData: PropTypes.object,
  query: PropTypes.string,
  pagination: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs.gifs,
    gifsLoading: state.gifs.gifsLoading,
    gifsLoaded: state.gifs.gifsLoaded,
    url: state.gifs.url,
    limit: state.gifs.limit,
    paginationData: state.gifs.paginationData,
    query: state.gifs.query,
    pagination: state.pagination.pagination
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getTrending,
      getMoreGifs
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifList);