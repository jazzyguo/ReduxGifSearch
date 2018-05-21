import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGifs, togglePagination, resetGifs } from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import InfinityIcon from '../Icon/InfinityIcon';

class PaginationToggle extends PureComponent {
	constructor(props, context) {
  		super(props);

  		bindAll(this, [
			'_togglePagination',
			'_renderToggleButton'
		]);

		this.limit = 24;
  	}

  	/* Toggle pagination on/off 
   	 * resets current gif data
     * Only works if there are no pending requests
   	 */
   	 _togglePagination() {
   	 	const { actions, query, gifsLoading, gifsLoaded } = this.props;

      if(!gifsLoading && gifsLoaded) {
     	 	// toggle
     	 	actions.togglePagination();

     	 	// reset current gif data 
     	 	actions.resetGifs();

     	 	// fetch new gif data from current query
     	 	(query)
        	? actions.getGifs(query, this.limit)
        	: actions.getGifs();
      }
    }

    _renderToggleButton() {
   		return (
	    	<InfinityIcon onClick={ this._togglePagination }/>
   		);
   	}

   	render() {

   		return (
	  		<div className="pagination__toggle">
   				{ this._renderToggleButton() }
   			</div>
   		)
   	}
}

/*
 * @ {actions} 
 * @ {query} - used for pagination toggle to reset gifs
 * @ {gifsLoading} - toggle wont work if there are pending requests
 * @ {gifsLoaded} - toggle can be clicked only after gifs are laoded
 */
PaginationToggle.propTypes = {
  actions: PropTypes.object,
  query: PropTypes.string,
  gifsLoading: PropTypes.bool,
  gifsLoaded: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    query: state.gifs.query,
    gifsLoading: state.gifs.gifsLoading,
    gifsLoaded: state.gifs.gifsLoaded
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getGifs,
      togglePagination,
      resetGifs
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationToggle);

