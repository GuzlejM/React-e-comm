import { useEffect, useContext, useRef } from "react";
import { FocusOn } from "react-focus-on";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsCartOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div>
      <div ref={menuRef} className="cart-dropdown-container">
        {cartItems.length === 0 ? (
          <h2 className="cart-items-empty">
            Cart is empty, go to SHOP add items to the cart
          </h2>
        ) : (
          <div className="cart-dropdown">
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </div>
            <CustomButton onClick={goToCheckoutHandler}>
              GO TO CHECKOUT
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
