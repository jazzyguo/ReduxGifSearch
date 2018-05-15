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

  	this._debouncedScroll = debounce(this._scroll, 100);
  }

  componentWillMount() { 
    const { actions } = this.props;

    window.scrollTo(0, 0)

    // gets trending gifs default
    actions.getTrending();

    window.onscroll = () => {
     	this._debouncedScroll();
	  }
  }

  // allows more gifs to load as the user scrolls near the bottom
  _scroll(){
    if(this.props.infiniteScroll) {
  	  const d = document.documentElement;
    	const offset = d.scrollTop + window.innerHeight;
    	const height = d.offsetHeight;

    	if (height - offset < 500) {
  		  this._loadMoreGifs();
    	}
    }
  }

  _renderGifs() {
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
    const { gifsLoaded, gifsLoading, gifs, query, pagination } = this.props;
    
    return (
      <div className="gif-list gif-list__container container">

          {gifsLoaded ?   
            (gifs.length === 0) 
            ?	<div className="gif-list__no-data">
                No Results Found
              </div>
            :   
            <ul className="gif-list__list">
              {pagination &&
                <div className="results">
                  {pagination.total_count} Results in 
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
 * @ {pagination} - pagination data
 * @ {query} - the current search query
 * @ {infiniteScroll} - toggle for infinite scrolling
 */
GifList.propTypes = {
  actions: PropTypes.object,
  gifs: PropTypes.array,
  gifsLoading: PropTypes.bool,
  gifsLoaded: PropTypes.bool,
  url: PropTypes.string,
  limit: PropTypes.number,
  pagination: PropTypes.object,
  query: PropTypes.string,
  infiniteScroll: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs.gifs,
    gifsLoading: state.gifs.gifsLoading,
    gifsLoaded: state.gifs.gifsLoaded,
    url: state.gifs.url,
    limit: state.gifs.limit,
    pagination: state.gifs.pagination,
    query: state.gifs.query,
    infiniteScroll: state.infinite.infiniteScroll
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