import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import CloseIcon from '../Icon/CloseIcon';
import './Modal.css';
 
class Modal extends PureComponent {
	constructor(props) {
		super(props);

		bindAll(this, [
		  '_handleClick'
		]);
	}	

	componentDidMount() {
    	document.addEventListener('mousedown', this._handleClick);
  	}

  	componentWillUnmount() {
    	document.removeEventListener('mousedown', this._handleClick);
  	}

  	_handleClick(event) {
    	if (!this.modal.contains(event.target) 
    		|| event.target.classList.contains('close-icon')) {
    		this.props.actions.closeModal();
    	}
  	}

	render() {
		const { modalContent } = this.props;
		return(
			<div className="modal__container">
				<div className="modal"
					 ref={(modal) => {this.modal = modal}}>
					 <CloseIcon onClick={ this._handleClick }/>
					 	{ modalContent }
				</div>
			</div>
		)
	}
}
/*
 * @ {modalContent} - the content to render within the modal 
 */
Modal.propTypes = {
  modalContent: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    modalContent: state.modal.modalContent
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
)(Modal);