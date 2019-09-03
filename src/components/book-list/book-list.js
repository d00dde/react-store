import React, { Component } from 'react';
import './book-list.css';

import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

const BookList = ({ books }) => {
  return(
    <ul className="book-list">
      {
        books.map((book) => {
          return(<li key={book.id}> <BookListItem book={book}/></li>);
        })
      }
    </ul>
  );
}

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render () {
    const { loading, error, books } = this.props;
    if(error) return <ErrorIndicator />
    if(loading) return <Spinner />
    return <BookList books={books} />
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return({ books,
           loading,
           error
  });
}

const mapActionsToProps = (dispatch, ownProps) => {
  return{
    fetchBooks: fetchBooks(ownProps.bookstoreService, dispatch)
  }
}

export default compose(
                    withBookstoreService(),
                    connect(mapStateToProps,mapActionsToProps)
                      )(BookListContainer);