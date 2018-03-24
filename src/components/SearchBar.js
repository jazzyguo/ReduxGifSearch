import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import React from 'react';
import {bindAll, debounce} from "lodash";

class SearchBar extends React.Component {  

  constructor(props, context) {
	 super(props);

   bindAll(this, [
    '_handleSearch',
    '_fetchGifs'
   ]);

   this._debouncedFetchGifs = debounce(this._fetchGifs, 500);
  }

  _handleSearch(e){
    this._debouncedFetchGifs(e.target.value);
  }

  _fetchGifs(query){
    this.props.actions.getGifs(query);
  }

  render() {
    return (
      <div className="search-bar__container" id="search-bar__container">
        <input type='text' className="search-bar"
               onChange={ this._handleSearch } 
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