import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App";
import { UserProvider } from "./contexts/user.context";

import "./index.css";

// axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
