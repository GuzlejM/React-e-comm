import React from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
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
      </Routes>
    </div>
  );
}

export default App;
