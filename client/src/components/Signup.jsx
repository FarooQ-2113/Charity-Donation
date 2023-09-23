import React, { useState } from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Signup = (props) => {
  const [signUp, { error, data }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    // Clear validation error when input changes
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation checks
    const errors = {};

    if (!formState.username) {
      errors.username = "Username is required";
    }

    if (!formState.email || !formState.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Valid email is required";
    }

    if (!formState.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      // Set validation errors
      setValidationErrors(errors);
      return;
    }

    try {
      const { data } = await signUp({
        variables: formState,
      });
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* ... other JSX code ... */}
      <form className="flex flex-col gap-4 mt-4 mb-2 px-8 items-center border-gray-200 rounded-lg">
        <div className="signup-name-input">
          <h1>Name</h1>
          <div className="m-2 block">
            <label htmlFor="name1" value="Your name" />
          </div>
          <input
            onChange={handleInputChange}
            className="rounded-md"
            name="username"
            id="name1"
            type="text"
            placeholder="First Last"
            required
          />
          <div className="text-red-500">{validationErrors.username}</div>
        </div>

        <div>
          <h1>Email</h1>
          <div className="m-2 block">
            <label htmlFor="email1" value="Your email" />
          </div>
          <input
            onChange={handleInputChange}
            className="rounded-md"
            name="email"
            id="email1"
            type="email"
            placeholder="name@mail.com"
            required
          />
          <div className="text-red-500">{validationErrors.email}</div>
        </div>

        <div>
          <h1>Password</h1>
          <div className="m-2 block">
            <label htmlFor="password1" value="Your password" />
          </div>
          <input
            onChange={handleInputChange}
            className="rounded-md"
            name="password"
            id="password1"
            type="password"
            placeholder="password"
            required
          />
          <div className="text-red-500">{validationErrors.password}</div>
        </div>
        {/* ... other JSX code ... */}
      </form>
    </div>
  );
};

export default Signup;
