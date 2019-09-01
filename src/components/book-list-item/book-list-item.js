import React from 'react';
import './book-list-item.css';

const BookListItem = ({ book }) => {
  return(
      <React.Fragment>
        <h1>{book.title}</h1>
        <h2>{book.autor}</h2>
      </React.Fragment>
  )
}

export default BookListItem;