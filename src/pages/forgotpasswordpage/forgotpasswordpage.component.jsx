import axios from "axios";
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

const defaultFormValues = {
  email: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("NASRAC!!!");
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const url = "http://localhost:5000/api/auth/login";
  //     const data = await axios.post(url, formFields);
  //     const user = data.data.user;

  //     setCurrentUser(user);

  //     await resetFormFields();
  //   } catch (error) {
  //     const data = error.response.data;
  //     !data.error
  //       ? alert(`${data.message}`)
  //       : alert(`${data.message}: ${data.error}`);
  //   }
  // };

  // const resetFormFields = () => {
  //   setFormFields(defaultFormValues);
  // };

  return (
    <div className="sign-in">
      <h2>Forgot the password ?</h2>
      <span>Type in your email and submit Reset Password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          handleChange={handleChange}
          type="email"
          value={email}
          label="email"
          required
        />

        <div className="buttons-container">
          <CustomButton type="submit">Reset Password</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
