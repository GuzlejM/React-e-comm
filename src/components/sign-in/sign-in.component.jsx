import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { AuthContext } from "../../contexts/auth.context";
import "./sign-in.styles.scss";

const defaultFormValues = {
  email: "",
  password: "",
};

/* SIGN IN FUNCTION */
const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // HANDLE LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth/login";
      const data = await axios.post(url, formFields, {
        withCredentials: true,
      });
      await resetFormFields();
      await setIsLoggedIn(true);
      await navigate("/");
    } catch (error) {
      const data = error.response.data;
      !data.error
        ? alert(`${data.message}`)
        : alert(`${data.message}: ${data.error}`);
    }
  };

  const handleLoginGoogle = async (googleData) => {
    const res = await fetch("api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogoutGoogle = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormValues);
  };

  return (
    <div className="sign-in">
      <h2>I already have an account ?</h2>
      <span>Sign in with your email and password.</span>

      <form onSubmit={handleLogin}>
        <FormInput
          name="email"
          handleChange={handleChange}
          type="email"
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <Link className="option" to="/forgot_password">
          forgot password ?
        </Link>

        <div className="buttons-container">
          <CustomButton type="submit">Sign in</CustomButton>

          <div>
            {loginData ? (
              <div>
                <h3>You logged in as {loginData.email}</h3>
                <button onClick={handleLogoutGoogle}></button>
              </div>
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLoginGoogle}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
