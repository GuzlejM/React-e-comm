import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./new-password.styles.scss";

const defaultFormValues = {
  password: "",
  confirmPassword: "",
};

const NewPassword = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { password, confirmPassword } = formFields;
  const location = useLocation();
  const navigate = useNavigate();
  const [zero, verify, id, token] = location.pathname.split("/");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and confirm password has to be the same!");
    } else {
      try {
        const url = `http://localhost:5000/api/auth/reset_password/${id}/${token}`;
        await axios.put(url, formFields);
        await resetFormFields();
        await navigate("/signin");
        await alert("Password has been changed");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormValues);
  };

  return (
    <div className="newPaswordForm">
      <h2>Now you can create new Password</h2>
      <span>Type in your new password and submit with Create New Password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="password"
          handleChange={handleChange}
          type="password"
          value={password}
          label="password"
          required
        />
        <FormInput
          name="confirmPassword"
          handleChange={handleChange}
          type="password"
          value={confirmPassword}
          label="confirmPassword"
          required
        />

        <div className="buttons-container">
          <CustomButton type="submit">Create new Password</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
