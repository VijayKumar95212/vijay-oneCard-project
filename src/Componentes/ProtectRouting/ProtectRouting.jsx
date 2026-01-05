// Componentes/ProtectRouting/ProtectRouting.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRouting = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/login" replace />;
  }
  // if logged in, show the protected component
  return children;
};

export default ProtectRouting;
