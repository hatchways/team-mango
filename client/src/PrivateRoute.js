import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  console.log(authTokens);

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens.token ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  );
}

export default PrivateRoute;
