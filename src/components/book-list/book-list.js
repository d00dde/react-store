import React, { Component } from 'react';
import './book-list.css';

import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

const BookList = ({ books, onAddedToCart }) => {
  return(
    <ul className="book-list">
      {
        books.map((book) => {
          return(<li key={book.id}>
                   <BookListItem book={book}
                                 onAddedToCart={() => onAddedToCart(book.id)}/>
                 </li>);
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
    const { loading, error, books, onAddedToCart } = this.props;
    if(error) return <ErrorIndicator />
    if(loading) return <Spinner />
    return <BookList books={books}
                     onAddedToCart={onAddedToCart} />
  }
}

const mapStateToProps = (state) => {
  const { books, loading, error } = state.bookList;
  return({ books,
           loading,
           error
  });
}

const mapActionsToProps = (dispatch, ownProps) => {
  return{
    fetchBooks: fetchBooks(ownProps.bookstoreService, dispatch),
    onAddedToCart: (id) => { dispatch(bookAddedToCart(id))}
  }
}

export default compose(
                    withBookstoreService(),
                    connect(mapStateToProps,mapActionsToProps)
                      )(BookListContainer);