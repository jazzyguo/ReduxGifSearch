import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import './Modal.css';
 
class Modal extends PureComponent {
	constructor(props) {
		super(props);
	

		bindAll(this, [
		
		]);
	}

	render() {

	return(
		<div className="modal">
			MODAL
		</div>
		)
	}
}

Modal.propTypes = {
  selectedGif: PropTypes.object
};

function mapStateToProps(state) {
  return {
    selectedGif: state.modal.selectedGif
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
)(Modal);