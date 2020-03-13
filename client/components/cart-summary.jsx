import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (!props.cartItems.length) {
    return (
      <div className="cart-page container">
        <div className="cart-header mb-3">
          <div className="mb-4">
            <a onClick={() => props.view('catalog', {})}><i className="fas fa-chevron-left"></i> Back To Catalog</a>
          </div>
          <h1 className="mb-3">My Cart</h1>
        </div>
        <div className="m-5 p-5"><h1 className="text-muted text-center">--Cart is Currently Empty--</h1></div>
        <div className="cart-footer mb-4">
          <h1 className="text-right mr-3">Subtotal: $0.00</h1>
          <h3 className="text-right mr-3">Estimated Tax: $0.00</h3>
          <h3 className="text-right mr-3">Shipping: FREE</h3>
        </div>
      </div>
    );
  }
  const cartList = Object.values(props.cartItems);
  const cartListArray = cartList.map(cart => {
    return <CartSummaryItem
      key={cart.cartItemId}
      name={cart.name}
      price={cart.price}
      image={cart.image}
      shortDesc={cart.shortDescription}/>;
  });
  const subtotal = cartList.reduce(function (acc, cur) {
    return acc + cur.price;
  }, 0);
  return (
    <div className="cart-page container">
      <div className="cart-header mb-3">
        <div className="mb-4">
          <a onClick={() => props.view('catalog', {})}><i className="fas fa-chevron-left"></i> Back To Catalog</a>
        </div>
        <h1 className="mb-3">My Cart</h1>
      </div>
      <div>
        {cartListArray}
      </div>
      <div className="cart-footer mb-4">
        <h1 className="text-right mr-3">Subtotal: ${(subtotal / 100).toFixed(2)}</h1>
        <h3 className="text-right mr-3">Estimated Tax: ${((subtotal / 100) * 0.08).toFixed(2)}</h3>
        <h3 className="text-right mr-3">Shipping: FREE</h3>
      </div>
    </div>
  );
}

export default CartSummary;
