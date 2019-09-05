
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

	const calcTotal = (price, quantity) => {
		return state.shoppingCart.orderTotal + price*quantity;
	}

	const book = books.find((book) => book.id === id);
	const itemId = cartItems.findIndex((item) => item.id === id);
	const item = cartItems[itemId];

	

	switch (action) {
		case 'dec':
			if(item.count === 1)
				return {
					cartItems: removeItemFromCart(item),
					orderTotal: calcTotal(book.price, -1)
				}
			return {
				cartItems: updateItemToCart(changeCount(book, item, -1)),
				orderTotal: calcTotal(book.price, -1)
			}
		case 'inc':
			if(item)
				return {
					cartItems: updateItemToCart(changeCount(book, item, 1)),
					orderTotal: calcTotal(book.price, 1)
				}
			return {
				cartItems: addItemToCart(changeCount(book, item, 1)),
				orderTotal: calcTotal(book.price, 1)
			}
		case 'del':
			return {
				cartItems: removeItemFromCart(item),
				orderTotal: calcTotal(book.price, -item.count)
			}

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
      return updateOrder(action.payload, state, 'inc');

  	case 'BOOK_DECREASE_FROM_CART':
      return updateOrder(action.payload, state, 'dec');

  	case 'BOOK_DELETED_FROM_CART':
      return updateOrder(action.payload, state, 'del');

		default: 
        return state.shoppingCart;
	}
}

export default cartActions;