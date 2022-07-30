import axios from "axios";
import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./forgot-password.styles.scss";

const defaultFormValues = {
  email: "",
};

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth/reset_password";
      await axios.post(url, formFields);
      await resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormValues);
  };

  return (
    <div className="paswordForm">
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

export default ForgotPassword;
