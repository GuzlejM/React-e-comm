import { useState, useContext } from "react";
import axios from "axios";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { UserContext } from "../../contexts/user.context";

import "./sign-up.styles.scss";

const defaultFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { username, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth/register";
      if (formFields.password !== formFields.confirmPassword) {
        alert("Password and Confirm Password must be the same.");
      } else {
        await axios.post(url, formFields);
        await resetFormFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormValues);
  };

  return (
    <div className="sign-in">
      <h2>Don't have an account ?</h2>
      <span>Sign up with Registration Form down below.</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="text"
          value={username}
          handleChange={handleChange}
          label="username"
          required
        />
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
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
