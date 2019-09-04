
const updateOrder = (id, state, action) => {
	const { shoppingCart: { cartItems }, bookList: { books } } = state;
	const addItemToCart = (item) => {
		return [ ...cartItems, item];
	}

	const removeItemFromCart = (item) => {
		return cartItems.filter((item) => {
      return item.id !== id
  	});
	}

	const updateItemToCart = (newItem) => {
		return cartItems.map((item) => {
      if(item.id === id)
          return newItem;
      return item;
    });
	}

	const changeCount = ( book, item = {}, quantity) => {
    const { id = book.id, title = book.title, count = 0, total = 0 } = item;
    return {
      id,
      title,
      count: count + quantity,
      total: total + quantity*book.price,
    }
	}

	const book = books.find((book) => book.id === id);
	const itemId = cartItems.findIndex((item) => item.id === id);
	const item = cartItems[itemId];

	switch (action) {
		case 'dec':
			if(item.count === 1)
				return removeItemFromCart(item);
			return updateItemToCart(changeCount(book, item, -1));
		case 'inc':
			if(item)
				return updateItemToCart(changeCount(book, item, 1));
			return addItemToCart(changeCount(book, item, 1));
		case 'del':
			return removeItemFromCart(item);
	}
}

const calcTotal = (items) => {
	return items.reduce((total, item) => {
		return total + item.total;
	}, 0);
}


const cartActions = (state, action) => {
	if(state === undefined)
		return {
			cartItems:[],
      orderTotal: 0
		}
	
	switch (action.type) {
   	case 'BOOK_ADDED_TO_CART':
      return {
          cartItems: updateOrder(action.payload, state, 'inc'),
          orderTotal: calcTotal(state.shoppingCart.cartItems)
      }
      
  	case 'BOOK_DECREASE_FROM_CART':
      return {
          cartItems: updateOrder(action.payload, state, 'dec'),
          orderTotal: calcTotal(state.shoppingCart.cartItems)
      }
  	case 'BOOK_DELETED_FROM_CART':
      return {
          cartItems: updateOrder(action.payload, state, 'del'),
          orderTotal: calcTotal(state.shoppingCart.cartItems)
      }
		default: 
        return state.shoppingCart;
	}
}

export default cartActions;