import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  let token = localStorage.getItem("token");
  const isLogin = () => {
    if (!token) {
      return false;
    }
    return true;
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/profile" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
