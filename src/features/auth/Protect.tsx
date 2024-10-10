import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./authSlice";
import { Navigate } from "react-router-dom";

const Protect = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(selectLoggedInUser);
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default Protect;
