import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <div>
          <span className="name">{name}</span>
        </div>
        <div className="items-buttons">
          <span className="cart-dropdown-quantity">
            <div className="arrow" onClick={removeItemHandler}>
              &#10094;
            </div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={addItemHandler}>
              &#10095;
            </div>
          </span>
          <span className="price"> {price}$</span>
          <div className="remove-button" onClick={clearItemHandler}>
            &#10005;
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
