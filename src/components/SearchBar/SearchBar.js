import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import {bindAll, debounce} from 'lodash';
import SearchIcon from '../Icon/SearchIcon';
import CloseIcon from '../Icon/CloseIcon';
import './SearchBar.css';

class SearchBar extends PureComponent {  

  constructor(props, context) {
	 super(props);

   bindAll(this, [
    '_handleSearch',
    '_fetchGifs',
    '_openSearch',
    '_closeSearch',
    '_onFocus',
    '_openMobileSearch',
    '_clearSearch',
    '_handleClick'
   ]);

   const searchFlyOut = 350;

   this._openSearch = debounce(this._openSearch, searchFlyOut);
   this._closeSearch = debounce(this._closeSearch, searchFlyOut);
   this._getTrending = debounce(props.actions.getTrending, 500);
   this._debouncedFetchGifs = debounce(this._fetchGifs, 500);

    this.state = {
      visible: false,
      focused: false,
      query: false
    } 
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClick);
  }

  _handleClick(event) {
    if (!this.container.contains(event.target)) {
      this.setState({
        visible: false
      }, this._closeSearch );
    }
  }

  _handleSearch(e) {
    const value = e.target.value;

    // gets trending by default when empty
    if(value !== ''){
      this._debouncedFetchGifs(value); 
      this.setState({query: true});
    } else {
      this._getTrending();
      this.setState({query: false});
    }
  }

  _fetchGifs(query) {
    this.props.actions.getGifs(query);
  }

  /* Toggle search function buggy with 
   * onMouseEnter / onMouseLeave
   * so make separate functions for open/close
   */
  _openSearch() {
    const { focused } = this.state; 
    if(!focused) {
      this.setState({
        visible: true
      });
    }
  }

  _closeSearch() {
    const { focused } = this.state; 
    if(!focused) {
      this.setState({
        visible: false
      });
    }
  }

  _clearSearch() {
    this.input.value = '';
    this.props.actions.getTrending();
    this.setState({query: false});
  }

  _onFocus() {
    this.setState({
      focused: !this.state.focused
    });
  }

  // **TODO create mobile modal - has top search for now
  _openMobileSearch() {
    this._openSearch();
  }

  render() {
    const { visible, query } = this.state;

    return (
      <div ref={(container) => {this.container = container}}
           onClick={ this._openMobileSearch }
           onMouseEnter={ this._openSearch } 
           onMouseLeave={ this._closeSearch }
           className={visible 
                        ? 'search-bar__container search-bar__container--active'
                        : 'search-bar__container'}>
      <SearchIcon />
        <div className="input-container">
          <input type='text'
                 ref={(input) => {this.input = input}} 
                 className={visible 
                              ? 'search-bar search-bar--active'
                              : 'search-bar'}
                 onChange={ this._handleSearch }
                 onFocus={ this._onFocus }
                 onBlur={ this._onFocus }
                 placeholder="Search Gifs" >
          </input> 
          {query && visible &&
            <div className="close-icon__container"
                 onClick={ this._clearSearch }>
              <CloseIcon />
            </div>
          } 
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    data: state.gifs
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
)(SearchBar);