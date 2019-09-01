import React, { Component } from 'react';
import './book-list.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';


import BookListItem from '../book-list-item';

class BookList extends Component {

  componentDidMount() {
    const data = this.props.bookstoreService.getBooks();
    this.props.booksLoaded(data);
  }

  render () {
    return(
      <ul className="book-list">
        {
          this.props.books.map((book) => {
            return(<li key={book.id}> <BookListItem book={book}/></li>);
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return({ books });
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators( {booksLoaded}, dispatch);
}

export default compose(
                    withBookstoreService(),
                    connect(mapStateToProps,mapActionsToProps)
                )(BookList);