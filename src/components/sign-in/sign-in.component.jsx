import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { useCookies } from "react-cookie";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { AuthContext } from "../../contexts/auth.context";
import { UserContext } from "../../contexts/user.context";
import "./sign-in.styles.scss";

const defaultFormValues = {
  email: "",
  password: "",
};
/* SIGN IN FUNCTION */

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;

  const [cookies, setCookie] = useCookies(["user"]);

  const { setIsLoggedIn } = useContext(AuthContext);
  const { setCurrentUser } = useContext(UserContext);

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

  const getLoggedIn = async (event) => {
    let isLoggedIn = await axios.get(
      "http://localhost:5000/api/auth/is_logged_in"
    );
    setIsLoggedIn(isLoggedIn.data);
  };

  // IN CASE OF NEED
  // async function getLoggedIn() {
  //   const isLoggedIn = await axios.get(
  //     "http://localhost:5000/api/auth/is_logged_in"
  //   );
  //   console.log(isLoggedIn.data, "real data");
  //   setIsLoggedIn(isLoggedIn.data);
  // }

  // useEffect(() => {
  //   getLoggedIn();
  //   console.log(localStorage);
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth/login";
      const data = await axios.post(url, formFields, {
        withCredentials: true,
      });
      console.log(data);
      await resetFormFields();
      await getLoggedIn();
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
