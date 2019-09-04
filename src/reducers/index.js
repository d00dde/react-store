import loadBooksActions from './loadBooksActions';
import cartActions from './cartActions';

const reducer = (state , action) => {
    //console.log(action);
    return {
        bookList: loadBooksActions(state, action),
        shoppingCart: cartActions(state, action)
    }
}

export default reducer;