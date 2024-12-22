import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/user";

export const PrivateRoute = ({ children, redirectTo }) => {
  const user = useSelector(selectCurrentUser);
  return user ? children : <Navigate to={redirectTo} />;
};
