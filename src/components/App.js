import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import PropTypes from 'prop-types';
import React from 'react';
import GifList from './GifList/GifList';
import SearchBar from './SearchBar/SearchBar';
import Modal from './Modal/Modal';

class App extends React.Component {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    return (
      <div className="container">
        <SearchBar />
        <GifList />
        {this.props.modalIsOpen &&
          <Modal />
        }
      </div>
    );
  }
}

GifList.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.object,
  modalIsOpen: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    data: state.gifs,
    modalIsOpen: state.modal.modalIsOpen
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