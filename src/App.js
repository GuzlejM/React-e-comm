import React from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import ForgotPasswordPage from "./components/forgot-password/forgot-password.component";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import NewPasswordPage from "./pages/new-password-page/new-password-page.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import VerifyPage from "./pages/verify/verify.component";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/shop" element={<ShopPage />} />
        <Route exact path="/signin" element={<SignInAndSignUp />} />
        <Route exact path="/verify/:id/:token" element={<VerifyPage />} />
        <Route exact path="/forgot_password" element={<ForgotPasswordPage />} />
        <Route
          exact
          path="/reset_password/:id/:token"
          element={<NewPasswordPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
