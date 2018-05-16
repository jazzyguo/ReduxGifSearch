import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePagination } from '../actions/actions';
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
    const { modalIsOpen, Pagination } = this.props;
    return (
      <div className="container">
        <SearchBar />
        <GifList />
        {modalIsOpen &&
          <Modal />
        }
        {/*{Pagination &&
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
  pagination: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    data: state.gifs,
    modalIsOpen: state.modal.modalIsOpen,
    pagination: state.pagination.pagination
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      togglePagination
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);