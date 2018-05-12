import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import PropTypes from 'prop-types';
import {bindAll, debounce} from 'lodash';
import SearchIcon from '../Icon/SearchIcon';

class SearchBar extends PureComponent {  

  constructor(props, context) {
	 super(props);

   bindAll(this, [
    '_handleSearch',
    '_fetchGifs',
    '_openSearch',
    '_closeSearch',
    '_onFocus'
   ]);

   const searchFlyOut = 350;

   this._openSearch = debounce(this._openSearch, searchFlyOut);
   this._closeSearch = debounce(this._closeSearch, searchFlyOut);
   this._debouncedFetchGifs = debounce(this._fetchGifs, 500);

    this.state = {
      visible: false,
      focused: false
    } 
  }

  _handleSearch(e) {
    const value = e.target.value;

    (value !== '') 
      ? this._debouncedFetchGifs(value)
      : this.props.actions.getTrending();
  }

  _fetchGifs(query) {
    this.props.actions.getGifs(query);
  }

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

  _onFocus() {
    const visible = (this.state.focused) ? false : true; 
    this.setState({
      focused: !this.state.focused,
      visible
    });
  }

  render() {
    const { visible } = this.state;

    return (
      <div onMouseEnter={ this._openSearch } 
           onMouseLeave={ this._closeSearch }
           className={visible 
                        ? 'search-bar__container search-bar__container--active'
                        : 'search-bar__container'}>
      <SearchIcon />
        <input type='text' 
               className={visible 
                            ? 'search-bar search-bar--active'
                            : 'search-bar'}
               onChange={ this._handleSearch }
               onFocus={this._onFocus} onBlur={this._onFocus} 
               placeholder="Search Gifs" >
        </input>
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