import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import "./header.styles.scss";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    const url = "http://localhost:5000/logout";
    await axios.get(url);
    await setCurrentUser(null);
  };

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <Link className="nav-link" to="/" onClick={signOutHandler}>
            SIGN OUT
          </Link>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
