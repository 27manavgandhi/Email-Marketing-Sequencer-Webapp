import AuthPage from "@pages/AuthPage";
import EmailSequence from "@pages/EmailSequence";
import EmailSequenceDetail from "@pages/EmailSequenceDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Routers = () => {
  // defining routes
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/emailsequences"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/emailsequences"
          element={<AuthPage Component={EmailSequence} />}
        />
        <Route
          path="/emailsequences/:emailSequenceId"
          element={<EmailSequenceDetail />}
        />
      </Routes>
    </>
  );
};

export default Routers;
