import React from 'react';
import './shopping-cart-table.css';

import { connect } from 'react-redux';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
  const renderRow = (item, idx) => {
    const{ id, name, count, total } = item;
    return(
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
          <button className="btn btn-outline-danger btn-sm float-right"
                  onClick={() => onDelete(id)}>
            <i className="fa fa-trash-o" />
          </button>
          <button className="btn btn-outline-success btn-sm float-right"
                  onClick={() => onIncrease(id)}>
            <i className="fa fa-plus-circle" />
          </button>
          <button className="btn btn-outline-warning btn-sm float-right"
                  onClick={() => onDecrease(id)}>
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    )}

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
            {items.map((item, idx) => renderRow(item, idx))}
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.cartItems,
    total: state.orderTotal
  }
}

const mapActionsToProps = (dispatch) => {
  return{
    onIncrease: (id) => (console.log(`add book to id ${id}`)),
    onDecrease: (id) => (console.log(`del book to id ${id}`)),
    onDelete: (id) => (console.log(`delete id ${id}`))
  }
}



export default connect(mapStateToProps, mapActionsToProps)(ShoppingCartTable);
