
const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
}

const booksError = (error) => {
    return {
        type: 'FETCH_BOOK_FAILURE',
        payload: error
    }
}

const fetchBooks = (bookstoreService, dispatch ) => () => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
      .then((data) => dispatch(booksLoaded(data)))
      .catch((error) => dispatch(booksError(error)));
}

const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
}

const bookDecreaseFromCart = (bookId) => {
    return {
        type: 'BOOK_DECREASE_FROM_CART',
        payload: bookId
    }
}

const bookDeletedFromCart = (bookId) => {
    return {
        type: 'BOOK_DELETED_FROM_CART',
        payload: bookId
    }
}


export {
    fetchBooks,
    bookAddedToCart,
    bookDecreaseFromCart, 
    bookDeletedFromCart
}