import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { AuthContext } from "../../contexts/auth.context";
import { UserContext } from "../../contexts/user.context";

import "./header.styles.scss";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(UserContext);

  const getLoggedIn = async (event) => {
    let isLoggedIn = await axios.get(
      "http://localhost:5000/api/auth/is_logged_in"
    );
    setIsLoggedIn(isLoggedIn.data);
  };

  const signOutHandler = async () => {
    const url = "http://localhost:5000/logout";
    await axios.get(url);
    await getLoggedIn();
    await setCurrentUser(null);
    await window.localStorage.removeItem("isLoggedIn", true);
  };

  console.log(isLoggedIn);

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
        {isLoggedIn === true && (
          <Link className="nav-link" to="/" onClick={signOutHandler}>
            SIGN OUT
          </Link>
        )}
        {isLoggedIn === false && (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
