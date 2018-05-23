import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GifList from './GifList/GifList';
import SearchBar from './SearchBar/SearchBar';
import Modal from './Modal/Modal';
import PaginationToggle from './Pagination/PaginationToggle';

class App extends React.Component {  

  constructor(props, context) {
	 super(props);
  }

  render() {
    const { modalIsOpen } = this.props;

    return (
      <div className="container">
        <SearchBar />
        <PaginationToggle />
        <GifList />
        {modalIsOpen &&
          <Modal />
        }
      </div>
    );
  }
}
/*
 * @ {modalIsOpen} - boolean to check if gifs are loaded
 * @ {pagination} - boolean for pagination toggle
 */
GifList.propTypes = {
  modalIsOpen: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    modalIsOpen: state.modal.modalIsOpen
  };
}

export default connect(
  mapStateToProps,
  null
)(App);