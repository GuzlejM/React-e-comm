import axios from "axios";
import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Emoji from "../../components/emoji/emoji.component";

import { AuthContext } from "../../contexts/auth.context";

import "./verify.styles.scss";

const VerifyPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  //TODO Cant delete this unused variables :D LOL it breaks verification
  const [zero, verify, id, token] = location.pathname.split("/");
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/verify/${id}/${token}`);
    // TODO change isLogged in into false on the purpose, Try to do or edit function on BE isLoggedIn()
    // to be able to check if the user exists, delete JWT TOKEN
    setIsLoggedIn(false);
  });

  return (
    <div className="verifypage">
      <h1>
        <span>
          <Emoji symbol="🥳" label="celebrating"></Emoji>
        </span>
        Your email has been verified
        <span>
          <Emoji symbol="🥳" label="celebrating"></Emoji>
        </span>
      </h1>
      <Link className="option" to="/signin">
        TO LOGIN PAGE
      </Link>
    </div>
  );
};
export default VerifyPage;
