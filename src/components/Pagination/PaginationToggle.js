import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTrending, getGifs, 
		 togglePagination, resetGifs } from '../../actions/actions';
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

  	/*
     * Toggle pagination on/off 
   	 * resets current gif data
   	 */
   	 _togglePagination() {
   	 	const { actions, query } = this.props;

   	 	// toggle
   	 	actions.togglePagination();

   	 	// reset current gif data 
   	 	actions.resetGifs();

   	 	// fetch new gif data from current query
   	 	(query)
      		? actions.getGifs(query, this.limit)
      		: actions.getTrending();
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
 */
PaginationToggle.propTypes = {
  actions: PropTypes.object,
  query: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    query: state.gifs.query
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getTrending,
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

