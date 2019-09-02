import React, { Component } from 'react';
import './book-list.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';


import BookListItem from '../book-list-item';
import Spinner from '../spinner';

class BookList extends Component {

  componentDidMount() {
    const { bookstoreService, booksLoaded } = this.props;
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data));
  }

  render () {
    if(this.props.loading)
      return <Spinner />    
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

const mapStateToProps = ({ books, loading }) => {
  return({ books,
           loading 
  });
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators( {booksLoaded}, dispatch);
}

export default compose(
                    withBookstoreService(),
                    connect(mapStateToProps,mapActionsToProps)
                )(BookList);