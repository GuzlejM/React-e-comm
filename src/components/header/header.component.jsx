import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { AuthContext } from "../../contexts/auth.context";
import { CartContext } from "../../contexts/cart.context";

import "./header.styles.scss";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    const url = "http://localhost:5000/logout";
    await axios.get(url);
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="header-right-side">
        {isLoggedIn === true && (
          <div className="options">
            <Link className="option" to="/shop">
              SHOP
            </Link>
            <Link className="option" to="/shop">
              CONTACT
            </Link>
            <Link className="option" to="/signin" onClick={signOutHandler}>
              SIGN OUT
            </Link>
          </div>
        )}
        {isLoggedIn === false && (
          <div className="options">
            <Link className="option" to="/shop">
              SHOP
            </Link>
            <Link className="option" to="/shop">
              CONTACT
            </Link>
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          </div>
        )}
        <CartIcon />
        {isCartOpen && <CartDropdown />}
      </div>
    </div>
  );
};

export default Header;
