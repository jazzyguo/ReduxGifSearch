import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
 
class Pagination extends PureComponent {

	constructor(props) {
		super(props);

		bindAll(this, [
		]);
	}	


	render() {
		const { modalContent } = this.props;
		return(
			<div className="pagination">
			
			</div>
		)
	}
}

Pagination.propTypes = {
  actions: PropTypes.object,
  paginationData: PropTypes.object,
  Pagination: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    paginationData: state.gifs.paginationData,
    pagination: state.pagination.pagination
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