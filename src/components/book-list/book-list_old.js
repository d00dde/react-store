import React, { Component } from 'react';
import './book-list.css';

 import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksRequested, booksLoaded, booksError } from '../../actions';
import { compose } from '../../utils';


import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

class BookList extends Component {

  componentDidMount() {
    const { booksRequested,
            booksLoaded,
            booksError,
            bookstoreService} = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((error) => booksError(error));
  }

  render () {
    if(this.props.error) return <ErrorIndicator />
    if(this.props.loading) return <Spinner />

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

const mapStateToProps = ({ books, loading, error }) => {
  return({ books,
           loading,
           error
  });
}

const mapActionsToProps = (dispatch) => {
  return{
    booksRequested,
    booksLoaded,
    booksError
  }
}

export default compose(
                    withBookstoreService(),
                    connect(mapStateToProps,mapActionsToProps)
                      )(BookList);