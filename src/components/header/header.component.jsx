import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { AuthContext } from "../../contexts/auth.context";

import "./header.styles.scss";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const signOutHandler = async () => {
    const url = "http://localhost:5000/logout";
    await axios.get(url);
    // await getLoggedIn();
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
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
    </div>
  );
};

export default Header;
