import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bindAll, debounce } from 'lodash';
import Loader from '../Loader/Loader';
import { openModal} from '../../actions/actions';

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

		this._checkVisible = debounce(this._checkVisible, 150);

		this.url = this.props.gif.images.downsized.url;
  	}

 	componentDidMount(){
 		window.addEventListener('scroll', this._checkVisible);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._checkVisible);
	}

	componentWillReceiveProps(nextProps) {
		// this is used to render new gifs fetched from pagination
		this.url = nextProps.gif.images.downsized.url;
		this.setState({
			visible: false
		}, () => {
			setTimeout(() => { this.setState({visible: true})}, 1000)
		});
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
		const { openModal, gif } = this.props;
		openModal(this._renderModalContent(gif));
	}

	_renderModalContent(selectedGif) {
		return (
			<React.Fragment>
				<p className="gif-title">{selectedGif.title}</p>
				<img src={ selectedGif.images.original.url } />
				<p className="gif-source"><strong>Source: </strong> 
					{selectedGif.source &&
						<a href={ selectedGif.source }>{selectedGif.source}</a>
					}
					{!selectedGif.source &&
						<span>N/A</span>
					}
				</p>
				<p><strong>Rating: </strong>{selectedGif.rating.toUpperCase()}</p>
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
  openModal: PropTypes.func,
  gif: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: bindActionCreators(openModal, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(GifItem);