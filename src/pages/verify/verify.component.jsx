import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Emoji from "../../components/emoji/emoji.component";

import "./verify.styles.scss";

const VerifyPage = () => {
  const location = useLocation();
  const [zero, verify, id, token] = location.pathname.split("/");
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/verify/${id}/${token}`);
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
