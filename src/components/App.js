import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleInfinite } from '../actions/actions';
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
    const { modalIsOpen, infiniteScroll } = this.props;
    return (
      <div className="container">
        <SearchBar />
        <GifList />
        {modalIsOpen &&
          <Modal />
        }
        {/*{infiniteScroll &&
          <Pagination />
        }*/}
      </div>
    );
  }
}

GifList.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  infiniteScroll: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    data: state.gifs,
    modalIsOpen: state.modal.modalIsOpen,
    infiniteScroll: state.infinite.infiniteScroll
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      toggleInfinite
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);