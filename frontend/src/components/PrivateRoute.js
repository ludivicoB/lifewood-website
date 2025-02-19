import React from "react";
import { Navigate } from "react-router-dom";

// Example of checking authentication
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true"; // Check if user is authenticated
};

const PrivateRoute = ({ element }) => {
  if (isAuthenticated()) {
    return element; // Allow access to the protected route
  } else {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }
};

export default PrivateRoute;
