
const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems:[
        {
            id: 1,
            name: 'Book_1',
            count: 3,
            total: 322

        },
        {
            id: 2,
            name: 'Book_2',
            count: 4,
            total: 42

        },
    ],
    orderTotal: 364

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: false
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: false
            };

        case 'FETCH_BOOK_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;