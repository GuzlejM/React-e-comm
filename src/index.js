import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/auth.context";
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ProductsProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </ProductsProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
