import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import './Pagination.css';
 
class Pagination extends PureComponent {

	constructor(props) {
		super(props);

		bindAll(this, [
		]);

	}	

	render() {
		const { paginationData, perPage} = this.props;
    
    const totalPages = (paginationData) 
                        ? -~(paginationData.total_count / perPage) 
                        : null;
		return(
			<div className="pagination">
      {paginationData &&
			   totalPages
      }
			</div>
		)
	}
}

Pagination.propTypes = {
  actions: PropTypes.object,
  paginationData: PropTypes.object,
  perPage: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    paginationData: state.gifs.paginationData,
    perPage: state.pagination.perPage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);