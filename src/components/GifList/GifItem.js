import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindAll, debounce } from 'lodash';
import Loader from '../Loader/Loader';

class GifItem extends PureComponent {
	constructor(props, context) {
		super(props);

		this.state = {
    		visible: true,
    		modal: false
  		}	

		bindAll(this, [
			'_checkVisible',
			'_showModal'
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

	// displays gif information with modal
	_showModal() {
		console.log('Modal');
		this.setState({modal: false});
	}

	render(){
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

export default GifItem;

/*
 * @ {gif} - object containing relative gif data
 */
GifItem.propTypes = {
  gif: PropTypes.object,
};