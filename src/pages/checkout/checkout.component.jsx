import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div>
      <div className="checkout-container">
        {cartItems.length === 0 ? (
          <h2>Cart is empty, go to SHOP add items to the cart</h2>
        ) : (
          <div className="checkout-container">
            <div className="checkout-header">
              <div className="header-block">
                <span>Product</span>
              </div>
              <div className="header-block">
                <span>Description</span>
              </div>
              <div className="header-block">
                <span>Quantity</span>
              </div>
              <div className="header-block">
                <span>Price</span>
              </div>
              <div className="header-block">
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className="total">TOTAL: ${cartTotal}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
