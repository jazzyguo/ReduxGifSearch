import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import React from 'react';
import GifList from './GifList';
import SearchBar from './SearchBar';

class App extends React.Component {  

  constructor(props, context) {
	super(props);

  }

  render() {
    return (
      <div className="container">
        <SearchBar />
        <GifList />

      </div>
    );
  }
}

GifList.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.object,
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
)(App);