import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToPage, getPage } from '../../actions/actions';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import './Pagination.css';
 
/* Pagination component which allows for page navigation
   **RULES**
 * - if one total page, then show one page with no next/prev
 * - if 6 or less total pages, then simply show all pages
 * - if total pages > 6 && current page >= 4 render left dots
 * - if total pages > 6 && current page >= 4 
     && current page < total pages -4 then render left AND right dots
 * - if total pages > 6 && current page >= total pages - 3 
     then only render left dots
 * - Renders prev button if current page is not the first
 * - Renders next button if current page is not the last
 *
 * GIPHY API ONLY SUPPORTS OFFSETS UP TO 4999
 */

class Pagination extends PureComponent {

  constructor(props) {
    super(props);

    bindAll(this, [
      '_scrollUp'
    ]);

    this.state = {
      totalPages: null
    }
  }

  // reset pagination
  componentWillMount() {
    this.props.actions.goToPage(1);
  }

  // remove pagination
  componentWillUnmount() {
    this.props.actions.goToPage(0);
  }

  componentWillReceiveProps(nextProps) {
    const { paginationData, perPage } = nextProps;
    // calculates the total pages

    // API ONLY SUPPORTS 4999 OFFSET
    let totalPages = (paginationData) 
      ? (paginationData.total_count <= 4999)
        ? -~(paginationData.total_count / perPage)
        : ~~((4999 + nextProps.perPage) / nextProps.perPage)
      : null;

    this.setState({totalPages});
  }

  /* Renders and filters through the middle 
   * portion of the pagination
   */
  _renderMiddlePages() {
    const { totalPages } = this.state;
    const { currPage } = this.props;
    let pagination = [];

    // creates all (1, totalPages] pagination - exclusive
    // maintains only four at a time
    for(let i=1;i<totalPages-1;i++){
      pagination.push(i+1);
    }
    // render first 4 pages when on first 3 pages
    if(currPage <= 3){
      pagination = pagination.filter((x) => x < 6);
    // render pages with the current page as the second number
    } else if(currPage >= 4 && currPage < totalPages-3) {
      pagination = pagination.filter((x) => x >= currPage-1 && x < currPage + 3);
    // renders last 4 pages 
    } else if(currPage >= totalPages-3 && currPage <= totalPages) {
      pagination = pagination.filter((x) => x >= totalPages-4 && x < totalPages);
    } 
    const pages = pagination.map((page, i) => 
      <span className={`pagination__item 
                      ${currPage === page ? 'pagination__item--selected' : null}`}
            key={i} onClick={() => this._goToPage(page)}> {page} </span>
    );
    return pages;
  }

  /* @ {pageNum} Int - Goes to this page in pagination
   */
  _goToPage(pageNum) {
    const { actions, url, perPage } = this.props;

    this._scrollUp();
    // for pagination page indication
    actions.goToPage(pageNum);
    // api request
    actions.getPage(url, pageNum, perPage);
  }

  // animates window scrolling to top
  _scrollUp() {
     const step = 100;
     const d = document.documentElement
     const scrollHeight = d.scrollHeight;

     window.scrollBy(0, -step);
     if(d.scrollTop === 0) {
       clearTimeout(scroll);
       return;
     }
     let scroll = setTimeout(() => {
      this._scrollUp()
    },20);
  };

  /* Renders the pagination in the following format
   * {Prev} {First Page} {...} {page page page page} {....} {Last page} {Next}
   */
  render() {
    const { paginationData, perPage, currPage } = this.props;
    const { totalPages } = this.state;

    return(
      <div className="pagination">

       {/* PREV BUTTON */}
       {currPage !== 1 &&
        <span className="pagination__prev"
              onClick={() => this._goToPage(currPage-1)}>Prev</span>
       }

       {/* FIRST PAGE */}
       <span className={`pagination__item 
                       ${currPage === 1 ? 'pagination__item--selected' : null}`}
             onClick={() => this._goToPage(1)}>1</span>

       {/* LEFT DOTS */}
       {currPage > 3 && totalPages > 6 &&
        <span>...</span>
       }

       {/* MIDDLE PAGES */}
       { this._renderMiddlePages() }

       {/* RIGHT DOTS */}
       {currPage < totalPages -3 && totalPages > 6 &&
        <span>...</span>
       }

       {/* LAST PAGE */}
       {totalPages !== 1 &&
        <span className={`pagination__item
                        ${currPage === totalPages ? 'pagination__item--selected' : null}`}
              onClick={() => this._goToPage(totalPages)}>{totalPages}</span>
       }

       {/* NEXT BUTTON */}
       {currPage !== totalPages &&
          <span className="pagination__next"
                onClick={() => this._goToPage(currPage+1)}>Next</span>
       }

      </div>
    )
  }
}

Pagination.propTypes = {
  actions: PropTypes.object,
  paginationData: PropTypes.object,
  perPage: PropTypes.number,
  currPage: PropTypes.number,
  url: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    paginationData: state.gifs.paginationData,
    perPage: state.pagination.perPage,
    currPage: state.pagination.currPage,
    url: state.gifs.url
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      goToPage,
      getPage
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);