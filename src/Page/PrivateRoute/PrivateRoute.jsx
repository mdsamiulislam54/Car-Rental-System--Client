import React, { useContext } from "react";
import UserContext from "../../ContextApi/UserContext/UserContext";
import { Navigate, useLocation } from "react-router";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const {pathname}  = useLocation();


  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ pathname }}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
