import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bindAll, debounce } from 'lodash';
import Loader from '../Loader/Loader';
import * as actions from '../../actions/actions';

class GifItem extends PureComponent {
	constructor(props, context) {
		super(props);

		this.state = {
    		visible: true
  		}	

		bindAll(this, [
			'_checkVisible',
			'_showModal',
			'_renderModalContent'

		]);

		this.url = this.props.gif.images.downsized.url;

		this._checkVisible = debounce(this._checkVisible, 150);
  	}

 	componentDidMount(){
 		window.addEventListener('scroll', this._checkVisible);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._checkVisible);
	}

	// checks if this element is outside the viewport - sets to loading img if it is
	_checkVisible() {
  		const rect = this.item.getBoundingClientRect();
  		const visible = !(rect.bottom < 0 || rect.top - this.props.viewHeight >= 0);
  		this.state.visible === visible 
  			? undefined 
  			: this.setState({visible});
	}

	// Calls openModal action 
	_showModal() {
		const { actions, gif } = this.props;
		actions.openModal(this._renderModalContent(gif));
	}

	_renderModalContent(selectedGif) {
		return (
			<React.Fragment>
				<p className="gif-title">{selectedGif.title}</p>
				<img src={ selectedGif.images.original.url } />
				<p className="gif-source"><strong>Source: </strong> 
					<a href={ selectedGif.source }>{selectedGif.source}</a>
				</p>
				<p><strong>Rating: </strong>{selectedGif.rating}</p>
			</React.Fragment>
		);
	}

	render() {
		const { visible } = this.state;
		return(
			<li ref={(li) => {this.item = li}} 
				className='gif-list__item-container'
				onClick={ this._showModal }>
				<div className='gif-list__item'>
				{!visible &&
					<Loader />
				}
				{visible &&
	    			<img src={(visible) ? this.url : null }/>
	  			}	  				
	  			</div>
	  		</li>
		)
	}
}

/*
 * @ {gif} - object containing relative gif data
 * @ {gif} - function when li is clicked
 */
GifItem.propTypes = {
  actions: PropTypes.object,
  gif: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifItem);