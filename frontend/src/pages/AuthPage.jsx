import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthPage = ({ Component, ...rest }) => {
  const { user } = useAuth();

  if (user) {
    return <Component {...rest} />;
  } else {
    // if the user is not logged in redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default AuthPage;
