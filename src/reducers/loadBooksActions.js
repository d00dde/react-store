
const loadBooksActions = (state, action) => {
	if(state === undefined)
        return {
            books: [],
            loading: true,
            error: null,
        }
    switch(action.type) {
    case 'FETCH_BOOKS_REQUEST':
        return {
            books: [],
            loading: true,
            error: false
        };
    case 'FETCH_BOOKS_SUCCESS':
        return {
            books: action.payload,
            loading: false,
            error: false
        };

    case 'FETCH_BOOK_FAILURE':
        return {
            books: [],
            loading: false,
            error: action.payload
        };
	default: 
        return state.bookList;
    }
}

export default loadBooksActions;