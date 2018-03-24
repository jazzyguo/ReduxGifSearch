import PropTypes from 'prop-types';
import React from 'react';
import { bindAll } from 'lodash';


class GifItem extends React.Component {
	constructor(props, context) {
		super(props);

		this.state = {
    		visible: true
  		}	

		bindAll(this, [
			'_checkVisible'
		]);

		this.url = this.props.gif.images.downsized.url;
  	}

 	componentDidMount(){
 		window.addEventListener('scroll', this._checkVisible);
	}

	_checkVisible() {
  		const rect = this.item.getBoundingClientRect();
  		const visible = !(rect.bottom < 0 || rect.top - this.props.viewHeight >= 0);
  		this.state.visible === visible 
  			? undefined 
  			: this.setState({visible});
	}

	render(){
		return(
	  		<li className="gif-list__item" ref={(li) => {this.item = li}}>
	    		<img src={(this.state.visible) ? this.url : "/img/loading.gif"}/>
	  		</li>
		)
	}
}

export default GifItem;