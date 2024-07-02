import useForm from "@hooks/useForm";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const initialState = {
    email: "",
    password: "",
  };

  // validator for form
  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const {
    values: userData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  } = useForm(initialState, validate, handleRegisterUser);

  function handleRegisterUser() {
    toast.promise(loginUser(userData), {
      loading: "Hang on...",
      success: (res) => {
        handleReset();
        login(res.user, res.token);
        navigate("/emailsequences", { replace: true });
        return "User Login successfully";
      },
      error: (e) => e,
    });
  }
  return (
    <div className="rounded shadow py-3 px-4">
      <h3>Log in</h3>
      <p>Already have an account ?</p>

      <div className="content-wrap">
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
              value={userData.email}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={userData.password}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
